"use client";

import { useEffect, useRef } from "react";

interface Stroke {
  x: number;
  y: number;
  angle: number;
  len: number;
  life: number;
  width: number;
}

export default function PencilCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const strokes = useRef<Stroke[]>([]);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const p = { x: e.clientX, y: e.clientY };
      const prev = last.current;
      if (!prev) {
        last.current = p;
        return;
      }
      const dx = p.x - prev.x;
      const dy = p.y - prev.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 6) return;

      // spawn a couple of short hatch strokes along the movement
      const baseAngle = Math.atan2(dy, dx);
      const count = dist > 26 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const t = count === 1 ? 0.5 : i / (count - 1);
        strokes.current.push({
          x: prev.x + dx * t + (Math.random() - 0.5) * 6,
          y: prev.y + dy * t + (Math.random() - 0.5) * 6,
          angle: baseAngle + Math.PI / 2 + (Math.random() - 0.5) * 0.9,
          len: 7 + Math.random() * 9,
          life: 1,
          width: 0.7 + Math.random() * 0.8,
        });
      }
      if (strokes.current.length > 160) {
        strokes.current.splice(0, strokes.current.length - 160);
      }
      last.current = p;
    };

    const onLeave = () => {
      last.current = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const arr = strokes.current;
      for (let i = arr.length - 1; i >= 0; i--) {
        const s = arr[i];
        s.life -= 0.014;
        if (s.life <= 0) {
          arr.splice(i, 1);
          continue;
        }
        const half = s.len / 2;
        const x1 = s.x - Math.cos(s.angle) * half;
        const y1 = s.y - Math.sin(s.angle) * half;
        const x2 = s.x + Math.cos(s.angle) * half;
        const y2 = s.y + Math.sin(s.angle) * half;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(92, 74, 50, ${s.life * 0.5})`;
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} id="pencil-cursor-layer" aria-hidden="true" />;
}
