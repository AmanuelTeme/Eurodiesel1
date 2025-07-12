import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import loginService from "../../../services/login.service";
import { useAuth } from "../../../Context/AuthContext";
import Avatar from "react-avatar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure bootstrap CSS is imported
import "./Header.css";
import { useTranslation } from "react-i18next";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import axios from "../../../axios/axiosConfig";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Header(props) {
  const { isLogged, setIsLogged, employee } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { t, i18n } = useTranslation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [unreadAnnouncements, setUnreadAnnouncements] = useState([]);

  // Responsive state: use Bootstrap breakpoints
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchAnnouncements = async () => {
    if (!employee?.employee_id) return;
    try {
      // Get all announcements
      const allRes = await axios.get(
        `/announcements/all?employee_id=${employee.employee_id}`
      );
      // Get unread announcements
      const unreadRes = await axios.get(
        `/announcements/unread?employee_id=${employee.employee_id}`
      );
      let all = Array.isArray(allRes.data)
        ? allRes.data
        : allRes.data
        ? [allRes.data]
        : [];
      let unread = Array.isArray(unreadRes.data)
        ? unreadRes.data
        : unreadRes.data
        ? [unreadRes.data]
        : [];
      setAllAnnouncements(all);
      setUnreadAnnouncements(unread);
      setUnreadCount(unread.length);
    } catch (error) {
      setAllAnnouncements([]);
      setUnreadAnnouncements([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [employee?.employee_id]);

  const logOut = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      loginService.logOut();
      setIsLogged(false);
      navigate("/login");
    }
  };

  const handleAdminClick = (event) => {
    event.preventDefault();
    navigate("/admin");
  };

  const handleProfileClick = (event) => {
    event.preventDefault();
    navigate(`/admin/employee-profile/${employee?.employee_id}`);
  };

  const isAdmin = employee?.employee_role === 3;
  console.log("is user admin", isAdmin);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  const markAsRead = async (announcement_id) => {
    await axios.post("/announcements/read", {
      announcement_id,
      employee_id: employee.employee_id,
    });
    await fetchAnnouncements();
  };

  const handleBellClick = async () => {
    await fetchAnnouncements();
    setShowModal(true);
  };

  // Mark all as read
  const markAllAsRead = async () => {
    if (!unreadAnnouncements.length) return;
    await Promise.all(
      unreadAnnouncements.map((a) =>
        axios.post("/announcements/read", {
          announcement_id: a.announcement_id,
          employee_id: employee.employee_id,
        })
      )
    );
    await fetchAnnouncements();
  };

  // Debug logs
  console.log("Employee:", employee);
  console.log("All announcements:", allAnnouncements);
  console.log("Unread announcements:", unreadAnnouncements);
  console.log("Unread count:", unreadCount);
  console.log("Show modal:", showModal);

  return (
    <header className="main-header header-style-one">
      <div className="header-top py-2 bg-dark text-white">
        <div className="container-fluid px-3">
          <div className="row align-items-center justify-content-between">
            <div className="col-12 col-md-6 d-flex flex-column flex-md-row align-items-center gap-2 gap-md-4">
              <span className="small emergency-banner">
                {t("24hr Workshop Open for Emergency Service")}
              </span>
              <span className="small">
                {t("Monday to Friday 8:00 - 18:30, Saturday 8:00 - 12:00")}
              </span>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-md-end align-items-center gap-2 gap-md-4 mt-2 mt-md-0 flex-wrap">
              <div>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`btn btn-sm ${
                    i18n.language === "en"
                      ? "btn-primary en-active"
                      : "btn-outline-light"
                  } me-1`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange("it")}
                  className={`btn btn-sm ${
                    i18n.language === "it"
                      ? "btn-primary it-active"
                      : "btn-outline-light"
                  }`}
                >
                  IT
                </button>
              </div>
              {isLogged ? (
                <span className="welcome-admin-text d-none d-md-inline">
                  <strong>
                    {isAdmin
                      ? t("Welcome Admin!")
                      : `Welcome ${employee?.employee_first_name || ""}!`}
                  </strong>
                </span>
              ) : (
                <span className="phone-number small">
                  {t("Schedule Appointment")}: <strong>+39 0461 996222</strong>
                </span>
              )}
              {isLogged && (
                <div
                  className="employee_profile ms-2 profile-initial-circle"
                  onClick={handleProfileClick}
                  style={{ cursor: "pointer" }}
                >
                  {employee?.employee_first_name?.charAt(0)?.toUpperCase() ||
                    "?"}
                </div>
              )}
              {/* Notification bell for employees only */}
              {isLogged && employee?.employee_role === 1 && (
                <div
                  className="position-relative ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={handleBellClick}
                  title={t("View notifications")}
                >
                  <NotificationsActiveIcon
                    style={{ fontSize: 28, color: "#fff" }}
                  />
                  {unreadCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: 12 }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header-upper py-2 bg-white shadow-sm">
        <div className="container-fluid px-3">
          <div className="row align-items-center justify-content-between">
            {/* Logo */}
            <div className="col-6 col-md-3 d-flex align-items-center">
              <Link to="/" className="navbar-brand mx-auto mx-md-0">
                <img
                  src="/eurodiesel-logo.jpg"
                  alt="EURODIESEL PARMA S.p.A."
                  style={{ height: 48, maxWidth: 160 }}
                />
              </Link>
            </div>
            {/* Hamburger for mobile */}
            {isMobile && (
              <div className="col-6 d-flex justify-content-end">
                <DropdownButton
                  className="dropdown-button"
                  id="dropdown-basic-button"
                  variant="none"
                  title={
                    <div className="hamburger-icon">
                      <span className="hamburger-line"></span>
                      <span className="hamburger-line"></span>
                      <span className="hamburger-line"></span>
                    </div>
                  }
                  align="end"
                >
                  <Dropdown.Item as={Link} to="/">
                    {t("Home")}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/about">
                    {t("About Us")}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/services">
                    {t("Services")}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/used-spare-parts">
                    {t("Used Spare Parts")}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/contact">
                    {t("Contact")}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/admin">
                    {t("Dashboard")}
                  </Dropdown.Item>
                  {isLogged ? (
                    <Dropdown.Item onClick={logOut}>
                      {t("Log out")}
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item as={Link} to="/login">
                      {t("Login")}
                    </Dropdown.Item>
                  )}
                </DropdownButton>
              </div>
            )}
            {/* Nav links for tablet/desktop */}
            {!isMobile && (
              <div className="col-md-9 d-flex align-items-center justify-content-end">
                <nav className="main-menu navbar navbar-expand-md navbar-light w-100">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center gap-2">
                    <li className="nav-item">
                      <Link
                        to="/"
                        className={`nav-link${
                          location.pathname === "/" ? " active-nav" : ""
                        }`}
                      >
                        {t("Home")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/about"
                        className={`nav-link${
                          location.pathname === "/about" ? " active-nav" : ""
                        }`}
                      >
                        {t("About Us")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/services"
                        className={`nav-link${
                          location.pathname === "/services" ? " active-nav" : ""
                        }`}
                      >
                        {t("Services")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/used-spare-parts"
                        className={`nav-link${
                          location.pathname.startsWith("/used-spare-parts")
                            ? " active-nav"
                            : ""
                        }`}
                      >
                        {t("Used Spare Parts")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/contact"
                        className={`nav-link${
                          location.pathname === "/contact" ? " active-nav" : ""
                        }`}
                      >
                        {t("Contact")}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/admin"
                        className={`nav-link${
                          location.pathname.startsWith("/admin")
                            ? " active-nav"
                            : ""
                        }`}
                      >
                        {t("Dashboard")}
                      </Link>
                    </li>
                    {isLogged ? (
                      <li className="nav-item">
                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={logOut}
                        >
                          {t("Log out")}
                        </button>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <Link to="/login" className="btn header-login-btn ms-2">
                          {t("Login")}
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && employee?.employee_role === 1 && (
        <>
          {/* Backdrop */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 9999,
            }}
            onClick={() => setShowModal(false)}
          />
          {/* Modal */}
          <div
            className="custom-notification-modal"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#fff",
              color: "#181e5a",
              padding: 0,
              borderRadius: 18,
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              zIndex: 10000,
              minWidth: "350px",
              maxWidth: "95vw",
              maxHeight: "80vh",
              overflowY: "auto",
              border: "none",
              fontSize: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 28px 10px 28px",
                borderBottom: "1px solid #e0e0e0",
                background: "#fff",
                borderTopLeftRadius: 18,
                borderTopRightRadius: 18,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    color: "#1a237e",
                    fontSize: 28,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="26"
                    height="26"
                    fill="#1a237e"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 24c1.104 0 2-.896 2-2h-4c0 1.104.896 2 2 2zm6.364-6v-5c0-3.07-1.639-5.64-4.5-6.32V6c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5v.68C7.275 7.36 5.636 9.93 5.636 13v5l-1.636 1.5V21h16v-1.5L18.364 18zM18 19H6v-.5l1.636-1.5V13c0-2.757 1.794-5 4-5s4 2.243 4 5v4l1.364 1.5V19z" />
                  </svg>
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: 22,
                    color: "#1a237e",
                    letterSpacing: 0.5,
                  }}
                >
                  {t("Notifications")}
                </h3>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {unreadAnnouncements.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    style={{
                      background: "none",
                      color: "#1976d2",
                      border: "none",
                      borderRadius: "50%",
                      padding: 0,
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      marginRight: 8,
                    }}
                    title={t("Mark all as read")}
                  >
                    <CheckCircleIcon
                      style={{ fontSize: 28, color: "#1976d2" }}
                    />
                  </button>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "28px",
                    cursor: "pointer",
                    color: "#888",
                    fontWeight: "bold",
                    lineHeight: 1,
                  }}
                  aria-label="Close notification modal"
                >
                  ×
                </button>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                padding: "0 0 10px 0",
                background: "#fff",
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18,
              }}
            >
              {!allAnnouncements || allAnnouncements.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "#666",
                    fontStyle: "italic",
                    margin: "32px 0",
                  }}
                >
                  {t("No notifications.")}
                </p>
              ) : (
                [...allAnnouncements]
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .map((a, idx, arr) => {
                    const isUnread = unreadAnnouncements.some(
                      (u) => u.announcement_id === a.announcement_id
                    );
                    return (
                      <div
                        key={a.announcement_id || idx}
                        style={{
                          margin: 0,
                          padding: "18px 28px 12px 28px",
                          background: isUnread ? "#e3f2fd" : "#fff",
                          fontWeight: isUnread ? 700 : 400,
                          cursor: isUnread ? "pointer" : "default",
                          position: "relative",
                          borderBottom:
                            idx !== arr.length - 1
                              ? "1px solid #f0f0f0"
                              : "none",
                          transition: "background 0.2s, font-weight 0.2s",
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          minWidth: 250,
                        }}
                        onClick={() =>
                          isUnread && markAsRead(a.announcement_id)
                        }
                        title={isUnread ? t("Click to mark as read") : ""}
                        onMouseEnter={(e) =>
                          isUnread &&
                          (e.currentTarget.style.background = "#bbdefb")
                        }
                        onMouseLeave={(e) =>
                          isUnread &&
                          (e.currentTarget.style.background = "#e3f2fd")
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          {isUnread && (
                            <span
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: "#1976d2",
                                display: "inline-block",
                                marginRight: 4,
                                boxShadow: "0 0 4px #1976d2",
                              }}
                            ></span>
                          )}
                          <span
                            style={{
                              color: "#1a237e",
                              fontWeight: isUnread ? 700 : 500,
                              fontSize: 16,
                              letterSpacing: 0.2,
                            }}
                          >
                            {a.title || (
                              <span style={{ color: "#d32f2f" }}>No Title</span>
                            )}
                          </span>
                        </div>
                        <span
                          style={{
                            margin: "4px 0 0 18px",
                            color: "#333",
                            fontSize: 15,
                            fontWeight: isUnread ? 600 : 400,
                            wordBreak: "break-word",
                          }}
                        >
                          {a.message || (
                            <span style={{ color: "#d32f2f" }}>No Message</span>
                          )}
                        </span>
                        <span
                          style={{
                            color: "#888",
                            fontSize: 12,
                            textAlign: "right",
                            marginLeft: 18,
                            marginTop: 2,
                          }}
                        >
                          {a.created_at
                            ? new Date(a.created_at).toLocaleString()
                            : ""}
                        </span>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
