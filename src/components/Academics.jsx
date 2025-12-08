import React, { useMemo, memo } from "react";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

import PageTitle from "../components/PageTitle";
import PageTransition from "../components/PageTransition";

import PagePopup from "../components/PagePopup/PagePopup";
import { popupConfig } from "../components/PagePopup/popupConfig";

// --- Page Animation ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// -----------------------------------------------------------
//          🟣 Education Card (Hover Scale + Glow + Sound)
// -----------------------------------------------------------
const EducationCard = memo(({ education }) => {
  const { logo, alt, title, link, program, year, scoreLabel, score } = education;

  // ⭐ HOVER SOUND (placed correctly)
  const hoverSound = new Audio("/sounds/hover.mp3");
  hoverSound.volume = 0.45;

  const playHoverSound = () => {
    hoverSound.currentTime = 0; // restart sound instantly
    hoverSound.play();
  };

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={playHoverSound}   // ⭐ SOUND TRIGGER HERE

      className="
        p-[3px] rounded-xl bg-gradient-to-br from-pink-500 to-cyan-400
        shadow-[0_0_12px_rgba(0,200,255,0.45)]
        transition-all duration-300
      "
      whileHover={{
        scale: 1.05,
        rotate: 0,
        boxShadow: "0 0 28px rgba(0,255,255,0.6)",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 12,
      }}
    >
      <div
        className="
          rounded-xl p-6 
          bg-gradient-to-br from-[#101010] via-[#181818] to-[#0b0b0b]
          border border-white/5 shadow-inner
          flex items-center gap-6
        "
      >
        {/* Logo */}
        <div
          className="
            w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden p-1
            bg-black/40 border border-white/10
            shadow-[0_0_10px_rgba(255,0,255,0.35)]
            flex items-center justify-center
          "
        >
          <img
            src={logo}
            alt={alt}
            className="w-full h-full object-contain rounded-lg"
            loading="lazy"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col text-left gap-1 text-white">
          <h3 className="text-xl font-bold tracking-wide drop-shadow-[2px_2px_0px_#ff00ff]">
            {title}
          </h3>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm text-cyan-300 
              hover:text-white hover:underline transition-all
            "
          >
            {program}
          </a>

          <div className="text-sm text-neutral-300 mt-2 space-y-1">
            <p>
              <span className="font-medium text-white/80">Year:</span> {year}
            </p>
            <p>
              <span className="font-medium text-white/80">{scoreLabel}:</span>{" "}
              {score}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
EducationCard.displayName = "EducationCard";

// -----------------------------------------------------------
//               📘 ACADEMICS DATA
// -----------------------------------------------------------
const ACADEMICS_DATA = [
  {
    logo: "/assets/logos/KSR.png",
    alt: "KSR Logo",
    title: "KSR College of Engineering Thiruchengode",
    link: "https://ksrce.ac.in/",
    program: "B.E in Computer Science and Engineering",
    year: "2024 – 2028",
    scoreLabel: "CGPA",
    score: "7.95 / 10",
  },
  {
    logo: "/assets/logos/GBSS.jpg",
    alt: "GBHSS Logo",
    title: "Government Boys Higher Secondary School, Bhavani",
    link: "https://www.tn.gov.in/kyg_template_tn/dept_profile.php?dep_id=Mjg=",
    program: "State Board (Class XII - 2024, Class X - 2022)",
    year: "2024",
    scoreLabel: "Percentage",
    score: "Class XII - 80.12%, Class X - 73.00%",
  },
];

// -----------------------------------------------------------
//               🎓 MAIN PAGE COMPONENT
// -----------------------------------------------------------
const AcademicsComponent = memo(function Academics() {
  const educationCards = useMemo(
    () =>
      ACADEMICS_DATA.map((education, index) => (
        <EducationCard key={`${education.title}-${index}`} education={education} />
      )),
    []
  );

  return (
    <PageTransition>
      <PagePopup
        image={popupConfig.education.image}
        text={popupConfig.education.text}
      />

      {/* ⭐ FIXED — Title centered properly */}
      <div className="w-full min-h-[80vh] flex flex-col items-center px-4 pt-20 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Title Section */}
          <motion.div variants={itemVariants} className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-primary drop-shadow-lg" />
              <PageTitle>Education</PageTitle>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              My academic journey has been a blend of rigorous learning and
              practical application.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={containerVariants}
            className="w-full max-w-2xl flex flex-col gap-8"
          >
            {educationCards}
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
});

AcademicsComponent.displayName = "Academics";

export default AcademicsComponent;
