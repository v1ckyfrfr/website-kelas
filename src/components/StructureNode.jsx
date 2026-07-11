"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function StructureNode({ node }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={
        hovered
          ? {
              y: -4,
              scale: 1.04,
              boxShadow: "0 8px 24px rgba(255,110,180,0.4)",
            }
          : { y: 0, scale: 1, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }
      }
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="node-box"
      style={
        hovered
          ? {
              background: "linear-gradient(135deg,#ff6eb4,#ff3d9a)",
              color: "#fff",
              borderColor: "transparent",
            }
          : undefined
      }
    >
      <div>{node.label}</div>
      <strong>{node.name}</strong>
    </motion.div>
  );
}
