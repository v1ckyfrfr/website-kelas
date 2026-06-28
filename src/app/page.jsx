"use client";

import { useState } from "react";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

import { StrukturSection } from "@/components/sections/StrukturSection";
import { PiketSection } from "@/components/sections/PiketSection";
import { GaleriSection } from "@/components/sections/GaleriSection";

export default function Page() {
  const [activeNav, setActiveNav] = useState("Beranda");

  return (
    <main>
      <Navbar active={activeNav} setActive={setActiveNav} />
      <Hero />
      <StrukturSection />
      <PiketSection />
      <GaleriSection />
      <Footer />
    </main>
  );
}