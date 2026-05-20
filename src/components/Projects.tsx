"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GitHubIcon } from "@/components/icons";
import { SectionLabel } from "@/components/About";

const projects = [
  {
    title: "Job Application Agent",
    period: "Apr – May 2026",
    description:
      "Agentic loop with Claude API tool use, web search, and iterative refinement over resume and cover letter drafts. Cut per-iteration token cost 90% via prompt caching. Added pgvector RAG for top-k chunk retrieval per JD. React + TypeScript replay dashboard with Overview, Resume Diff, Cover Letter, and Agent Trace tabs.",
    tags: ["Python", "FastAPI", "Claude API", "React", "TypeScript", "PostgreSQL", "Docker"],
    href: "https://github.com/pgvaghela/job-application-agent",
    live: null,
    accent: "#3B82F6",
  },
  {
    title: "Stock Trading Simulator",
    period: "Jun – Jul 2025",
    description:
      "Spring Boot + WebSocket trade simulator pushing live portfolio updates to React dashboard on every order. JPA schema for 5+ entities with transaction-safe order flows. Alpha Vantage pricing for 30+ tickers with rate-limit backoff. Deployed to AWS EC2 + RDS with CloudWatch monitoring.",
    tags: ["Java", "Spring Boot", "React", "WebSocket", "Docker", "AWS"],
    href: "https://github.com/pgvaghela/Stock-Trading-Simulator",
    live: null,
    accent: "#10B981",
  },
  {
    title: "ClearView News Dashboard",
    period: "Feb – Apr 2026",
    description:
      "Full-stack dashboard aggregating 50–100 daily articles with bias labels and source links. Ingestion pipeline pulls ~75 articles/day from 8 outlets via NewsAPI with cross-source deduplication. TF-IDF clustering groups articles by topic so the same story across outlets shows as one cluster.",
    tags: ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL"],
    href: "https://github.com/pgvaghela/ClearView-News-Dashboard",
    live: null,
    accent: "#8B5CF6",
  },
  {
    title: "Sorting Algorithm Optimizer",
    period: "Aug – Oct 2024",
    description:
      "Benchmarked 4+ sorting algorithms on 1M+ record datasets, recommending optimal choice per data distribution profile. C# ASP.NET Core service captures timings at 10ms intervals. Cut average sort time 40% vs single-algorithm baseline by dynamically selecting algorithm based on dataset features.",
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
