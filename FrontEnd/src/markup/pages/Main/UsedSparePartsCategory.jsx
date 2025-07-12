import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import categories from "../../components/UsedSpareParts/categories";
import CategorySidebar from "../../components/UsedSpareParts/CategorySidebar";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

const BOOKMARK_KEY = "bookmarkedSpareParts";
function getBookmarkedIds() {
  return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
}
function setBookmarkedIds(ids) {
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(ids));
}
function isBookmarked(id) {
  return getBookmarkedIds().includes(id);
}
function toggleBookmark(id) {
  const ids = getBookmarkedIds();
  let newIds;
  if (ids.includes(id)) {
    newIds = ids.filter((_id) => _id !== id);
  } else {
    newIds = [...ids, id];
  }
  setBookmarkedIds(newIds);
}

const UsedSparePartsCategory = () => {
  const { categoryKey } = useParams();
  const { t, i18n } = useTranslation();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const lang = i18n.language.startsWith("it") ? "it" : "en";
  const [forceUpdate, setForceUpdate] = useState(0);

  const category = categories.find((c) => c.key === categoryKey);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/used-spare-parts`)
      .then((res) => res.json())
      .then((data) =>
        setParts(data.filter((p) => p.category_key === categoryKey))
      )
      .catch(() => setParts([]))
      .finally(() => setLoading(false));
  }, [categoryKey, lang]);

  const filterProducts = (products) => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.trim().toLowerCase();
    return products.filter(
      (p) =>
        (p.name_en && p.name_en.toLowerCase().includes(term)) ||
        (p.name_it && p.name_it.toLowerCase().includes(term)) ||
        (p.description_en && p.description_en.toLowerCase().includes(term)) ||
        (p.description_it && p.description_it.toLowerCase().includes(term)) ||
        (p.sku && p.sku.toLowerCase().includes(term))
    );
  };

  const filteredParts = filterProducts(parts);

  if (!category)
    return (
      <div style={{ padding: 40, color: "#d32f2f", fontWeight: 700 }}>
        {t("Category not found.")}
      </div>
    );

  return (
    <section
      style={{ background: "#f7f9fc", minHeight: "80vh", padding: "48px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
        <button
          onClick={() => navigate("/used-spare-parts")}
          style={{
            marginBottom: 24,
            background: "none",
            border: "1.5px solid #1a237e",
            color: "#1a237e",
            borderRadius: 8,
            padding: "8px 22px",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {t("Back to categories")}
        </button>
        <div style={{ display: "flex", gap: 32 }}>
          <CategorySidebar
            activeCategoryKey={categoryKey}
            onCategorySelect={(key) =>
              navigate(`/used-spare-parts/category/${key}`)
            }
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                marginBottom: 32,
              }}
            >
              <img
                src={category.image}
                alt={lang === "it" ? category.name_it : category.name_en}
                style={{
                  width: 70,
                  height: 70,
                  objectFit: "contain",
                  borderRadius: 12,
                  background: "#fff",
                  boxShadow: "0 1px 4px #aaa1",
                }}
              />
              <h2 style={{ fontWeight: 700, color: "#1a237e", fontSize: 32 }}>
                {lang === "it" ? category.name_it : category.name_en}
              </h2>
            </div>
            <div
              style={{
                marginBottom: 32,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <input
                type="text"
                placeholder={t("Search product by name, description, or SKU")}
                style={{
                  fontSize: 18,
                  padding: "8px 16px",
                  borderRadius: 24,
                  border: "1.5px solid #d3d7e7",
                  width: 320,
                  outline: "none",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: 22,
                    color: "#1a237e",
                    cursor: "pointer",
                  }}
                  title={t("Clear")}
                >
                  &times;
                </button>
              )}
              <span
                style={{
                  fontSize: 22,
                  color: "#aaa",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1a237e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="17" y1="17" x2="21" y2="21" />
                </svg>
              </span>
            </div>
            {loading ? (
              <div style={{ textAlign: "center", color: "#888", fontSize: 20 }}>
                {t("Loading...")}
              </div>
            ) : filteredParts.length === 0 ? (
              <div style={{ textAlign: "center", color: "#888", fontSize: 20 }}>
                {t("No products found for this category.")}
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                  gap: 32,
                }}
              >
                {filteredParts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() =>
                      navigate(`/used-spare-parts/product/${product.id}`)
                    }
                    style={{
                      background: "#fff",
                      borderRadius: 14,
                      boxShadow: "0 2px 16px rgba(26,35,126,0.08)",
                      padding: 24,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minHeight: 420,
                      cursor: "pointer",
                      transition: "box-shadow 0.18s",
                      border: "2px solid #fff",
                      position: "relative",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(product.id);
                        setForceUpdate((f) => f + 1);
                      }}
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        zIndex: 2,
                        padding: 0,
                      }}
                      title={
                        isBookmarked(product.id)
                          ? t("Remove bookmark")
                          : t("Add bookmark")
                      }
                    >
                      {isBookmarked(product.id) ? (
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="#1a237e"
                          stroke="#1a237e"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      ) : (
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
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      )}
                    </button>
                    <img
                      src={
                        product.image_url
                          ? `${BACKEND_URL}${product.image_url}`
                          : "/no-image.png"
                      }
                      alt={lang === "it" ? product.name_it : product.name_en}
                      style={{
                        width: 180,
                        height: 180,
                        objectFit: "cover",
                        borderRadius: 10,
                        marginBottom: 18,
                        boxShadow: "0 1px 4px #aaa",
                      }}
                    />
                    <h3
                      style={{
                        fontWeight: 600,
                        fontSize: 22,
                        color: "#1a237e",
                        marginBottom: 6,
                      }}
                    >
                      {lang === "it" ? product.name_it : product.name_en}
                    </h3>
                    <div
                      style={{
                        color: "#666",
                        fontSize: 15,
                        marginBottom: 12,
                        textAlign: "center",
                        minHeight: 48,
                      }}
                    >
                      {lang === "it"
                        ? product.description_it
                        : product.description_en}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#388e3c",
                        fontSize: 20,
                        marginTop: "auto",
                      }}
                    >
                      € {product.price}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsedSparePartsCategory;
