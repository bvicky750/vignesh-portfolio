import React, { memo } from "react";
import { Code, Layers, Terminal, Sparkles, Settings2 } from "lucide-react";
import { motion } from "framer-motion";
import PageTitle from "../components/PageTitle";
import PagePopup from "../components/PagePopup/PagePopup";
import { popupConfig } from "../components/PagePopup/popupConfig";
import PageTransition from "../components/PageTransition";

// NEW: Logo loop component
import LogoLoop from "../components/ui/LogoLoop";

// 🔊 GLOBAL SOUND PRELOAD (instant playback)
const hoverSound = new Audio("/sounds/hover.mp3");
hoverSound.volume = 0.55;
hoverSound.preload = "auto";

hoverSound.addEventListener("canplaythrough", () => {
  hoverSound.ready = true;
});

// Function to play instantly
const playHoverSound = () => {
  if (hoverSound.ready) {
    hoverSound.currentTime = 0;
    hoverSound.play();
  }
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// SKILL SECTIONS
const SKILLS_SECTIONS = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Programming Languages",
    logos: [
      { name: "C", file: "/logos/C_Pro.png" },
      { name: "C#", file: "/logos/Cs.png" },
      { name: "Java", file: "/logos/java.png" },
      { name: "JavaScript", file: "/logos/JavaScript.png" },
      { name: "Python", file: "/logos/py.jpg" },
      { name: "HTML", file: "/logos/HTML.png" },
      { name: "CSS", file: "/logos/css.png" },
    ],
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Frameworks & Libraries",
    logos: [
      { name: "React", file: "/logos/React.png" },
      { name: "Tailwind CSS", file: "/logos/tailwind.png" },
      { name: "NumPy", file: "/logos/numpy.jpg" },
      { name: "Pandas", file: "/logos/pandas.jpg" },
    ],
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "Tools & Platforms",
    logos: [
      { name: "Git", file: "/logos/git.png" },
      { name: "GitHub", file: "/logos/github.png" },
      { name: "VS Code", file: "/logos/Visual.png" },
      { name: "Jupyter", file: "/logos/jupyter.png" },
      { name: "Unity", file: "/logos/unity.png" },
    ],
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Interests",
    logos: [
      { name: "Game Dev", file: "/logos/gamepad.png" },
      { name: "DSA", file: "/logos/dsa.png" },
      { name: "Machine Learning", file: "/logos/ml.png" },
      { name: "Web Dev", file: "/logos/webdev.png" },
    ],
  },
];

// Skill Card Section
const SkillSection = memo(({ section }) => {
  const { icon, title, logos } = section;

  return (
    <motion.div
      variants={itemVariants}
      className="
        p-[2px] rounded-xl 
        bg-gradient-to-br from-pink-500 to-cyan-400
        -skew-x-3 hover:skew-x-0
        transition-all duration-300
        shadow-[6px_6px_0px_#00eaff]
      "
    >
      <div
        className="
          rounded-xl p-6 h-full
          bg-gradient-to-br from-[#101010] via-[#1a1a1a] to-[#0b0b0b]
          shadow-inner border border-white/5
        "
      >
        <div className="flex items-center gap-3 mb-5">
          <div
            className="
              p-3 rounded-xl bg-black/50 
              border border-white/10
              text-white shadow-[0_0_10px_rgba(255,0,255,0.4)]
            "
          >
            {icon}
          </div>

          <h3
            className="
              text-xl font-bold text-white
              drop-shadow-[2px_2px_0px_#ff00ff]
              tracking-wide
            "
          >
            {title}
          </h3>
        </div>

        {/* Logo Loop — SOUND ADDED HERE */}
        <LogoLoop
          logos={logos}
          onHoverSound={() => playHoverSound()} // 🔥 new line
        />
      </div>
    </motion.div>
  );
});
SkillSection.displayName = "SkillSection";

// MAIN PAGE
const SkillsComponent = memo(function Skills() {
  return (
    <PageTransition>
      <PagePopup image={popupConfig.skills.image} text={popupConfig.skills.text} />

      <div className="w-full min-h-[80vh] flex flex-col items-center px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          <motion.div variants={itemVariants} className="text-center flex flex-col items-center mb-10">
            <div className="flex items-center gap-4 mb-3">
              <Settings2 className="w-12 h-12 text-primary drop-shadow-lg" />
              <PageTitle>Skills & Interests</PageTitle>
            </div>

            <p className="text-muted-foreground max-w-2xl text-lg">
              A snapshot of my technical strengths and fields I’m passionate about.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 gap-10"
          >
            {SKILLS_SECTIONS.map((section) => (
              <SkillSection key={section.title} section={section} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
});

SkillsComponent.displayName = "Skills";

export default SkillsComponent;
