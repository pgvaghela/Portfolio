"use client";

import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useRef } from "react";

export default function CameraRig() {
  const ref = useRef<OrbitControlsImpl>(null);

  return (
    <OrbitControls
      ref={ref}
      enableDamping
      dampingFactor={0.06}
      autoRotate
      autoRotateSpeed={0.28}
      enablePan={false}
      enableZoom={true}
      minDistance={6}
      maxDistance={26}
      maxPolarAngle={Math.PI / 2.1}
      minPolarAngle={Math.PI / 10}
      target={[0, 2, 0]}
    />
  );
}
