# Loom Design System

Canonical reference for all Loom suite products. Every value here is derived directly from the Loom Macro source — no inference or invention.

---

## Typography

### Font Stack
```
-apple-system, "Segoe UI Variable Text", "Segoe UI", system-ui, sans-serif
```
System font stack — renders as SF Pro on macOS, Segoe UI Variable on Windows. No web font is loaded.

Monospace (used for key names, variable names, template names, hex values):
```
monospace  (system default)
```

### Base Settings
| Property        | Value |
|-----------------|-------|
| Base size       | 13px  |
| Line height     | 1.5   |
| Font smoothing  | antialiased (`-webkit-font-smoothing`) |
| Text rendering  | `optimizeLegibility` |

### Size Scale & Purpose
| Size | Usage |
|------|-------|
| 9px  | Section header labels (uppercase), pin-type category badges, chevrons, tooltip sub-labels |
| 10px | Pin labels, dropdown items, sidebar panel headers, input labels, badge text, node category text |
| 11px | Titlebar app name, button labels in panels, run/stop buttons, input text (general) |
| 12px | Node body font size, arm button, run/stop primary actions |
| 13px | Body default (html/body) |

### Weight Usage
| Weight | Usage |
|--------|-------|
| 400    | General body text, pin labels, dropdown items |
| 600    | Node label in header, panel button labels |
| 700    | Section headers, arm/run/stop buttons, active tab labels, badge counts |

### Letter Spacing Conventions
| Value   | Usage |
|---------|-------|
| `0.02em` | Node label in header |
| `0.04em` | Debug toggle |
| `0.07em` | View toggle labels |
| `0.08em` | Run/Stop/Arm/Humanize button labels, macropicker labels |
| `0.1em`  | Node category text in header, sidebar section headers |
| `0.12em` | Titlebar app name "LOOM" |

All uppercase labels use `text-transform: uppercase` paired with `letter-spacing: 0.08em–0.12em`.

---

## Color System

### Surface Hierarchy (background ladder)

From deepest to most elevated:

| Token            | Hex         | Usage |
|------------------|-------------|-------|
| `--bg-base`      | `#0a0a0c`   | Canvas background, input backgrounds, deepest layer |
| `--bg-elevated`  | `#111114`   | Titlebar, sidebar, floating panels, dropdown menus |
| `--bg-raised`    | `#18181c`   | Node cards, interactive surface elements, toggle buttons |

These three levels create a warm near-black monochrome depth system. The warmth comes from the subtle violet component in the blue channel (`0c` vs `0a`, `14` vs `11`).

### Text

| Token               | Value                          | Usage |
|---------------------|--------------------------------|-------|
| `--text-primary`    | `#f5f5f7`                      | Primary content, active labels, headings |
| `--text-secondary`  | `rgba(245, 245, 247, 0.6)`     | Secondary content, pin labels (when connected) |
| `--text-muted`      | `rgba(245, 245, 247, 0.35)`    | Hints, placeholders, disabled states, section headers |
| `--accent`          | `#f5f5f7`                      | Same as primary; used as accent reference |

The base text color `#f5f5f7` is Apple's near-white — not pure `#ffffff`, giving a slightly warmer feel against the near-black backgrounds.

### Border / Divider

| Token              | Value                          | Usage |
|--------------------|--------------------------------|-------|
| `--border-subtle`  | `rgba(255, 255, 255, 0.08)`    | All structural borders — window, panels, nodes, inputs |
| `--border-faint`   | `rgba(255, 255, 255, 0.04)`    | Separator lines within panels, dividers |

The window shell itself uses `--border-subtle` at 1px. This creates a barely-visible but perceptible edge against dark system backgrounds.

### Node Category Accent Colors

These are the brand personality colors — one per logical category:

| Category   | Hex       | Tailwind equivalent | Usage |
|------------|-----------|---------------------|-------|
| `trigger`  | `#f97316` | orange-500          | Triggers, orange CTA (Run button) |
| `action`   | `#3b82f6` | blue-500            | Action nodes |
| `flow`     | `#8b5cf6` | violet-500          | Flow control nodes |
| `sensor`   | `#10b981` | emerald-500         | Sensor/read nodes |
| `variable` | `#f59e0b` | amber-500           | Variable nodes |

Category colors appear as: the left 3px border stripe on node headers, a subtle gradient wash in the header background (`${catColor}14` to transparent), and the node glow during execution.

