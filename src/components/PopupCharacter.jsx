import React from "react";
import { motion } from "framer-motion";

const PopupCharacter = () => {
  return (
    <motion.img
      src="/character.png"
      alt="Vee Character"
      className="w-[260px] drop-shadow-2xl select-none"  // bigger character
      initial={{ opacity: 0, x: -50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
    />
  );
};

export default PopupCharacter;
