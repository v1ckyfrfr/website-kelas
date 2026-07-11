import { useEffect, useState } from "react";

/**
 * useDarkMode — manages dark mode state
 * Persists to localStorage and syncs with <html class="dark">
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Read saved preference or system preference
    const saved = localStorage.getItem("dkv_dark_mode");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldBeDark = saved !== null ? saved === "true" : systemPrefersDark;

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("dkv_dark_mode", String(next));
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  return { isDark, toggle };
}
