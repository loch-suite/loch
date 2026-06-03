import { useEffect, useRef } from 'react';

// Must match TopoBackground — both canvases shift together as one plane.
const EXTRA_H  = 500;
const PAR_RATE = 0.08;

export default function GeoDecor() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;

    function draw() {
      if (!canvas) return;
      const W = window.innerWidth;
      // Draw on the full extended canvas so bottom-of-canvas elements are
      // visible as the parallax reveals them during scroll.
      const H = window.innerHeight + EXTRA_H;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;

      const ctx = canvas.getContext('2d')!;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      const M   = 58;   // edge margin
      const S   = 22;   // dot grid spacing
      const NAV = 72;   // nav bar clearance

      // ── Dot matrices ───────────────────────────────────────────────
      // Repeated at top AND bottom so they appear naturally as parallax reveals them.
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

      // Top corners
      dots(M,            NAV,              20, 11, S, 0.07);
      dots(W - M - 14*S, H - M - 8*S,    14,  8, S, 0.06);
      dots(W - M -  9*S, NAV,              9,  6, S, 0.055);
      dots(M,            H / 2 - 4 * S,   5,  9, S, 0.045);

      // ── Plus sign grid ─────────────────────────────────────────────
      // A uniform grid across the full canvas, masked so only the outer
      // EDGE_ZONE pixels near each edge are visible. This gives the
      // structured Valorant-style alignment while the center stays clear.

      const GSTEP     = 110;  // grid pitch — same in X and Y
      const EDGE_ZONE = 210;  // fade-out distance from each edge

      ctx.lineWidth = 0.9;
      ctx.lineCap   = 'round';

      const plus = (x: number, y: number, arm: number, op: number) => {
        ctx.strokeStyle = `rgba(245,245,247,${op})`;
        ctx.beginPath();
        ctx.moveTo(x - arm, y); ctx.lineTo(x + arm, y);
        ctx.moveTo(x, y - arm); ctx.lineTo(x, y + arm);
        ctx.stroke();
      };

      // Dot matrix bounding boxes — skip grid pluses inside them to avoid clutter
      const inDotZone = (x: number, y: number): boolean =>
        (x < M + 21*S && y < NAV + 12*S)          ||  // top-left
        (x > W - M - 15*S && y > H - M - 9*S)     ||  // bottom-right
        (x > W - M - 10*S && y < NAV + 7*S)        ||  // top-right
        (x < M + 6*S && y > H/2 - 5*S && y < H/2 + 6*S); // left-center

      // Offset the grid origin so pluses land between dot rows, not on them
      const ox = GSTEP * 0.45;
      const oy = NAV + GSTEP * 0.35;

      for (let gx = ox; gx <= W; gx += GSTEP) {
        for (let gy = oy; gy <= H; gy += GSTEP) {
          if (inDotZone(gx, gy)) continue;

          const fromLeft   = gx;
          const fromRight  = W - gx;
          const fromTop    = gy - NAV;
          const fromBottom = H - gy;
          const edgeDist   = Math.min(fromLeft, fromRight, fromTop, fromBottom);

          if (edgeDist > EDGE_ZONE) continue;

          // Quadratic falloff: bright near edges, invisible before center
          const t  = 1 - edgeDist / EDGE_ZONE;
          const op = 0.085 * t * t;

          plus(gx, gy, 7, op);
        }
      }

      // ── Corner brackets ────────────────────────────────────────────
      // Drawn at both top and bottom corners of the extended canvas.
      const arm = 28;
      const cm  = 38;
      ctx.lineWidth   = 1.2;
      ctx.lineCap     = 'square';
      ctx.strokeStyle = 'rgba(245,245,247,0.11)';

      const bracket = (x: number, y: number, dx: number, dy: number) => {
        ctx.beginPath();
        ctx.moveTo(x,            y + dy * arm);
        ctx.lineTo(x,            y);
        ctx.lineTo(x + dx * arm, y);
        ctx.stroke();
      };

      // Top corners (viewport)
      bracket(cm,    cm,    +1, +1);
      bracket(W-cm,  cm,    -1, +1);
      // Bottom corners (visible when parallax reveals extended area)
      bracket(cm,    H-cm,  +1, -1);
      bracket(W-cm,  H-cm,  -1, -1);
      // Mid-canvas corners (viewport bottom at rest)
      const VH = window.innerHeight;
      bracket(cm,    VH-cm,  +1, -1);
      bracket(W-cm,  VH-cm,  -1, -1);

      // ── Horizontal scan-lines ──────────────────────────────────────
      ctx.setLineDash([3, 18]);
      ctx.lineWidth = 0.6;
      ctx.lineCap   = 'round';

      // Lines at regular intervals across the full canvas height
      const LINE_STEP = Math.round(H / 5);
      for (let i = 1; i <= 4; i++) {
        const ly = i * LINE_STEP;
        ctx.strokeStyle = `rgba(245,245,247,0.038)`;
        ctx.beginPath();
        ctx.moveTo(M * 2.5,     ly);
        ctx.lineTo(W - M * 2.5, ly);
        ctx.stroke();
      }

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

    function onScroll() {
      if (!canvas) return;
      canvas.style.transform = `translateY(${-window.scrollY * PAR_RATE}px)`;
    }

    draw();
    window.addEventListener('resize', draw,     { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', draw);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
      }}
    />
  );
}
