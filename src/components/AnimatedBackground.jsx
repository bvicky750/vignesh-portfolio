// src/components/AnimatedBackground.jsx
import React, { useEffect, useRef } from "react";

/**
 * AnimatedBackground
 * - theme: "light" | "dark"
 *
 * Implementation notes:
 * - uses CSS variables to control colors / positions
 * - uses requestAnimationFrame for a gentle drift (low CPU use)
 * - listens to mousemove for a tiny parallax (disabled on touch / small screens)
 * - respects prefers-reduced-motion
 */
export default function AnimatedBackground({ theme = "dark" }) {
  const elRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Set theme classes via CSS variables
    if (theme === "light") {
      el.style.setProperty("--bg-base", "hsl(210, 40%, 98%)");
      el.style.setProperty("--grid-line", "hsl(210, 40%, 96%)");
      el.style.setProperty("--radial-1", "rgba(210,210,255,0.45)");
      el.style.setProperty("--radial-2", "rgba(240,240,255,0.35)");
      el.style.setProperty("--grid-opacity", "0.7");
    } else {
      el.style.setProperty("--bg-base", "hsl(222, 47%, 11%)");
      el.style.setProperty("--grid-line", "hsla(222,47%,13%,1)");
      el.style.setProperty("--radial-1", "rgba(22,40,70,0.85)");
      el.style.setProperty("--radial-2", "rgba(60,30,70,0.45)");
      el.style.setProperty("--grid-opacity", "0.85");
    }

    // Gentle automatic drift using sine wave. keeps updates minimal
    const animate = (t) => {
      // t is in ms, scale down
      const seconds = t / 1000;
      tRef.current = seconds;
      // small range: +/- 3 px, and slow speed
      const dx = Math.sin(seconds * 0.15) * 3;
      const dy = Math.cos(seconds * 0.12) * 3;
      el.style.setProperty("--drift-x", `${dx}px`);
      el.style.setProperty("--drift-y", `${dy}px`);
      rafRef.current = requestAnimationFrame(animate);
    };

    // If user prefers reduced motion -> don't animate
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) rafRef.current = requestAnimationFrame(animate);

    // Mouse parallax (tiny)
    let supportsPointer = window.matchMedia("(pointer: fine)").matches;
    const onMove = (ev) => {
      if (!supportsPointer) return;
      const rect = el.getBoundingClientRect();
      // normalized -0.5 .. 0.5
      const nx = (ev.clientX - (rect.left + rect.width / 2)) / rect.width;
      const ny = (ev.clientY - (rect.top + rect.height / 2)) / rect.height;
      // small influence
      el.style.setProperty("--mx", `${nx * 10}px`); // up to ~5-10px
      el.style.setProperty("--my", `${ny * 6}px`);
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [theme]);

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="animated-bg fixed inset-0 -z-50 pointer-events-none"
    />
  );
}
