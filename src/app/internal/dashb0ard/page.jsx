"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./dashboard.css";

// Import react-icons
import {
  FaChartBar,
  FaUsers,
  FaBroom,
  FaImages,
  FaCrown,
  FaHome,
  FaSignOutAlt,
  FaPalette,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

// Import subcomponents
import { OverviewTab } from "./components/OverviewTab";
import { StudentsTab } from "./components/StudentsTab";
import { PiketTab } from "./components/PiketTab";
import { GalleryTab } from "./components/GalleryTab";
import { StructureTab } from "./components/StructureTab";

// Import initial data for fallback
import { STUDENTS as initialStudents } from "@/data/students";
import { PIKET as initialPiket } from "@/data/piket";
import { GALLERY_ITEMS as initialGallery } from "@/data/gallery";
import { STRUCTURE as initialStructure } from "@/data/structure";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // State for data
  const [students, setStudents] = useState([]);
  const [piket, setPiket] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [structure, setStructure] = useState([]);

  // Modal states
  const [studentModal, setStudentModal] = useState({
    open: false,
    mode: "add",
    data: null,
  });
  const [piketModal, setPiketModal] = useState({ open: false, data: null });
  const [structureModal, setStructureModal] = useState({
    open: false,
    data: null,
  });
  const [galleryModal, setGalleryModal] = useState({ open: false });

  // Search & Filter state
  const [studentSearch, setStudentSearch] = useState("");
  const [studentRoleFilter, setStudentRoleFilter] = useState("all");

  // Activity Log State
  const [activities, setActivities] = useState([
    {
      id: 1,
      action: "Mengupdate struktur kelas",
      user: "Admin DKV",
      time: "10 menit yang lalu",
    },
    {
      id: 2,
      action: "Menambahkan anggota kelas baru",
      user: "Admin DKV",
      time: "1 jam yang lalu",
    },
    {
      id: 3,
      action: "Memperbarui jadwal piket Hari Senin",
      user: "Admin DKV",
      time: "Kemarin",
    },
  ]);

  // Toast Notification State
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Initialize data from localStorage or fallback to static data files
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStudents = localStorage.getItem("dkv_students");
      const storedPiket = localStorage.getItem("dkv_piket");
      const storedGallery = localStorage.getItem("dkv_gallery");
      const storedStructure = localStorage.getItem("dkv_structure");

      if (storedStudents) {
        setStudents(JSON.parse(storedStudents));
      } else {
        setStudents(initialStudents);
        localStorage.setItem("dkv_students", JSON.stringify(initialStudents));
      }

      if (storedPiket) {
        setPiket(JSON.parse(storedPiket));
      } else {
        setPiket(initialPiket);
        localStorage.setItem("dkv_piket", JSON.stringify(initialPiket));
      }

      if (storedGallery) {
        setGallery(JSON.parse(storedGallery));
      } else {
        setGallery(initialGallery);
        localStorage.setItem("dkv_gallery", JSON.stringify(initialGallery));
      }

      if (storedStructure) {
        setStructure(JSON.parse(storedStructure));
      } else {
        setStructure(initialStructure);
        localStorage.setItem("dkv_structure", JSON.stringify(initialStructure));
      }
    }
  }, []);

  const triggerToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const addActivity = (action) => {
    const newActivity = {
      id: Date.now(),
      action,
      user: "Admin DKV",
      time: "Baru saja",
    };
    setActivities((prev) => [newActivity, ...prev.slice(0, 5)]);
  };

  // Student CRUD Operations
  const handleSaveStudent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const role = formData.get("role");
    const icon = formData.get("icon");
    const color = formData.get("color");
    const photoInput = formData.get("photo");
    const photoUrlInput = formData.get("photoUrl");

    let photo = "";
    if (photoUrlInput) {
      photo = photoUrlInput;
    }

    const processStudentSave = (photoDataUrl) => {
      const studentData = {
        name,
        role,
        color: color || "#ff6eb4",
        icon: icon || "palette",
        photo: photoDataUrl || photo || null,
      };

      let updatedStudents;
      if (studentModal.mode === "add") {
        updatedStudents = [...students, studentData];
        triggerToast("Siswa berhasil ditambahkan!");
        addActivity(`Menambahkan siswa "${name}"`);
      } else {
        updatedStudents = students.map((s) =>
          s.name === studentModal.data.name ? studentData : s,
        );
        triggerToast("Siswa berhasil diperbarui!");
        addActivity(`Mengubah data siswa "${name}"`);
      }

      setStudents(updatedStudents);
      localStorage.setItem("dkv_students", JSON.stringify(updatedStudents));
      setStudentModal({ open: false, mode: "add", data: null });
    };

    // If file photo is selected, read it as DataURL (Base64)
    if (photoInput && photoInput.size > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        processStudentSave(event.target.result);
      };
      reader.readAsDataURL(photoInput);
    } else {
      processStudentSave(studentModal.data?.photo);
    }
  };

  const handleDeleteStudent = (name) => {
    if (
      confirm(`Apakah Anda yakin ingin menghapus "${name}" dari daftar kelas?`)
    ) {
      const updatedStudents = students.filter((s) => s.name !== name);
      setStudents(updatedStudents);
      localStorage.setItem("dkv_students", JSON.stringify(updatedStudents));
      triggerToast("Siswa berhasil dihapus!", "error");
      addActivity(`Menghapus siswa "${name}"`);
    }
  };

  // Piket CRUD Operations
  const handleSavePiket = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const day = formData.get("day");
    const group = formData.get("group");
    const members = formData.get("members");

    const updatedPiket = piket.map((p) =>
      p.day === day ? { ...p, group, members } : p,
    );

    setPiket(updatedPiket);
    localStorage.setItem("dkv_piket", JSON.stringify(updatedPiket));
    triggerToast(`Jadwal Piket Hari ${day} berhasil diperbarui!`);
    addActivity(`Memperbarui piket Hari ${day}`);
    setPiketModal({ open: false, data: null });
  };

  // Structure CRUD Operations
  const handleSaveStructure = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get("id");
    const label = formData.get("label");
    const name = formData.get("name");

    const updatedStructure = structure.map((s) =>
      s.id === id ? { ...s, label, name } : s,
    );

    setStructure(updatedStructure);
    localStorage.setItem("dkv_structure", JSON.stringify(updatedStructure));
    triggerToast(`Struktur "${label}" berhasil diperbarui!`);
    addActivity(`Mengubah jabatan "${label}" menjadi "${name}"`);
    setStructureModal({ open: false, data: null });
  };

  // Gallery CRUD Operations
  const handleAddGalleryImage = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fileInput = formData.get("imageFile");
    const urlInput = formData.get("imageUrl");

    const processGallerySave = (imgSrc) => {
      if (!imgSrc) {
        triggerToast("Harap masukkan URL gambar atau unggah file!", "error");
        return;
      }
      const updatedGallery = [imgSrc, ...gallery];
      setGallery(updatedGallery);
      localStorage.setItem("dkv_gallery", JSON.stringify(updatedGallery));
      triggerToast("Foto baru berhasil ditambahkan ke galeri!");
      addActivity("Menambahkan foto baru ke galeri");
      setGalleryModal({ open: false });
    };

    if (fileInput && fileInput.size > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        processGallerySave(event.target.result);
      };
      reader.readAsDataURL(fileInput);
    } else {
      processGallerySave(urlInput);
    }
  };

  const handleDeleteGalleryImage = (imgSrc, index) => {
    if (confirm("Apakah Anda yakin ingin menghapus foto ini dari galeri?")) {
      const updatedGallery = gallery.filter((_, i) => i !== index);
      setGallery(updatedGallery);
      localStorage.setItem("dkv_gallery", JSON.stringify(updatedGallery));
      triggerToast("Foto galeri berhasil dihapus!", "error");
      addActivity("Menghapus foto galeri");
    }
  };

  // Log Out handler
  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari Admin Dashboard?")) {
      router.push("/internal/login");
    }
  };

  // Filter students based on search and role
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.role.toLowerCase().includes(studentSearch.toLowerCase());
    const matchesRole =
      studentRoleFilter === "all" ||
      (studentRoleFilter === "pengurus" &&
        s.role !== "Anggota" &&
        !s.role.includes("Anggota")) ||
      (studentRoleFilter === "anggota" &&
        (s.role === "Anggota" || s.role.includes("Anggota")));
    return matchesSearch && matchesRole;
  });

  return (
    <div className="dashboard-container">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" ? (
              <FaCheckCircle color="#ff3d9a" />
            ) : toast.type === "error" ? (
              <FaExclamationCircle color="#e03a3a" />
            ) : (
              <FaInfoCircle color="#555" />
            )}
          </span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <FaPalette color="#ff3d9a" />
          </div>
          <div>
            <h2>Admin</h2>
            <span className="brand-subtitle">Panel Kontrol Kelas</span>
          </div>
        </div>

        <nav className="sidebar-menu">
          <button
            id="tab-overview"
            className={`menu-item ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <span className="menu-icon">
              <FaChartBar />
            </span>{" "}
            Ringkasan
          </button>
          <button
            id="tab-students"
            className={`menu-item ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
          >
            <span className="menu-icon">
              <FaUsers />
            </span>{" "}
            Anggota Kelas
          </button>
          <button
            id="tab-piket"
            className={`menu-item ${activeTab === "piket" ? "active" : ""}`}
            onClick={() => setActiveTab("piket")}
          >
            <span className="menu-icon">
              <FaBroom />
            </span>{" "}
            Jadwal Piket
          </button>
          <button
            id="tab-gallery"
            className={`menu-item ${activeTab === "gallery" ? "active" : ""}`}
            onClick={() => setActiveTab("gallery")}
          >
            <span className="menu-icon">
              <FaImages />
            </span>{" "}
            Galeri Foto
          </button>
          <button
            id="tab-structure"
            className={`menu-item ${activeTab === "structure" ? "active" : ""}`}
            onClick={() => setActiveTab("structure")}
          >
            <span className="menu-icon">
              <FaCrown />
            </span>{" "}
            Struktur Jabatan
          </button>
        </nav>

        <div className="sidebar-footer">
          <Link href="/" className="menu-item view-site-btn">
            <span className="menu-icon">
              <FaHome />
            </span>{" "}
            Lihat Situs
          </Link>
          <button className="menu-item logout-btn" onClick={handleLogout}>
            <span className="menu-icon">
              <FaSignOutAlt />
            </span>{" "}
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="dashboard-main">
        {/* Header bar */}
        <header className="dashboard-header">
          <div className="header-welcome">
            <h1>Welcome, Admin!</h1>
            <p>Kelola konten, data anggota, dan jadwal kelas</p>
          </div>
          <div className="header-meta">
            <div className="date-badge">
              {" "}
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </header>

        {/* Tab content area */}
        <section className="dashboard-content">
          {activeTab === "overview" && (
            <OverviewTab
              students={students}
              piket={piket}
              gallery={gallery}
              structure={structure}
              activities={activities}
              setStudentModal={setStudentModal}
              setActiveTab={setActiveTab}
              setGalleryModal={setGalleryModal}
            />
          )}

          {activeTab === "students" && (
            <StudentsTab
              students={students}
              studentSearch={studentSearch}
              setStudentSearch={setStudentSearch}
              studentRoleFilter={studentRoleFilter}
              setStudentRoleFilter={setStudentRoleFilter}
              filteredStudents={filteredStudents}
              studentModal={studentModal}
              setStudentModal={setStudentModal}
              handleDeleteStudent={handleDeleteStudent}
              handleSaveStudent={handleSaveStudent}
            />
          )}

          {activeTab === "piket" && (
            <PiketTab
              piket={piket}
              piketModal={piketModal}
              setPiketModal={setPiketModal}
              handleSavePiket={handleSavePiket}
            />
          )}

          {activeTab === "gallery" && (
            <GalleryTab
              gallery={gallery}
              galleryModal={galleryModal}
              setGalleryModal={setGalleryModal}
              handleAddGalleryImage={handleAddGalleryImage}
              handleDeleteGalleryImage={handleDeleteGalleryImage}
            />
          )}

          {activeTab === "structure" && (
            <StructureTab
              structure={structure}
              structureModal={structureModal}
              setStructureModal={setStructureModal}
              handleSaveStructure={handleSaveStructure}
            />
          )}
        </section>
      </main>
    </div>
  );
}
