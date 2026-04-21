"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getHeight } from "./terrain-utils";

interface CampfireProps {
  cx?: number;
  cz?: number;
  /** Night = full intensity; Day = barely-visible embers */
  nightMode?: boolean;
  /** Small fires (extra ones) use reduced scale + intensity */
  small?: boolean;
}

export default function Campfire({
  cx = -0.5,
  cz =  2.8,
  nightMode = true,
  small = false,
}: CampfireProps) {
  const baseY = useMemo(() => getHeight(cx, cz), [cx, cz]);

  const lightRef  = useRef<THREE.PointLight>(null);
  const flameRef  = useRef<THREE.Mesh>(null);
  const innerRef  = useRef<THREE.Mesh>(null);
  const elapsed   = useRef(0);

  const baseIntensity = nightMode ? (small ? 10 : 16) : 0.4;
  const lightDist     = small ? 18 : 24;
  const scale         = small ? 0.72 : 1;

  useFrame((_, delta) => {
    elapsed.current += delta;
    const t = elapsed.current;

    if (lightRef.current) {
      const flicker =
        1 +
        0.45 * Math.sin(t * 8.1) +
        0.22 * Math.sin(t * 15.3) +
        0.12 * Math.sin(t * 24.7);
      lightRef.current.intensity = baseIntensity * Math.max(0.5, flicker);
    }

    if (flameRef.current) {
      flameRef.current.rotation.y = 0.25 * Math.sin(t * 3.2);
      flameRef.current.scale.y    = 1 + 0.18 * Math.sin(t * 11.1);
      flameRef.current.scale.x    = 1 + 0.08 * Math.sin(t * 7.4);
    }

    if (innerRef.current) {
      innerRef.current.scale.y = 1 + 0.22 * Math.sin(t * 13.7 + 1.1);
    }
  });

  return (
    <group position={[cx, baseY, cz]} scale={scale}>
      {/* Log cross */}
      {[0, Math.PI / 2].map((ry, i) => (
        <mesh key={i} position={[0, 0.04, 0]} rotation={[0, ry, Math.PI / 14]}>
          <cylinderGeometry args={[0.055, 0.075, 0.42, 7]} />
          <meshStandardMaterial color={i === 0 ? "#3a1d0c" : "#2b1508"} roughness={1} />
        </mesh>
      ))}

      {/* Stone ring */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh key={`stone-${i}`} position={[Math.cos(angle) * 0.14, 0.02, Math.sin(angle) * 0.14]}>
            <sphereGeometry args={[0.035, 6, 4]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
          </mesh>
        );
      })}

      {/* Outer flame */}
      <mesh ref={flameRef} position={[0, 0.26, 0]}>
        <coneGeometry args={[0.09, 0.38, 8, 1, true]} />
        <meshStandardMaterial
          color="#ff5c10"
          emissive="#ff3800"
          emissiveIntensity={nightMode ? 3.5 : 0.8}
          transparent
          opacity={nightMode ? 0.8 : 0.4}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Inner flame */}
      <mesh ref={innerRef} position={[0, 0.20, 0]}>
        <coneGeometry args={[0.045, 0.28, 6, 1, true]} />
        <meshStandardMaterial
          color="#ffcc00"
          emissive="#ffaa00"
          emissiveIntensity={nightMode ? 6 : 1.5}
          transparent
          opacity={nightMode ? 0.92 : 0.5}
          depthWrite={false}
        />
      </mesh>

      {/* Ember glow */}
      <mesh position={[0, 0.04, 0]}>
        <sphereGeometry args={[0.06, 8, 6]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff4400"
          emissiveIntensity={nightMode ? 4 : 1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Primary light */}
      <pointLight ref={lightRef} color="#ff6818" intensity={baseIntensity} distance={lightDist} decay={2} />
      {/* Near-field ember */}
      <pointLight color="#ff2a00" intensity={nightMode ? 4 : 0.2} distance={6} decay={2.5} />
    </group>
  );
}
