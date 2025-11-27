import React, { useEffect, useRef } from "react";

const AnimatedGridBackground = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let t = 0;

    const colors =
      theme === "light"
        ? ["rgba(0,150,255,0.35)", "rgba(255,100,200,0.35)"]
        : ["rgba(0,120,255,0.25)", "rgba(200,0,255,0.25)"];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.01; // Faster movement

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.moveTo(0, height / 2);

        for (let x = 0; x <= width; x += 6) {
          const y =
            height / 2 +
            Math.sin(x * 0.008 + t + i * 2) * 130 + // stronger visible motion
            Math.cos(x * 0.01 + t * 1.5 + i) * 80;

          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = colors[i];
        ctx.lineWidth = 220;
        ctx.stroke();
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none"
    />
  );
};

export default AnimatedGridBackground;
