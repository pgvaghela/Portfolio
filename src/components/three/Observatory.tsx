"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { getHeight } from "./terrain-utils";

// Sit on the skills peak summit — centre of the mountain range
const OX = 2;
const OZ = 1.5;
const BASE_Y = getHeight(OX, OZ);

export default function Observatory() {
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false);
  const interiorLightRef = useRef<THREE.PointLight>(null);
  const domeRef = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (interiorLightRef.current) {
      const base = hoveredRef.current ? 2.0 : 0.6;
      const flicker = base + 0.25 * Math.sin(elapsed.current * 3.2) + 0.1 * Math.sin(elapsed.current * 7.8);
      interiorLightRef.current.intensity = flicker;
    }
  });

  const over  = () => { hoveredRef.current = true;  setHovered(true);  document.body.style.cursor = "pointer"; };
  const out   = () => { hoveredRef.current = false; setHovered(false); document.body.style.cursor = "auto"; };
  const click = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };

  const stoneColor  = hovered ? "#2a334f" : "#18202e";
  const domeColor   = hovered ? "#2e4068" : "#1c2a44";
  const domeEmit    = hovered ? "#0e2050" : "#060e22";

  return (
    <group position={[OX, BASE_Y, OZ]}>

      {/* ── Stone base platform ─────────────────────────────────────────── */}
      <mesh receiveShadow castShadow onClick={click} onPointerOver={over} onPointerOut={out}>
        <cylinderGeometry args={[0.44, 0.50, 0.14, 16]} />
        <meshStandardMaterial color={stoneColor} roughness={0.92} metalness={0.12} />
      </mesh>

      {/* ── Cylindrical stone walls ─────────────────────────────────────── */}
      <mesh position={[0, 0.22, 0]} castShadow onClick={click} onPointerOver={over} onPointerOut={out}>
        <cylinderGeometry args={[0.33, 0.38, 0.30, 16]} />
        <meshStandardMaterial color={stoneColor} roughness={0.90} metalness={0.15} />
      </mesh>

      {/* Stone ring at dome base */}
      <mesh position={[0, 0.38, 0]} onClick={click} onPointerOver={over} onPointerOut={out}>
        <torusGeometry args={[0.33, 0.03, 8, 24]} />
        <meshStandardMaterial color={hovered ? "#3a4a6a" : "#242e42"} roughness={0.85} metalness={0.30} />
      </mesh>

      {/* ── Dome (top hemisphere) ────────────────────────────────────────── */}
      <mesh
        ref={domeRef}
        position={[0, 0.38, 0]}
        castShadow
        onClick={click}
        onPointerOver={over}
        onPointerOut={out}
      >
        {/* open-ended top hemisphere */}
        <sphereGeometry args={[0.33, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={domeColor}
          roughness={0.30}
          metalness={0.75}
          emissive={domeEmit}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Dome slit — darker strip that rotates to face camera roughly */}
      <mesh position={[0.26, 0.52, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.035, 0.22, 4, 8]} />
        <meshStandardMaterial color="#05080f" roughness={1} metalness={0} />
      </mesh>

      {/* ── Telescope barrel ────────────────────────────────────────────── */}
      <mesh position={[0.20, 0.54, 0]} rotation={[0, 0, -Math.PI / 5]} castShadow>
        <cylinderGeometry args={[0.018, 0.024, 0.28, 10]} />
        <meshStandardMaterial color="#3a4460" roughness={0.45} metalness={0.85} />
      </mesh>
      {/* Eyepiece end cap */}
      <mesh position={[0.30, 0.62, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <cylinderGeometry args={[0.026, 0.020, 0.04, 10]} />
        <meshStandardMaterial color="#606880" roughness={0.4} metalness={0.9} />
      </mesh>

      {/* ── Small windows on cylinder walls ─────────────────────────────── */}
      {[0, Math.PI * 2 / 3, Math.PI * 4 / 3].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 0.34,
            0.22,
            Math.sin(angle) * 0.34,
          ]}
        >
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial
            color="#a0c4ff"
            emissive="#6090ff"
            emissiveIntensity={hovered ? 3.5 : 1.2}
          />
        </mesh>
      ))}

      {/* ── Interior glow ────────────────────────────────────────────────── */}
      <pointLight
        ref={interiorLightRef}
        color="#5090ff"
        intensity={0.6}
        distance={4.5}
        decay={2}
        position={[0, 0.42, 0]}
      />

      {/* Constant ambient fill for the building itself */}
      <pointLight color="#2050a0" intensity={0.3} distance={2} decay={2} position={[0, 0.2, 0]} />

      {/* ── Hover tooltip ────────────────────────────────────────────────── */}
      {hovered && (
        <Html center position={[0, 1.05, 0]} distanceFactor={13} zIndexRange={[20, 0]}>
          <div
            onClick={click}
            style={{
              background: "linear-gradient(135deg, rgba(10,14,28,0.95), rgba(7,10,20,0.97))",
              border: "1px solid rgba(70,120,255,0.35)",
              borderRadius: "10px",
              padding: "7px 14px",
              fontSize: "9px",
              letterSpacing: "0.18em",
              color: "rgba(155,195,255,0.92)",
              fontFamily: "'Space Grotesk', monospace",
              fontWeight: 700,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              backdropFilter: "blur(12px)",
              boxShadow: "0 0 20px rgba(60,110,255,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            ↑ &nbsp;Back to top
          </div>
        </Html>
      )}
    </group>
  );
}
