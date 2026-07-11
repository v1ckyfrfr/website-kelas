"use client";

import { motion } from "framer-motion";

export function FloatingSticker({ icon, color = "#ff3d9a", style, delay = 0 }) {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
        rotate: [0, 5, -4, 0],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        fontSize: "2rem",
        userSelect: "none",
        pointerEvents: "none",
        color,
        ...style,
      }}
    >
      {icon}
    </motion.div>
  );
}
