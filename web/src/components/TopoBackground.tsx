import { useEffect, useRef } from 'react';
import { drawContoursAt, TIME_SPEED } from '../lib/topo';

// Extra canvas height beyond the viewport prevents a gap at the bottom
// when the parallax transform shifts the canvas upward.
// At rate 0.08, max safe scroll = EXTRA_H / 0.08 = 6250px.
const EXTRA_H    = 500;
const PAR_RATE   = 0.08;

export default function TopoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let animId = 0;
    let startTime: number | null = null;

    function resize() {
      if (!canvas) return;
      const W = window.innerWidth;
      const H = window.innerHeight + EXTRA_H;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
    }

    function onScroll() {
      if (!canvas) return;
      canvas.style.transform = `translateY(${-window.scrollY * PAR_RATE}px)`;
    }

    function frame(ts: number) {
      if (!canvas || !ctx) return;
      if (startTime === null) startTime = ts;
      const t = ((ts - startTime) / 1000) * TIME_SPEED;
      drawContoursAt(ctx, canvas, t);
      animId = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="topo-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
      }}
    />
  );
}
