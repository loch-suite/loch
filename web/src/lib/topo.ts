// Self-contained topographic background engine.
// Ported from Loom Macro. No external dependencies.
// Algorithm: domain-warped FBM → marching squares → Chaikin smoothing → canvas path.

const SEED_X = 42.0;
const SEED_Y = 73.5;

const GRID_W = 200;
const GRID_H = 150;
const FREQ_X = 1.8;
const FREQ_Y = 1.4;
const WARP   = 0.85;

export const TIME_SPEED = 0.025; // advances ~1 unit per 40 seconds

const ISO_LEVELS    = [0.28, 0.32, 0.36, 0.40, 0.44, 0.48, 0.52, 0.56, 0.60, 0.64, 0.68, 0.72];
const CHAIKIN_PASSES = 3;
const STROKE_COLOR  = 'rgba(255,255,255,0.13)';

// --- Noise ---

// Fast integer lattice hash → [0, 1)
function ihash(xi: number, yi: number, zi: number): number {
  let h = (((xi * 374761393) ^ (yi * 668265261) ^ (zi * 2147483647)) | 0);
  h = ((h ^ (h >>> 16)) * 0x45d9f3b) | 0;
  h = (h ^ (h >>> 16)) | 0;
  return (h >>> 0) / 4294967296;
}

