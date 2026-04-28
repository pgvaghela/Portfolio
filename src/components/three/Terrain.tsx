"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { getHeight } from "./terrain-utils";

const WORLD  = 32;
const SEG    = 160;
const MAX_H  = 10.0;

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function nightHeightToRGB(y: number): [number, number, number] {
  const t = Math.min(1, y / MAX_H);
  if (t > 0.78) {
    const b = Math.min(1, (t - 0.78) / 0.22);
    return [lerp(0.22, 0.40, b), lerp(0.20, 0.36, b), lerp(0.18, 0.30, b)];
  }
  if (t > 0.50) {
    const b = (t - 0.50) / 0.28;
    return [lerp(0.10, 0.22, b), lerp(0.09, 0.20, b), lerp(0.08, 0.18, b)];
  }
  if (t > 0.25) {
    const b = (t - 0.25) / 0.25;
    return [lerp(0.05, 0.10, b), lerp(0.045, 0.09, b), lerp(0.038, 0.08, b)];
  }
  if (t > 0.07) {
    const b = (t - 0.07) / 0.18;
    return [lerp(0.025, 0.05, b), lerp(0.022, 0.045, b), lerp(0.018, 0.038, b)];
  }
  return [0.016, 0.014, 0.012];
}

function dayHeightToRGB(y: number): [number, number, number] {
  const t = Math.min(1, y / MAX_H);
  if (t > 0.78) {
    // High ridges — light bare rock, almost white
    const b = Math.min(1, (t - 0.78) / 0.22);
    return [lerp(0.54, 0.76, b), lerp(0.52, 0.73, b), lerp(0.48, 0.68, b)];
  }
  if (t > 0.50) {
    // Upper slopes — cool gray-brown rock
    const b = (t - 0.50) / 0.28;
    return [lerp(0.40, 0.54, b), lerp(0.36, 0.52, b), lerp(0.30, 0.48, b)];
  }
  if (t > 0.25) {
    // Mid slope — warm earthy brown
    const b = (t - 0.25) / 0.25;
    return [lerp(0.34, 0.40, b), lerp(0.25, 0.36, b), lerp(0.16, 0.30, b)];
  }
  if (t > 0.07) {
    // Lower slope — richer brown soil
    const b = (t - 0.07) / 0.18;
    return [lerp(0.20, 0.34, b), lerp(0.15, 0.25, b), lerp(0.09, 0.16, b)];
  }
  // Valley floor — dark earth
  return [0.14, 0.10, 0.06];
}

export default function Terrain({ nightMode }: { nightMode: boolean }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(WORLD, WORLD, SEG, SEG);
    g.rotateX(-Math.PI / 2);

    const pos       = g.attributes.position as THREE.BufferAttribute;
    const colorData = new Float32Array(pos.count * 3);

    const toRGB = nightMode ? nightHeightToRGB : dayHeightToRGB;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = getHeight(x, z);
      pos.setY(i, y);

      const [r, gg, b] = toRGB(y);
      colorData[i * 3]     = r;
      colorData[i * 3 + 1] = gg;
      colorData[i * 3 + 2] = b;
    }

    g.setAttribute("color", new THREE.BufferAttribute(colorData, 3));
    g.computeVertexNormals();
    return g;
  }, [nightMode]);

  return (
    <mesh geometry={geo} receiveShadow castShadow>
      <meshStandardMaterial
        vertexColors
        roughness={nightMode ? 0.92 : 0.82}
        metalness={nightMode ? 0.06 : 0.05}
        envMapIntensity={nightMode ? 0.2 : 0.55}
      />
    </mesh>
  );
}
