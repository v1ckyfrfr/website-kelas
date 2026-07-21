import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Website Kelas DKV",
  description:
    "DKV 1ST Generation – Website resmi kelas Desain Komunikasi Visual SMK Dharma Karya",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
