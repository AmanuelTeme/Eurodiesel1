import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookmarkedItems } from "../../components/UsedSpareParts/SparePartDetail";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";

const BookmarkedSpareParts = () => {
  const [allParts, setAllParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/used-spare-parts`)
      .then((res) => res.json())
      .then((data) => setAllParts(data))
      .catch(() => setAllParts([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setBookmarked(getBookmarkedItems(allParts));
  }, [allParts]);

  return (
    <section
      style={{ background: "#f7f9fc", minHeight: "80vh", padding: "48px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
        <h2
          style={{
            fontWeight: 700,
            color: "#1a237e",
            fontSize: 32,
            marginBottom: 24,
          }}
        >
          Bookmarked Items
        </h2>
        {loading ? (
          <div
            style={{
              color: "#888",
              fontSize: 20,
              textAlign: "center",
              marginTop: 40,
            }}
          >
            Loading...
          </div>
        ) : bookmarked.length === 0 ? (
          <div
            style={{
              color: "#888",
              fontSize: 20,
              textAlign: "center",
              marginTop: 40,
            }}
          >
            No bookmarked items yet.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 32,
            }}
          >
            {bookmarked.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  boxShadow: "0 2px 16px rgba(26,35,126,0.08)",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: 320,
                  position: "relative",
                  cursor: "pointer",
                  transition: "box-shadow 0.18s",
                  border: "2px solid #fff",
                }}
              >
                <img
                  src={
                    item.image_url
                      ? `${BACKEND_URL}${item.image_url}`
                      : "/no-image.png"
                  }
                  alt={item.name}
                  style={{
                    width: 160,
                    height: 160,
                    objectFit: "cover",
                    borderRadius: 10,
                    marginBottom: 18,
                    boxShadow: "0 1px 4px #aaa",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(`/used-spare-parts/product/${item.id}`)
                  }
                />
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    color: "#1a237e",
                    marginBottom: 6,
                  }}
                >
                  {item.name_en || item.name_it}
                </h3>
                <div
                  style={{
                    fontWeight: 700,
                    color: "#388e3c",
                    fontSize: 18,
                    marginTop: "auto",
                  }}
                >
                  € {item.price}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookmarkedSpareParts;
