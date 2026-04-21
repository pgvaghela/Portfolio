"use client";

import { Stars } from "@react-three/drei";

interface AtmosphereProps {
  nightMode: boolean;
}

export default function Atmosphere({ nightMode }: AtmosphereProps) {
  return nightMode ? <NightAtmosphere /> : <DayAtmosphere />;
}

// ── Night ─────────────────────────────────────────────────────────────────────
function NightAtmosphere() {
  return (
    <>
      {/* Scene background */}
      <color attach="background" args={["#080604"]} />

      {/* Near-zero ambient — fires are the only real source */}
      <ambientLight color="#1a1208" intensity={0.55} />

      {/* Dim warm fill to reveal rock topology without washing out drama */}
      <directionalLight
        color="#5a5040"
        intensity={0.9}
        position={[6, 20, 4]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.001}
      />

      {/* Counter-fill — keeps far faces slightly readable */}
      <directionalLight color="#1e1810" intensity={0.35} position={[-8, 8, -10]} />

      {/* Dense dark warm fog */}
      <fogExp2 attach="fog" args={["#0e0a06", 0.038]} />

      {/* Sparse stars visible through murk */}
      <Stars radius={70} depth={40} count={1800} factor={3} saturation={0} fade speed={0.15} />
    </>
  );
}

// ── Day ───────────────────────────────────────────────────────────────────────
function DayAtmosphere() {
  return (
    <>
      {/* Clear sky background */}
      <color attach="background" args={["#5a8fc4"]} />

      {/* Bright sky ambient — fills all surfaces */}
      <ambientLight color="#c8ddf0" intensity={3.0} />

      {/* Sun — high from upper right, warm white */}
      <directionalLight
        color="#fff6d8"
        intensity={5.5}
        position={[14, 28, 8]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.001}
      />

      {/* Sky bounce — soft cool light from opposite side */}
      <directionalLight color="#90b8e0" intensity={1.6} position={[-10, 14, -6]} />

      {/* Light distant haze */}
      <fogExp2 attach="fog" args={["#b0cce8", 0.010]} />
    </>
  );
}
