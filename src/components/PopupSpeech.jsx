import React from "react";
import { motion } from "framer-motion";

const PopupSpeech = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -4 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 12 }}
      className="
        relative px-6 py-5 text-white font-semibold text-xl
        bg-[rgba(15,15,15,0.65)] backdrop-blur-xl
        rounded-xl max-w-[380px]
        border border-pink-500/80 shadow-[0_0_25px_rgba(255,0,255,0.55)]
      "
      style={{
        clipPath:
          "polygon(8% 0%, 92% 0%, 100% 25%, 92% 100%, 12% 100%, 0% 75%, 0% 25%)",
      }}
    >
      {/* Neon Gradient Border Overlay */}
      <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-pink-500/30 to-cyan-400/30 opacity-50 mix-blend-screen" />

      {/* Text */}
      <div className="relative z-10 leading-snug drop-shadow-[0_0_8px_rgba(255,0,255,0.6)]">
        Welcome to my Portfolio! 👋  
        <div className="text-sm opacity-80 mt-1">
          (Tap anywhere to continue)
        </div>
      </div>

      {/* Comic Tail */}
      <div
        className="
          absolute -bottom-4 left-6 
          w-6 h-6 
          bg-[rgba(15,15,15,0.65)] border-l border-b border-pink-500
          rotate-45 shadow-[0_0_12px_rgba(255,0,255,0.45)]
        "
      />
    </motion.div>
  );
};

export default PopupSpeech;
