"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { NAV_LINKS } from "@/data/navlinks";
import { scrollToSection } from "@/utils/scrollToSection";
import { PinkButton } from "@/components/PinkButton";
import { useDarkMode } from "@/hooks/useDarkMode";
import { FaSun, FaMoon } from "react-icons/fa";
import Image from "next/image";

const MotionImage = motion.create(Image);

export function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();

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
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="navbar"
        style={{
          background: scrolled ? "var(--nav-bg-scroll)" : "var(--nav-bg)",
          boxShadow: scrolled ? "0 2px 20px rgba(255,110,180,0.15)" : "none",
        }}
      >
        <div className="nav-inner">
          <button
            className="brand"
            onClick={() => handleNavClick(NAV_LINKS[0])}
          >
            <MotionImage
              whileHover={{
                rotate: -10,
                scale: 1.08,
              }}
              src="/logo.png"
              alt="logo DKV"
              width={40}
              height={40}
              className="brand-logo-image"
            />
            <span>DKV 1ST GENERATION</span>
          </button>

          <div className="desktop-nav">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className={
                  active === link.label ? "nav-link active" : "nav-link"
                }
              >
                {link.label}
              </button>
            ))}

            {/* Dark Mode Toggle — Desktop */}
            <motion.button
              whileTap={{ scale: 0.88, rotate: 15 }}
              className="dark-mode-toggle"
              onClick={toggle}
              aria-label={
                isDark ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"
              }
              title={isDark ? "Mode Terang" : "Mode Gelap"}
            >
              {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
            </motion.button>

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

      {/* Floating Dark Mode Button — Mobile */}
      <motion.button
        className="dark-mode-float"
        onClick={toggle}
        aria-label={isDark ? "Mode Terang" : "Mode Gelap"}
        whileTap={{ scale: 0.88 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
      </motion.button>
    </>
  );
}
