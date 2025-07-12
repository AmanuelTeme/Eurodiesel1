import React from "react";

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.25)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalCardStyle = {
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 8px 32px rgba(60,60,120,0.15)",
  padding: 32,
  minWidth: 340,
  maxWidth: 480,
  maxHeight: "80vh",
  overflowY: "auto",
  position: "relative",
};

const closeBtnStyle = {
  position: "absolute",
  top: 16,
  right: 16,
  background: "none",
  border: "none",
  fontSize: 22,
  cursor: "pointer",
  color: "#1a237e",
};

const itemCardStyle = {
  display: "flex",
  alignItems: "center",
  gap: 16,
  borderBottom: "1px solid #eee",
  padding: "12px 0",
};

const BookmarkedItemsModal = ({ open, onClose, items }) => {
  if (!open) return null;
  return (
    <div style={modalOverlayStyle}>
      <div style={modalCardStyle}>
        <button style={closeBtnStyle} onClick={onClose} title="Close">
          &times;
        </button>
        <h2 style={{ marginTop: 0, color: "#1a237e", fontSize: 24 }}>
          Bookmarked Items
        </h2>
        {items.length === 0 ? (
          <div style={{ color: "#888", fontStyle: "italic", margin: "32px 0" }}>
            No bookmarked items.
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} style={itemCardStyle}>
              <img
                src={item.image || "/no-image.png"}
                alt={item.name}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  borderRadius: 8,
                  border: "1px solid #eee",
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "#1a237e" }}>
                  {item.name}
                </div>
                <div style={{ color: "#27ae60", fontWeight: 500 }}>
                  € {item.price}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookmarkedItemsModal;
