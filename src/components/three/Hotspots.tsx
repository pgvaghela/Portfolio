"use client";

import { Html } from "@react-three/drei";
import { PEAKS_3D, getHeight, type PeakId } from "./terrain-utils";

interface HotspotsProps {
  onPeakClick: (id: PeakId) => void;
}

export default function Hotspots({ onPeakClick }: HotspotsProps) {
  return (
    <>
      {PEAKS_3D.map((peak) => {
        const apexY = getHeight(peak.cx, peak.cz);
        return (
          <Html
            key={peak.id}
            position={[peak.cx, apexY + 0.55, peak.cz]}
            center
            distanceFactor={14}
            zIndexRange={[10, 0]}
          >
            <button
              onClick={() => onPeakClick(peak.id)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 7,
                padding: "6px 10px",
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              {/* Pulsing dot */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "rgba(130, 190, 255, 1)",
                  animation: "hs-pulse 2.2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              {/* Label */}
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  fontWeight: 700,
                  color: "rgba(190, 220, 255, 0.92)",
                  fontFamily: "'Space Grotesk', monospace",
                  textShadow: "0 0 12px rgba(100,170,255,0.9)",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  textTransform: "uppercase",
                }}
              >
                {peak.label}
              </span>
            </button>
          </Html>
        );
      })}
    </>
  );
}
