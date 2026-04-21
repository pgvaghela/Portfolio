"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { getHeight } from "./terrain-utils";

const WORLD = 32;
const SEG = 110;
const MAX_H = 5.8; // projects peak — used to normalise colour bands

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function heightToRGB(y: number): [number, number, number] {
  const t = Math.min(1, y / MAX_H);

  // Snow cap — bright ice blue → pure white
  if (t > 0.82) {
    const b = Math.min(1, (t - 0.82) / 0.18);
    return [lerp(0.80, 1.00, b), lerp(0.88, 1.00, b), lerp(1.00, 1.00, b)];
  }
  // Upper rock — steel-blue slate
  if (t > 0.56) {
    const b = (t - 0.56) / 0.26;
    return [lerp(0.24, 0.44, b), lerp(0.33, 0.55, b), lerp(0.52, 0.72, b)];
  }
  // Mid slope — rich navy-indigo
  if (t > 0.30) {
    const b = (t - 0.30) / 0.26;
    return [lerp(0.10, 0.24, b), lerp(0.15, 0.33, b), lerp(0.30, 0.52, b)];
  }
  // Low slope — deep ocean blue
  if (t > 0.08) {
    const b = (t - 0.08) / 0.22;
    return [lerp(0.04, 0.10, b), lerp(0.06, 0.15, b), lerp(0.12, 0.30, b)];
  }
  // Valley floor — near-black deep blue
  return [0.025, 0.04, 0.09];
}

export default function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(WORLD, WORLD, SEG, SEG);
    g.rotateX(-Math.PI / 2);

    const pos = g.attributes.position as THREE.BufferAttribute;
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
      <meshStandardMaterial vertexColors roughness={0.88} metalness={0.06} />
    </mesh>
  );
}
