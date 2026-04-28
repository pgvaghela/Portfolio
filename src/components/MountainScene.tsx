"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, ChevronDown } from "lucide-react";
import PeakModal from "@/components/PeakModal";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import type { PeakId } from "@/components/three/terrain-utils";

const MountainCanvas = dynamic(
  () => import("@/components/three/MountainCanvas"),
  { ssr: false, loading: () => null }
);

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const line = (i: number) => ({
  initial: { opacity: 0, y: 18 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay: 0.25 + i * 0.14, ease },
});

export default function MountainScene() {
  const [activePeak, setActivePeak] = useState<PeakId | null>(null);
  const [nightMode,  setNightMode]  = useState(true);

  return (
    <main style={{ background: "#06090f" }}>

      {/* ── Section 1: Hero ─────────────────────────────────────────────────── */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 45% at 50% 52%, rgba(55,85,180,0.09) 0%, transparent 68%)",
          }}
        />

        <div className="text-center px-6 z-10 flex flex-col items-center">
          <motion.p {...line(0)} className="font-mono text-[9px] sm:text-[10px] tracking-[0.5em] text-white/30 uppercase mb-5">
            priyanshsinh vaghela
          </motion.p>
          <motion.h1 {...line(1)} className="font-heading font-bold text-white leading-none tracking-tight mb-5" style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}>
            Software Engineer
          </motion.h1>
          <motion.p {...line(2)} className="font-mono text-[9px] sm:text-[10px] tracking-[0.32em] text-white/28 uppercase mb-12">
            Computer Science&nbsp;·&nbsp;University of Arizona&nbsp;·&nbsp;&#x2019;26
          </motion.p>
          <motion.div {...line(3)} className="flex items-center justify-center gap-4">
            <LiquidButton
              size="lg"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/70 hover:text-white"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              Resume
            </LiquidButton>
            <LiquidButton
              size="lg"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/70 hover:text-white"
              onClick={() => { window.location.href = "mailto:pgvaghela20@gmail.com"; }}
            >
              Email
            </LiquidButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1.0 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-10"
        >
          <span className="font-mono text-[7px] tracking-[0.45em] text-white/30 uppercase">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ChevronDown size={18} strokeWidth={1.4} style={{ color: "rgba(255,255,255,0.65)" }} />
          </motion.div>
        </motion.div>

        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-36"
          style={{ background: "linear-gradient(to bottom, transparent, #06090f)" }}
        />
      </section>

      {/* ── Section 2: 3D Mountain ───────────────────────────────────────────── */}
      <motion.section
        className="relative w-full h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.4, ease }}
        viewport={{ once: true, amount: 0.12 }}
      >
        {/* Top gradient fade */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-28 z-10"
          style={{ background: "linear-gradient(to bottom, #06090f, transparent)" }}
        />

        <MountainCanvas onPeakClick={setActivePeak} nightMode={nightMode} />

        {/* ── Day / Night toggle ─────────────────────────────────────────────── */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.0 }}
          viewport={{ once: true }}
          onClick={() => setNightMode((n) => !n)}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 cursor-pointer
                     font-mono text-[9px] tracking-[0.3em] uppercase
                     transition-all duration-300"
          style={{
            padding: "8px 14px",
            borderRadius: "10px",
            background: nightMode
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.18)",
            border: nightMode
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(0,0,0,0.22)",
            color: nightMode ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
            backdropFilter: "blur(10px)",
          }}
        >
          <AnimatePresence mode="wait">
            {nightMode ? (
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 30 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2"
              >
                <Sun size={12} strokeWidth={2} />
                Day
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: 30 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -30 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2"
              >
                <Moon size={12} strokeWidth={2} />
                Night
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.2 }}
          viewport={{ once: true }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex items-center gap-5"
        >
          <span className="font-mono text-[8px] tracking-[0.45em] text-white/20 uppercase pointer-events-none">
            Click a peak to explore
          </span>
          <span className="text-white/15 pointer-events-none select-none">·</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-[8px] tracking-[0.45em] text-white/30 uppercase cursor-pointer transition-colors duration-200 hover:text-white/60"
          >
            ↑ go back to top
          </button>
        </motion.div>
      </motion.section>

      {activePeak && (
        <PeakModal peakId={activePeak} onClose={() => setActivePeak(null)} />
      )}
    </main>
  );
}
