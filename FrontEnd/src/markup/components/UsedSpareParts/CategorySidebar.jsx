import React, { useState } from "react";
import categories from "./categories";
import { useTranslation } from "react-i18next";

const sidebarStyle = {
  width: 260,
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 2px 16px rgba(26,35,126,0.08)",
  padding: 24,
  minHeight: 400,
  position: "relative",
  zIndex: 10,
};

const hamburgerStyle = {
  display: "none",
  position: "fixed",
  top: 24,
  left: 24,
  zIndex: 1001,
  background: "#fff",
  border: "none",
  borderRadius: 8,
  boxShadow: "0 2px 8px #1a237e22",
  width: 48,
  height: 48,
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};

const drawerOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.18)",
  zIndex: 1000,
  display: "flex",
  alignItems: "flex-start",
};

const drawerStyle = {
  ...sidebarStyle,
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  borderRadius: "0 14px 14px 0",
  boxShadow: "2px 0 16px #1a237e22",
  minHeight: 0,
  paddingTop: 48,
};

const closeBtnStyle = {
  position: "absolute",
  top: 16,
  right: 16,
  background: "none",
  border: "none",
  fontSize: 28,
  cursor: "pointer",
  color: "#1a237e",
};

const CategorySidebar = ({ activeCategoryKey, onCategorySelect }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("it") ? "it" : "en";
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Responsive: show hamburger on small screens
  const isMobile = window.innerWidth <= 900;

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        style={{ ...hamburgerStyle, display: isMobile ? "flex" : "none" }}
        onClick={() => setDrawerOpen(true)}
        aria-label="Open categories"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1a237e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
      {/* Sidebar for desktop, drawer for mobile */}
      {isMobile ? (
        drawerOpen && (
          <div style={drawerOverlayStyle} onClick={() => setDrawerOpen(false)}>
            <div style={drawerStyle} onClick={(e) => e.stopPropagation()}>
              <button
                style={closeBtnStyle}
                onClick={() => setDrawerOpen(false)}
              >
                &times;
              </button>
              <h3
                style={{ color: "#1a237e", fontWeight: 700, marginBottom: 18 }}
              >
                Categories
              </h3>
              {categories.map((cat) => (
                <div
                  key={cat.key}
                  onClick={() => {
                    onCategorySelect(cat.key);
                    setDrawerOpen(false);
                  }}
                  style={{
                    padding: "10px 0",
                    fontWeight: activeCategoryKey === cat.key ? 700 : 500,
                    color: activeCategoryKey === cat.key ? "#1a237e" : "#333",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {cat.name_en}
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <aside style={sidebarStyle}>
          <h3 style={{ color: "#1a237e", fontWeight: 700, marginBottom: 18 }}>
            Categories
          </h3>
          {categories.map((cat) => (
            <div
              key={cat.key}
              onClick={() => onCategorySelect(cat.key)}
              style={{
                padding: "10px 0",
                fontWeight: activeCategoryKey === cat.key ? 700 : 500,
                color: activeCategoryKey === cat.key ? "#1a237e" : "#333",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {cat.name_en}
            </div>
          ))}
        </aside>
      )}
    </>
  );
};

export default CategorySidebar;
