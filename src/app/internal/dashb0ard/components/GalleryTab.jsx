import { FaTrash, FaCamera } from "react-icons/fa";

export function GalleryTab({
  gallery,
  galleryModal,
  setGalleryModal,
  handleAddGalleryImage,
  handleDeleteGalleryImage,
}) {
  return (
    <div className="tab-pane">
      <div className="content-card">
        <div className="card-header gallery-tab-header">
          <div>
            <h3>Galeri Kegiatan DKV</h3>
            <p>
              Total foto terunggah di album:{" "}
              <strong>{gallery.length} foto</strong>
            </p>
          </div>
          <button
            id="btn-upload-photo"
            className="add-item-btn"
            onClick={() => setGalleryModal({ open: true })}
          >
            + Upload Foto Baru
          </button>
        </div>

        <div className="gallery-admin-grid">
          {gallery.map((imgSrc, index) => (
            <div key={index} className="gallery-admin-item">
              <div className="gallery-image-wrapper">
                <img src={imgSrc} alt={`Galeri ${index}`} />
                <div className="gallery-image-overlay">
                  <button
                    className="delete-img-btn"
                    onClick={() => handleDeleteGalleryImage(imgSrc, index)}
                    title="Hapus foto dari galeri"
                  >
                    <FaTrash /> Hapus Foto
                  </button>
                </div>
              </div>
              <div className="gallery-image-info">
                <span className="img-index">Foto #{index + 1}</span>
                <span className="img-path" title={imgSrc}>
                  {imgSrc.length > 30
                    ? imgSrc.substring(0, 27) + "..."
                    : imgSrc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GALLERY UPLOAD MODAL */}
      {galleryModal.open && (
        <div className="modal-overlay">
          <div className="modal-content animate-zoom">
            <div className="modal-header">
              <h3>
                <FaCamera style={{ marginRight: "8px" }} /> Tambah Foto Galeri
                Baru
              </h3>
              <button
                className="close-modal-btn"
                onClick={() => setGalleryModal({ open: false })}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddGalleryImage}>
              <div className="modal-body">
                <div className="form-group">
                  <label>URL Gambar Kegiatan</label>
                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="Contoh: /gallery/kegiatan.jpg atau URL gambar online"
                  />
                </div>

                <div className="form-group separator-group">
                  <span className="separator-title">ATAU</span>
                </div>

                <div className="form-group">
                  <label>Unggah Foto Kegiatan</label>
                  <input type="file" name="imageFile" accept="image/*" />
                  <span className="form-help-text">
                    Jika Anda mengunggah file gambar, ia akan dikonversi ke
                    Base64 dan disimpan di browser ini.
                  </span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setGalleryModal({ open: false })}
                >
                  Batal
                </button>
                <button type="submit" className="submit-btn pink-btn">
                  Tambahkan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
