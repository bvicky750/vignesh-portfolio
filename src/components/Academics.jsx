import React, { useMemo, memo } from "react";
import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import PageTitle from "../components/PageTitle";

// ⭐ NEW — Import Page Transition
import PageTransition from "../components/PageTransition";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// --- Education Card ---
const EducationCard = memo(({ education }) => {
  const { logo, alt, title, link, program, year, scoreLabel, score } = education;

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow p-6 flex items-center gap-6"
    >
      <div className="w-16 h-16 flex-shrink-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shadow rounded-xl p-1 overflow-hidden">
        <img
          src={logo}
          alt={alt}
          className="w-full h-full object-contain rounded-lg"
          loading="lazy"
          decoding="async"
          width={64}
          height={64}
          style={{ aspectRatio: "1/1" }}
        />
      </div>
      <div className="flex flex-col text-left gap-1">
        <h3 className="text-lg sm:text-xl font-semibold text-foreground">{title}</h3>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline hover:text-foreground dark:hover:text-primary-foreground/70 font-medium transition-colors duration-200"
        >
          {program}
        </a>

        <div className="text-sm text-muted-foreground mt-2 space-y-1">
          <p>
            <span className="font-medium text-foreground/80">Year:</span> {year}
          </p>
          <p>
            <span className="font-medium text-foreground/80">{scoreLabel}:</span> {score}
          </p>
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
    title: "Government Boys Higher Secondry School, Bhavani",
    link: "https://www.tn.gov.in/kyg_template_tn/dept_profile.php?dep_id=Mjg=",
    program: "State Board (Class XII - 2024, Class X - 2022)",
    year: "2024",
    scoreLabel: "Percentage",
    score: "Class XII - 80.12%, Class X - 73.00%",
  },
];

// --- Main Component ---
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
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* ===== TITLE BLOCK ===== */}
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">

            <div className="flex items-center gap-4 mb-4">
              <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-primary drop-shadow-lg" />
              <PageTitle>Education</PageTitle>
            </div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              My academic journey has been a blend of rigorous learning and practical
              application, spanning general academics and engineering. Here are the
              institutions and milestones that have shaped my foundation.
            </motion.p>
          </motion.div>

          {/* ===== EDUCATION CARDS ===== */}
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
