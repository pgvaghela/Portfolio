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

const BG_HILLS = [
  { cx: -7,  cz: -8, height: 2.6, sigma: 3.2 },
  { cx:  3,  cz: -9, height: 2.3, sigma: 2.8 },
  { cx: 10,  cz: -8, height: 2.1, sigma: 2.6 },
  { cx: -13, cz: -5, height: 2.0, sigma: 2.4 },
  { cx:  0,  cz:  8, height: 1.2, sigma: 3.5 },
];

// ── Noise primitives ──────────────────────────────────────────────────────────

/** Deterministic hash for a grid cell */
function h2(ix: number, iz: number): number {
  const n = Math.sin(ix * 127.1 + iz * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

/** Quintic ease (C2-continuous) */
function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }

/** Bilinear value noise, range [0, 1] */
function vn(x: number, z: number): number {
  const ix = Math.floor(x), iz = Math.floor(z);
  const fx = x - ix,       fz = z - iz;
  const ux = fade(fx),     uz = fade(fz);
  return (
    h2(ix,   iz  ) * (1 - ux) * (1 - uz) +
    h2(ix+1, iz  ) *      ux  * (1 - uz) +
    h2(ix,   iz+1) * (1 - ux) *      uz  +
    h2(ix+1, iz+1) *      ux  *      uz
  );
}

/** Fractal Brownian Motion — smooth layered noise */
function fbm(x: number, z: number, oct: number): number {
  let v = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < oct; i++) {
    v   += amp * vn(x * freq, z * freq);
    amp *= 0.52;
    freq *= 2.07;
  }
  return v; // ~[0, 1]
}

/** Ridged FBM — creates sharp rock ridges and cliff faces */
function ridgedFBM(x: number, z: number, oct: number): number {
  let v = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < oct; i++) {
    // 1 - |2n - 1| peaks at noise midpoints → sharp ridges
    v   += amp * (1 - Math.abs(2 * vn(x * freq, z * freq) - 1));
    amp *= 0.5;
    freq *= 1.95;
  }
  return v; // ~[0, 1]
}

// ── Height function ───────────────────────────────────────────────────────────

export function getHeight(x: number, z: number): number {
  // Base Gaussian envelope
  let h = 0;
  for (const p of PEAKS_3D) {
    const dx = x - p.cx, dz = z - p.cz;
    h += p.height * Math.exp(-(dx*dx + dz*dz) / (2 * p.sigma * p.sigma));
  }
  for (const b of BG_HILLS) {
    const dx = x - b.cx, dz = z - b.cz;
    h += b.height * Math.exp(-(dx*dx + dz*dz) / (2 * b.sigma * b.sigma));
  }

  // Scale factor — noise amplitude grows with elevation so valleys stay smooth
  const scale = Math.min(1, h / 2.8);

  // Rocky structure (broad)
  h += fbm(x * 0.48 + 1.3, z * 0.48 + 0.7, 5) * 1.4 * scale;

  // Sharp cliff ridges
  h += ridgedFBM(x * 0.72 + 2.1, z * 0.72 + 1.4, 4) * 1.0 * scale;

  // Fine surface texture
  h += fbm(x * 1.9 + 0.5, z * 1.9 + 0.9, 3) * 0.35 * scale;

  // Gentle base undulation (keeps valleys interesting)
  h += 0.22 * Math.sin(x * 0.38) * Math.cos(z * 0.51);
  h += 0.12 * Math.sin(x * 0.82 + 1.3) * Math.cos(z * 0.68 - 0.5);

  return Math.max(0, h);
}
