import { useEffect, useRef } from 'react';

export default function GeoDecor() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;

    function draw() {
      if (!canvas) return;
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';

      const ctx = canvas.getContext('2d')!;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      const M   = 58;   // edge margin
      const S   = 22;   // dot grid spacing
      const NAV = 72;   // nav bar clearance

      // ── Dot matrices ───────────────────────────────────────────────
      const dots = (ox: number, oy: number, cols: number, rows: number, step: number, op: number) => {
        ctx.fillStyle = `rgba(245,245,247,${op})`;
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            ctx.beginPath();
            ctx.arc(ox + c * step, oy + r * step, 1.25, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      };

      dots(M,            NAV,              20, 11, S, 0.07);  // top-left
      dots(W - M - 14*S, H - M - 8*S,    14,  8, S, 0.06);  // bottom-right
      dots(W - M - 9*S,  NAV,              9,  6, S, 0.055); // top-right
      dots(M,            H / 2 - 4 * S,   5,  9, S, 0.045); // left-center strip

      // ── Structured plus signs ──────────────────────────────────────
      // Pluses are placed in aligned columns (left/right edges) and rows
      // (top/bottom edges) with a small deterministic jitter — NOT random.

      ctx.lineWidth = 0.9;
      ctx.lineCap   = 'round';

      const plus = (x: number, y: number, arm: number, op: number) => {
        ctx.strokeStyle = `rgba(245,245,247,${op})`;
        ctx.beginPath();
        ctx.moveTo(x - arm, y); ctx.lineTo(x + arm, y);
        ctx.moveTo(x, y - arm); ctx.lineTo(x, y + arm);
        ctx.stroke();
      };

      // Deterministic micro-jitter: sin-based, no LCG needed
      const jx = (seed: number) => Math.sin(seed * 47.3)  * 3.5;
      const jy = (seed: number) => Math.cos(seed * 131.7) * 3.5;

      // Column helper: vertical line of alternating large/small pluses
      const column = (cx: number, yStart: number, yEnd: number, step: number,
                       armLg: number, armSm: number, op: number, seedBase: number) => {
        let i = 0;
        for (let y = yStart; y <= yEnd; y += step) {
          const arm = i % 2 === 0 ? armLg : armSm;
          const o   = i % 2 === 0 ? op    : op * 0.65;
          plus(cx + jx(seedBase + i), y + jy(seedBase + i), arm, o);
          i++;
        }
      };

      // Row helper: horizontal line of alternating large/small pluses
      const row = (cy: number, xStart: number, xEnd: number, step: number,
                    armLg: number, armSm: number, op: number, seedBase: number) => {
        let i = 0;
        for (let x = xStart; x <= xEnd; x += step) {
          const arm = i % 2 === 0 ? armLg : armSm;
          const o   = i % 2 === 0 ? op    : op * 0.65;
          plus(x + jx(seedBase + i), cy + jy(seedBase + i), arm, o);
          i++;
        }
      };

      const COL_STEP = 92;   // vertical rhythm for column pluses
      const ROW_STEP = 108;  // horizontal rhythm for row pluses

      // Right edge: outer column (larger) + inner column (smaller, offset by half-step)
      column(W - 128, 132, H - 132, COL_STEP,  8.5, 5.0, 0.09, 10);
      column(W - 72,  132 + COL_STEP/2, H - 132, COL_STEP,  5.5, 3.5, 0.07, 20);

      // Left edge: mirrored
      column(128,  132, H - 132, COL_STEP,  8.5, 5.0, 0.09, 30);
      column(72,   132 + COL_STEP/2, H - 132, COL_STEP,  5.5, 3.5, 0.07, 40);

      // Top edge row — starts well past the corner dot matrices
      row(NAV + 28, M + 22*S + 24, W - M - 9*S - 24, ROW_STEP,  8.0, 5.0, 0.07, 50);

      // Bottom edge row
      row(H - M - 8*S - 24, M + 24, W - M - 24, ROW_STEP,  7.5, 4.5, 0.06, 60);

      // ── Corner brackets ────────────────────────────────────────────
      const arm = 28;
      const cm  = 38;
      ctx.lineWidth   = 1.2;
      ctx.lineCap     = 'square';
      ctx.strokeStyle = 'rgba(245,245,247,0.11)';

      const bracket = (x: number, y: number, dx: number, dy: number) => {
        ctx.beginPath();
        ctx.moveTo(x,           y + dy * arm);
        ctx.lineTo(x,           y);
        ctx.lineTo(x + dx * arm, y);
        ctx.stroke();
      };

      bracket(cm,    cm,    +1, +1);
      bracket(W-cm,  cm,    -1, +1);
      bracket(cm,    H-cm,  +1, -1);
      bracket(W-cm,  H-cm,  -1, -1);

      // ── Horizontal scan-lines ──────────────────────────────────────
      ctx.setLineDash([3, 18]);
      ctx.lineWidth = 0.6;
      ctx.lineCap   = 'round';

      ([0.28, 0.55, 0.80] as number[]).forEach(pct => {
        ctx.strokeStyle = `rgba(245,245,247,${pct < 0.5 ? 0.04 : 0.035})`;
        ctx.beginPath();
        ctx.moveTo(M * 2.5,     H * pct);
        ctx.lineTo(W - M * 2.5, H * pct);
        ctx.stroke();
      });

      ctx.setLineDash([]);

      // ── Vertical accent line ───────────────────────────────────────
      ctx.setLineDash([2, 24]);
      ctx.lineWidth   = 0.5;
      ctx.strokeStyle = 'rgba(245,245,247,0.04)';
      ctx.beginPath();
      ctx.moveTo(W * 0.72, M * 1.5);
      ctx.lineTo(W * 0.72, H - M * 1.5);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    draw();
    window.addEventListener('resize', draw, { passive: true });
    return () => window.removeEventListener('resize', draw);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 1 }}
    />
  );
}
