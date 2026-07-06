import { motion } from "framer-motion";

export function SectionHeader({
  icon,
  iconColor = "#ff3d9a",
  title,
  btnText,
  onClick,
}) {
  return (
    <div className="section-header">
      <h2>
        <span style={{ color: iconColor, display: "inline-flex" }}>{icon}</span>
        {title}
      </h2>

      {btnText && (
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="dark-pill"
        >
          {btnText} →
        </motion.button>
      )}
    </div>
  );
}
