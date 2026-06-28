import { motion } from "framer-motion";

export function StructureNode({ node }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.04,
        background: "linear-gradient(135deg,#ff6eb4,#ff3d9a)",
        color: "#fff",
        boxShadow: "0 8px 24px rgba(255,110,180,0.4)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="node-box"
    >
      <div>{node.label}</div>
      <strong>{node.name}</strong>
    </motion.div>
  );
}