import React, { memo, useMemo, useState, useEffect } from "react";
import { FolderKanban, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import PageTitle from "../components/PageTitle";
import PageTransition from "../components/PageTransition";
import ExpandedProjectCard from "./ExpandedProjectCard";
import PagePopup from "../components/PagePopup/PagePopup";
import { popupConfig } from "../components/PagePopup/popupConfig";

// ===========================================
// 🎧 PRELOAD SOUND (Instant playback)
// ===========================================
// Ensure this code is ONLY RUN ONCE outside the component to prevent
// creating multiple audio elements.
const hoverSound = new Audio("/sounds/hover.mp3");
hoverSound.volume = 0.5;
hoverSound.preload = "auto";
hoverSound.ready = false;

// Event listener to mark as ready for instant playback
hoverSound.addEventListener("canplaythrough", () => {
  hoverSound.ready = true;
});

// 🔊 Instant hover sound player
const playSound = () => {
  if (hoverSound.ready) {
    // Reset time and play instantly
    hoverSound.currentTime = 0;
    hoverSound.play().catch(() => {
      // Catch potential errors like "The play() request was interrupted"
    });
  }
};

// ===========================================
// RANDOM FLOAT GENERATOR FOR IDLE MOTION (Increased Range)
// ===========================================
const randomFloat = () => Math.random() * 20 - 10; // -10px to +10px (was -5px to +5px)
const randomTilt = () => Math.random() * 8 - 4; // -4deg to +4deg (was -2deg to +2deg)
const floatDuration = 3 + Math.random() * 3;

// ===========================================
// ⭐ UPDATED Project Card with increased motion and blur
// ===========================================
const ProjectCard = memo(
  ({ project, index, hoveredIndex, setHoveredIndex, open }) => {
    const isHovered = hoveredIndex === index;

    // Stable random motion values using useMemo
    const { tilt, floatX, floatY, floatRotate } = useMemo(
      () => ({
        tilt: randomTilt(),
        floatX: randomFloat(),
        floatY: randomFloat(),
        floatRotate: randomTilt() * 0.3,
      }),
      []
    );

    // 🎨 DEFINITION OF ANIMATION STATES
    const variants = {
      // 🔹 DEFAULT (Idle) State — Subtle floating and tilting (More visible now)
      idle: {
        scale: 1,
        opacity: 1,
        rotate: tilt + floatRotate,
        x: floatX,
        y: floatY,
        filter: "blur(0px)", // No blur when fully idle
      },
      // 🔹 HOVER State — Larger, straight, sharp, still
      hovered: {
        scale: 1.1,
        rotate: 0,
        x: 0,
        y: 0,
        opacity: 1,
        filter: "blur(0px)", // Sharp
      },
      // 🔹 OTHER Cards when one is hovered — Stop floating, BLURRED
      other: {
        scale: 1,
        opacity: 1,
        rotate: tilt,
        x: 0,
        y: 0,
        filter: "blur(4px)", // 👈 ADDED BLUR EFFECT
      },
    };

    // 🎨 TRANSITION RULES
    const floatTransition = {
      // This transition is ONLY for the 'idle' state (x, y, rotate)
      rotate: {
        duration: floatDuration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
      x: {
        duration: floatDuration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
      y: {
        duration: floatDuration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
      // Ensure instant transition for filter when going from 'other' to 'idle'
      filter: {
        duration: 0.1,
        ease: "linear",
      }
    };

    const instantTransition = {
      // This transition is for HOVERED and OTHER states
      duration: 0.1, // Instant response
      ease: "linear",
    };

    return (
      <motion.div
        onClick={() => open(project)}
        onMouseEnter={() => {
          playSound(); // Play sound instantly
          setHoveredIndex(index);
        }}
        onMouseLeave={() => setHoveredIndex(null)}
        className="
          p-[3px] rounded-xl
          bg-gradient-to-br from-pink-500 to-cyan-400
          shadow-[6px_6px_0px_#00eaff]
          cursor-pointer
        "
        // Use a single 'animate' prop with a state string
        animate={
          hoveredIndex === null
            ? "idle"
            : isHovered
              ? "hovered"
              : "other"
        }
        variants={variants}
        transition={
          // Use the infinite float transition ONLY when fully idle
          hoveredIndex === null
            ? floatTransition
            : instantTransition
        }
      >
        <div
          className="
            rounded-xl p-5 h-full flex flex-col
            bg-gradient-to-br from-[#101010] via-[#181818] to-[#0b0b0b]
            border border-white/5 shadow-inner
          "
        >
          {/* Thumbnail */}
          <div
            className="
              flex-shrink-0 w-full h-40 rounded-lg overflow-hidden mb-4
              border border-white/10 bg-black/30
              shadow-[0_0_10px_rgba(0,255,255,0.3)]
            "
          >
            <img
              src={project.image}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white drop-shadow-[2px_2px_0px_#ff00ff] tracking-wide">
              {project.title}
            </h3>
            <ChevronDown className="w-6 h-6 text-cyan-400 rotate-[-90deg]" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="
                  px-3 py-1 rounded-full text-xs font-medium
                  bg-black/40 text-white border border-white/20
                  shadow-[0_0_8px_rgba(255,0,255,0.4)]
                "
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="text-sm text-cyan-300 mt-3">Click for Details</div>
        </div>
      </motion.div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";


// ===========================================
// MAIN PROJECTS PAGE (Retained for context)
// ===========================================
function ProjectsComponent() {
  const [expandedProject, setExpandedProject] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // The 'projects' data structure remains the same
  const projects = useMemo(
    () => [
      {
        title: "Talent Track",
        image: "/assets/tt.png",
        tags: ["HTML", "JavaScript", "OOPS"],
        desc: "...",
        links: [{ type: "code", href: "#" }]
      },
      {
        title: "Sample E-Commerce Website",
        image: "/assets/e-commerce.png",
        tags: ["HTML", "JavaScript", "MongoDB"],
        desc: "...",
        links: []
      },
      {
        title: "Fitness AI Coach",
        image: "/assets/AI-based-personal-trainer-app.jpg",
        tags: ["HTML", "CSS", "JavaScript", "Python"],
        desc: "...",
        links: []
      },
      {
        title: "Fashion Store UI Redesign",
        image: "/assets/ui.webp",
        tags: ["React", "Tailwind", "UI/UX"],
        desc: "...",
        links: []
      },
      {
        title: "Student Analytics Dashboard",
        image: "/assets/school.jpg",
        tags: ["JavaScript", "Chart.js", "Firebase"],
        desc: "...",
        links: []
      },
      {
        title: "Crypto Price Tracker",
        image: "/assets/cr.jpg",
        tags: ["JavaScript", "API", "Chart.js"],
        desc: "...",
        links: []
      }
    ],
    []
  );

  return (
    <PageTransition>
      <PagePopup image={popupConfig.projects.image} text={popupConfig.projects.text} />

      <div className="w-full min-h-[80vh] flex flex-col items-center px-4 py-12">
        <motion.div className="flex flex-col items-center w-full">
          <div className="flex items-center gap-4 mb-3">
            <FolderKanban className="w-10 h-10 sm:w-12 sm:h-12 text-primary drop-shadow-lg" />
            <PageTitle>Projects</PageTitle>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl text-center mb-10">
            A showcase of my creative and technical work.
          </p>

          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((proj, i) => (
              <ProjectCard
                key={i}
                index={i}
                project={proj}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                open={setExpandedProject}
              />
            ))}
          </div>
        </motion.div>

        <ExpandedProjectCard
          project={expandedProject}
          onClose={() => setExpandedProject(null)}
        />
      </div>
    </PageTransition>
  );
}

export default memo(ProjectsComponent);