function smoothstep(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

function valueNoise(x: number, y: number, z: number): number {
  const ix = Math.floor(x) | 0, iy = Math.floor(y) | 0, iz = Math.floor(z) | 0;
  const fx = x - ix, fy = y - iy, fz = z - iz;
  const ux = smoothstep(fx), uy = smoothstep(fy), uz = smoothstep(fz);

  return lerp(
    lerp(
      lerp(ihash(ix,   iy,   iz),   ihash(ix+1, iy,   iz),   ux),
      lerp(ihash(ix,   iy+1, iz),   ihash(ix+1, iy+1, iz),   ux), uy,
    ),
    lerp(
      lerp(ihash(ix,   iy,   iz+1), ihash(ix+1, iy,   iz+1), ux),
      lerp(ihash(ix,   iy+1, iz+1), ihash(ix+1, iy+1, iz+1), ux), uy,
    ),
    uz,
  );
}

function fbm(x: number, y: number, z: number, octaves: number): number {
  let v = 0, amp = 0.5, freq = 1, max = 0;
  for (let i = 0; i < octaves; i++) {
    v   += valueNoise(x * freq, y * freq, z * freq) * amp;
    max += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return v / max;
}

// --- Field sampling ---

function sampleField(t: number): Float32Array {
  const field = new Float32Array(GRID_W * GRID_H);
  for (let gy = 0; gy < GRID_H; gy++) {
    for (let gx = 0; gx < GRID_W; gx++) {
      const nx = (gx / GRID_W) * FREQ_X + SEED_X;
      const ny = (gy / GRID_H) * FREQ_Y + SEED_Y;
      // Domain warp: two offset FBM calls shift the sample position
      const wx = fbm(nx,       ny,       t, 2) * WARP;
      const wy = fbm(nx + 5.2, ny + 1.3, t, 2) * WARP;
      field[gy * GRID_W + gx] = fbm(nx + wx, ny + wy, t, 2);
    }
  }
  return field;
}

// --- Marching squares ---
// Corners: TL=bit3(8), TR=bit2(4), BR=bit1(2), BL=bit0(1)
// Edges:   0=top, 1=right, 2=bottom, 3=left

const CASES: ReadonlyArray<ReadonlyArray<[number, number]>> = [
  [],               // 0
  [[3, 2]],         // 1  BL
  [[2, 1]],         // 2  BR
  [[3, 1]],         // 3  BR+BL
  [[0, 1]],         // 4  TR
  [[0, 1], [3, 2]], // 5  TR+BL  (saddle)
  [[0, 2]],         // 6  TR+BR
  [[3, 0]],         // 7  TR+BR+BL
  [[0, 3]],         // 8  TL
  [[0, 2]],         // 9  TL+BL
  [[0, 3], [2, 1]], // 10 TL+BR  (saddle)
  [[0, 1]],         // 11 TL+BR+BL
  [[3, 1]],         // 12 TL+TR
  [[2, 1]],         // 13 TL+TR+BL
  [[3, 2]],         // 14 TL+TR+BR
  [],               // 15
];

// Returns flat segment array: [x1,y1,x2,y2, ...]  (grid-space coordinates)
function marchingSquares(field: Float32Array, level: number): number[] {
  const segs: number[] = [];

  for (let gy = 0; gy < GRID_H - 1; gy++) {
    for (let gx = 0; gx < GRID_W - 1; gx++) {
      const tl = field[ gy      * GRID_W + gx    ];
      const tr = field[ gy      * GRID_W + gx + 1];
      const br = field[(gy + 1) * GRID_W + gx + 1];
      const bl = field[(gy + 1) * GRID_W + gx    ];

      const idx = (tl > level ? 8 : 0) | (tr > level ? 4 : 0) |
                  (br > level ? 2 : 0) | (bl > level ? 1 : 0);

      const pairs = CASES[idx];
      if (pairs.length === 0) continue;

      // Compute the four possible edge intersections (only what's needed)
      const dTop    = tr - tl, dRight = br - tr, dBottom = br - bl, dLeft = bl - tl;
      const topX    = Math.abs(dTop)    > 1e-10 ? gx + (level - tl) / dTop    : gx + 0.5;
      const rightY  = Math.abs(dRight)  > 1e-10 ? gy + (level - tr) / dRight  : gy + 0.5;
      const bottomX = Math.abs(dBottom) > 1e-10 ? gx + (level - bl) / dBottom : gx + 0.5;
      const leftY   = Math.abs(dLeft)   > 1e-10 ? gy + (level - tl) / dLeft   : gy + 0.5;

      // edge index → (x, y) in grid space
      const ex = [topX,    gx + 1, bottomX, gx   ];
      const ey = [gy,      rightY, gy + 1,  leftY];

      for (const [a, b] of pairs) {
        segs.push(ex[a], ey[a], ex[b], ey[b]);
      }
    }
  }

  return segs;
}

// --- Segment chaining ---

function chainSegments(segs: number[]): Array<[number, number][]> {
  if (segs.length === 0) return [];

  const count = segs.length >> 2; // / 4
  const used  = new Uint8Array(count);

  // Build adjacency: endpoint key → [{segIndex, isStartPoint}]
  const adj = new Map<number, Array<{ si: number; start: boolean }>>();

  const key = (x: number, y: number): number =>
    // Pack two 16-bit fixed-point values into one number
    ((Math.round(x * 512) & 0xffff) * 65536) + (Math.round(y * 512) & 0xffff);

  for (let i = 0; i < count; i++) {
    const x1 = segs[i * 4], y1 = segs[i * 4 + 1];
    const x2 = segs[i * 4 + 2], y2 = segs[i * 4 + 3];
    const k1 = key(x1, y1), k2 = key(x2, y2);
    if (!adj.has(k1)) adj.set(k1, []);
    if (!adj.has(k2)) adj.set(k2, []);
    adj.get(k1)!.push({ si: i, start: true  });
    adj.get(k2)!.push({ si: i, start: false });
  }

  const getNext = (px: number, py: number): { ox: number; oy: number } | null => {
    for (const { si, start } of (adj.get(key(px, py)) ?? [])) {
      if (used[si]) continue;
      used[si] = 1;
      return {
        ox: start ? segs[si * 4 + 2] : segs[si * 4    ],
        oy: start ? segs[si * 4 + 3] : segs[si * 4 + 1],
      };
    }
    return null;
  };

  const chains: Array<[number, number][]> = [];

  for (let s = 0; s < count; s++) {
    if (used[s]) continue;
    used[s] = 1;

    const x1 = segs[s * 4], y1 = segs[s * 4 + 1];
    const x2 = segs[s * 4 + 2], y2 = segs[s * 4 + 3];
    const chain: [number, number][] = [[x1, y1], [x2, y2]];

    // Extend forward from chain end
    let fx = x2, fy = y2;
    for (;;) {
      const n = getNext(fx, fy);
      if (!n) break;
      chain.push([n.ox, n.oy]);
      fx = n.ox; fy = n.oy;
    }

    // Extend backward from chain start
    let bx = x1, by = y1;
    for (;;) {
      const n = getNext(bx, by);
      if (!n) break;
      chain.unshift([n.ox, n.oy]);
      bx = n.ox; by = n.oy;
    }

    if (chain.length >= 2) chains.push(chain);
  }

  return chains;
}

// --- Chaikin corner-cutting ---

function chaikin(pts: [number, number][]): [number, number][] {
  const n = pts.length;
  if (n < 3) return pts;
  const out: [number, number][] = [pts[0]];
  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    out.push(
      [0.75 * x0 + 0.25 * x1, 0.75 * y0 + 0.25 * y1],
      [0.25 * x0 + 0.75 * x1, 0.25 * y0 + 0.75 * y1],
    );
  }
  out.push(pts[n - 1]);
  return out;
}

function smoothChain(pts: [number, number][], passes: number): [number, number][] {
  for (let i = 0; i < passes; i++) pts = chaikin(pts);
  return pts;
}

// --- Public draw call ---

export function drawContoursAt(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  t: number,
): void {
  const w = canvas.width, h = canvas.height;
  if (w === 0 || h === 0) return;

  const scaleX = w / GRID_W;
  const scaleY = h / GRID_H;
  // Line width scales with canvas physical size (matching Loom Macro: max(0.6, 1.0 * scale))
  const scale  = Math.min(w / 2000, h / 1500);

  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = STROKE_COLOR;
  ctx.lineWidth   = Math.max(0.6, 1.0 * scale * window.devicePixelRatio);
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';

  const field = sampleField(t);

  // All iso-levels batched into a single path for performance
  ctx.beginPath();

  for (const level of ISO_LEVELS) {
    const segs   = marchingSquares(field, level);
    const chains = chainSegments(segs);
    for (let chain of chains) {
      chain = smoothChain(chain, CHAIKIN_PASSES);
      if (chain.length < 2) continue;
      ctx.moveTo(chain[0][0] * scaleX, chain[0][1] * scaleY);
      for (let i = 1; i < chain.length; i++) {
        ctx.lineTo(chain[i][0] * scaleX, chain[i][1] * scaleY);
      }
    }
  }

  ctx.stroke();
}
