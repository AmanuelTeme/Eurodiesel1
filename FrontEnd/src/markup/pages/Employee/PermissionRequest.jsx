import React, { useState, useEffect } from "react";
import permissionService from "../../../services/permission.service";
import {
  FaCalendarAlt,
  FaClock,
  FaRegStickyNote,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useAuth } from "../../../Context/AuthContext";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useTranslation } from "react-i18next";

const PermissionRequest = () => {
  const { employee } = useAuth();
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    reason: "",
  });
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (employee?.employee_id) fetchRequests();
    // eslint-disable-next-line
  }, [employee?.employee_id]);

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await permissionService.getMyRequests(employee.employee_id);
      setRequests(data);
    } catch (err) {
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDateError("");

    // Date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(form.start_date);
    const end = new Date(form.end_date);

    if (isNaN(start) || isNaN(end)) {
      setDateError("Add the exact date.");
      setLoading(false);
      return;
    }
    if (start < today) {
      setDateError("Start date must be today or later.");
      setLoading(false);
      return;
    }
    if (end < start) {
      setDateError("End date must be the same as or after the start date.");
      setLoading(false);
      return;
    }

    try {
      await permissionService.createRequest({
        ...form,
        employee_id: employee.employee_id,
      });
      setMessage("Request submitted!");
      setForm({
        start_date: "",
        end_date: "",
        start_time: "",
        end_time: "",
        reason: "",
      });
      fetchRequests();
    } catch (err) {
      setError("Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status) => {
    if (status === "accepted")
      return (
        <span className="badge bg-success">
          <FaCheckCircle /> {t("Accepted")}
        </span>
      );
    if (status === "rejected")
      return (
        <span className="badge bg-danger">
          <FaTimesCircle /> {t("Rejected")}
        </span>
      );
    return <span className="badge bg-warning text-dark">{t("Pending")}</span>;
  };

  // Helper to format date as yyyy-mm-dd
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    if (typeof dateString === "string") return dateString.slice(0, 10);
    if (dateString instanceof Date)
      return dateString.toISOString().slice(0, 10);
    return "-";
  };

  // Helper to format time as HH:mm (24-hour)
  const formatTime = (timeString) => {
    if (!timeString) return "-";
    if (typeof timeString === "string" && timeString.length >= 5)
      return timeString.slice(0, 5);
    return "-";
  };

  // Generate 30-minute interval time options from 08:00 to 18:30
  const timeOptions = [];
  for (let h = 8; h < 18; h++) {
    timeOptions.push((h < 10 ? `0${h}` : `${h}`) + ":00");
    timeOptions.push((h < 10 ? `0${h}` : `${h}`) + ":30");
  }
  timeOptions.push("18:00");
  timeOptions.push("18:30");

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <FaRegStickyNote className="me-2" />
              <h4 className="mb-0">{t("Request Time Off / Permission")}</h4>
            </div>
            <div className="card-body">
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              {dateError && (
                <div style={{ color: "red", marginBottom: 8, fontWeight: 500 }}>
                  {dateError}
                </div>
              )}
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="row g-2 align-items-end">
                  <div className="col-md-3">
                    <label className="form-label">
                      <FaCalendarAlt className="me-1" /> {t("Start Date")}
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={form.start_date}
                      onChange={handleChange}
                      className="form-control"
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">
                      <FaCalendarAlt className="me-1" /> {t("End Date")}
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={form.end_date}
                      onChange={handleChange}
                      className="form-control"
                      required
                      min={
                        form.start_date ||
                        new Date().toISOString().split("T")[0]
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">
                      <FaClock className="me-1" /> {t("Start Time")}
                    </label>
                    <select
                      name="start_time"
                      value={form.start_time}
                      onChange={handleChange}
                      className="form-control"
                      required={false}
                    >
                      <option value="">--:--</option>
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label className="form-label">
                      <FaClock className="me-1" /> {t("End Time")}
                    </label>
                    <select
                      name="end_time"
                      value={form.end_time}
                      onChange={handleChange}
                      className="form-control"
                      required={false}
                    >
                      <option value="">--:--</option>
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-10 mt-2">
                    <label className="form-label">{t("Reason")}</label>
                    <input
                      type="text"
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      className="form-control"
                      placeholder={t("Reason for time off")}
                      required
                    />
                  </div>
                  <div className="col-md-2 mt-2 d-grid">
                    <button
                      type="submit"
                      className="btn btn-outline-primary w-100 fw-bold py-2"
                      disabled={loading}
                    >
                      {loading ? t("Submitting...") : t("Submit")}
                    </button>
                  </div>
                </div>
              </form>
              <h5 className="mb-3">{t("My Requests")}</h5>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>{t("Start Date")}</th>
                        <th>{t("End Date")}</th>
                        <th>{t("Start")}</th>
                        <th>{t("End")}</th>
                        <th>{t("Reason")}</th>
                        <th>{t("Status")}</th>
                        <th>{t("Response")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requests.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center text-muted">
                            {t("No requests yet.")}
                          </td>
                        </tr>
                      ) : (
                        requests.map((r) => (
                          <tr key={r.id}>
                            <td>{formatDate(r.start_date)}</td>
                            <td>{formatDate(r.end_date)}</td>
                            <td>{formatTime(r.start_time)}</td>
                            <td>{formatTime(r.end_time)}</td>
                            <td>{r.reason}</td>
                            <td>{statusBadge(r.status)}</td>
                            <td>{r.response_message || "-"}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionRequest;
