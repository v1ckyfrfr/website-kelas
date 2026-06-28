import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTiktok,
  FaGlobe,
  FaYoutube,
} from "react-icons/fa";

import { Reveal } from "@/components/Reveal";

import { MdLocationOn } from "react-icons/md";

export function Footer() {
  return (
    <footer id="tentang" className="footer">
      <Reveal>
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img 
               src="/dkv.png"
               alt="logo DKV"
               className="brand-logo-image"
              />
              <span>DKV 1ST BATCH</span>
              <img
               src="/dhakar.png"
               alt="logo Dhakar"
               className="brand-logo-image"
               />
              <span>SMK DHARMA KARYA</span>
            </div>

            <p>
              Desain Komunikasi Visual
              <br />
              Menggambar ide, mewarnai dunia.
            </p>

            <div className="socials">
              {[<FaInstagram />, <FaYoutube />, <FaTiktok />].map((icon, index) => (
                <motion.button key={index} whileHover={{ y: -3, scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                  {icon}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3>LINK CEPAT</h3>
            {["Beranda", "Struktur Kelas", "Murid", "Jadwal Piket", "Project", "Galeri", "Tentang Kami", "Kontak"].map((link) => (
              <button key={link}>{link}</button>
            ))}
          </div>

          <div>
            <h3>KONTAK KAMI</h3>
            {[
              [<FaInstagram />, "@visualbatch_xi"],
              [<FaTiktok />, "@dkv.smk.dharma.ka"],
              [<MdLocationOn />, "SMK Dharma Karya"],
            ].map(([icon, text]) => (
              <p key={text} className="contact-line">
                <span className="contact-icon">{icon}</span>
                <span>{text}</span>
              </p>
            ))}
            <h3>OUR SCHOOL!</h3>
            {[
              [<FaInstagram />, "@smk_dharmakaryajkt"],
              [<FaGlobe />, "smkdharmakaryajkt.sch.id"],
              [<FaTiktok />, "@smk_dhakar"],
              [<MdLocationOn />, "JL. Melawai XII No.2 Kav.207A, RT.4/RW.6, Melawai, Kec. Kby. Baru, Jakarta Selatan."],
            ].map(([icon, text]) => (
              <p key={text} className="contact-line">
                <span className="contact-icon">{icon}</span>
                <span>{text}</span>
              </p>
            ))}
          </div>

          <div className="footer-note-wrap">
            <motion.div
              animate={{ rotate: [2, -1, 2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="footer-note"
            >
              Thanks for
              <br />
              visiting! 😊
            </motion.div>
          </div>
        </div>

        <div className="copyright">© 2026 DKV 1ST GENERATION. All Rights Reserved.</div>
      </Reveal>
    </footer>
  );
}