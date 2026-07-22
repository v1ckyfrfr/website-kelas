import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { StrukturSection, PiketSection, GaleriSection } from "./lazy-sections";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StrukturSection />
      <PiketSection />
      <GaleriSection />
      <Footer />
    </main>
  );
}
