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
      dampingFactor={0.055}
      autoRotate
      autoRotateSpeed={0.22}
      enablePan={false}
      enableZoom={true}
      minDistance={5}
      maxDistance={22}
      // Allow looking from low-angle up through high-angle — matches reference's close, slightly upward view
      minPolarAngle={Math.PI / 12}
      maxPolarAngle={Math.PI / 2.05}
      target={[0, 2.5, 0]}
    />
  );
}
