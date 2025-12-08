import React from "react";

export default function FractalWebBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">

      {/* 💠 LAYER 1 — Fractal Web Lines */}
      <div
        className="
          absolute inset-0 
          bg-[url('/fractal-web.svg')]
          opacity-[0.32]
          animate-fractalDrift
          scale-[1.4]
        "
      />

      {/* 💠 LAYER 2 — Slight Offset Parallax */}
      <div
        className="
          absolute inset-0 
          bg-[url('/fractal-web.svg')]
          opacity-[0.22]
          mix-blend-screen
          animate-fractalDriftReverse
          scale-[1.6]
        "
      />

      {/* 🌈 Soft neon gradient glow */}
      <div className="
        absolute inset-0 
        bg-gradient-to-br 
        from-pink-500/15 
        via-purple-600/10 
        to-cyan-400/15 
        blur-3xl
      " />

      {/* 🔳 Subtle noise for crisp Spider-Verse texture */}
      <div className="
        absolute inset-0 
        bg-[url('/grain.png')] 
        opacity-[0.12]
        pointer-events-none
      " />
    </div>
  );
}
