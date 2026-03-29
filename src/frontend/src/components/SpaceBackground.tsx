import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  alpha: number;
  speed: number;
  twinklePhase: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars: Star[] = [];
    let animId: number;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 220; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    const draw = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#0B0812");
      bg.addColorStop(0.4, "#0D0A18");
      bg.addColorStop(1, "#08060F");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      const nebula1 = ctx.createRadialGradient(
        w * 0.15,
        h * 0.25,
        0,
        w * 0.15,
        h * 0.25,
        w * 0.35,
      );
      nebula1.addColorStop(0, "rgba(74, 43, 115, 0.18)");
      nebula1.addColorStop(0.5, "rgba(74, 43, 115, 0.08)");
      nebula1.addColorStop(1, "transparent");
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, w, h);

      const nebula2 = ctx.createRadialGradient(
        w * 0.8,
        h * 0.7,
        0,
        w * 0.8,
        h * 0.7,
        w * 0.3,
      );
      nebula2.addColorStop(0, "rgba(90, 20, 140, 0.14)");
      nebula2.addColorStop(0.5, "rgba(60, 10, 100, 0.07)");
      nebula2.addColorStop(1, "transparent");
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, w, h);

      const nebula3 = ctx.createRadialGradient(
        w * 0.5,
        h * 0.1,
        0,
        w * 0.5,
        h * 0.1,
        w * 0.4,
      );
      nebula3.addColorStop(0, "rgba(140, 40, 180, 0.07)");
      nebula3.addColorStop(1, "transparent");
      ctx.fillStyle = nebula3;
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        const twinkle =
          Math.sin(frame * s.speed * 0.04 + s.twinklePhase) * 0.4 + 0.6;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 220, 255, ${s.alpha * twinkle})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
