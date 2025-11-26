import React from "react";

export default function SpiderVerseBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      
      {/* 🔵 Moving Neon Ribbon 1 */}
      <div className="absolute w-[120%] h-[120%] top-[-10%] left-[-10%] 
        bg-gradient-to-r from-pink-500/30 via-purple-500/20 to-cyan-500/30
        blur-[120px] animate-ribbonSlow opacity-70">
      </div>

      {/* 🔥 Moving Neon Ribbon 2 (opposite direction) */}
      <div className="absolute w-[120%] h-[120%] top-[-10%] left-[-10%]
        bg-gradient-to-tr from-cyan-400/20 via-blue-500/10 to-pink-500/20
        blur-[140px] animate-ribbonReverse opacity-60">
      </div>

      {/* 🟣 Halftone Dot Layer */}
      <div className="absolute inset-0 
        bg-[url('/halftone.png')] 
        opacity-[0.06] 
        mix-blend-overlay 
        pointer-events-none">
      </div>

      {/* 🌈 Light Noise Texture */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-[0.12] pointer-events-none" />

      {/* 🟢 Floating Blob 1 */}
      <div className="absolute w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px]
        animate-float1 top-[15%] left-[10%]">
      </div>

      {/* 🔷 Floating Blob 2 */}
      <div className="absolute w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[110px]
        animate-float2 bottom-[10%] right-[15%]">
      </div>

    </div>
  );
}
