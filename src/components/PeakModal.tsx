"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { PEAK_DATA, PeakId } from "@/lib/portfolio-data";

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── shared micro-styles ──────────────────────────────────────────────────────
const TAG =
  "font-mono text-[10px] px-2.5 py-0.5 rounded-md " +
  "bg-[rgba(70,120,255,0.13)] border border-[rgba(70,120,255,0.26)] text-[rgba(155,190,255,0.88)]";

const CARD =
  "rounded-2xl border border-white/[0.07] bg-white/[0.025] " +
  "hover:bg-[rgba(70,120,255,0.05)] hover:border-[rgba(70,120,255,0.22)] transition-all duration-300";

const LINK_ROW =
  "flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/[0.07] " +
  "bg-white/[0.025] hover:bg-[rgba(70,120,255,0.07)] hover:border-[rgba(70,120,255,0.25)] " +
  "transition-all duration-200 group cursor-pointer";

export default function PeakModal({
  peakId,
  onClose,
}: {
  peakId: PeakId;
  onClose: () => void;
}) {
  const data = PEAK_DATA[peakId];

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-10"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        {/* Panel */}
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.97 }}
          animate={{ y: 0,  opacity: 1, scale: 1 }}
          exit={{  y: 40, opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-2xl max-h-[82vh] flex flex-col overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(160deg, rgba(11,16,30,0.96) 0%, rgba(7,10,20,0.98) 100%)",
            backdropFilter: "blur(28px) saturate(160%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.07), " +
              "0 48px 120px rgba(0,0,0,0.85), " +
              "0 0 80px rgba(30,70,220,0.14)",
          }}
        >
          {/* Accent line at top */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(80,140,255,0.55) 40%, rgba(130,90,255,0.4) 65%, transparent 100%)",
            }}
          />

          {/* ── Header ───────────────────────────────────────────────────── */}
          <div
            className="shrink-0 flex items-center justify-between px-7 py-5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div>
              <p className="font-mono text-[9px] tracking-[0.45em] uppercase mb-1.5"
                style={{ color: "rgba(100,155,255,0.72)" }}>
                {data.label}
              </p>
              <h2 className="font-heading font-bold text-xl text-white">
                {"subtitle" in data ? data.subtitle : ""}
              </h2>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)";
                (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(255,255,255,0.22)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(255,255,255,0.09)";
              }}
            >
              <X size={14} className="text-white/50" />
            </button>
          </div>

          {/* ── Scrollable body ──────────────────────────────────────────── */}
          <div className="overflow-y-auto px-7 py-6 flex-1 modal-scroll">
            {peakId === "projects"   && <ProjectsContent />}
            {peakId === "experience" && <ExperienceContent />}
            {peakId === "skills"     && <SkillsContent />}
            {peakId === "education"  && <EducationContent />}
            {peakId === "contact"    && <ContactContent />}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Projects ─────────────────────────────────────────────────────────────────
