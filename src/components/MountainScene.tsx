"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import PeakModal from "@/components/PeakModal";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import Starfield from "@/components/Starfield";
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
  // Always night — day/night toggle removed.
  const nightMode = true;

  return (
    <main style={{ background: "#000000" }}>

      {/* ── Section 1: Hero (black background with stars + galaxies) ───────── */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Starfield + drifting galaxy haze */}
        <Starfield />

        {/* Soft warm radial focal glow above the starfield */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 52%, rgba(120,140,210,0.10) 0%, transparent 65%)",
          }}
        />

        <div className="text-center px-6 z-10 flex flex-col items-center">
          <motion.p {...line(0)} className="font-mono text-[9px] sm:text-[10px] tracking-[0.5em] text-white/45 uppercase mb-5">
            Software Engineer
          </motion.p>
          <motion.h1
            {...line(1)}
            className="font-heading font-bold text-white leading-none tracking-tight mb-5"
            style={{
              fontSize: "clamp(2.4rem, 7.6vw, 6.6rem)",
              textShadow: "0 4px 40px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            Priyansh Vaghela
          </motion.h1>
          <motion.p {...line(2)} className="font-mono text-[9px] sm:text-[10px] tracking-[0.32em] text-white/45 uppercase mb-12">
            Computer Science&nbsp;·&nbsp;University of Arizona&nbsp;·&nbsp;&#x2019;26
          </motion.p>
          <motion.div {...line(3)} className="flex items-center justify-center gap-4">
            <LiquidButton
              size="lg"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/80 hover:text-white"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              Resume
            </LiquidButton>
            <LiquidButton
              size="lg"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/80 hover:text-white"
              onClick={() => { window.location.href = "mailto:pgvaghela20@gmail.com"; }}
            >
              Email
            </LiquidButton>
          </motion.div>
        </div>

        {/* ── Scroll indicator — larger, brighter, with radiating pulse rings ── */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.0 }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          aria-label="Scroll to mountain scene"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10 cursor-pointer group"
          style={{ background: "transparent", border: "none", padding: 0 }}
        >
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.55em] uppercase text-white/75 group-hover:text-white transition-colors duration-300">
            scroll to explore
          </span>
          <span className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
            {/* Pulsing rings */}
            <span
              className="absolute rounded-full"
              style={{
                width: 56, height: 56,
                border: "1px solid rgba(255,255,255,0.55)",
                animation: "scroll-ring 2.2s ease-out infinite",
              }}
            />
            <span
              className="absolute rounded-full"
              style={{
                width: 56, height: 56,
                border: "1px solid rgba(255,255,255,0.35)",
                animation: "scroll-ring 2.2s ease-out 1.1s infinite",
              }}
            />
            {/* Static inner circle with bouncing chevron */}
            <span
              className="absolute rounded-full flex items-center justify-center"
              style={{
                width: 46, height: 46,
                border: "1px solid rgba(255,255,255,0.55)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(6px)",
              }}
            >
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ display: "flex" }}
              >
                <ChevronDown size={22} strokeWidth={1.6} style={{ color: "rgba(255,255,255,0.95)" }} />
              </motion.span>
            </span>
          </span>
        </motion.button>

        {/* Bottom fade into the mountain section so the transition isn't a hard cut */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-[5]"
          style={{ background: "linear-gradient(to bottom, transparent, #000000)" }}
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
        {/* Top gradient fade from black */}
        <div
          className="pointer-events-none absolute top-0 left-0 right-0 h-32 z-10"
          style={{ background: "linear-gradient(to bottom, #000000, transparent)" }}
        />

        <MountainCanvas onPeakClick={setActivePeak} nightMode={nightMode} />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.2 }}
          viewport={{ once: true }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex items-center gap-5"
        >
          <span className="font-mono text-[8px] tracking-[0.45em] text-white/35 uppercase pointer-events-none">
            Click a peak to explore
          </span>
          <span className="text-white/20 pointer-events-none select-none">·</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-[8px] tracking-[0.45em] text-white/45 uppercase cursor-pointer transition-colors duration-200 hover:text-white/85"
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
