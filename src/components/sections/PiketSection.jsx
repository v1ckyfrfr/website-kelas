import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";

import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

import { PIKET } from "@/data/piket";
import { PROJECTS } from "@/data/projects";
import { supabase } from "@/lib/supabase";

export function PiketSection() {
  const [showAllProject, setShowAllProject] = useState(false);
  const [piket, setPiket] = useState(PIKET);
  const [projects, setProjects] = useState(PROJECTS);

  useEffect(() => {
    // Fetch piket from Supabase (live data)
    supabase
      .from("piket")
      .select("*")
      .then(({ data }) => {
        if (data && data.length > 0) setPiket(data);
      });

    // Fetch projects from Supabase (live data) – fallback to static if table doesn't exist
    supabase
      .from("projects")
      .select("*")
      .order("order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setProjects(data);
      });
  }, []);

  const dayColors = {
    Senin: "#ff6eb4",
    Selasa: "#ff85c2",
    Rabu: "#ff9fcf",
    Kamis: "#ffb9dc",
    Jumat: "#ffd3ea",
  };

  return (
    <section id="piket" className="section pink-section">
      <div className="two-col">
        <Reveal>
          <div className="panel">
            <SectionHeader
              icon={<FaCalendarAlt />}
              iconColor="#ff6eb4"
              title="JADWAL PIKET KELAS"
            />

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    {["Hari", "Kelompok", "Anggota", ""].map((heading) => (
                      <th key={heading}>{heading}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {piket.map((item, index) => (
                    <motion.tr
                      key={item.day}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ backgroundColor: "#fff5fb" }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                    >
                      <td style={{ color: dayColors[item.day] }}>{item.day}</td>
                      <td>{item.group}</td>
                      <td>{item.members}</td>
                      <td>
                        <span className="check">✓</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="keep-creating">
              <motion.div
                animate={{ rotate: [-4, 4, -4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📷
              </motion.div>
              <strong>KEEP CREATING!</strong>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div id="project" className="panel">
            <SectionHeader
              icon="✦"
              title="PROJECT KELAS"
              btnText={showAllProject ? "Sembunyikan" : "Lihat Semua Project"}
              onClick={() => setShowAllProject((v) => !v)}
            />

            <div className="project-grid">
              {(showAllProject ? projects : projects.slice(0, 6)).map(
                (project, index) => (
                  <motion.article
                    key={project.id ?? project.title}
                    initial={{ opacity: 0, scale: 0.94 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      rotate: index % 2 === 0 ? -1 : 1,
                      boxShadow: "0 12px 28px rgba(0,0,0,0.22)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="project-card"
                    style={{ background: project.bg, color: project.accent }}
                  >
                    {/* Show uploaded image if available */}
                    {project.image_url ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{
                          objectFit: "cover",
                          borderRadius: "inherit",
                          opacity: 0.55,
                        }}
                      />
                    ) : null}
                    <div className="project-play">▶</div>
                    <div className="project-icon">{project.icon}</div>
                    <h3>{project.title}</h3>
                    <p>{project.tag}</p>
                  </motion.article>
                ),
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