function ProjectsContent() {
  const { items } = PEAK_DATA.projects;
  return (
    <div className="space-y-4">
      {items.map((project, i) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          className={`${CARD} p-5`}
        >
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-heading font-semibold text-white/90 text-base leading-snug">
              {project.title}
            </h3>
            <div className="flex gap-2.5 shrink-0 ml-3 mt-0.5">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white/80 transition-colors"
                aria-label="GitHub"
              >
                <GitHubIcon size={15} />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white/80 transition-colors"
                  aria-label="Live"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
          <p className="font-mono text-[9px] tracking-widest uppercase mb-3"
            style={{ color: "rgba(100,155,255,0.55)" }}>
            {project.period}
          </p>
          <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className={TAG}>{tag}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Experience ────────────────────────────────────────────────────────────────
function ExperienceContent() {
  const { items } = PEAK_DATA.experience;
  return (
    <div className="space-y-5">
      {items.map((job, i) => (
        <motion.div
          key={job.company}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className={`${CARD} p-5`}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between mb-3">
            <div>
              <h3 className="font-heading font-semibold text-white/90 text-base">{job.role}</h3>
              <p style={{ color: "rgba(100,155,255,0.75)" }} className="text-sm font-medium mt-0.5">
                {job.company}
              </p>
            </div>
            <div className="mt-1.5 sm:mt-0 sm:text-right shrink-0">
              <p className="font-mono text-[10px] text-white/35 tracking-wide">{job.period}</p>
              <p className="font-mono text-[10px] text-white/22 mt-0.5">{job.location}</p>
            </div>
          </div>
          <ul className="space-y-2 mb-4">
            {job.bullets.map((b, bi) => (
              <li key={bi} className="text-white/50 text-sm leading-relaxed flex gap-2.5">
                <span className="shrink-0 mt-[5px] w-1 h-1 rounded-full"
                  style={{ background: "rgba(90,140,255,0.6)", flexShrink: 0 }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {job.tags.map((t) => (
              <span key={t} className={TAG}>{t}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function SkillsContent() {
  const { groups } = PEAK_DATA.skills;
  return (
    <div className="space-y-6">
      {groups.map((group, i) => (
        <motion.div
          key={group.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
        >
          <p
            className="font-mono text-[9px] tracking-[0.4em] uppercase mb-3"
            style={{ color: "rgba(100,155,255,0.65)" }}
          >
            {group.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="font-mono text-xs px-3 py-1 rounded-lg transition-all duration-200 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.62)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLSpanElement;
                  el.style.background = "rgba(70,120,255,0.10)";
                  el.style.border = "1px solid rgba(70,120,255,0.28)";
                  el.style.color = "rgba(175,205,255,0.92)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLSpanElement;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.border = "1px solid rgba(255,255,255,0.08)";
                  el.style.color = "rgba(255,255,255,0.62)";
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── Education ─────────────────────────────────────────────────────────────────
function EducationContent() {
  const d = PEAK_DATA.education;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className={`${CARD} p-6 mb-5`}>
        <div className="flex flex-col sm:flex-row sm:justify-between mb-5">
          <div>
            <h3 className="font-heading font-bold text-white/90 text-xl mb-1">{d.degree}</h3>
            <p style={{ color: "rgba(100,155,255,0.75)" }} className="font-medium">{d.school}</p>
          </div>
          <div className="mt-2 sm:mt-0 sm:text-right shrink-0">
            <p className="font-mono text-[10px] text-white/35 tracking-wide">{d.period}</p>
            <p className="font-mono text-[10px] text-white/22 mt-0.5">{d.location}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2.5"
            style={{ color: "rgba(100,155,255,0.55)" }}>Minors</p>
          <div className="flex flex-wrap gap-2">
            {d.minors.map((m) => (
              <span key={m} className={TAG}>{m}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2.5"
            style={{ color: "rgba(100,155,255,0.55)" }}>Coursework</p>
          <div className="flex flex-wrap gap-2">
            {d.courses.map((c) => (
              <span key={c} className={TAG}>{c}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="font-mono text-[10px] text-white/25 tracking-wide px-1">{d.note}</p>
    </motion.div>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactContent() {
  const d = PEAK_DATA.contact;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <p className="text-white/50 text-sm leading-relaxed">{d.availability}</p>

      <div className="space-y-2.5">
        <a href={`mailto:${d.email}`} className={LINK_ROW}>
          <Mail size={16} className="text-white/35 group-hover:text-[rgba(120,165,255,0.85)] transition-colors shrink-0" />
          <span className="font-mono text-sm text-white/55 group-hover:text-white/85 transition-colors">
            {d.email}
          </span>
        </a>
        <a href={d.github} target="_blank" rel="noopener noreferrer" className={LINK_ROW}>
          <span className="text-white/35 group-hover:text-[rgba(120,165,255,0.85)] transition-colors shrink-0">
            <GitHubIcon size={16} />
          </span>
          <span className="font-mono text-sm text-white/55 group-hover:text-white/85 transition-colors">
            github.com/pgvaghela
          </span>
        </a>
        <a href={d.linkedin} target="_blank" rel="noopener noreferrer" className={LINK_ROW}>
          <span className="text-white/35 group-hover:text-[rgba(120,165,255,0.85)] transition-colors shrink-0">
            <LinkedInIcon size={16} />
          </span>
          <span className="font-mono text-sm text-white/55 group-hover:text-white/85 transition-colors">
            linkedin.com/in/priyanshvaghela
          </span>
        </a>
        <div className={`${LINK_ROW} cursor-default`}>
          <MapPin size={16} className="text-white/30 shrink-0" />
          <span className="font-mono text-sm text-white/40">{d.location}</span>
        </div>
      </div>
    </motion.div>
  );
}
