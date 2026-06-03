---
name: project-loom-website
description: Loom official website — Astro 4 + React + Tailwind, full design system implemented
metadata:
  type: project
---

Built the official Loom website in `web/` subfolder of the loom repo.

**Tech:** Astro 4, React (client components), Tailwind CSS with Loom tokens, Framer Motion installed.

**Pages built:**
- `/` — Homepage (hero + 6-app suite grid + philosophy section)
- `/macro` — Fully populated Macro app page (features, node preview, screenshots, download CTA)
- `/downloads` — Suite installer concept UI (React, interactive app selection + bundle generation) + individual downloads table
- `/changelog` — Filterable timeline with Macro version history (v0.5–v1.0)
- `/about` — Brand story, principles (5 cards), data transparency mockup panel
- `/scheduler`, `/cookbook`, `/hardware`, `/developer`, `/finance` — Styled "Coming Soon" scaffolds with planned features

**Key brand elements:**
- `src/lib/topo.ts` — complete topo engine: domain-warped FBM, marching squares, Chaikin smoothing (3 passes), Catmull-Rom draw
- `src/components/TopoBackground.tsx` — React canvas component, `client:only="react"`, DPR-aware
- All exact token values from loom-tokens.json wired into tailwind.config.mjs and global.css CSS variables

**App color assignments:**
- Macro → trigger/orange #f97316
- Scheduler → flow/violet #8b5cf6
- Cookbook → sensor/emerald #10b981
- Hardware → action/blue #3b82f6
- Developer → variable/amber #f59e0b
- Finance → coord/cyan #22d3ee

**Why:** Finance needed a 6th color; cyan (#22d3ee) is in the design system as a pin type color.
**How to apply:** Always use these colors consistently across website + any future app-specific branding.

Build output: `web/dist/` — 10 static HTML pages, clean build verified.
