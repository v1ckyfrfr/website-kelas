import { useState } from "react";
import { motion } from "framer-motion";

import { Reveal } from "@/components/Reveal";
import { SectionHeader }from "@/components/SectionHeader";
import { StructureNode } from "@/components/StructureNode";

import { STRUCTURE } from "@/data/structure";
import { STUDENTS } from "@/data/students";

 export function StrukturSection({ setActiveNav }) {
  const [showAllMurid, setShowAllMurid] = useState(false);

  return (
    <section id="struktur" className="section white-section">
      <div className="two-col">
        <Reveal>
          <div className="panel">
            <SectionHeader icon="✦" title="STRUKTUR KELAS"  />

            <div className="structure-chart">
              <StructureNode node={STRUCTURE[0]} />
              <div className="line vertical" />

              <div className="structure-row">
                <StructureNode node={STRUCTURE[1]} />
                <div className="line horizontal" />
                <StructureNode node={STRUCTURE[2]} />
              </div>

              <div className="line vertical small" />

              <div className="structure-bottom">
                {STRUCTURE.slice(3).map((node) => (
                  <StructureNode key={node.id} node={node} />
                ))}
              </div>
            </div>

            <div className="quote-box">
              ✦ Setiap ide berharga, setiap karya bermakna.
              <br />
              Bersama kita jadi satu generasi kreatif!
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div id="murid" className="panel">
            <SectionHeader icon="★" title="DAFTAR MURID" btnText={showAllMurid ? "Sembunyikan" : "Lihat Semua"} onClick={() => setShowAllMurid((v) => !v)} />

            <div className="student-grid">
              {(showAllMurid ? STUDENTS : STUDENTS.slice(0, 8)).map((student, index) => (
                <motion.div
                  key={student.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    borderColor: "#ff6eb4",
                    boxShadow: "0 10px 22px rgba(255,110,180,0.22)",
                  }}
                  transition={{ duration: 0.35, delay: index * 0.035 }}
                  className="student-card"
                >
                  <div style={{ background: `${student.color}33` }}><img src={student.photo} alt={student.name} style={{ width: "100%",
                  height: "100%", objectFit: "cover", borderRadius: "999px", }} /></div>
                  <section>
                    <strong>{student.name}</strong>
                    <span>{student.role}</span>
                  </section>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}