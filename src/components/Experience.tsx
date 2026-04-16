"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionLabel } from "@/components/About";

const jobs = [
  {
    role: "AI / Data Analyst Intern",
    company: "Quantara AI",
    period: "May 2025 – Aug 2025",
    location: "Remote",
    description:
      "Cleaned 2M+ SQL records with pandas and built Airflow ETL DAGs with validation and alerting. Trained NLP/ML models in PyTorch/TensorFlow, improving validation score by 12%. Packaged a FastAPI model service in Docker and deployed to Kubernetes. Built React + D3 dashboards for leadership reporting, cutting manual chart updates.",
    technologies: ["Python", "SQL", "Airflow", "PyTorch", "TensorFlow", "Docker", "Kubernetes", "React", "D3.js"],
  },
  {
    role: "Software Engineering Intern",
    company: "Micron Technology",
    period: "May 2024 – Aug 2024",
    location: "Boise, ID",
    description:
      "Built an Angular + C# .NET app used by 200+ everyday users, integrating 10+ REST endpoints into core manufacturing workflows. Implemented 12 REST APIs with Swagger/OpenAPI docs. Improved Azure DevOps CI/CD pipelines and led UAT triage with stakeholders, resolving 50+ issues to unblock production sign-off.",
    technologies: ["Angular", "C# .NET", "ASP.NET Core", "Azure DevOps", "REST APIs", "Postman", "Swagger"],
  },
  {
    role: "Teaching Assistant — CS 110",
    company: "University of Arizona",
    period: "Jan 2024 – Present",
    location: "Tucson, AZ",
    description:
      "Lead weekly lab sessions for 30+ students, starting with lecture and hands-on Python programming tasks. Hold 4 office hours weekly, grade quizzes and exams, and support students with advanced Python coursework.",
    technologies: ["Python", "Tutoring", "Curriculum Design"],
  },
];

const education = {
  degree: "B.S. in Computer Science",
  school: "University of Arizona",
  period: "Aug 2022 – May 2026",
  location: "Tucson, AZ",
  details: "Minors: Entrepreneurship & Innovation, Info Sci & Tech",
  courses: ["OOP", "Systems Programming", "Algorithms", "Machine Learning", "Discrete Structures"],
};

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="03. Experience" inView={inView} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        {/* Jobs timeline */}
        <div className="relative">
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-px bg-border origin-top hidden md:block"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          />
          <div className="space-y-8 md:pl-10">
            {jobs.map((job, i) => (
              <TimelineItem key={`${job.company}-${i}`} job={job} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mt-16"
        >
          <p className="font-mono text-primary text-xs tracking-widest uppercase mb-6">Education</p>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="font-heading font-semibold text-foreground text-lg">{education.degree}</h3>
                <p className="text-primary font-medium text-sm">{education.school}</p>
                <p className="text-muted-foreground text-sm mt-0.5">{education.details}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-muted-foreground text-sm font-mono">{education.period}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{education.location}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {education.courses.map((c) => (
                <span key={c} className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TimelineItem({
  job,
  index,
  inView,
}: {
  job: (typeof jobs)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: 0.15 * index + 0.4,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className="relative group"
    >
      <motion.div
        className="absolute -left-[41px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-primary bg-background hidden md:block"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.15 * index + 0.5 }}
      />

      <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="font-heading font-semibold text-foreground text-lg">{job.role}</h3>
            <p className="text-primary font-medium text-sm">{job.company}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-muted-foreground text-sm font-mono">{job.period}</p>
            <p className="text-muted-foreground text-xs mt-0.5">{job.location}</p>
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{job.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {job.technologies.map((tech) => (
            <span key={tech} className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
