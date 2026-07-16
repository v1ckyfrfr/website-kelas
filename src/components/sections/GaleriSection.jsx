"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Reveal } from "@/components/Reveal";

import { GALLERY_ITEMS, GALLERY_COLORS } from "@/data/gallery";
import { supabase } from "@/lib/supabase";

export function GaleriSection() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [gallery, setGallery] = useState(
    GALLERY_ITEMS.map((url) => ({ url, caption: "" })),
  );

  const totalSlides = gallery.length;

  useEffect(() => {
    // Fetch gallery from Supabase (live data from admin)
    supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setGallery(data);
        }
      });
  }, []);

  useEffect(() => {
    if (totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;

        if (nextSlide >= totalSlides) {
          return 0;
        }

        return nextSlide;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  useEffect(() => {
    if (!sliderRef.current) return;

    const card = sliderRef.current.querySelector(".gallery-card");
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 12;
    const scrollAmount = currentSlide * (cardWidth + gap);

    sliderRef.current.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, [currentSlide]);

  const goPrev = () => {
    setCurrentSlide((prev) => {
      if (prev === 0) {
        return totalSlides - 1;
      }

      return prev - 1;
    });
  };

  const goNext = () => {
    setCurrentSlide((prev) => {
      if (prev + 1 >= totalSlides) {
        return 0;
      }

      return prev + 1;
    });
  };

  return (
    <section id="galeri" className="section white-section">
      <Reveal>
        <div className="gallery-panel">
          <div className="gallery-head">
            <h2>✦ GALERI KEGIATAN</h2>
          </div>

          <div className="gallery-slider">
            {totalSlides > 1 && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={goPrev}
                className="slider-btn"
                aria-label="Foto sebelumnya"
              >
                ‹
              </motion.button>
            )}

            <div className="slider-window" ref={sliderRef}>
              <div className="slider-track">
                {gallery.map((item, index) => {
                  const imgSrc = typeof item === "string" ? item : item.url;
                  const caption =
                    typeof item === "object" ? item.caption : null;
                  return (
                    <motion.div
                      key={`${imgSrc}-${index}`}
                      whileHover={{
                        scale: 1.05,
                        rotate: index % 2 === 0 ? -1 : 1,
                      }}
                      whileTap={{ scale: 0.97 }}
                      className="gallery-card"
                      style={{
                        background:
                          GALLERY_COLORS[index % GALLERY_COLORS.length],
                      }}
                    >
                      <Image
                        src={imgSrc}
                        alt={caption || `Galeri kegiatan ${index + 1}`}
                        width={800}
                        height={500}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "16px",
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {totalSlides > 1 && (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={goNext}
                className="slider-btn"
                aria-label="Foto berikutnya"
              >
                ›
              </motion.button>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
