"use client";

import { useMemo } from "react";
import { getHeight, PEAKS_3D } from "./terrain-utils";

// Deterministic seeded random
function dr(s: number) {
  return (Math.abs(Math.sin(s * 127.1 + 311.7) * 43758.5453)) % 1;
}

interface TreeData {
  x: number; y: number; z: number; scale: number;
}

function buildTrees(): TreeData[] {
  const trees: TreeData[] = [];
  for (let i = 0; trees.length < 52 && i < 600; i++) {
    const x = (dr(i * 3 + 1) - 0.5) * 28;
    const z = (dr(i * 3 + 2) - 0.5) * 28;
    const h = getHeight(x, z);
    // Only on lower-mid slopes — not valley floors, not near summits
    if (h < 0.30 || h > 4.0) continue;
    // Keep clear of labeled peak centres
    const tooClose = PEAKS_3D.some((p) => {
      const dx = x - p.cx, dz = z - p.cz;
      return Math.sqrt(dx * dx + dz * dz) < 2.6;
    });
    if (tooClose) continue;
    trees.push({ x, z, y: h, scale: 0.52 + dr(i * 7) * 0.52 });
  }
  return trees;
}

// Dark blue-green foliage tiers for a moonlit night
const FOLIAGE = [
  { y: 0.62, r: 0.30, h: 0.68 },
  { y: 0.92, r: 0.22, h: 0.52 },
  { y: 1.16, r: 0.14, h: 0.38 },
];

function PineTree({ x, y, z, scale }: TreeData) {
  return (
    <group position={[x, y, z]} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.028, 0.042, 0.32, 6]} />
        <meshStandardMaterial color="#130c05" roughness={1} metalness={0} />
      </mesh>
      {/* Foliage tiers — slightly different shade each layer */}
      {FOLIAGE.map((f, i) => (
        <mesh key={i} position={[0, f.y, 0]} castShadow>
          <coneGeometry args={[f.r, f.h, 7]} />
          <meshStandardMaterial
            color={i === 0 ? "#05100a" : i === 1 ? "#071410" : "#091612"}
            roughness={0.95}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Trees() {
  const trees = useMemo(buildTrees, []);
  return (
    <>
      {trees.map((t, i) => (
        <PineTree key={i} {...t} />
      ))}
    </>
  );
}
