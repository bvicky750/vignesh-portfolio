import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * PagePopup.jsx — now with CLOSE sound!
 * Plays popup.mp3 ONLY when the popup is closed.
 */

const PagePopup = ({ image, text }) => {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  // 🔊 reference to audio element
  const audioRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    try {
      const pageKey =
        typeof window !== "undefined" ? window.location.pathname : "/";

      if (!window.__popupSeen) window.__popupSeen = {};

      const shouldShow = !window.__popupSeen[pageKey];

      if (shouldShow) {
        window.__popupSeen[pageKey] = true;
        setShow(true);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    } catch (err) {
      console.error("PagePopup init error:", err);
      setShow(false);
      document.body.style.overflow = "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, []);

  // 🔊 PLAY SOUND when popup *closes*
  const closePopup = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.45;
        audioRef.current.play().catch(() => {});
      }
    } catch {}

    setShow(false);

    try {
      document.body.style.overflow = "auto";
    } catch {}
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* 🔊 Close sound */}
          <audio ref={audioRef} src="/sounds/popup.mp3" preload="auto" />

          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
            onClick={closePopup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* CHARACTER + POPUP */}
          <motion.div
            className="fixed left-10 bottom-0 z-[9999] flex items-end gap-6 pb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* CHARACTER */}
            {image && (
              <motion.img
                src={image}
                className="w-[300px] select-none"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 140 }}
                alt="popup mascot"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}

            {/* POPUP BUBBLE */}
            <motion.div
              className="-translate-y-[160px] -ml-4"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 12,
                delay: 0.12,
              }}
            >
              <div
                className="
                  relative px-8 py-5 text-white text-lg font-semibold
                  max-w-[420px]
                  bg-[rgba(10,10,15,0.55)] backdrop-blur-xl
                  rounded-xl
                  shadow-[0_0_25px_rgba(255,0,255,0.35)]
                  border border-white/5
                "
              >
                {/* Neon outlines */}
                <div className="absolute inset-0 rounded-xl pointer-events-none">
                  <div className="absolute inset-0 border-[3px] border-pink-500 blur-md opacity-60 rounded-xl" />
                  <div className="absolute inset-0 border-[3px] border-cyan-400 blur-[6px] opacity-50 rounded-xl" />
                </div>

                {/* Text */}
                <p className="relative z-10 leading-snug drop-shadow-[0_0_6px_rgba(255,0,255,0.4)]">
                  {text || "Welcome!"}
                  <br />
                  <span className="text-sm opacity-80 font-normal">
                    (Click anywhere to continue)
                  </span>
                </p>

                {/* Tail */}
                <div
                  className="
                    absolute left-8 bottom-[-8px]
                    w-4 h-4 bg-[rgba(10,10,15,0.55)]
                    rotate-45
                    border-l-2 border-b-2 border-pink-500
                    shadow-[0_0_10px_rgba(255,0,255,0.45)]
                    rounded-sm
                  "
                />
              </div>
            </motion.div>

            {/* CLOSE BUTTON */}
            <button
              onClick={closePopup}
              className="
                absolute top-4 right-4 p-2 rounded-full
                bg-neutral-200/70 dark:bg-neutral-800/70
                text-neutral-700 dark:text-neutral-200
                hover:bg-neutral-300 dark:hover:bg-neutral-700
                transition-all
              "
              aria-label="Close project details"
            >
              ✕
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PagePopup;
