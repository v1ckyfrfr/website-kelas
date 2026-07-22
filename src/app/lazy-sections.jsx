"use client";

import dynamic from "next/dynamic";

// Lazy load sections below the fold — hanya diload saat dibutuhkan
export const StrukturSection = dynamic(
  () =>
    import("@/components/sections/StrukturSection").then((m) => ({
      default: m.StrukturSection,
    })),
  { ssr: false },
);

export const PiketSection = dynamic(
  () =>
    import("@/components/sections/PiketSection").then((m) => ({
      default: m.PiketSection,
    })),
  { ssr: false },
);

export const GaleriSection = dynamic(
  () =>
    import("@/components/sections/GaleriSection").then((m) => ({
      default: m.GaleriSection,
    })),
  { ssr: false },
);
