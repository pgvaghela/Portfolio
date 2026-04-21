"use client";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Terrain from "./Terrain";
import Atmosphere from "./Atmosphere";
import Campfire from "./Campfire";
import Hotspots from "./Hotspots";
import CameraRig from "./CameraRig";
import Observatory from "./Observatory";
import Snow from "./Snow";
import Trees from "./Trees";
import Rocks from "./Rocks";
import type { PeakId } from "./terrain-utils";

interface MountainCanvasProps {
  onPeakClick: (id: PeakId) => void;
}

export default function MountainCanvas({ onPeakClick }: MountainCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.85,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%", background: "#06090f" }}
    >
      <PerspectiveCamera makeDefault position={[0, 8, 18]} fov={50} near={0.1} far={200} />
      <Atmosphere />
      <Terrain />
      <Trees />
      <Rocks />
      <Snow />
      <Campfire />
      <Hotspots onPeakClick={onPeakClick} />
      <Observatory />
      <CameraRig />
      <EffectComposer>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.85}
          mipmapBlur
          radius={0.75}
        />
        <Vignette eskil={false} offset={0.18} darkness={1.0} />
      </EffectComposer>
    </Canvas>
  );
}
