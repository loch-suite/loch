import { useEffect, useRef } from 'react';
import { drawContoursAt, TIME_SPEED } from '../lib/topo';

// How much the topo noise field drifts per pixel scrolled.
// Tuned so 2000px of scroll produces ~0.24 units of noise-space shift —
// clearly visible as a slow pattern drift without feeling disconnected.
const SCROLL_PARALLAX = 0.00012;

export default function TopoBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const scrollRef  = useRef(0); // updated on scroll, read in rAF — no re-renders

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
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    }

    function onScroll() {
      scrollRef.current = window.scrollY;
    }

    function frame(ts: number) {
      if (!canvas || !ctx) return;
      if (startTime === null) startTime = ts;
      const t           = ((ts - startTime) / 1000) * TIME_SPEED;
      const scrollShift = scrollRef.current * SCROLL_PARALLAX;
      drawContoursAt(ctx, canvas, t, scrollShift);
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
      }}
    />
  );
}
