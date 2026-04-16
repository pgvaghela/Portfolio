"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Badge } from "@/components/ui/badge";

const skills = {
  Languages: ["Java", "Python", "TypeScript", "JavaScript", "C", "C# (.NET)", "C++", "Swift", "R"],
  "Frameworks & Libraries": ["Spring Boot", "FastAPI", "React", "Angular", "ASP.NET Core", "SwiftUI", "TensorFlow", "PyTorch"],
  "Data & Cloud": ["PostgreSQL", "MySQL", "pandas", "NumPy", "Airflow", "Docker", "Kubernetes", "AWS", "Azure DevOps"],
  "Testing & Tools": ["GitHub Actions", "JUnit", "PyTest", "Postman", "Tableau", "Grafana", "Git", "Linux/Unix"],
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="01. About" inView={inView} />

        <div className="mt-12 grid lg:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6 leading-tight">
              Building things that{" "}
              <span className="text-primary">actually work</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
              <p>
                I&apos;m a Computer Science student at the University of Arizona (May 2026),
                minoring in Entrepreneurship &amp; Innovation and Info Science &amp; Technology.
                I enjoy working across the full stack — from backend APIs and ML pipelines
                to polished front-end interfaces.
              </p>
              <p>
                I&apos;ve interned at Micron Technology building enterprise-grade Angular + .NET
                apps and at Quantara AI working with ML models, ETL pipelines, and real-time
                dashboards. I&apos;m also a Teaching Assistant for CS 110 at UofA.
              </p>
              <p>
                I care deeply about writing clean, maintainable code and shipping features
                that make a real difference — whether that&apos;s cutting manual work for
                stakeholders or improving model accuracy by a meaningful margin.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="font-mono text-primary">📍</span>
              <span>United States of America</span>
              <span className="text-border">|</span>
              <span className="font-mono text-primary">🎓</span>
              <span>University of Arizona, May 2026</span>
              <span className="text-border">|</span>
              <span className="font-mono text-primary">✅</span>
              <span>No sponsorship required (Green Card)</span>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="space-y-6"
          >
            {Object.entries(skills).map(([category, items], groupIdx) => (
              <div key={category}>
                <p className="text-xs font-mono text-primary tracking-widest uppercase mb-3">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <motion.div
                      key={skill}
                      custom={groupIdx * 9 + i}
                      variants={fadeUp}
                      initial="hidden"
                      animate={inView ? "show" : "hidden"}
                    >
                      <Badge
                        variant="secondary"
                        className="text-xs font-mono px-3 py-1 border border-border hover:border-primary/50 transition-colors"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ label, inView }: { label: string; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4"
    >
      <span className="font-mono text-primary text-sm whitespace-nowrap">{label}</span>
      <motion.div
        className="h-px bg-border flex-1"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      />
    </motion.div>
  );
}
