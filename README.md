# priyansh's portfolio

3d mountain scene built with react three fiber. each peak is a section of my resume — click one and a panel slides up. there's a campfire, falling snow, pine trees, an observatory, and a day/night toggle.

inspired by don toliver's octane site.

## stack

- next.js 16 + typescript
- react three fiber / drei / postprocessing
- motion (framer)
- tailwind v4
- shadcn/ui

## running it

needs node 20+

```bash
nvm use 20   # if needed
npm install
npm run dev
```

open [localhost:3000](http://localhost:3000)

## what's in the scene

- 5 interactive peaks — experience, projects, skills, education, contact
- procedural terrain with fbm + ridged noise for craggy rock faces
- 4 campfires spread across the range, falling snow, pine trees, rocks
- observatory on the skills peak — click it to scroll back to top
- day / night toggle (top right of the mountain section)
- postprocessing: bloom, vignette, film grain
