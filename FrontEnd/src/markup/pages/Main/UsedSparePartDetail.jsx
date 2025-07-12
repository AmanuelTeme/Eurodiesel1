import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import categories from "../../components/UsedSpareParts/categories";
import { isFavorite, toggleFavorite } from "../../../utils/favorites";
import CategorySidebar from "../../components/UsedSpareParts/CategorySidebar";
import SparePartDetail from "../../components/UsedSpareParts/SparePartDetail";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

const UsedSparePartDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const lang = i18n.language.startsWith("it") ? "it" : "en";

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/used-spare-parts/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id, lang]);

  if (loading)
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          color: "#888",
          fontSize: 20,
        }}
      >
        {t("Loading...")}
      </div>
    );
  if (!product)
    return (
      <div style={{ padding: 40, color: "#d32f2f", fontWeight: 700 }}>
        {t("Product not found.")}
      </div>
    );

  // Map product fields for SparePartDetail
  const mappedProduct = {
    ...product,
    name:
      lang === "it"
        ? product.name_it || product.name_en
        : product.name_en || product.name_it,
    image: product.image_url
      ? `${BACKEND_URL}${product.image_url}`
      : "/no-image.png",
    price: product.price,
    oem: product.part_number,
    condition: product.condition,
    vehicleType: product.vehicle_type,
    added: product.created_at
      ? new Date(product.created_at).toLocaleDateString()
      : undefined,
    sellerPhone: "+393512821523",
    // Add more fields as needed
  };

  return (
    <section
      style={{ background: "#f7f9fc", minHeight: "80vh", padding: "48px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "flex", gap: 32 }}>
          <CategorySidebar
            activeCategoryKey={product.category_key}
            onCategorySelect={(key) =>
              navigate(`/used-spare-parts/category/${key}`)
            }
          />
          <div style={{ flex: 1 }}>
            <button
              onClick={() =>
                navigate(`/used-spare-parts/category/${product.category_key}`)
              }
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
              {t("Back to category")}
            </button>
            <SparePartDetail part={mappedProduct} relatedParts={[]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsedSparePartDetail;