### Pin Type Colors

Data pins use saturated but not harsh hues. Exec pins are near-white:

| Pin type  | Hex / value                  | Tailwind    | Shape    |
|-----------|------------------------------|-------------|----------|
| `exec`    | `rgba(255,255,255,0.75)`     | —           | Diamond  |
| `number`  | `#60a5fa`                    | blue-400    | Circle   |
| `coord`   | `#22d3ee`                    | cyan-400    | Circle   |
| `boolean` | `#4ade80`                    | green-400   | Circle   |
| `string`  | `#fb923c`                    | orange-400  | Circle   |
| `image`   | `#c084fc`                    | purple-400  | Circle   |
| `color`   | `#f472b6`                    | pink-400    | Circle   |
| `key`     | `#fbbf24`                    | amber-400   | Circle   |
| `button`  | `#94a3b8`                    | slate-400   | Circle   |
| `any`     | `rgba(255,255,255,0.45)`     | —           | Circle   |
| `varname` | `#f59e0b`                    | amber-500   | Circle   |
| `monitor` | `#64748b`                    | slate-500   | Circle   |

Pin glows use the pin color at `{color}80` opacity (50%).

### State / Semantic Colors

| State                     | Color                                           |
|---------------------------|-------------------------------------------------|
| Error / node error        | `rgba(239, 68, 68, 0.6)` ring, `rgba(239, 68, 68, 0.35)` glow |
| Error text                | `#f87171` (red-400)                             |
| Armed / active indicator  | `rgb(74, 222, 128)` / `#4ade80` (green-400)    |
| Armed glow                | `rgba(74, 222, 128, 0.6–1.0)`                  |
| Running / executing       | category color (orange `#f97316` for Run button) |
| Stop / destructive        | `rgb(248, 113, 113)` / `rgba(239, 68, 68, ...)`|
| Update available (dot)    | `rgb(249, 115, 22)` (orange-400)               |
| Update ready (dot)        | `rgb(74, 222, 128)` (green-400)                |
| Selection rectangle       | `rgba(234, 88, 12, 0.07)` fill, `rgba(234, 88, 12, 0.45)` border |
| Close button hover        | `rgba(229, 62, 62, 0.18)` bg, `#fc8181` icon  |
| View indicator pill       | `rgba(255, 255, 255, 0.07)`                    |

### Opacity Conventions

- `0.04` — faintest border/divider (`--border-faint`)
- `0.07` — barely-visible fill (drag-selection, view indicator)
- `0.08` — structural border (`--border-subtle`)
- `0.10–0.15` — active state background tints
- `0.18` — hover state (close button, color picker focus ring)
- `0.35` — muted text, deeper glow
- `0.45` — mid-opacity (selection border, any-pin)
- `0.60` — secondary text, border on error
- `0.75` — exec pin fill
- `0.85–1.0` — near-full opacity for key UI elements

---

## Spacing & Layout

### Fixed Dimensions
| Element         | Value |
|-----------------|-------|
| Sidebar width   | 240px |
| Titlebar height | 38px  |
| Titlebar btn    | 28 × 24px |
| Grid snap size  | 16px  |
| Node min-width  | 200px |
| Reroute node    | 20 × 20px |

### Padding Conventions
| Context                  | Padding |
|--------------------------|---------|
| Titlebar                 | 16px left, 6px right |
| Sidebar run controls     | 12px 14px |
| Sidebar section header   | 8px 14px |
| Sidebar panel content    | 0 14px 10px |
| Node header              | 7px 12px |
| Node pin row             | 4px 10px |
| Dropdown item            | 5px 9px |
| Small input              | 2px–4px 5px–8px |

### Gap Conventions
| Context                  | Gap |
|--------------------------|-----|
| Titlebar buttons         | 2px |
| Sidebar run control rows | 8px |
| Run/stop button pair     | 6px |
| Pin row internal         | 6–7px |
| Section headers          | 6px |
| Template/profile rows    | 3–4px |

### Border Radius
| Element                  | Radius  |
|--------------------------|---------|
| Window shell             | 10px (`--window-radius`) |
| Nodes                    | 8px     |
| Floating panels, pickers | 8px     |
| Dropdowns, legend panel  | 6–8px   |
| Buttons (major)          | 6px     |
| Inputs, small buttons    | 4px     |
| Chips / key badges       | 3px     |
| Pin dot (exec diamond)   | 2px (rotated 45°) |
| Pin dot (data)           | 50% (circle) |
| Scrollbar thumb          | 99px (full pill) |

