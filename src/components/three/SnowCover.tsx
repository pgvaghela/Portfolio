"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getHeight } from "./terrain-utils";

const WORLD      = 32;
const SEG        = 160;
const BUILD_TIME = 30;   // seconds until snow reaches SNOW_FINAL
const SNOW_START = 11.5; // above all peaks — invisible initially
const SNOW_FINAL = 4.8;  // altitude where accumulation stops descending

export default function SnowCover() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(WORLD, WORLD, SEG, SEG);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(i, getHeight(x, z) + 0.025); // sit just above terrain surface
    }
    g.computeVertexNormals();
    return g;
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      uSnowLine: { value: SNOW_START },
    },
    vertexShader: `
      varying float vHeight;
      varying vec3  vNormal;
      void main() {
        vHeight = position.y;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uSnowLine;
      varying float vHeight;
      varying vec3  vNormal;
      void main() {
        // Steep faces shed snow — only near-flat surfaces accumulate
        float slopeFactor  = clamp(vNormal.y, 0.0, 1.0);
        float adjustedLine = uSnowLine + (1.0 - slopeFactor) * 2.2;
        float blend = smoothstep(adjustedLine, adjustedLine + 0.9, vHeight);
        if (blend < 0.015) discard;
        // Crisp white with slight blue tint, soft at edges
        vec3 snow = vec3(0.91, 0.94, 1.0);
        gl_FragColor = vec4(snow, blend * 0.94);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
  }), []);

  useFrame((state) => {
    const t       = state.clock.elapsedTime;
    const progress = Math.min(1, t / BUILD_TIME);
    const eased    = progress * progress * (3 - 2 * progress); // smoothstep
    material.uniforms.uSnowLine.value = SNOW_START - (SNOW_START - SNOW_FINAL) * eased;
  });

  return <mesh geometry={geo} material={material} />;
}
