import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function LogoLoop({ logos, speed = 40, onHoverSound }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const rafRef = useRef(null);

  // persistent position + hover refs so tick doesn't restart/reset on hover toggles
  const posRef = useRef(0);
  const hoverRef = useRef(false);

  const [totalWidth, setTotalWidth] = useState(0);
  const [hover, setHover] = useState(false);
  const [tooltip, setTooltip] = useState(null); // {name, x, y}

  // Update hoverRef whenever hover state changes (so RAF loop reads correct value)
  useEffect(() => {
    hoverRef.current = hover;
  }, [hover]);

  // Track width
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const resize = () => {
      const width = track.scrollWidth || 0;
      setTotalWidth(width);
    };

    // measure after a tiny timeout to ensure images loaded
    const t = setTimeout(resize, 50);

    window.addEventListener("resize", resize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", resize);
    };
  }, [logos]);

  // Animation loop (single persistent RAF) — DOES NOT reset pos when hover toggles
  useEffect(() => {
    let lastTime = performance.now();

    const tick = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Only advance when not hovered (hoverRef is updated synchronously where hover changes)
      if (!hoverRef.current) {
        posRef.current -= speed * delta;
      }

      // wrap position smoothly based on measured width.
      // use totalWidth / 3 because we triple the logos (see extended below).
      const wrap = totalWidth ? totalWidth / 3 : 0;
      if (wrap > 0) {
        // keep pos inside [-wrap, 0] range
        if (posRef.current < -wrap) posRef.current += wrap;
        if (posRef.current > 0) posRef.current -= wrap;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [totalWidth, speed]);

  const extended = [...logos, ...logos, ...logos];

  // SHOW tooltip + PLAY SOUND instantly, and pause movement (hover state)
  const showTooltip = (e, name) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      name,
      x: rect.left + rect.width / 2,
      y: rect.top - 12,
    });

    // set state + hoverRef (both) so UI and RAF loop see it immediately
    setHover(true);
    hoverRef.current = true;

    // Play hover sound instantly
    if (onHoverSound) onHoverSound();
  };

  const hideTooltip = () => {
    setTooltip(null);
    setHover(false);
    hoverRef.current = false;
  };

  return (
    <>
      {/* MAIN LOOP */}
      <div ref={containerRef} className="relative overflow-hidden w-full h-24">
        <div
          ref={trackRef}
          className="absolute left-0 top-0 flex gap-8 items-center will-change-transform"
          style={{ transform: `translateX(${posRef.current}px)` }}
        >
          {extended.map((logo, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={(e) => showTooltip(e, logo.name)}
              onMouseLeave={hideTooltip}
            >
              <div
                className="
                  w-16 h-16 bg-black/40 border border-white/10
                  rounded-xl flex items-center justify-center
                  hover:scale-110 transition
                "
              >
                <img
                  src={logo.file}
                  alt={logo.name}
                  draggable="false"
                  className="w-12 h-12 object-contain pointer-events-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOOLTIP PORTAL — fixed position, always visible */}
      {tooltip &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: tooltip.y + 55,
              left: tooltip.x,
              transform: "translateX(-50%)",
              padding: "6px 10px",
              background: "rgba(0,0,0,0.85)",
              color: "white",
              borderRadius: "6px",
              fontSize: "0.85rem",
              whiteSpace: "nowrap",
              zIndex: 999999,
              pointerEvents: "none",
              boxShadow: "0 0 8px rgba(255,0,255,0.6)",
            }}
          >
            {tooltip.name}
          </div>,
          document.body
        )}
    </>
  );
}