### Border Width
All borders are 1px. The node left category stripe is 3px. No other border widths are used.

### Shadow / Glow Conventions

| Context                  | Shadow |
|--------------------------|--------|
| Window shell (floating)  | `0 24px 64px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.5)` |
| Node (default)           | `0 2px 8px rgba(0,0,0,0.4)` |
| Node (selected)          | `0 0 0 2px rgba(255,255,255,0.08), 0 4px 16px rgba(0,0,0,0.5)` |
| Node (executing)         | See `node-pulse` animation |
| Node (error)             | `0 0 0 2px rgba(239,68,68,0.6), 0 0 16px rgba(239,68,68,0.35), 0 4px 16px rgba(0,0,0,0.5)` |
| Dropdown / small popup   | `0 6px 16px rgba(0,0,0,0.5)` |
| Dropdown (larger)        | `0 8px 24px rgba(0,0,0,0.6)` |
| Legend / color picker    | `0 10px 28px rgba(0,0,0,0.65)` |
| Pin glow                 | `0 0 4px {pinColor}80` |
| Arm dot glow             | `0 0 6px rgba(74,222,128,0.6)` — `0 0 12px rgba(74,222,128,1)` |
| View pill                | `0 2px 10px rgba(0,0,0,0.45)` |

---

## Animation & Motion

### Topographic Background

The signature Loom background is an animated topographic contour map rendered on a `<canvas>` using CPU-side JavaScript.

**How it works:**

1. A 200×150 grid of scalar values is sampled from a 3D domain-warped fractional Brownian motion (FBM) noise field.
2. The third dimension `z` is time — it advances at `0.025/s`, giving an extremely slow ~40-second morphing cycle. Features feel alive but never call attention to themselves.
3. Twelve iso-levels (`0.28, 0.32, 0.36, 0.40, 0.44, 0.48, 0.52, 0.56, 0.60, 0.64, 0.68, 0.72`) are extracted using marching squares.
4. The raw segments are chained into contour polylines, then smoothed with 3 passes of Chaikin corner-cutting and drawn as Catmull-Rom splines.
5. All iso-levels are batched into a single canvas path per frame for performance.

**Key parameters:**
| Parameter        | Value | Effect |
|------------------|-------|--------|
| Grid             | 200 × 150 cells | Resolution — larger = smoother but slower |
| Virtual canvas   | 2000 × 1500 px | Topo space; scaled to fill actual canvas |
| Spatial freq X   | 1.8  | Controls horizontal blob scale |
| Spatial freq Y   | 1.4  | Controls vertical blob scale |
| FBM octaves      | 2+2  | 2 for warp field, 2 for output (intentionally smooth) |
| Warp strength    | 0.85 | Domain warp intensity |
| Time speed       | `0.025/s` | ~40s per coarse cycle |
| Iso-levels       | 12 levels, 0.28–0.72 | Number of contour lines |
| Stroke color     | `rgba(255,255,255,0.13)` | Line visibility |
| Line width       | `max(0.6, 1.0 × scale)` | Scales with canvas DPI |
| Smoothing passes | 3 Chaikin | Corner-cutting → B-spline limit |
| Interpolation    | Catmull-Rom | Smooth curve through control points |

**To reproduce in another project:**
- Copy `src/lib/topo.ts` — it is a self-contained module with no dependencies.
- Copy `src/components/shared/TopoBackground.tsx` — the React wrapper.
- The canvas uses `position: absolute; inset: 0; pointer-events: none; z-index: 0` so it sits behind all content.
- A random `SEED_X` / `SEED_Y` offset is computed at module load, so every session looks different.
- For a static website: the same `drawContoursAt` function works; call it in a `requestAnimationFrame` loop with the canvas element directly.

### Transition Durations & Easing

| Duration | Easing     | Usage |
|----------|------------|-------|
| 80ms     | linear     | Dropdown item hover background |
| 120ms    | ease       | Titlebar buttons, border-color, box-shadow, pin handle glow |
| 150ms    | ease       | View toggle color |
| 180ms    | ease       | Arm, Run, Stop, Humanize button state changes |
| 220ms    | `cubic-bezier(0.2, 0, 0, 1)` | Sidebar sliding panels (Framer Motion collapse/expand) |
| 300ms    | (fitView)  | React Flow fitView animation after profile load |

