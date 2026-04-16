"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { PEAK_DATA, PeakId } from "@/lib/portfolio-data";

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
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-10"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-[#080810] border border-white/10"
          style={{ boxShadow: "0 0 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)" }}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-7 py-5 border-b border-white/8 bg-[#080810]">
            <div>
              <p className="font-mono text-[9px] tracking-[0.45em] text-white/35 uppercase mb-1">
                {data.label}
              </p>
              <h2 className="font-heading font-bold text-xl text-white">
                {"subtitle" in data ? data.subtitle : ""}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-white/35 hover:text-white border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>

          <div className="px-7 py-6">
            {peakId === "projects" && <ProjectsContent />}
            {peakId === "experience" && <ExperienceContent />}
            {peakId === "skills" && <SkillsContent />}
            {peakId === "education" && <EducationContent />}
            {peakId === "contact" && <ContactContent />}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectsContent() {
  const { items } = PEAK_DATA.projects;
  return (
    <div className="space-y-5">
      {items.map((project, i) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          className="border border-white/8 p-5 hover:border-white/20 transition-colors group"
        >
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-heading font-semibold text-white text-base">{project.title}</h3>
            <div className="flex gap-2 shrink-0 ml-3 mt-0.5">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors cursor-pointer"
                aria-label="GitHub"
              >
                <GitHubIcon size={15} />
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-white transition-colors cursor-pointer"
                  aria-label="Live"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
          <p className="font-mono text-[9px] tracking-widest text-white/30 uppercase mb-3">{project.period}</p>
          <p className="text-white/55 text-sm leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[10px] text-white/40 border border-white/10 px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ExperienceContent() {
  const { items } = PEAK_DATA.experience;
  return (
    <div className="space-y-6">
      {items.map((job, i) => (
        <motion.div
          key={job.company}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          className="border-l border-white/15 pl-5"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
            <div>
              <h3 className="font-heading font-semibold text-white text-base">{job.role}</h3>
              <p className="text-white/50 text-sm">{job.company}</p>
            </div>
            <div className="mt-1 sm:mt-0 sm:text-right">
              <p className="font-mono text-[10px] text-white/35 tracking-wide">{job.period}</p>
              <p className="font-mono text-[10px] text-white/25">{job.location}</p>
            </div>
          </div>
          <ul className="space-y-1.5 mb-4">
            {job.bullets.map((b, bi) => (
              <li key={bi} className="text-white/50 text-sm leading-relaxed flex gap-2">
                <span className="text-white/20 shrink-0 mt-1">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {job.tags.map((t) => (
              <span key={t} className="font-mono text-[10px] text-white/35 border border-white/10 px-2 py-0.5">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SkillsContent() {
  const { groups } = PEAK_DATA.skills;
  return (
    <div className="space-y-6">
      {groups.map((group, i) => (
        <motion.div
          key={group.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.4 }}
        >
          <p className="font-mono text-[9px] tracking-[0.4em] text-white/35 uppercase mb-3">{group.name}</p>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="font-mono text-xs text-white/60 border border-white/12 px-3 py-1 hover:border-white/30 hover:text-white/80 transition-colors"
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

function EducationContent() {
  const d = PEAK_DATA.education;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <div className="border border-white/10 p-6 mb-5">
        <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
          <div>
            <h3 className="font-heading font-bold text-white text-xl mb-1">{d.degree}</h3>
            <p className="text-white/50">{d.school}</p>
          </div>
          <div className="mt-2 sm:mt-0 sm:text-right">
            <p className="font-mono text-[10px] text-white/35 tracking-wide">{d.period}</p>
            <p className="font-mono text-[10px] text-white/25">{d.location}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="font-mono text-[9px] tracking-[0.35em] text-white/30 uppercase mb-2">Minors</p>
          <div className="flex flex-wrap gap-2">
            {d.minors.map((m) => (
              <span key={m} className="font-mono text-xs text-white/50 border border-white/10 px-3 py-1">{m}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[9px] tracking-[0.35em] text-white/30 uppercase mb-2">Coursework</p>
          <div className="flex flex-wrap gap-2">
            {d.courses.map((c) => (
              <span key={c} className="font-mono text-xs text-white/50 border border-white/10 px-3 py-1">{c}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="font-mono text-[10px] text-white/25 tracking-wide">{d.note}</p>
    </motion.div>
  );
}

function ContactContent() {
  const d = PEAK_DATA.contact;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <p className="text-white/50 text-sm leading-relaxed">{d.availability}</p>
      <div className="space-y-3">
        <a
          href={`mailto:${d.email}`}
          className="flex items-center gap-3 p-4 border border-white/8 hover:border-white/25 transition-colors group cursor-pointer"
        >
          <Mail size={16} className="text-white/30 group-hover:text-white/70 transition-colors" />
          <span className="font-mono text-sm text-white/55 group-hover:text-white/80 transition-colors">
            {d.email}
          </span>
        </a>
        <a
          href={d.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border border-white/8 hover:border-white/25 transition-colors group cursor-pointer"
        >
          <GitHubIcon size={16} />
          <span className="font-mono text-sm text-white/55 group-hover:text-white/80 transition-colors">
            github.com/pgvaghela
          </span>
        </a>
        <a
          href={d.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-4 border border-white/8 hover:border-white/25 transition-colors group cursor-pointer"
        >
          <LinkedInIcon size={16} />
          <span className="font-mono text-sm text-white/55 group-hover:text-white/80 transition-colors">
            linkedin.com/in/priyanshvaghela
          </span>
        </a>
        <div className="flex items-center gap-3 p-4 border border-white/8">
          <MapPin size={16} className="text-white/30" />
          <span className="font-mono text-sm text-white/40">{d.location}</span>
        </div>
      </div>
    </motion.div>
  );
}
