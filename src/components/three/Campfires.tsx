"use client";

import Campfire from "./Campfire";

// Spread fires across the mountain range for broad warm illumination
const FIRES = [
  { cx: -0.5,  cz:  2.8, small: false }, // centre valley  — main fire
  { cx: -7.5,  cz:  2.0, small: true  }, // experience slope
  { cx:  5.0,  cz:  2.5, small: true  }, // skills / education ridge
  { cx:  9.5,  cz: -2.5, small: true  }, // contact approach
];

export default function Campfires({ nightMode }: { nightMode: boolean }) {
  return (
    <>
      {FIRES.map((f, i) => (
        <Campfire key={i} cx={f.cx} cz={f.cz} nightMode={nightMode} small={f.small} />
      ))}
    </>
  );
}
