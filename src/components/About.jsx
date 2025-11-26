// C:\Work space\final_portfolio\react-vite-tailwind-portfolio-template\src\components\About.jsx

import { Github, Linkedin, Mail, FileText, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo, memo } from "react";

// ❌ REMOVE THIS — IT WAS BREAKING YOUR ENTIRE APP
// import ClickSpark from '../ClickSpark';

// NEW — Import the Spider-Verse Title Component
import PageTitle from "../components/PageTitle";

// NEW — Page Transition Wrapper
import PageTransition from "../components/PageTransition";

const SocialLink = memo(({ href, icon, title, className }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    title={title}
  >
    {icon}
  </a>
));
SocialLink.displayName = "SocialLink";

const Tag = memo(({ tag }) => (
  <span className="px-4 py-1.5 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all">
    {tag}
  </span>
));
Tag.displayName = "Tag";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/bvicky750",
    icon: <Github className="w-5 h-5" />,
    title: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/vignesh-b-b1a52b329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    icon: <Linkedin className="w-5 h-5" />,
    title: "LinkedIn",
  },
  {
    href: "mailto:bevicky750@gmail.com",
    icon: <Mail className="w-5 h-5" />,
    title: "Email",
  },
];

const TAGS = [
  "Game development",
  "Data Structures",
  "Algorithms",
  "C++",
  "Problem Solving",
  "Web Development",
];

const RESUME_URL = "";

export default memo(function About() {
  const socialLinksElements = useMemo(
    () =>
      SOCIAL_LINKS.map(({ href, icon, title }) => (
        <SocialLink
          key={title}
          href={href}
          icon={icon}
          title={title}
          className="w-11 h-11 flex items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-105 transition-all"
        />
      )),
    []
  );

  const tagElements = useMemo(() => TAGS.map((tag) => <Tag key={tag} tag={tag} />), []);

  return (
    <PageTransition>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full min-h-[80vh] flex items-center justify-center"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl px-4 py-12">

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="
              relative flex-shrink-0 w-40 h-40 sm:w-56 sm:h-56 rounded-full
              overflow-hidden border-4 border-white dark:border-neutral-900 
              shadow-md bg-neutral-200 dark:bg-neutral-800
              transition-transform duration-300 ease-in-out hover:scale-[1.03]
              group before:content-[''] before:absolute before:inset-[-10px]
              before:rounded-full before:bg-radial-gradient before:opacity-0 
              before:scale-0 before:transition-all before:duration-500 before:ease-in-out
              group-hover:before:opacity-100 group-hover:before:scale-100 before:z-[-1]
            "
          >
            <img
              src="/assets/MyPhotograph.png"
              alt="Vignesh B"
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full"
              style={{ aspectRatio: "1/1" }}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 flex flex-col items-center md:items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-200/50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                About Me
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-3 text-foreground text-center md:text-left flex items-center gap-3">
              Hi, I'm <PageTitle>Vignesh B</PageTitle>
            </h1>

            <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground text-sm mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>KSR College of Engineering</span>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-4 text-center md:text-left">
              I’m someone who enjoys{" "}
              <span className="text-foreground font-medium">exploring tech</span>,
              trying creative ideas, and building projects that keep me excited to learn more.
            </p>

            <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
              {tagElements}
            </div>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {socialLinksElements}

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 h-11 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:scale-105 transition-all"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </PageTransition>
  );
});
