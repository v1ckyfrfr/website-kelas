import { FaEdit, FaBroom } from "react-icons/fa";

export function PiketTab({
  piket,
  piketModal,
  setPiketModal,
  handleSavePiket,
}) {
  return (
    <div className="tab-pane">
      <div className="content-card">
        <div className="card-header">
          <h3>Jadwal Piket Harian</h3>
          <p>
            Sesuaikan anggota kelompok piket untuk setiap hari belajar (Senin
            s.d. Jumat).
          </p>
        </div>

        <div className="piket-grid-admin">
          {piket.map((item) => (
            <div key={item.day} className="piket-card-admin">
              <div className="piket-card-header">
                <h4>Hari {item.day}</h4>
                <span className="piket-group-badge">{item.group}</span>
              </div>
              <div className="piket-card-body">
                <p className="piket-members-label">Anggota Kelompok:</p>
                <p className="piket-members-list">
                  {item.members.split(",").map((m, i) => (
                    <span key={i} className="piket-member-tag">
                      {m.trim()}
                    </span>
                  ))}
                </p>
              </div>
              <div className="piket-card-footer">
                <button
                  className="edit-piket-btn"
                  onClick={() => setPiketModal({ open: true, data: item })}
                >
                  <FaEdit /> Edit Kelompok Piket
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PIKET EDIT MODAL */}
      {piketModal.open && (
        <div className="modal-overlay">
          <div className="modal-content animate-zoom">
            <div className="modal-header">
              <h3>
                <FaBroom style={{ marginRight: "8px" }} /> Edit Kelompok Piket
                Hari {piketModal.data?.day}
              </h3>
              <button
                className="close-modal-btn"
                onClick={() => setPiketModal({ open: false, data: null })}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSavePiket}>
              <input
                type="hidden"
                name="day"
                value={piketModal.data?.day || ""}
              />
              <div className="modal-body">
                <div className="form-group">
                  <label>Nama Kelompok</label>
                  <input
                    type="text"
                    name="group"
                    placeholder="Contoh: Kelompok 1"
                    defaultValue={piketModal.data?.group || ""}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Nama-nama Anggota (pisahkan dengan koma)</label>
                  <textarea
                    name="members"
                    rows="4"
                    placeholder="Contoh: Lyana, Farah, Vicky"
                    defaultValue={piketModal.data?.members || ""}
                    required
                  />
                  <span className="form-help-text">
                    Gunakan tanda koma ( , ) untuk memisahkan nama-nama siswa
                    yang bertugas.
                  </span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setPiketModal({ open: false, data: null })}
                >
                  Batal
                </button>
                <button type="submit" className="submit-btn pink-btn">
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
