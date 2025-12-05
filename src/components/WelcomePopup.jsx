import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PopupCharacter from "./PopupCharacter";
import PopupSpeech from "./PopupSpeech";

const WelcomePopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Freeze background scroll
    document.body.style.overflow = "hidden";

    // Show popup
    setTimeout(() => setShow(true), 150);

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const closePopup = () => {
    setShow(false);

    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 300);
  };

  return (
    <AnimatePresence>
      {show && (
        <>

          {/* ⭐ ONLY ONE OVERLAY — Blur + Dark tint */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
            onClick={closePopup}     // <-- Click anywhere to close
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* POPUP CONTENT AREA */}
        <motion.div
  className="fixed bottom-24 left-14 z-[9999] flex items-start gap-5"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>

  <PopupCharacter />

  {/* Speech bubble moved left */}
  <div className="relative top-[-20px] -ml-8">
    <PopupSpeech />
  </div>

</motion.div>




        </>
      )}
    </AnimatePresence>

    
  );
};

export default WelcomePopup;
