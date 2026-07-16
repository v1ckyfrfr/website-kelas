"use client";

export function FloatingSticker({ icon, color = "#ff3d9a", style, delay = 0 }) {
  return (
    <div
      className="floating-sticker"
      style={{
        position: "absolute",
        fontSize: "2rem",
        userSelect: "none",
        pointerEvents: "none",
        color,
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      {icon}
    </div>
  );
}
