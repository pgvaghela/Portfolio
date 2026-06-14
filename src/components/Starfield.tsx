"use client";

import { useState } from "react";

// Deterministic seeded RNG so star positions are stable across renders (and
// React 19's component-purity rules — useState lazy init is allowed to be
// impure, plain Math.random in render is not).
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

/**
 * CSS-only starfield + soft galaxy haze for the hero background.
 * Lightweight (no canvas / no three.js), works behind the existing radial
 * glow without touching the 3D scene below.
 */
export default function Starfield() {
  const [stars] = useState(() => {
    const rng = makeRng(0xc0ffee);
    return Array.from({ length: 220 }, () => {
      const r = rng();
      // ~10% of stars are "bright" — bigger, more opaque, slower twinkle
      const bright = r > 0.9;
      return {
        x:        rng() * 100,
        y:        rng() * 100,
        size:     bright ? 1.6 + rng() * 1.5 : 0.5 + rng() * 1.2,
        opacity:  bright ? 0.85 + rng() * 0.15 : 0.35 + rng() * 0.45,
        delay:    rng() * 8,
        duration: 3.5 + rng() * 6,
        bright,
      };
    });
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* ── Distant galaxies — soft, blurred radial gradients drifting slowly ── */}
      <div
        className="absolute"
        style={{
          left: "12%", top: "18%",
          width: "36vw", height: "36vw",
          background:
            "radial-gradient(circle, rgba(150, 100, 220, 0.20) 0%, rgba(100, 60, 180, 0.08) 35%, transparent 70%)",
          filter: "blur(36px)",
          animation: "galaxy-drift-a 32s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="absolute"
        style={{
          left: "62%", top: "52%",
          width: "42vw", height: "42vw",
          background:
            "radial-gradient(circle, rgba(80, 130, 230, 0.18) 0%, rgba(50, 80, 160, 0.06) 35%, transparent 70%)",
          filter: "blur(48px)",
          animation: "galaxy-drift-b 40s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        className="absolute"
        style={{
          left: "48%", top: "6%",
          width: "28vw", height: "28vw",
          background:
            "radial-gradient(circle, rgba(220, 150, 110, 0.12) 0%, rgba(160, 90, 70, 0.04) 35%, transparent 70%)",
          filter: "blur(42px)",
          animation: "galaxy-drift-a 36s ease-in-out infinite",
          animationDelay: "-8s",
          willChange: "transform",
        }}
      />

      {/* ── Stars — each twinkles independently via CSS keyframes ── */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left:   `${s.x}%`,
            top:    `${s.y}%`,
            width:  s.size,
            height: s.size,
            opacity: s.opacity,
            boxShadow: s.bright
              ? `0 0 6px rgba(255,255,255,0.7), 0 0 12px rgba(180,200,255,0.4)`
              : undefined,
            animation: `star-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            willChange: "opacity, transform",
          }}
        />
      ))}
    </div>
  );
}
