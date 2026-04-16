"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GitHubIcon } from "@/components/icons";
import { SectionLabel } from "@/components/About";

const projects = [
  {
    title: "LearnPython iOS App",
    period: "Jul – Aug 2025",
    description:
      "SwiftUI app with interactive Python labs, syntax highlighting, and timed execution limits. Implemented MVVM for progress persistence across 3 levels and 5 categories. CodeMirror via WebView connects to a FastAPI backend for live code execution and progress tracking.",
    tags: ["Swift", "SwiftUI", "FastAPI", "PostgreSQL", "JWT", "GitHub Actions"],
    href: "https://github.com/pgvaghela/learn-python-ios",
    live: null,
    accent: "#3B82F6",
  },
  {
    title: "Stock Trading Simulator",
    period: "Jun – Jul 2025",
    description:
      "Spring Boot + WebSocket trade simulator with low-latency order execution and live portfolio streaming. Integrated Alpha Vantage pricing with scheduled refresh and rate-limit handling. Deployed to AWS EC2 + RDS with CloudWatch monitoring.",
    tags: ["Java", "Spring Boot", "React", "Tailwind", "WebSocket", "Docker", "AWS"],
    href: "https://github.com/pgvaghela/Stock-Trading-Simulator",
    live: null,
    accent: "#10B981",
  },
  {
    title: "ClearView News Dashboard",
    period: "Feb 2026 – Present",
    description:
      "Dashboard aggregating multi-source headlines with daily trending stories. Story pages cluster coverage of one event and group Left/Center/Right viewpoints side-by-side. Includes bias label explanations and fact-check link integration.",
    tags: ["Python", "FastAPI", "React", "TypeScript"],
    href: "https://github.com/pgvaghela/ClearView-News-Dashboard",
    live: null,
    accent: "#8B5CF6",
  },
  {
    title: "Sorting Algorithm Optimizer",
    period: "Aug – Oct 2024",
    description:
      "Full-stack benchmarking tool for datasets of 1M+ records that recommends optimal sorting algorithms based on data distribution. Achieved a 40% reduction in average sort time by dynamically selecting algorithms per dataset profile.",
    tags: ["Angular", "TypeScript", "C#", "ASP.NET Core"],
    href: "https://github.com/pgvaghela/Sorting-Algorithm-Optimizer",
    live: null,
    accent: "#F59E0B",
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="02. Projects" inView={inView} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Things I&apos;ve Built
          </h2>
          <p className="text-muted-foreground text-[15px]">
            A selection of personal and academic projects.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.1 * index + 0.3,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -4 }}
      className="group relative bg-card border border-border rounded-xl overflow-hidden flex flex-col"
    >
      {/* Accent top bar */}
      <div
        className="h-px w-full transition-all duration-500 group-hover:h-[2px]"
        style={{ background: `linear-gradient(to right, ${project.accent}80, ${project.accent}10)` }}
      />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${project.accent}07 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-heading font-semibold text-lg text-foreground leading-tight pr-4">
            {project.title}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            <motion.a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <GitHubIcon size={16} />
            </motion.a>
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </div>
        </div>

        <p className="text-xs font-mono text-primary mb-3">{project.period}</p>

        <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-mono px-2 py-0.5 border border-border"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
