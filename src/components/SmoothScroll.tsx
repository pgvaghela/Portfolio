"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