Spring used for view toggle indicator sliding background:
```
type: "spring", damping: 22, stiffness: 350
```

### Keyframe Animations

**`node-pulse`** — executing node ring (900ms, infinite)
```css
@keyframes node-pulse {
  0%, 100% {
    box-shadow:
      0 0 0 2px var(--node-ring),
      0 0 14px var(--node-glow),
      0 4px 16px rgba(0,0,0,0.5);
  }
  50% {
    box-shadow:
      0 0 0 4px var(--node-ring-hi),
      0 0 28px var(--node-glow-hi),
      0 4px 24px rgba(0,0,0,0.6);
  }
}
```
CSS variables `--node-ring`, `--node-ring-hi`, `--node-glow`, `--node-glow-hi` are set inline per-node using the category color.

**`arm-pulse`** — armed status indicator dot (1.8s, infinite)
```css
@keyframes arm-pulse {
  0%, 100% { box-shadow: 0 0 6px rgba(74,222,128,0.6); }
  50%       { box-shadow: 0 0 12px rgba(74,222,128,1), 0 0 24px rgba(74,222,128,0.4); }
}
```

**`stop-ring`** — stop button during active run (1.4s, infinite)
```css
@keyframes stop-ring {
  0%, 100% { box-shadow: inset 0 0 0 1px rgba(239,68,68,0.4), 0 0 0 0 rgba(239,68,68,0); }
  50%       { box-shadow: inset 0 0 0 1px rgba(239,68,68,0.7), 0 0 8px 2px rgba(239,68,68,0.2); }
}
```

**`capture-pulse`** — hotkey slot while recording (CSS animation)
```css
@keyframes capture-pulse {
  0%, 100% { border-color: rgba(255,255,255,0.28); }
  50%       { border-color: rgba(255,255,255,0.55); }
}
@keyframes capture-dot {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.3); }
}
```

**`spin`** — loading spinner
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Component Patterns

### Window Chrome

Loom runs frameless (Tauri `decorations: false`) with a custom chrome:

- **Shape**: `border-radius: 10px` on `.app-root`, `overflow: hidden`
- **Border**: `1px solid rgba(255,255,255,0.08)` — barely-visible structural edge
- **Shadow**: two-layer `box-shadow` — deep ambient + close ambient
- **Titlebar**: 38px tall, `var(--bg-elevated)`, `data-tauri-drag-region` for native drag
- **App name**: uppercase, `letter-spacing: 0.12em`, `font-size: 11px`, `var(--text-muted)` — intentionally quiet
- **Window buttons** (minimize/maximize/close): 28×24px, `border-radius: 4px`, transparent background, `var(--text-muted)` icons, hover → `var(--bg-raised)` + `var(--text-primary)`. Close hover is the only colored exception: `rgba(229,62,62,0.18)` bg + `#fc8181` icon.

### Sidebar Panel

- 240px wide, `var(--bg-elevated)`, `border-right: 1px solid var(--border-subtle)`
- Top section: fixed run controls at 12px 14px padding
- Collapsible sections below: each has an 8px 14px header button with uppercase label + rotating chevron, and `SlidingPanel` (height: 0 → auto, opacity: 0 → 1, 220ms ease)

### Node Card

Structure:
1. **Container**: `min-width: 200px`, `border-radius: 8px`, `var(--bg-raised)`, 1px border (see state colors), `box-shadow: 0 2px 8px rgba(0,0,0,0.4)`
2. **Header**: `padding: 7px 12px`, `border-left: 3px solid {catColor}`, `background: linear-gradient(90deg, {catColor}14 0%, transparent 60%)`, `border-bottom: 1px solid var(--border-faint)`
   - Category label: 9px, 700 weight, uppercase, `letter-spacing: 0.1em`, category color
   - Node label: 12px font (body default), 600 weight, `var(--text-primary)`, `letter-spacing: 0.02em`
3. **Body**: two-column flex, pin rows at `padding: 4px 10px` with 6px gap
4. **Pin handles**: 22×22px transparent hit area, 10×10px visual dot via `::after`, colored by `--pin-color` CSS variable
5. **Exec handles**: diamond shape via `clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`

Node states:
- Default: `border: 1px solid var(--border-subtle)`
- Selected: `border: 1px solid rgba(255,255,255,0.22)`, ring shadow
- Executing: category-colored pulsing border animation
- Error: red-toned glow

