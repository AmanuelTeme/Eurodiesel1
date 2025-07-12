import React, { useState, useEffect } from "react";
import styles from "./SparePartDetail.module.css";
import ProductImageZoom from "./ProductImageZoom";
// Placeholder imports for subcomponents (to be created)
// import Breadcrumbs from "./Breadcrumbs";
// import ImageGallery from "./ImageGallery";
// import SpecificationsTable from "./SpecificationsTable";
// import StockBadge from "./StockBadge";
// import FavoriteButton from "./FavoriteButton";
// import RelatedProducts from "./RelatedProducts";
// import ReviewsSection from "./ReviewsSection";
// import ContactSeller from "./ContactSeller";

// If you need Bootstrap layout, use it only on a wrapper outside this component.
// Do NOT use Bootstrap classes like 'card', 'row', 'img', etc. on any element here.

const ZOOM_BOX_SIZE = 320;
const ZOOM_SCALE = 2.2;

// Bookmark helpers
const BOOKMARK_KEY = "bookmarkedSpareParts";
function getBookmarkedIds() {
  return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
}
function setBookmarkedIds(ids) {
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(ids));
}
export function getBookmarkedItems(allItems) {
  const ids = getBookmarkedIds();
  return allItems.filter((item) => ids.includes(item.id));
}

const SparePartDetail = ({ part }) => {
  const [zoomData, setZoomData] = useState({
    showZoom: false,
    zoomPos: { x: 0, y: 0 },
  });
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const ids = getBookmarkedIds();
    setBookmarked(ids.includes(part.id));
  }, [part.id]);

  const handleZoomChange = (showZoom, zoomPos) => {
    setZoomData({ showZoom, zoomPos });
  };

  const handleBookmark = () => {
    const ids = getBookmarkedIds();
    let newIds;
    if (ids.includes(part.id)) {
      newIds = ids.filter((id) => id !== part.id);
      setBookmarked(false);
    } else {
      newIds = [...ids, part.id];
      setBookmarked(true);
    }
    setBookmarkedIds(newIds);
  };

  const width = 320;
  const height = 320;
  const bgX = ((zoomData.zoomPos.x / width) * 100).toFixed(2);
  const bgY = ((zoomData.zoomPos.y / height) * 100).toFixed(2);

  return (
    <div className={styles.sparepartDetailOuter}>
      <div className={styles.sparepartDetailCard}>
        {/* Breadcrumbs */}
        <div className={styles.breadcrumbs}>
          Home &gt; Used Spare Parts &gt; <b>{part?.name || "Part"}</b>
        </div>
        {/* Top row: image and zoom preview */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 24,
            flexWrap: "nowrap",
            minWidth: width * 2 + 40,
            overflowX: "auto",
            marginBottom: 32,
          }}
        >
          <ProductImageZoom
            src={part?.image || "/no-image.png"}
            alt={part?.name}
            width={width}
            height={height}
            onZoomChange={handleZoomChange}
          />
          {/* Zoom preview window */}
          <div
            style={{
              width: width,
              height: height,
              border: "2px solid #1a237e",
              borderRadius: 12,
              background: "#fff",
              overflow: "hidden",
              boxShadow: "0 2px 12px #1a237e22",
              backgroundImage: `url('${part?.image || "/no-image.png"}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${width * ZOOM_SCALE}px ${
                height * ZOOM_SCALE
              }px`,
              backgroundPosition: `${bgX}% ${bgY}%`,
              marginTop: 0,
              marginLeft: 0,
              transition: "background-position 0.08s cubic-bezier(0.4,0,0.2,1)",
              display: zoomData.showZoom ? "block" : "none",
            }}
          />
        </div>
        {/* Info section below */}
        <div className={styles.infoSection} style={{ marginTop: 0 }}>
          <div className={styles.infoHeader}>
            <h2>{part?.name || "Spare Part Name"}</h2>
            <button
              className={styles.bookmarkBtn}
              title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
              onClick={handleBookmark}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginLeft: 8,
              }}
            >
              {/* SVG Bookmark icon */}
              {bookmarked ? (
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
          <div className={styles.badges}>
            <span className={styles.badgeStock}>In Stock</span>
          </div>
          <div className={styles.price}>€ {part?.price || "0.00"}</div>
          <table className={styles.specTable}>
            <tbody>
              {part?.oem && (
                <tr>
                  <td>Part Number (OEM):</td>
                  <td>{part.oem}</td>
                </tr>
              )}
              {part?.condition && (
                <tr>
                  <td>Condition:</td>
                  <td>{part.condition}</td>
                </tr>
              )}
              {part?.vehicleType && (
                <tr>
                  <td>Vehicle Type:</td>
                  <td>{part.vehicleType}</td>
                </tr>
              )}
              {part?.added && (
                <tr>
                  <td>Added:</td>
                  <td>{part.added}</td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Description moved to the bottom */}
          {part?.description && (
            <div style={{ margin: "18px 0", color: "#444", fontSize: 17 }}>
              {part.description}
            </div>
          )}
          <div className={styles.contactButtonWrapper}>
            <button className={styles.contactButton}>
              <span className={styles.contactButtonIcon}>&#128222;</span> Call:{" "}
              {part?.sellerPhone || "+393512821523"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SparePartDetail;
