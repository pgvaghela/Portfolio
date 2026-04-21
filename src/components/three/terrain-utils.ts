export type PeakId = "experience" | "projects" | "skills" | "education" | "contact";

export interface Peak3D {
  id: PeakId;
  label: string;
  cx: number;
  cz: number;
  height: number;
  sigma: number;
}

export const PEAKS_3D: Peak3D[] = [
  { id: "experience", label: "Experience", cx: -10, cz: 1,    height: 3.8, sigma: 2.2 },
  { id: "projects",   label: "Projects",   cx: -4,  cz: -2,   height: 5.8, sigma: 2.5 },
  { id: "skills",     label: "Skills",     cx:  2,  cz:  1.5, height: 3.5, sigma: 2.0 },
  { id: "education",  label: "Education",  cx:  7,  cz: -1,   height: 3.0, sigma: 1.8 },
  { id: "contact",    label: "Contact",    cx: 12,  cz:  2,   height: 3.2, sigma: 1.9 },
];

// Non-labeled background hills for depth
const BG_HILLS = [
  { cx: -7,  cz: -8, height: 2.6, sigma: 3.2 },
  { cx:  3,  cz: -9, height: 2.3, sigma: 2.8 },
  { cx: 10,  cz: -8, height: 2.1, sigma: 2.6 },
  { cx: -13, cz: -5, height: 2.0, sigma: 2.4 },
  { cx:  0,  cz:  8, height: 1.2, sigma: 3.5 },
];

export function getHeight(x: number, z: number): number {
  let h = 0;

  for (const p of PEAKS_3D) {
    const dx = x - p.cx;
    const dz = z - p.cz;
    h += p.height * Math.exp(-(dx * dx + dz * dz) / (2 * p.sigma * p.sigma));
  }

  for (const b of BG_HILLS) {
    const dx = x - b.cx;
    const dz = z - b.cz;
    h += b.height * Math.exp(-(dx * dx + dz * dz) / (2 * b.sigma * b.sigma));
  }

  // Low-frequency undulation
  h += 0.28 * Math.sin(x * 0.38) * Math.cos(z * 0.51);
  h += 0.16 * Math.sin(x * 0.82 + 1.3) * Math.cos(z * 0.68 - 0.5);
  h += 0.10 * Math.sin(x * 1.25 - 0.7) * Math.cos(z * 1.10 + 0.3);

  return Math.max(0, h);
}
