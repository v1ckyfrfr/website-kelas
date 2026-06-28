import { motion } from "framer-motion";
import { FloatingSticker } from "@/components/FloatingSticker";
import { PinkButton } from "@/components/PinkButton";
import { FaStar, FaPaintBrush, FaRegSun } from "react-icons/fa";

import { GiFlowerEmblem } from "react-icons/gi";

import { scrollToSection } from "@/utils/scrollToSection";

export function Hero() {
  return (
    <section id="beranda" className="hero">
      <div className="blob blob-right" />
      <div className="blob blob-left" />

      <FloatingSticker
        icon={<FaStar />}
        color="#ffc107"
        delay={0}
        style={{ top: "12%", left: "48%" }}
      />
      <FloatingSticker
        icon={<GiFlowerEmblem />}
        color="#ff6eb4"
        delay={0.8}
        style={{ top: "20%", right: "10%" }}
      />
      <FloatingSticker
        icon={<FaRegSun />}
        color="#ff9800"
        delay={1.4}
        style={{ bottom: "25%", left: "42%" }}
      />
      <FloatingSticker
        icon={<FaPaintBrush />}
        color="#7c4dff"
        delay={0.3}
        style={{ top: "70%", right: "10%" }}
      />

      <div className="hero-grid">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="eyebrow"
          >
            <span>☀️</span>
            <span>Desain Komunikasi Visual</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.12 }}
            className="hero-title"
          >
            <span>DKV</span>
            <strong>SMK DHARMA KARYA</strong>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22 }}
            className="hero-desc"
          >
            Kreatif tanpa batas, berproses tanpa henti, menciptakan karya,
            memberikan warna.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32 }}
            className="hero-actions"
          >
            <PinkButton onClick={() => scrollToSection("struktur")}>
              Kenali Kelas Kami →
            </PinkButton>
            <PinkButton outline onClick={() => scrollToSection("project")}>
              Lihat Project
            </PinkButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42 }}
            className="stats"
          >
            {[
              ["13+", "Murid"],
              ["6+", "Project"],
              ["1", "Generasi"],
            ].map(([num, label]) => (
              <div key={label}>
                <b>{num}</b>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: "easeOut" }}
          className="hero-photo-wrap"
        >
          <motion.div
            whileHover={{ rotate: 0, scale: 1.025 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="photo-card"
          >
            <div className="photo-placeholder">
              <div>
                <img
                  src="/gallery/kartini.jpg"
                  alt="Foto Kelas"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div className="checker" />
            </div>

            <div className="photo-caption">WE DESIGN THE FUTURE ✦</div>
          </motion.div>

          <motion.div
            animate={{ rotate: [-6, -3, -6], y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="dkv-badge"
          >
            DKV ★
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
