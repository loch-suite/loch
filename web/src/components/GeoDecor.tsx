import { useEffect, useRef } from 'react';

// Seeded LCG for deterministic placement — same result every render/resize.
function makeLcg(seed: number) {
  let s = seed >>> 0;
  const next = (): number => {
    s = ((Math.imul(s, 1664525) + 1013904223) >>> 0);
    return s / 0x100000000;
  };
  return { range: (a: number, b: number) => a + next() * (b - a) };
}

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

      const M = 58;  // margin from edges
      const S = 22;  // dot spacing
      const NAV = 70; // clear the nav bar

      dots(M,           NAV,              20, 11, S, 0.07);             // top-left block
      dots(W - M - 14*S, H - M - 8*S,   14,  8, S, 0.06);             // bottom-right block
      dots(W - M - 9*S,  NAV,             9,  6, S, 0.055);            // top-right small
      dots(M,            H / 2 - 4*S,    5,  9, S, 0.045);            // left-center strip

      // ── Plus (cross) signs ─────────────────────────────────────────
      const rng = makeLcg(0xcafe1337);

      const plus = (x: number, y: number, arm: number, op: number) => {
        ctx.strokeStyle = `rgba(245,245,247,${op})`;
        ctx.lineWidth = 0.85;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x - arm, y); ctx.lineTo(x + arm, y);
        ctx.moveTo(x, y - arm); ctx.lineTo(x, y + arm);
        ctx.stroke();
      };

      // Right edge column
      for (let i = 0; i < 11; i++)
        plus(rng.range(W-190, W-52), rng.range(100, H-100), rng.range(5, 14), rng.range(0.05, 0.11));

      // Left edge column
      for (let i = 0; i < 11; i++)
        plus(rng.range(52, 190), rng.range(100, H-100), rng.range(5, 14), rng.range(0.05, 0.11));

      // Top band
      for (let i = 0; i < 9; i++)
        plus(rng.range(W*0.15, W*0.85), rng.range(NAV+20, 200), rng.range(4, 10), rng.range(0.04, 0.09));

      // Bottom band
      for (let i = 0; i < 7; i++)
        plus(rng.range(W*0.1, W*0.9), rng.range(H-220, H-55), rng.range(4, 10), rng.range(0.04, 0.08));

      // Scattered center-right (sparse)
      for (let i = 0; i < 5; i++)
        plus(rng.range(W*0.65, W*0.92), rng.range(H*0.3, H*0.7), rng.range(3, 7), rng.range(0.03, 0.06));

      // ── Corner brackets ────────────────────────────────────────────
      const arm = 30;
      const cm = 38;

      ctx.lineWidth = 1.2;
      ctx.lineCap = 'square';
      ctx.strokeStyle = 'rgba(245,245,247,0.11)';

      const bracket = (x: number, y: number, dx: number, dy: number) => {
        ctx.beginPath();
        ctx.moveTo(x,          y + dy * arm);
        ctx.lineTo(x,          y);
        ctx.lineTo(x + dx*arm, y);
        ctx.stroke();
      };

      bracket(cm,     cm,     +1, +1);  // top-left
      bracket(W-cm,   cm,     -1, +1);  // top-right
      bracket(cm,     H-cm,   +1, -1);  // bottom-left
      bracket(W-cm,   H-cm,   -1, -1);  // bottom-right

      // ── Horizontal scan-lines ──────────────────────────────────────
      ctx.setLineDash([3, 18]);
      ctx.lineWidth = 0.6;
      ctx.lineCap = 'round';

      ([0.28, 0.55, 0.80] as number[]).forEach(pct => {
        ctx.strokeStyle = `rgba(245,245,247,${pct < 0.5 ? 0.04 : 0.035})`;
        ctx.beginPath();
        ctx.moveTo(M * 2.5, H * pct);
        ctx.lineTo(W - M * 2.5, H * pct);
        ctx.stroke();
      });

      ctx.setLineDash([]);

      // ── Thin vertical accent line (right of center) ────────────────
      ctx.setLineDash([2, 24]);
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(245,245,247,0.04)';
      ctx.beginPath();
      ctx.moveTo(W * 0.72, M * 1.5);
      ctx.lineTo(W * 0.72, H - M * 1.5);
      ctx.stroke();
      ctx.setLineDash([]);

      // ── Diagonal tick clusters (bottom-left, top-right) ───────────
      const rng2 = makeLcg(0xaabb1234);
      const tick = (x: number, y: number, len: number, op: number) => {
        ctx.strokeStyle = `rgba(245,245,247,${op})`;
        ctx.lineWidth = 0.7;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x - len/2, y + len/2);
        ctx.lineTo(x + len/2, y - len/2);
        ctx.stroke();
      };

      // Bottom-left cluster
      for (let i = 0; i < 8; i++)
        tick(rng2.range(M, M + 120), rng2.range(H - M - 120, H - M), rng2.range(8, 18), rng2.range(0.04, 0.08));

      // Top-right cluster
      for (let i = 0; i < 8; i++)
        tick(rng2.range(W - M - 120, W - M), rng2.range(NAV, NAV + 130), rng2.range(8, 18), rng2.range(0.04, 0.08));
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
