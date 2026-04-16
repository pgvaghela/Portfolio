"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const socials = [
  { icon: GitHubIcon, href: "https://github.com/pgvaghela", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://linkedin.com/in/priyanshvaghela", label: "LinkedIn" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.56 0.244 264 / 12%) 0%, transparent 70%)",
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.65 0.18 290 / 8%) 0%, transparent 70%)",
          }}
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Greeting */}
        <motion.p
          variants={item}
          className="text-primary font-medium text-sm tracking-widest uppercase mb-4 font-mono"
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={item}
          className="font-heading font-bold text-5xl sm:text-7xl md:text-8xl text-foreground leading-none tracking-tight mb-4"
        >
          Priyansh Vaghela
        </motion.h1>

        {/* Title */}
        <motion.div variants={item} className="mb-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-muted-foreground">
            Software Engineer{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-foreground">&amp; CS Student</span>
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              />
            </span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10"
        >
          CS student at University of Arizona. I build full-stack web apps,
          ML pipelines, and iOS experiences — with a focus on clean code and real impact.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <motion.button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors cursor-pointer min-w-[160px]"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
          </motion.button>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors cursor-pointer min-w-[160px] text-center"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            View Resume
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={item} className="flex items-center justify-center gap-5">
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
          <motion.a
            href="mailto:pgvaghela20@gmail.com"
            aria-label="Email"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-mono text-xs"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            pgvaghela20@gmail.com
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
