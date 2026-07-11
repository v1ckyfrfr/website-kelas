import { motion } from "framer-motion";

export function PinkButton({
  children,
  outline = false,
  onClick,
  small = false,
}) {
  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      onClick={onClick}
      style={{
        background: outline
          ? "transparent"
          : "linear-gradient(135deg, #ff6eb4 0%, #ff3d9a 100%)",
        color: outline ? "#ff3d9a" : "#fff",
        border: outline ? "2px solid #ff3d9a" : "none",
        borderRadius: "999px",
        padding: small ? "8px 20px" : "12px 28px",
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 800,
        fontSize: small ? "0.8rem" : "0.95rem",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: outline ? "none" : "0 4px 15px rgba(255,110,180,0.4)",
        letterSpacing: "0.02em",
      }}
    >
      {children}
    </motion.button>
  );
}
