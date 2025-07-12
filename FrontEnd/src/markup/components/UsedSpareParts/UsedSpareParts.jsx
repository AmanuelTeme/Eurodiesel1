import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import categories from "./categories";
import { useNavigate } from "react-router-dom";
import { isFavorite, toggleFavorite } from "../../../utils/favorites";
import { getBookmarkedItems } from "./SparePartDetail";

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

const UsedSpareParts = () => {
  const { t, i18n } = useTranslation();
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const lang = i18n.language.startsWith("it") ? "it" : "en";
  const gridRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [, setForceUpdate] = useState(0);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/used-spare-parts`)
      .then((res) => res.json())
      .then((data) => setParts(data))
      .catch(() => setParts([]))
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [lang]);

  // Get products for a category
  const getProductsForCategory = (catKey) =>
    parts.filter((part) => part.category_key === catKey);

  // Handle hover for floating panel
  const handleCategoryMouseEnter = (catKey, e) => {
    setHoveredCategory(catKey);
  };
  const handleCategoryMouseLeave = () => setHoveredCategory(null);

  // Handle click to open sidebar
  const handleCategoryClick = (catKey) => setSelectedCategory(catKey);
  const handleSidebarClose = () => setSelectedCategory(null);

  // Sidebar products
  const sidebarProducts = selectedCategory
    ? getProductsForCategory(selectedCategory)
    : [];
  const sidebarCategory = selectedCategory
    ? categories.find((c) => c.key === selectedCategory)
    : null;

  // Helper: get 8 most recent products
  const recentProducts = [...parts]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 8);

  // Helper: filter products by search term
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

  const filteredRecentProducts = filterProducts(recentProducts);
  const filteredSidebarProducts = filterProducts(sidebarProducts);

  function handleToggleFavorite(id) {
    toggleFavorite(id);
    setForceUpdate((f) => f + 1);
  }

  const bookmarkedItems = getBookmarkedItems(parts);

  return (
    <section
      style={{
        background: "#f7f9fc",
        minHeight: "80vh",
        padding: "48px 0",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 16px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              color: "#1a237e",
              fontSize: 32,
              marginBottom: 8,
            }}
          >
            {t("Search by categories")}
          </h2>
          <button
            onClick={() => navigate("/bookmarks")}
            style={{
              background: "#1a237e",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 22px",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px #1a237e22",
              marginLeft: 16,
            }}
          >
            Bookmarked Items
          </button>
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
              <line x1="50" y1="50" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>
        {searchTerm && (
          <div style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontWeight: 700,
                color: "#1a237e",
                fontSize: 26,
                marginBottom: 18,
              }}
            >
              {t("Search Results")}
            </h2>
            {filteredRecentProducts.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#888",
                  fontSize: 18,
                  marginTop: 24,
                }}
              >
                {t("No products found for your search.")}
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                  gap: 32,
                }}
              >
                {filteredRecentProducts.map((product) => (
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
                      ":hover": {
                        boxShadow: "0 4px 24px #1a237e22",
                        border: "2px solid #1a237e",
                      },
                      position: "relative",
                    }}
                  >
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
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {!searchTerm && (
          <>
            {/* Category grid */}
            <div
              ref={gridRef}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 28,
              }}
            >
              {categories.map((cat) => (
                <div
                  key={cat.key}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    boxShadow: "0 2px 16px rgba(26,35,126,0.08)",
                    padding: 18,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    border:
                      hoveredCategory === cat.key
                        ? "2.5px solid #1a237e"
                        : "2px solid #fff",
                    transition: "all 0.18s",
                    position: "relative",
                    zIndex: hoveredCategory === cat.key ? 20 : 1,
                  }}
                  onMouseEnter={(e) => handleCategoryMouseEnter(cat.key, e)}
                  onMouseLeave={handleCategoryMouseLeave}
                  onClick={() =>
                    navigate(`/used-spare-parts/category/${cat.key}`)
                  }
                >
                  <img
                    src={cat.image}
                    alt={lang === "it" ? cat.name_it : cat.name_en}
                    style={{
                      width: 130,
                      height: 130,
                      objectFit: "contain",
                      borderRadius: 10,
                      marginBottom: 10,
                      background: "#fff",
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: 17,
                      color: "#1a237e",
                      textAlign: "center",
                      minHeight: 44,
                    }}
                  >
                    {lang === "it" ? cat.name_it : cat.name_en}
                  </span>
                  {/* Floating panel with products */}
                  {hoveredCategory === cat.key &&
                    getProductsForCategory(cat.key).length > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "100%",
                          minWidth: 320,
                          maxWidth: 480,
                          width: "max(100%, 320px)",
                          background: "#fff",
                          borderRadius: 16,
                          boxShadow: "0 8px 32px rgba(26,35,126,0.18)",
                          padding: "22px 28px",
                          zIndex: 100,
                          marginTop: 8,
                        }}
                        onMouseEnter={() => setHoveredCategory(cat.key)}
                        onMouseLeave={handleCategoryMouseLeave}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 20,
                            color: "#1a237e",
                            marginBottom: 12,
                          }}
                        >
                          {lang === "it" ? cat.name_it : cat.name_en}
                        </div>
                        <ul
                          style={{ listStyle: "none", padding: 0, margin: 0 }}
                        >
                          {getProductsForCategory(cat.key).map((product) => (
                            <li
                              key={product.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 14,
                                marginBottom: 10,
                                position: "relative",
                              }}
                            >
                              <img
                                src={
                                  product.image_url
                                    ? `${BACKEND_URL}${product.image_url}`
                                    : "/no-image.png"
                                }
                                alt={product.name_en}
                                style={{
                                  width: 38,
                                  height: 38,
                                  objectFit: "cover",
                                  borderRadius: 6,
                                  background: "#f7f9fc",
                                  boxShadow: "0 1px 4px #aaa1",
                                }}
                              />
                              <span style={{ fontWeight: 500, fontSize: 16 }}>
                                {lang === "it"
                                  ? product.name_it
                                  : product.name_en}
                              </span>
                              <span
                                style={{
                                  fontWeight: 600,
                                  color: "#388e3c",
                                  fontSize: 15,
                                  marginLeft: "auto",
                                }}
                              >
                                € {product.price}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleBookmark(product.id);
                                  setForceUpdate((f) => f + 1);
                                }}
                                style={{
                                  marginLeft: 8,
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  zIndex: 2,
                                  padding: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  position: "static",
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
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              ))}
            </div>
            {/* Recently Added Products */}
            {filteredRecentProducts.length > 0 && !selectedCategory && (
              <div style={{ marginTop: 48 }}>
                <h2
                  style={{
                    fontWeight: 700,
                    color: "#1a237e",
                    fontSize: 26,
                    marginBottom: 18,
                  }}
                >
                  {t("Recently Added Products")}
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                    gap: 32,
                  }}
                >
                  {filteredRecentProducts.map((product) => (
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
                        ":hover": {
                          boxShadow: "0 4px 24px #1a237e22",
                          border: "2px solid #1a237e",
                        },
                        position: "relative",
                      }}
                    >
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
                    </div>
                  ))}
                </div>
                {filteredRecentProducts.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#888",
                      fontSize: 18,
                      marginTop: 24,
                    }}
                  >
                    {t("No products found for your search.")}
                  </div>
                )}
              </div>
            )}
          </>
        )}
        {/* Sidebar and product grid for selected category */}
        {selectedCategory && (
          <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
            {/* Sidebar with all categories */}
            <aside
              style={{
                minWidth: 220,
                maxWidth: 260,
                background: "#fff",
                borderRadius: 14,
                boxShadow: "0 2px 16px rgba(26,35,126,0.08)",
                padding: 24,
                height: "fit-content",
                alignSelf: "flex-start",
                overflowY: "auto",
                maxHeight: "70vh",
                position: "sticky",
                top: 32,
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  color: "#1a237e",
                  fontSize: 20,
                  marginBottom: 18,
                }}
              >
                {t("Categories")}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {categories.map((cat) => (
                  <li key={cat.key} style={{ marginBottom: 8 }}>
                    <button
                      onClick={() => setSelectedCategory(cat.key)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        background:
                          selectedCategory === cat.key ? "#e3e7f7" : "none",
                        color:
                          selectedCategory === cat.key ? "#1a237e" : "#333",
                        fontWeight: selectedCategory === cat.key ? 700 : 500,
                        border: "none",
                        borderRadius: 8,
                        padding: "10px 16px",
                        cursor: "pointer",
                        fontSize: 16,
                        transition: "background 0.18s, color 0.18s",
                      }}
                    >
                      {lang === "it" ? cat.name_it : cat.name_en}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
            {/* Main product grid for selected category */}
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontWeight: 700,
                  color: "#1a237e",
                  fontSize: 28,
                  marginBottom: 18,
                }}
              >
                {categories.find((c) => c.key === selectedCategory)
                  ? lang === "it"
                    ? categories.find((c) => c.key === selectedCategory).name_it
                    : categories.find((c) => c.key === selectedCategory).name_en
                  : ""}{" "}
                {t("Products")}
              </h2>
              {filteredSidebarProducts.length === 0 ? (
                <div
                  style={{ textAlign: "center", color: "#888", fontSize: 20 }}
                >
                  {t("No products found for your search.")}
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
                    gap: 32,
                  }}
                >
                  {filteredSidebarProducts.map((product) => (
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
                        ":hover": {
                          boxShadow: "0 4px 24px #1a237e22",
                          border: "2px solid #1a237e",
                        },
                        position: "relative",
                      }}
                    >
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UsedSpareParts;
