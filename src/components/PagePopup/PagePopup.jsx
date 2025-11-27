import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PagePopup = ({ image, text }) => {
  const pageKey = window.location.pathname;

  // Use an in-memory global object to track popups during this SPA session.
  // This DOES NOT persist across full page reloads, so popup will show again after reload.
  if (!window.__popupSeen) window.__popupSeen = {};

  const [show, setShow] = useState(() => {
    // show only if this page hasn't been shown in this session memory
    return !window.__popupSeen[pageKey];
  });

  // When shown, mark as seen in memory and lock scroll.
  useEffect(() => {
    if (show) {
      window.__popupSeen[pageKey] = true; // in-memory mark (cleared on full reload/tab close)
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show, pageKey]);

  const closePopup = () => {
    setShow(false);
    document.body.style.overflow = "auto";
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
            onClick={closePopup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* CHARACTER + BUBBLE */}
          <motion.div
            className="fixed left-10 bottom-0 z-[9999] flex items-end gap-6 pb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* CHARACTER */}
            <motion.img
              src={image}
              className="w-[300px] select-none"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 140 }}
              alt="guide character"
            />

            {/* SPEECH BUBBLE — moved higher; tweak -translate-y value if needed */}
            <motion.div
              className="-translate-y-[170px] -ml-6"
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 160, delay: 0.18 }}
            >
              <div
                className="relative px-6 py-4 text-white font-semibold text-lg max-w-[380px] backdrop-blur-xl bg-[rgba(0,0,0,0.45)] shadow-[0_0_25px_rgba(255,0,255,0.35)]"
                style={{
                  clipPath:
                    "polygon(6% 4%, 96% 0%, 100% 30%, 94% 94%, 10% 100%, 0% 70%, 0% 25%)",
                }}
              >
                {/* Neon Glow Borders */}
                <div className="absolute inset-0 border-[3px] border-pink-500 blur-[2px] opacity-70 rounded-xl pointer-events-none" />
                <div className="absolute inset-0 border-[3px] border-cyan-400 blur-sm opacity-70 rounded-xl pointer-events-none" />

                <p className="relative z-10">
                  {text}
                  <br />
                  <span className="text-sm opacity-70 font-normal">
                    (Click anywhere to continue)
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PagePopup;
