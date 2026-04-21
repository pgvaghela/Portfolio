"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { getHeight } from "./terrain-utils";

const WORLD  = 32;
const SEG    = 160;           // higher res for craggy detail
const MAX_H  = 10.0;          // generous ceiling after FBM noise

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

/**
 * Near-monochrome dark warm-gray palette — matches the reference's
 * near-black rock with subtle gray highlights on ridges.
 */
function heightToRGB(y: number): [number, number, number] {
  const t = Math.min(1, y / MAX_H);

  if (t > 0.78) {
    // High ridges — light warm gray (catches directional light)
    const b = Math.min(1, (t - 0.78) / 0.22);
    return [lerp(0.22, 0.40, b), lerp(0.20, 0.36, b), lerp(0.18, 0.30, b)];
  }
  if (t > 0.50) {
    // Mid-upper face — dark charcoal
    const b = (t - 0.50) / 0.28;
    return [lerp(0.10, 0.22, b), lerp(0.09, 0.20, b), lerp(0.08, 0.18, b)];
  }
  if (t > 0.25) {
    // Mid slope — very dark warm gray
    const b = (t - 0.25) / 0.25;
    return [lerp(0.05, 0.10, b), lerp(0.045, 0.09, b), lerp(0.038, 0.08, b)];
  }
  if (t > 0.07) {
    // Lower slope — near-black
    const b = (t - 0.07) / 0.18;
    return [lerp(0.025, 0.05, b), lerp(0.022, 0.045, b), lerp(0.018, 0.038, b)];
  }
  // Valley floor — true black
  return [0.016, 0.014, 0.012];
}

export default function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(WORLD, WORLD, SEG, SEG);
    g.rotateX(-Math.PI / 2);

    const pos       = g.attributes.position as THREE.BufferAttribute;
    const colorData = new Float32Array(pos.count * 3);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = getHeight(x, z);
      pos.setY(i, y);

      const [r, gg, b] = heightToRGB(y);
      colorData[i * 3]     = r;
      colorData[i * 3 + 1] = gg;
      colorData[i * 3 + 2] = b;
    }

    g.setAttribute("color", new THREE.BufferAttribute(colorData, 3));
    g.computeVertexNormals();
    return g;
  }, []);

  return (
    <mesh geometry={geo} receiveShadow castShadow>
      <meshStandardMaterial
        vertexColors
        roughness={0.92}
        metalness={0.06}
        envMapIntensity={0.2}
      />
    </mesh>
  );
}
