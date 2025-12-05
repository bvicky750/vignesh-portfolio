import React, { useMemo, memo } from "react";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import PageTitle from "../components/PageTitle";

// ⭐ Page Transition Wrapper
import PageTransition from "../components/PageTransition";

// ⭐ NEW — Global Popup System
import PagePopup from "../components/PagePopup/PagePopup";
import { popupConfig } from "../components/PagePopup/popupConfig";

// --- Animation Variants ---
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

// --- Education Card (Spider-Verse Style) ---
const EducationCard = memo(({ education }) => {
  const { logo, alt, title, link, program, year, scoreLabel, score } = education;

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
          rounded-xl p-6 bg-gradient-to-br 
          from-[#101010] via-[#181818] to-[#0b0b0b]
          border border-white/5 shadow-inner
          flex items-center gap-6
        "
      >
        <div
          className="
            w-16 h-16 flex-shrink-0 
            rounded-xl overflow-hidden p-1
            bg-black/40 border border-white/10
            shadow-[0_0_10px_rgba(255,0,255,0.4)]
            flex items-center justify-center
          "
        >
          <img
            src={logo}
            alt={alt}
            className="w-full h-full object-contain rounded-lg"
            loading="lazy"
            decoding="async"
            width={64}
            height={64}
            style={{ aspectRatio: '1/1' }}
          />
        </div>

        <div className="flex flex-col text-left gap-1 text-white">
          <h3 className="text-xl font-bold drop-shadow-[2px_2px_0px_#ff00ff] tracking-wide">
            {title}
          </h3>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm text-cyan-300 
              hover:text-white hover:underline 
              transition-all duration-200
            "
          >
            {program}
          </a>

          <div className="text-sm text-neutral-300 mt-2 space-y-1">
            <p>
              <span className="font-medium text-white/80">Year:</span> {year}
            </p>
            <p>
              <span className="font-medium text-white/80">{scoreLabel}:</span> {score}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
EducationCard.displayName = "EducationCard";

// --- Static Data ---
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

// --- MAIN PAGE COMPONENT ---
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

      {/* ⭐ PAGE POPUP (Spider-Verse character) */}
      <PagePopup 
        image={popupConfig.education.image}
        text={popupConfig.education.text}
      />

      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-4">
              <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-primary drop-shadow-lg" />
              <PageTitle>Education</PageTitle>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              My academic journey has been a blend of rigorous learning and practical application.
            </motion.p>
          </motion.div>

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
