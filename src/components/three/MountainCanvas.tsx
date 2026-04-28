"use client";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import Terrain from "./Terrain";
import Atmosphere from "./Atmosphere";
import Campfires from "./Campfires";
import Hotspots from "./Hotspots";
import CameraRig from "./CameraRig";
import Observatory from "./Observatory";
import Snow from "./Snow";
import SnowCover from "./SnowCover";
import Trees from "./Trees";
import Rocks from "./Rocks";
import type { PeakId } from "./terrain-utils";

interface MountainCanvasProps {
  onPeakClick: (id: PeakId) => void;
  nightMode: boolean;
}

export default function MountainCanvas({ onPeakClick, nightMode }: MountainCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{
        antialias: true,
        toneMapping: nightMode ? THREE.ReinhardToneMapping : THREE.ACESFilmicToneMapping,
        toneMappingExposure: nightMode ? 0.68 : 1.05,
        powerPreference: "high-performance",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <PerspectiveCamera makeDefault position={[0, 3, 13]} fov={52} near={0.1} far={200} />

      <Atmosphere nightMode={nightMode} />
      <Terrain nightMode={nightMode} />
      <Trees />
      <Rocks />
      <Snow />
      <SnowCover />
      <Campfires nightMode={nightMode} />
      <Hotspots onPeakClick={onPeakClick} />
      <Observatory />
      <CameraRig />

      <EffectComposer>
        <Bloom
          intensity={nightMode ? 2.2 : 0.4}
          luminanceThreshold={nightMode ? 0.30 : 0.80}
          luminanceSmoothing={0.75}
          mipmapBlur
          radius={0.85}
        />
        <Vignette eskil={false} offset={0.12} darkness={nightMode ? 1.25 : 0.55} />
        <Noise
          premultiply
          blendFunction={BlendFunction.SOFT_LIGHT}
          opacity={nightMode ? 0.28 : 0.10}
        />
      </EffectComposer>
    </Canvas>
  );
}
