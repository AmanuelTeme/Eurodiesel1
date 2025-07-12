import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getAll, remove } from "../../../../services/usedSpareParts.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

const UsedSparePartsList = () => {
  const { t, i18n } = useTranslation();
  const [parts, setParts] = useState([]);
  const { employee } = useAuth();
  const token = employee?.employee_token;
  const navigate = useNavigate();
  const lang = i18n.language.startsWith("it") ? "it" : "en";
  const [addBtnHover, setAddBtnHover] = useState(false);

  useEffect(() => {
    getAll().then(setParts);
  }, []);

  console.log(parts); // Debug: log all parts and their image_url
  const safeParts = Array.isArray(parts) ? parts : [];

  const handleDelete = async (id) => {
    if (window.confirm(t("Are you sure you want to delete this part?"))) {
      await remove(id, token);
      setParts((parts) => parts.filter((p) => p.id !== id));
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        background: "#f7f9fc",
        padding: "40px 0",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1100 }}>
        <div style={{ marginBottom: 24 }}>
          <h2
            style={{
              fontWeight: 700,
              color: "#1a237e",
              fontSize: 28,
              marginBottom: 6,
            }}
          >
            {t("Used Spare Parts")}
          </h2>
          <p style={{ color: "#444", marginBottom: 0 }}>
            {t(
              "Manage the used spare parts inventory for Scania trucks. Add, edit, or remove parts as needed."
            )}
          </p>
        </div>
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 2px 16px rgba(26,35,126,0.08)",
            padding: "32px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 18,
            }}
          >
            <button
              style={{
                fontWeight: 700,
                fontSize: 17,
                padding: "12px 32px",
                borderRadius: 10,
                color: addBtnHover ? "#fff" : "#1a237e",
                background: addBtnHover ? "#007BFF" : "#fff",
                border: "2px solid #1a237e",
                boxShadow: "0 2px 8px #1a237e22",
                transition: "background 0.18s, color 0.18s",
              }}
              onMouseEnter={() => setAddBtnHover(true)}
              onMouseLeave={() => setAddBtnHover(false)}
              onClick={() => navigate("/admin/used-spare-parts/new")}
            >
              {t("Add Used Spare Part")}
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table
              className="table table-hover"
              style={{ minWidth: 800, width: "100%" }}
            >
              <thead>
                <tr style={{ background: "#f1f3fa" }}>
                  <th>{t("Image")}</th>
                  <th>{t("Name")}</th>
                  <th>{t("Category")}</th>
                  <th>{t("Description")}</th>
                  <th>{t("Price")}</th>
                  <th style={{ textAlign: "center" }}>{t("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {safeParts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{
                        textAlign: "center",
                        color: "#888",
                        padding: 32,
                      }}
                    >
                      {t("No used spare parts found.")}
                    </td>
                  </tr>
                ) : (
                  safeParts.map((part) => (
                    <tr key={part.id}>
                      <td>
                        {part.image_url && (
                          <img
                            src={`${BACKEND_URL}${part.image_url}`}
                            alt="part"
                            style={{
                              width: 60,
                              borderRadius: 8,
                              boxShadow: "0 1px 4px #aaa",
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://via.placeholder.com/60x60?text=No+Image";
                            }}
                          />
                        )}
                      </td>
                      <td>{lang === "it" ? part.name_it : part.name_en}</td>
                      <td>
                        {lang === "it" ? part.category_it : part.category_en}
                      </td>
                      <td
                        style={{
                          maxWidth: 220,
                          whiteSpace: "pre-line",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {lang === "it"
                          ? part.description_it
                          : part.description_en}
                      </td>
                      <td>€ {part.price}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          style={{ minWidth: 60 }}
                          onClick={() =>
                            navigate(`/admin/used-spare-parts/edit/${part.id}`)
                          }
                        >
                          {t("Edit")}
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          style={{ minWidth: 60 }}
                          onClick={() => handleDelete(part.id)}
                        >
                          {t("Delete")}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedSparePartsList;
