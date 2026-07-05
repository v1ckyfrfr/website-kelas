import { FaEdit, FaShieldAlt, FaCrown } from "react-icons/fa";

export function StructureTab({
  structure,
  structureModal,
  setStructureModal,
  handleSaveStructure,
}) {
  return (
    <div className="tab-pane">
      <div className="content-card">
        <div className="card-header">
          <h3>Struktur Jabatan Organisasi Kelas</h3>
          <p>Perbarui pemegang jabatan utama di kelas DKV.</p>
        </div>

        <div className="structure-list-admin">
          {structure.map((item) => (
            <div key={item.id} className="structure-row-admin">
              <div className="role-meta-info">
                <span className="role-emoji-indicator">
                  <FaShieldAlt color="#ff3d9a" />
                </span>
                <div>
                  <strong>{item.label}</strong>
                  <span className="role-id-tag">ID: {item.id}</span>
                </div>
              </div>
              <div className="role-holder-name">
                <span>Pejabat Aktif:</span>
                <strong>{item.name}</strong>
              </div>
              <div>
                <button
                  className="edit-piket-btn"
                  onClick={() => setStructureModal({ open: true, data: item })}
                >
                  <FaEdit /> Ganti Jabatan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STRUCTURE EDIT MODAL */}
      {structureModal.open && (
        <div className="modal-overlay">
          <div className="modal-content animate-zoom">
            <div className="modal-header">
              <h3>
                <FaCrown style={{ marginRight: "8px" }} /> Edit Jabatan:{" "}
                {structureModal.data?.label}
              </h3>
              <button
                className="close-modal-btn"
                onClick={() => setStructureModal({ open: false, data: null })}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSaveStructure}>
              <input
                type="hidden"
                name="id"
                value={structureModal.data?.id || ""}
              />
              <input
                type="hidden"
                name="label"
                value={structureModal.data?.label || ""}
              />
              <div className="modal-body">
                <div className="form-group">
                  <label>Jabatan Kelas</label>
                  <input
                    type="text"
                    value={structureModal.data?.label || ""}
                    disabled
                    className="input-readonly"
                  />
                </div>

                <div className="form-group">
                  <label>Nama Pejabat / Pemegang Peran</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Contoh: Farah G. atau Lyana W. - Glorya A."
                    defaultValue={structureModal.data?.name || ""}
                    required
                  />
                  <span className="form-help-text">
                    Jika terdapat 2 orang, pisahkan dengan tanda hubung (-)
                    misalnya: nama1 - nama2.
                  </span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setStructureModal({ open: false, data: null })}
                >
                  Batal
                </button>
                <button type="submit" className="submit-btn pink-btn">
                  Simpan Jabatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