### Buttons

**Primary action buttons** (Run, Stop, Arm):
- `border-radius: 6px`, `padding: 7–8px 0`, `font-size: 12px`, `font-weight: 700`, `letter-spacing: 0.08em`, `text-transform: uppercase`
- Use category/semantic color at `0.12` opacity for background, `0.4` for border
- Disabled: same structure at `0.05` bg, `0.35–0.4` text opacity

**Titlebar buttons**: `28×24px`, `border-radius: 4px`, transparent bg, icon via SVG stroke

**Panel small buttons**: `border-radius: 4px`, `font-size: 10–11px`, `var(--bg-raised)` bg, `var(--border-subtle)` border

**Icon-only buttons**: `22×22px`, same visual treatment as panel small buttons

### Dropdown / Select Pattern

All dropdowns follow a consistent pattern:
- Trigger: full-width button, `var(--bg-base)` bg, `border-radius: 4px`; when open: `border-radius: 4px 4px 0 0`, border-bottom transparent
- Panel: `var(--bg-elevated)`, `border: 1px solid var(--border-subtle)`, no top border, `border-radius: 0 0 6px 6px`, `box-shadow: 0 6px 16px rgba(0,0,0,0.5)`
- Items: `padding: 5px 9px`, `font-size: 10px`, hover → `var(--bg-raised)`, `transition: background 80ms`
- Dividers: `height: 1px`, `background: var(--border-faint)`, `margin: 2px 0`
- "Action" items (add, record): `rgba(249,115,22,0.85)` color
- Selected indicator: `✓` at `font-size: 9px`, `var(--text-muted)`

### Input Fields

- Background: `var(--bg-base)`
- Border: `1px solid var(--border-subtle)`
- Border-radius: 4px
- Color: `var(--text-primary)`
- Font-size: 10–11px
- `outline: none` (custom focus via border-color change)
- Focus: `border-color: rgba(255,255,255,0.2)` or pin-color tint

### Scrollbar

```css
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }
```

### Section Header Labels (Uppercase Caps)

Used throughout the sidebar and legend:
```
font-size: 10px
font-weight: 700
letter-spacing: 0.1em
text-transform: uppercase
color: var(--text-muted)
```

### Legend / Tooltip Panel

- `width: 242px`, `background: var(--bg-elevated)`, `border: 1px solid var(--border-subtle)`, `border-radius: 8px`, `padding: 12px 14px`, `box-shadow: 0 10px 28px rgba(0,0,0,0.65)`
- Section headers: 9px, 700, `letter-spacing: 0.12em`, uppercase, `var(--text-muted)`
- Item rows: `gap: 7px`, `margin-bottom: 4px`
- Color swatch: 10×10px, `border-radius: 2px`, glow at `${color}80`

### Canvas (React Flow)

- Background: `var(--bg-base)` (the topo canvas sits above, controls sit on top)
- Node selection rectangle: `rgba(234,88,12,0.07)` fill, `rgba(234,88,12,0.45)` 1px border, `border-radius: 3px`
- Connection line while dragging: `rgba(255,255,255,0.5)`, `stroke-width: 2.5`
- Controls/minimap: override to match `var(--bg-elevated)` / `var(--border-subtle)`

---

## The Loom Aesthetic in Words

For any new product in the suite:

1. **Near-black warm monochrome** — backgrounds are not neutral gray but have a barely-warm cool undertone (`#0a0a0c` instead of `#0a0a0a`). The surfaces read as warm charcoal, not cold tech-gray.

2. **Everything is quiet except what matters** — text hierarchy uses `0.35` and `0.6` opacity on the base near-white. Only primary content and active states hit full opacity. The app name in the titlebar is `var(--text-muted)` on purpose.

3. **Color lives in data and state** — the background and chrome are nearly colorless. Color appears only on: node category stripes, pin types, and execution/error state. This gives data meaning without decoration.

4. **Soft glow, not hard outlines** — active states use `box-shadow` glows at 4–28px spread, never thick borders. The system feels organic.

5. **The background breathes** — the topographic animation is intentionally imperceptibly slow (40s cycle). It signals that something is alive without demanding attention.

6. **Ultra-compact UI** — 10–12px font sizes, 4–8px gaps, 1px borders. The UI respects that users are looking at their macro canvas, not the chrome.
