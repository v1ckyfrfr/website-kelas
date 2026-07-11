"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { StructureNode } from "@/components/StructureNode";

import { STRUCTURE } from "@/data/structure";
import { STUDENTS } from "@/data/students";
import { StudentIcon } from "@/app/internal/dashb0ard/components/StudentIcon";
import { supabase } from "@/lib/supabase";

// ── StudentCard — hover dikelola via state (bukan whileHover inline)
// agar warna tidak desync saat dark mode toggle
function StudentCard({ student, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={hovered ? { y: -4, scale: 1.02 } : { y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.035 }}
      className="student-card"
      style={
        hovered
          ? {
              borderColor: "#ff6eb4",
              boxShadow: "0 10px 22px rgba(255,110,180,0.22)",
            }
          : undefined
      }
    >
      <div
        style={{
          background: `${student.color}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {student.photo ? (
          <Image
            src={student.photo}
            alt={student.name}
            width={40}
            height={40}
            style={{
              objectFit: "cover",
              borderRadius: "999px",
            }}
          />
        ) : (
          <StudentIcon
            icon={student.icon || "palette"}
            color={student.color}
            size="1.5rem"
          />
        )}
      </div>
      <section>
        <strong>{student.name}</strong>
        <span>{student.role}</span>
      </section>
    </motion.div>
  );
}

export function StrukturSection({ setActiveNav }) {
  const [showAllMurid, setShowAllMurid] = useState(false);
  const [students, setStudents] = useState(STUDENTS);
  const [structure, setStructure] = useState(STRUCTURE);

  useEffect(() => {
    supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setStudents(data);
      });

    supabase
      .from("structure")
      .select("*")
      .order("order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setStructure(data);
      });
  }, []);

  return (
    <section id="struktur" className="section white-section">
      <div className="two-col">
        <Reveal>
          <div className="panel">
            <SectionHeader icon="✦" title="STRUKTUR KELAS" />

            <div className="structure-chart">
              {structure[0] && <StructureNode node={structure[0]} />}
              <div className="line vertical" />

              <div className="structure-row">
                {structure[1] && <StructureNode node={structure[1]} />}
                <div className="line horizontal" />
                {structure[2] && <StructureNode node={structure[2]} />}
              </div>

              <div className="line vertical small" />

              <div className="structure-bottom">
                {structure.slice(3).map((node) => (
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
            <SectionHeader
              icon="★"
              title="DAFTAR MURID"
              btnText={showAllMurid ? "Sembunyikan" : "Lihat Semua"}
              onClick={() => setShowAllMurid((v) => !v)}
            />

            <div className="student-grid">
              {(showAllMurid ? students : students.slice(0, 8)).map(
                (student, index) => (
                  <StudentCard
                    key={student.id ?? student.name}
                    student={student}
                    index={index}
                  />
                ),
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
