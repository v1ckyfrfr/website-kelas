import { FaSearch, FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import { StudentIcon, iconOptions } from "./StudentIcon";

export function StudentsTab({
  students,
  studentSearch,
  setStudentSearch,
  studentRoleFilter,
  setStudentRoleFilter,
  filteredStudents,
  studentModal,
  setStudentModal,
  handleDeleteStudent,
  handleSaveStudent,
}) {
  return (
    <div className="tab-pane">
      <div className="content-card">
        <div className="card-header student-tab-header">
          <div>
            <h3>Kelola Anggota Kelas</h3>
            <p>
              Total data murid saat ini:{" "}
              <strong>{filteredStudents.length} siswa</strong>
            </p>
          </div>
          <button
            id="btn-add-student"
            className="add-item-btn"
            onClick={() =>
              setStudentModal({ open: true, mode: "add", data: null })
            }
          >
            + Tambah Siswa Baru
          </button>
        </div>

        {/* Filters Row */}
        <div className="filters-row">
          <div className="search-wrapper">
            <span className="search-icon">
              <FaSearch />
            </span>
            <input
              id="input-student-search"
              type="text"
              placeholder="Cari berdasarkan nama atau peran..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
            />
          </div>

          <div className="filter-wrapper">
            <label>Filter Peran:</label>
            <select
              id="select-student-filter"
              value={studentRoleFilter}
              onChange={(e) => setStudentRoleFilter(e.target.value)}
            >
              <option value="all">Semua Anggota</option>
              <option value="pengurus">Pengurus Kelas</option>
              <option value="anggota">Hanya Anggota</option>
            </select>
          </div>
        </div>

        {/* Student Table */}
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Nama Lengkap</th>
                <th>Peran / Jabatan</th>
                <th>Warna Tema</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => (
                  <tr key={`${student.name}-${idx}`}>
                    <td>
                      <div
                        className="table-avatar"
                        style={{
                          background: `${student.color}33`,
                          color: student.color,
                        }}
                      >
                        {student.photo ? (
                          <img src={student.photo} alt={student.name} />
                        ) : (
                          <StudentIcon
                            icon={student.icon || "palette"}
                            color={student.color}
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <strong className="student-table-name">
                        {student.name}
                      </strong>
                    </td>
                    <td>
                      <span
                        className={`role-badge ${student.role === "Anggota" ? "member" : "officer"}`}
                      >
                        {student.role}
                      </span>
                    </td>
                    <td>
                      <div className="color-preview-container">
                        <span
                          className="color-dot"
                          style={{ backgroundColor: student.color }}
                        />
                        <span className="color-hex">{student.color}</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons-group">
                        <button
                          className="edit-btn"
                          onClick={() =>
                            setStudentModal({
                              open: true,
                              mode: "edit",
                              data: student,
                            })
                          }
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteStudent(student.name)}
                        >
                          <FaTrash /> Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-table-state">
                    Sensus data siswa tidak ditemukan. Coba ganti kata kunci
                    pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* STUDENT ADD/EDIT MODAL */}
      {studentModal.open && (
        <div className="modal-overlay">
          <div className="modal-content animate-zoom">
            <div className="modal-header">
              <h3>
                {studentModal.mode === "add" ? (
                  <>
                    <FaUserPlus style={{ marginRight: "8px" }} /> Tambah Siswa
                    Baru
                  </>
                ) : (
                  <>
                    <FaEdit style={{ marginRight: "8px" }} /> Edit Data Siswa
                  </>
                )}
              </h3>
              <button
                className="close-modal-btn"
                onClick={() =>
                  setStudentModal({ open: false, mode: "add", data: null })
                }
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSaveStudent}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nama Lengkap Siswa</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Contoh: Farah Ghaida"
                    defaultValue={
                      studentModal.mode === "edit" ? studentModal.data.name : ""
                    }
                    required
                    readOnly={studentModal.mode === "edit"}
                    className={
                      studentModal.mode === "edit" ? "input-readonly" : ""
                    }
                  />
                  {studentModal.mode === "edit" && (
                    <span className="form-help-text">
                      Nama tidak dapat diubah untuk mode edit. Silakan hapus &
                      buat baru jika salah nama.
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label>Jabatan / Peran</label>
                  <select
                    name="role"
                    defaultValue={
                      studentModal.mode === "edit"
                        ? studentModal.data.role
                        : "Anggota"
                    }
                  >
                    <option value="Anggota">Anggota</option>
                    <option value="Ketua Kelas">Ketua Kelas</option>
                    <option value="Wakil Ketua">Wakil Ketua</option>
                    <option value="Sekretaris 1">Sekretaris 1</option>
                    <option value="Sekretaris 2">Sekretaris 2</option>
                    <option value="Bendahara 1">Bendahara 1</option>
                    <option value="Bendahara 2">Bendahara 2</option>
                    <option value="Keamanan 1">Keamanan 1</option>
                    <option value="Keamanan 2">Keamanan 2</option>
                    <option value="Anggota & Developer">
                      Anggota & Developer
                    </option>
                  </select>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Ikon Karakter</label>
                    <select
                      name="icon"
                      defaultValue={
                        studentModal.mode === "edit"
                          ? studentModal.data.icon || "palette"
                          : "palette"
                      }
                    >
                      {iconOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Warna Tema Kartu</label>
                    <input
                      type="color"
                      name="color"
                      defaultValue={
                        studentModal.mode === "edit"
                          ? studentModal.data.color
                          : "#ff6eb4"
                      }
                    />
                  </div>
                </div>

                <div className="form-group separator-group">
                  <span className="separator-title">
                    Foto Profil (Pilih salah satu)
                  </span>
                </div>

                <div className="form-group">
                  <label>URL Gambar Foto Profil</label>
                  <input
                    type="text"
                    name="photoUrl"
                    placeholder="Contoh: /students/farah.jpg atau URL online"
                    defaultValue={
                      studentModal.mode === "edit"
                        ? studentModal.data.photo || ""
                        : ""
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Atau Unggah File Foto</label>
                  <input type="file" name="photo" accept="image/*" />
                  <span className="form-help-text">
                    file akan disimpan lokal pada
                    browser ini.
                  </span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setStudentModal({ open: false, mode: "add", data: null })
                  }
                >
                  Batal
                </button>
                <button type="submit" className="submit-btn pink-btn">
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
