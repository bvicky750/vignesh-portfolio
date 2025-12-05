import React, { memo } from "react";
import { Code, Layers, Terminal, Sparkles, Settings2 } from "lucide-react";
import { motion } from "framer-motion";
import PageTitle from "../components/PageTitle";

// Popup System
import PagePopup from "../components/PagePopup/PagePopup";
import { popupConfig } from "../components/PagePopup/popupConfig";

// Page Transition
import PageTransition from "../components/PageTransition";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// 🔥 Logo Component
const LogoItem = memo(({ name, file }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ scale: 1.1 }}
    className="group relative cursor-pointer"
  >
    {/* Logo container */}
    <div
      className="
        w-14 h-14 p-2 rounded-xl 
        bg-black/40 border border-white/10 
        flex items-center justify-center 
        shadow-[0_0_8px_rgba(255,0,255,0.3)] 
        hover:shadow-[0_0_12px_rgba(0,255,255,0.8)] 
        transition
      "
    >
      <img
        src={file}
        alt={name}
        className="max-w-full max-h-full object-contain"
      />
    </div>

    {/* Tooltip on hover */}
    <div className="
      absolute -bottom-8 left-1/2 -translate-x-1/2 
      px-2 py-1 text-xs rounded-md 
      text-white bg-black/80 
      opacity-0 group-hover:opacity-100 
      transition-opacity whitespace-nowrap
    ">
      {name}
    </div>
  </motion.div>
));

LogoItem.displayName = "LogoItem";

// 🔥 Replace TAGS with LOGO LIST
const SKILLS_SECTIONS = [
  {
    icon: <Code className="w-6 h-6" />,
    title: "Programming Languages",
    logos: [
      { name: "C", file: "/logos/C_Programming_Language.svg.png" },
      { name: "C#", file: "/logos/Csharp_Logo.png" },
      { name: "Java", file: "/logos/java-4-logo.png" },
      { name: "JavaScript", file: "/logos/JavaScript-logo.png" },
      { name: "Python", file: "/logos/OIP.jpg" },
      { name: "HTML", file: "/logos/HTML5_logo_and_wordmark.svg.png" },
      { name: "CSS", file: "/logos/css3-logo-png-transparent.png" },
    ],
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Frameworks & Libraries",
    logos: [
      { name: "React", file: "/logos/React-icon.svg.png" },
      { name: "Tailwind CSS", file: "/logos/tailwind-css-logo-png_seeklogo-354675.png" },
      { name: "NumPy", file: "/logos/numpy.jpg" },
      { name: "Pandas", file: "/logos/pandas.jpg" },
    ],
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "Tools & Platforms",
    logos: [
      { name: "Git", file: "/logos/N3E5h8C-57u9W2KrH39jtAgvjxCBWXP7iFf7h7bCJOwmQwWU159mKU7q_tR4L5o6g6mmjBmXXsnBrcLMJawaKlNobrMXL5rbwhEjTWWPQfXUrVrAx5Qgtkcgjlyv6lpRCea7Wt8YahIe-u-lscmCSQ.png" },
      { name: "GitHub", file: "/logos/github.png" },
      { name: "VS Code", file: "/logos/Visual_Studio_Code_1.35_icon.svg.png" },
      { name: "Jupyter Notebook", file: "/logos/jupyter-logo-png_seeklogo-354673.png" },
      { name: "Unity", file: "/logos/unity-game-engine-logo-icon-png-701751694709269rfgrsxrghr.png" },
    ],
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Interests",
    logos: [
      { name: "Game Development", file: "/logos/pngtree-vibrant-and-playful-gamepad-icon-showcasing-a-mix-of-bright-colors-png-image_15235935.png" },
      { name: "DSA", file: "/logos/8346003.png" },
      { name: "Machine Learning", file: "/logos/9242551 - Copy.png" },
      { name: "Web Development", file: "/logos/9414296 - Copy.png" },
    ],
  },
];

// Skill Card
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

        {/* LOGO GRID */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
          {logos.map((logo, i) => (
            <LogoItem key={i} name={logo.name} file={logo.file} />
          ))}
        </div>
      </div>
    </motion.div>
  );
});
SkillSection.displayName = "SkillSection";

// MAIN PAGE COMPONENT
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
          {/* Title */}
          <motion.div variants={itemVariants} className="text-center flex flex-col items-center mb-10">
            <div className="flex items-center gap-4 mb-3">
              <Settings2 className="w-12 h-12 text-primary drop-shadow-lg" />
              <PageTitle>Skills & Interests</PageTitle>
            </div>

            <p className="text-muted-foreground max-w-2xl text-lg">
              A snapshot of my technical strengths and fields I’m passionate about.
            </p>
          </motion.div>

          {/* Grid of sections */}
          <motion.div
            variants={containerVariants}
            className="
              w-full max-w-5xl 
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 
              gap-10
            "
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
