import { title } from "process";
import "./globals.css";

export const metadata = {
  title: "Website Kelas DKV",
  description: "DKV 1ST Generation",
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
      <body>{children}</body>
    </html>
  );
}