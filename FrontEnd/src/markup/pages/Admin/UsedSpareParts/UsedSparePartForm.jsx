import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  create,
  update,
  getById,
} from "../../../../services/usedSpareParts.service";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../Context/AuthContext";
import categories from "../../../components/UsedSpareParts/categories";

const UsedSparePartForm = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({
    name_en: "",
    name_it: "",
    category_key: "",
    description_en: "",
    description_it: "",
    price: "",
    image: null,
    part_number: "",
    condition: "",
    compatible_models: "",
    vehicle_type: "",
  });
  const [preview, setPreview] = useState(null);
  const { employee } = useAuth();
  const token = employee?.employee_token;
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getById(id)
        .then((data) => {
          if (!data || data.error) {
            setNotFound(true);
          } else {
            setForm({
              name_en: data.name_en ?? "",
              name_it: data.name_it ?? "",
              category_key: data.category_key ?? "",
              description_en: data.description_en ?? "",
              description_it: data.description_it ?? "",
              price: data.price ?? "",
              image: null,
              part_number: data.part_number ?? "",
              condition: data.condition ?? "",
              compatible_models: data.compatible_models ?? "",
              vehicle_type: data.vehicle_type ?? "",
            });
            setPreview(data.image_url);
          }
        })
        .catch(() => setNotFound(true));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((f) => ({ ...f, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const lang = i18n.language.startsWith("it") ? "it" : "en";
      const data = {
        price: form.price,
        category_key: form.category_key,
        part_number: form.part_number,
        condition: form.condition,
        compatible_models: form.compatible_models,
        vehicle_type: form.vehicle_type,
      };
      if (form.image) {
        data.image = form.image;
      }
      if (lang === "en") {
        data.name_en = form.name_en;
        data.description_en = form.description_en;
      } else {
        data.name_it = form.name_it;
        data.description_it = form.description_it;
      }
      if (isEdit) {
        await update(id, data, token);
      } else {
        await create(data, token);
      }
      navigate("/admin/used-spare-parts");
    } catch (err) {
      // handle error
    }
  };

  const lang = i18n.language.startsWith("it") ? "it" : "en";

  if (notFound) {
    return (
      <div
        style={{
          padding: 40,
          color: "#d32f2f",
          fontWeight: 700,
          textAlign: "center",
        }}
      >
        {t("Product not found.")}
        <br />
        <button
          className="btn btn-secondary"
          style={{ marginTop: 24 }}
          onClick={() => navigate("/admin/used-spare-parts")}
        >
          {t("Back to list")}
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "80vh",
        background: "#f7f9fc",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 2px 16px rgba(26,35,126,0.08)",
          padding: "36px 32px",
          minWidth: 380,
          maxWidth: 480,
          width: "100%",
        }}
      >
        <h2
          style={{
            fontWeight: 700,
            color: "#1a237e",
            fontSize: 28,
            marginBottom: 18,
          }}
        >
          {isEdit ? t("Edit Used Spare Part") : t("Add Used Spare Part")}
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>
              {t("Image")}
            </label>
            <input
              type="file"
              name="image"
              className="form-control"
              accept="image/*"
              onChange={handleChange}
            />
            <small
              className="form-text text-muted"
              style={{ marginBottom: 4, display: "block" }}
            >
              {t("Leave blank to keep the current image.")}
            </small>
            {preview && typeof preview === "string" && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>
                  {t("Current Image")}
                </div>
                <img
                  src={
                    preview.startsWith("http")
                      ? preview
                      : `${import.meta.env.VITE_BACKEND_URL}${preview}`
                  }
                  alt="preview"
                  style={{
                    width: 120,
                    borderRadius: 8,
                    boxShadow: "0 1px 4px #aaa",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
          <div className="mb-3" style={{ position: "relative" }}>
            <label className="form-label" style={{ fontWeight: 500 }}>
              {t("Category")}
            </label>
            <select
              name="category_key"
              className="form-control"
              value={form.category_key}
              onChange={handleChange}
              required
              style={{
                height: 48,
                fontSize: 17,
                fontWeight: 500,
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                background: `url('data:image/svg+xml;utf8,<svg fill="%23333" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>') no-repeat right 14px center/22px 22px, #fff`,
                paddingRight: 40,
                border: "1px solid #ced4da",
              }}
            >
              <option value="">{t("Select category")}</option>
              {categories.map((cat) => (
                <option key={cat.key} value={cat.key}>
                  {lang === "it" ? cat.name_it : cat.name_en}
                </option>
              ))}
            </select>
          </div>
          {lang === "en" ? (
            <>
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 500 }}>
                  {t("Name")}
                </label>
                <input
                  type="text"
                  name="name_en"
                  className="form-control"
                  value={form.name_en}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 500 }}>
                  {t("Description")}
                </label>
                <textarea
                  name="description_en"
                  className="form-control"
                  value={form.description_en}
                  onChange={handleChange}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 500 }}>
                  {t("Name")}
                </label>
                <input
                  type="text"
                  name="name_it"
                  className="form-control"
                  value={form.name_it}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontWeight: 500 }}>
                  {t("Description")}
                </label>
                <textarea
                  name="description_it"
                  className="form-control"
                  value={form.description_it}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>
              {t("Price")}
            </label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>
              Part Number (OEM)
            </label>
            <input
              type="text"
              name="part_number"
              className="form-control"
              value={form.part_number}
              onChange={handleChange}
              placeholder="e.g. 1234567, optional"
            />
            <small className="form-text text-muted">
              For original equipment reference (optional)
            </small>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>
              Condition
            </label>
            <select
              name="condition"
              className="form-control"
              value={form.condition}
              onChange={handleChange}
            >
              <option value="">Select condition (optional)</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">Refurbished</option>
            </select>
            <small className="form-text text-muted">
              Specify the part's condition (optional)
            </small>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>
              Compatible Models
            </label>
            <input
              type="text"
              name="compatible_models"
              className="form-control"
              value={form.compatible_models}
              onChange={handleChange}
              placeholder="e.g. R420, G440, P280 (comma separated, optional)"
            />
            <small className="form-text text-muted">
              List compatible models, separated by commas (optional)
            </small>
          </div>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: 500 }}>
              Vehicle Type
            </label>
            <select
              name="vehicle_type"
              className="form-control"
              value={form.vehicle_type}
              onChange={handleChange}
              required
            >
              <option value="">Select vehicle type</option>
              <option value="SCANIA">SCANIA</option>
              <option value="ISUZU">ISUZU</option>
              <option value="NISSAN">NISSAN</option>
            </select>
            <small className="form-text text-muted">
              Choose the vehicle brand/type
            </small>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
            <button
              type="submit"
              className="btn btn-success"
              style={{
                fontWeight: 600,
                fontSize: 17,
                padding: "8px 32px",
                borderRadius: 8,
              }}
            >
              {t("Save")}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              style={{
                fontWeight: 600,
                fontSize: 17,
                padding: "8px 32px",
                borderRadius: 8,
              }}
              onClick={() => navigate("/admin/used-spare-parts")}
            >
              {t("Cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsedSparePartForm;
