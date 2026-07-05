import {
  FaChartBar,
  FaUsers,
  FaBroom,
  FaImages,
  FaCrown,
  FaHistory,
  FaUserPlus,
  FaCamera,
} from "react-icons/fa";

export function OverviewTab({
  students,
  piket,
  gallery,
  structure,
  activities,
  setStudentModal,
  setActiveTab,
  setGalleryModal,
}) {
  return (
    <div className="tab-pane">
      {/* Stats Card Grid */}
      <div className="stats-grid">
        <div className="stat-card pink-gradient-bg">
          <div className="stat-info">
            <span className="stat-label">Jumlah Anggota</span>
            <strong className="stat-value">{students.length}</strong>
            <span className="stat-desc">Siswa terdaftar</span>
          </div>
          <div className="stat-icon-bg">
            <FaUsers />
          </div>
        </div>

        <div className="stat-card rose-gradient-bg">
          <div className="stat-info">
            <span className="stat-label">Jadwal Piket</span>
            <strong className="stat-value">{piket.length}</strong>
            <span className="stat-desc">Hari piket aktif</span>
          </div>
          <div className="stat-icon-bg">
            <FaBroom />
          </div>
        </div>

        <div className="stat-card peach-gradient-bg">
          <div className="stat-info">
            <span className="stat-label">Galeri Foto</span>
            <strong className="stat-value">{gallery.length}</strong>
            <span className="stat-desc">Foto terunggah</span>
          </div>
          <div className="stat-icon-bg">
            <FaImages />
          </div>
        </div>

        <div className="stat-card darkrose-gradient-bg">
          <div className="stat-info">
            <span className="stat-label">Struktur Organisasi</span>
            <strong className="stat-value">{structure.length}</strong>
            <span className="stat-desc">Jabatan struktural</span>
          </div>
          <div className="stat-icon-bg">
            <FaCrown />
          </div>
        </div>
      </div>

      {/* Lower grid (Recent log & Shortcuts) */}
      <div className="overview-grid">
        {/* Recent activity log */}
        <div className="content-card log-card">
          <div className="card-header">
            <h3>
              <FaHistory /> Log Aktivitas Terbaru
            </h3>
            <span className="header-badge">Live</span>
          </div>
          <div className="activity-list">
            {activities.map((act) => (
              <div key={act.id} className="activity-item">
                <div className="activity-icon">
                  <FaHistory color="#ff3d9a" />
                </div>
                <div className="activity-details">
                  <p>
                    <strong>{act.action}</strong> oleh {act.user}
                  </p>
                  <span className="activity-time">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions panel */}
        <div className="content-card quick-actions-card">
          <div className="card-header">
            <h3>Pintasan Cepat</h3>
          </div>
          <div className="quick-actions-grid">
            <button
              id="btn-quick-add-student"
              className="action-btn"
              onClick={() =>
                setStudentModal({ open: true, mode: "add", data: null })
              }
            >
              <span className="action-icon">
                <FaUserPlus />
              </span>
              Tambah Siswa
            </button>
            <button
              id="btn-quick-piket"
              className="action-btn"
              onClick={() => setActiveTab("piket")}
            >
              <span className="action-icon">
                <FaBroom />
              </span>
              Edit Jadwal Piket
            </button>
            <button
              id="btn-quick-gallery"
              className="action-btn"
              onClick={() => setGalleryModal({ open: true })}
            >
              <span className="action-icon">
                <FaCamera />
              </span>
              Upload Foto Baru
            </button>
            <button
              id="btn-quick-structure"
              className="action-btn"
              onClick={() => setActiveTab("structure")}
            >
              <span className="action-icon">
                <FaCrown />
              </span>
              Update Struktur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
