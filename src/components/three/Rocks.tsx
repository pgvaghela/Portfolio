"use client";

import { useMemo } from "react";
import { getHeight, PEAKS_3D } from "./terrain-utils";

function dr(s: number) {
  return (Math.abs(Math.sin(s * 91.3 + 227.1) * 43758.5453)) % 1;
}

interface RockData {
  x: number; y: number; z: number;
  sx: number; sy: number; sz: number;
  ry: number;
}

function buildRocks(): RockData[] {
  const rocks: RockData[] = [];
  for (let i = 0; rocks.length < 40 && i < 500; i++) {
    const x = (dr(i * 5 + 1) - 0.5) * 26;
    const z = (dr(i * 5 + 2) - 0.5) * 26;
    const h = getHeight(x, z);
    // Rocks on mid-to-upper slopes
    if (h < 0.8 || h > 6.5) continue;
    const tooClose = PEAKS_3D.some((p) => {
      const dx = x - p.cx, dz = z - p.cz;
      return Math.sqrt(dx * dx + dz * dz) < 1.4;
    });
    if (tooClose) continue;
    const baseSize = 0.06 + dr(i * 11) * 0.13;
    rocks.push({
      x, z,
      y: h + baseSize * 0.5,
      sx: baseSize * (0.8 + dr(i * 13) * 0.8),
      sy: baseSize * (0.5 + dr(i * 17) * 0.6),
      sz: baseSize * (0.7 + dr(i * 19) * 0.9),
      ry: dr(i * 23) * Math.PI * 2,
    });
  }
  return rocks;
}

export default function Rocks() {
  const rocks = useMemo(buildRocks, []);
  return (
    <>
      {rocks.map((r, i) => (
        <mesh
          key={i}
          position={[r.x, r.y, r.z]}
          rotation={[dr(i * 31) * 0.4, r.ry, dr(i * 37) * 0.3]}
          scale={[r.sx, r.sy, r.sz]}
          castShadow
          receiveShadow
        >
          {/* Low-poly sphere gives craggy rock silhouette */}
          <sphereGeometry args={[1, 5, 4]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#111520" : i % 3 === 1 ? "#0e1218" : "#131825"}
            roughness={0.97}
            metalness={0.08}
          />
        </mesh>
      ))}
    </>
  );
}
