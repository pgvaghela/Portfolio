"use client";

import { Stars } from "@react-three/drei";

export default function Atmosphere() {
  return (
    <>
      {/* Night ambient — deep blue */}
      <ambientLight color="#0c1828" intensity={3} />

      {/* Moonlight — cool directional */}
      <directionalLight
        color="#c0d4f4"
        intensity={2.2}
        position={[12, 22, 5]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Subtle fill from opposite side */}
      <directionalLight color="#162040" intensity={0.7} position={[-10, 6, -12]} />

      {/* Moon sphere */}
      <mesh position={[14, 24, -20]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#e4eeff"
          emissive="#b8cef8"
          emissiveIntensity={1.4}
          roughness={0.95}
          metalness={0}
        />
      </mesh>

      {/* Moon halo glow */}
      <pointLight color="#8ab0f0" intensity={4} position={[14, 24, -20]} distance={80} decay={2} />

      {/* Stars */}
      <Stars
        radius={90}
        depth={60}
        count={6000}
        factor={5}
        saturation={0.15}
        fade
        speed={0.25}
      />

      {/* Exponential distance fog */}
      <fogExp2 attach="fog" args={["#06090f", 0.022]} />
    </>
  );
}
