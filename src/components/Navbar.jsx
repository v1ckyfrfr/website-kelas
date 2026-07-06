import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { NAV_LINKS } from "@/data/navlinks";
import { scrollToSection } from "@/utils/scrollToSection";
import { PinkButton } from "@/components/PinkButton";

export function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (link) => {
    setActive(link.label);
    setMobileOpen(false);
    scrollToSection(link.target);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="navbar"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.96)"
          : "rgba(255,255,255,0.78)",
        boxShadow: scrolled ? "0 2px 20px rgba(255,110,180,0.15)" : "none",
      }}
    >
      <div className="nav-inner">
        <button className="brand" onClick={() => handleNavClick(NAV_LINKS[0])}>
          <motion.img
            whileHover={{
              rotate: -10,
              scalei: 1.08,
            }}
            src="/logo.png"
            alt="logo DKV"
            className="brand-logo-image"
          />
          <span>DKV 1ST GENERATION</span>
        </button>

        <div className="desktop-nav">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link)}
              className={active === link.label ? "nav-link active" : "nav-link"}
            >
              {link.label}
            </button>
          ))}

          <PinkButton small onClick={() => scrollToSection("tentang")}>
            Kontak →
          </PinkButton>
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? "×" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mobile-menu"
        >
          {NAV_LINKS.map((link) => (
            <button key={link.label} onClick={() => handleNavClick(link)}>
              {link.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
