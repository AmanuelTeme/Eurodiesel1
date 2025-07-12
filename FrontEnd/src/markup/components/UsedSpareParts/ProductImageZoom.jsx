import React, { useRef, useState } from "react";

const ZOOM_BOX_SIZE = 220;
const ZOOM_SCALE = 2.2;

const isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

const ProductImageZoom = ({
  src,
  alt,
  width = 320,
  height = 320,
  style,
  onZoomChange,
}) => {
  const imgRef = useRef();
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: width / 2, y: height / 2 });

  function handleMouseMove(e) {
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setZoomPos({ x, y });
    if (onZoomChange) onZoomChange(true, { x, y });
  }

  function handleMouseEnter() {
    setShowZoom(true);
    if (onZoomChange) onZoomChange(true, zoomPos);
  }

  function handleMouseLeave() {
    setShowZoom(false);
    if (onZoomChange) onZoomChange(false, zoomPos);
  }

  // Calculate background position for zoom box
  const bgX = ((zoomPos.x / width) * 100).toFixed(2);
  const bgY = ((zoomPos.y / height) * 100).toFixed(2);

  // Hide zoom on mobile/touch devices
  if (isTouchDevice()) {
    return (
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          width,
          height,
          objectFit: "cover",
          borderRadius: 14,
          boxShadow: "0 1px 8px #aaa",
          display: "block",
        }}
      />
    );
  }

  // Lens overlay size
  const lensSize = 60;
  const lensLeft = Math.max(
    0,
    Math.min(zoomPos.x - lensSize / 2, width - lensSize)
  );
  const lensTop = Math.max(
    0,
    Math.min(zoomPos.y - lensSize / 2, height - lensSize)
  );

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        cursor: "zoom-in",
        ...style,
      }}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          width,
          height,
          objectFit: "cover",
          borderRadius: 14,
          boxShadow: "0 1px 8px #aaa",
          display: "block",
        }}
        draggable={false}
      />
      {showZoom && (
        <div
          style={{
            position: "absolute",
            left: lensLeft,
            top: lensTop,
            width: lensSize,
            height: lensSize,
            background: "rgba(30, 64, 175, 0.18)",
            border: "2px solid #1a237e",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 3,
            boxShadow: "0 2px 8px #1a237e22",
          }}
        />
      )}
    </div>
  );
};

export default ProductImageZoom;
