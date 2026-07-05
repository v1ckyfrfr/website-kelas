import {
  FaCrown,
  FaStar,
  FaEdit,
  FaShieldAlt,
  FaCoins,
  FaFire,
  FaTheaterMasks,
  FaBolt,
  FaPalette,
} from "react-icons/fa";

// Map key ikon (disimpan di data) -> komponen react-icons
export const ICONS = {
  crown: FaCrown,
  star: FaStar,
  edit: FaEdit,
  shield: FaShieldAlt,
  coins: FaCoins,
  fire: FaFire,
  mask: FaTheaterMasks,
  bolt: FaBolt,
  palette: FaPalette,
};

// Daftar opsi untuk dropdown pemilihan ikon di form
export const iconOptions = [
  { value: "crown", label: "Mahkota (Ketua)" },
  { value: "star", label: "Bintang" },
  { value: "edit", label: "Pena / Catatan" },
  { value: "shield", label: "Perisai (Keamanan)" },
  { value: "coins", label: "Koin (Bendahara)" },
  { value: "fire", label: "Api" },
  { value: "mask", label: "Topeng Teater" },
  { value: "bolt", label: "Petir" },
  { value: "palette", label: "Palet (Default)" },
];

export function StudentIcon({ icon, color, size = "1.2rem" }) {
  const IconComponent = ICONS[icon] || FaPalette;
  return (
    <IconComponent style={{ color: color || "#ff3d9a", fontSize: size }} />
  );
}
