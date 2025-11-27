import React from "react";
import { motion } from "framer-motion";

const PopupSpeech = () => {
  return (
    <motion.div
      className="
        relative px-6 py-4 text-white font-semibold text-lg
        bg-[rgba(0,0,0,0.55)] backdrop-blur-xl
        rounded-xl max-w-[360px]
        shadow-[0_0_25px_rgba(255,0,255,0.4)]
        border-2 border-pink-500
      "
      initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 160, delay: 0.3 }}
      style={{
        clipPath:
          "polygon(5% 6%, 95% 0%, 100% 25%, 95% 94%, 5% 100%, 0% 75%, 0% 25%)",
      }}
    >
      Hey! Welcome to my Portfolio 👋
      <div className="text-sm opacity-70">
        (Click anywhere to continue)
      </div>
    </motion.div>
  );
};

export default PopupSpeech;
