"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Drop {
  x: number;
  y: number;
  speed: number;
  char: string;
  opacity: number;
}

const GLYPHS = "01<>{}[]/$*+=-ابپتثجچحخ";

/**
 * پس‌زمینهٔ Hero: شبکهٔ عصبی متحرک + باران کد بسیار محو.
 * با prefers-reduced-motion فقط یک فریم ثابت کشیده می‌شود و خارج از دید، حلقه متوقف می‌ماند.
 */
export function NeuralBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let drops: Drop[] = [];
    let frame = 0;
    let visible = true;
    let running = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    function resize() {
      const parent = canvas?.parentElement;
      if (!parent || !canvas) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context?.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = width < 768 ? 22 : width < 1280 ? 38 : 54;
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 0.8 + Math.random() * 1.6,
      }));
      drops = Array.from({ length: width < 768 ? 8 : 16 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.4 + Math.random() * 1.1,
        char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "0",
        opacity: 0.03 + Math.random() * 0.06,
      }));
    }

    function draw() {
      if (!context) return;
      context.clearRect(0, 0, width, height);

      // باران کد محو
      context.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
      for (const drop of drops) {
        context.fillStyle = `rgba(0, 240, 255, ${drop.opacity})`;
        context.fillText(drop.char, drop.x, drop.y);
        if (!reduce) {
          drop.y += drop.speed;
          if (drop.y > height + 12) {
            drop.y = -12;
            drop.x = Math.random() * width;
            drop.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "0";
          }
        }
      }

      // پیوندها
      const maxDistance = width < 768 ? 104 : 138;
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        if (!a) continue;
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          if (!b) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance > maxDistance) continue;
          const strength = 1 - distance / maxDistance;
          context.strokeStyle = strength > 0.55
            ? `rgba(139, 92, 246, ${strength * 0.2})`
            : `rgba(0, 240, 255, ${strength * 0.16})`;
          context.lineWidth = 0.6;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }
      }

      // گره‌ها
      for (const node of nodes) {
        context.beginPath();
        context.fillStyle = "rgba(125, 238, 252, 0.5)";
        context.shadowBlur = 8;
        context.shadowColor = "rgba(0, 240, 255, 0.45)";
        context.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;

        if (!reduce) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;
        }
      }
    }

    function loop() {
      if (!running) return;
      if (visible) draw();
      frame = window.requestAnimationFrame(loop);
    }

    resize();
    draw();

    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0 },
    );
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    if (!reduce) loop();

    return () => {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("absolute inset-0 size-full", className)} />;
}
