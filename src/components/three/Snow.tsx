"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BUILD_TIME  = 22;   // seconds until full snow density
const COUNT       = 2800;
const SPREAD      = 30;
const FALL_HEIGHT = 18;

export default function Snow() {
  const matRef = useRef<THREE.PointsMaterial>(null);

  const { geo, vel } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const v   = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 1] = Math.random() * FALL_HEIGHT;
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
      v[i * 3]       = (Math.random() - 0.5) * 0.12;
      v[i * 3 + 1]   = -(0.9 + Math.random() * 0.9);
      v[i * 3 + 2]   = (Math.random() - 0.5) * 0.10;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geo: g, vel: v };
  }, []);

  useFrame((state, delta) => {
    const attr = geo.attributes.position as THREE.BufferAttribute;
    const pos  = attr.array as Float32Array;
    const t    = state.clock.elapsedTime;
    const dt   = Math.min(delta, 0.05);

    // Progressive build-up: ease-in from ~5% to 70% opacity over BUILD_TIME
    if (matRef.current) {
      const progress = Math.min(1, t / BUILD_TIME);
      const eased    = progress * progress * (3 - 2 * progress); // smoothstep
      matRef.current.opacity = 0.04 + eased * 0.66;
    }

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const swayX = Math.sin(t * 0.38 + i * 0.041) * 0.22;
      const swayZ = Math.cos(t * 0.27 + i * 0.053) * 0.12;

      pos[i3]     += (vel[i3]     + swayX) * dt;
      pos[i3 + 1] += vel[i3 + 1] * dt;
      pos[i3 + 2] += (vel[i3 + 2] + swayZ) * dt;

      if (pos[i3 + 1] < -1.5) {
        pos[i3]     = (Math.random() - 0.5) * SPREAD;
        pos[i3 + 1] = FALL_HEIGHT + Math.random() * 3;
        pos[i3 + 2] = (Math.random() - 0.5) * SPREAD;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points geometry={geo}>
      <pointsMaterial
        ref={matRef}
        color="#ddeeff"
        size={0.055}
        transparent
        opacity={0.04}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
