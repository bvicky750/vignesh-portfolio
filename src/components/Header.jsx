// Header.jsx (Spider-Verse Title + Glitch Nav Update)

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import MusicButton from "./MusicButton";

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
    },
  },
};

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/academics", label: "Education" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const Header = memo(({ onHamburgerClick }) => {
  const location = useLocation();

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-8 py-4 
        bg-black/20 backdrop-blur-md shadow-md border-b border-white/10"
    >
      {/* SPIDER-VERSE TITLE */}
      <Link
        to="/"
        className="spider-text text-2xl sm:text-3xl font-extrabold tracking-wide select-none transition relative"
      >
        Vignesh B
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden min-[935px]:flex gap-3 sm:gap-5 md:gap-7 items-center">
        {navLinks.map(({ to, label }) => {
          const isActive =
            location.pathname === to ||
            (to === "/about" && location.pathname === "/");

          return (
            <Link
              key={to}
              to={to}
              data-text={label}
              className={`spider-nav px-4 py-2 rounded-lg text-base font-medium relative 
              transition-all duration-200
                ${
                  isActive
                    ? "text-white bg-white/10"
                    : "text-neutral-300 hover:text-white hover:bg-white/5"
                }
              `}
            >
              {label}
            </Link>
          );
        })}

        {/* Music Button stays */}
        <MusicButton />
      </nav>

      {/* Mobile Navigation */}
      <div className="flex max-[934px]:flex hidden items-center gap-2">
        <MusicButton />

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={onHamburgerClick}
          aria-label="Open menu"
          className="ml-1 flex items-center justify-center w-14 h-14 rounded-full hover:bg-white/10 active:scale-95 transition"
        >
          <Menu className="w-9 h-9 text-primary" />
        </button>
      </div>
    </motion.header>
  );
});

Header.displayName = "Header";

export default Header;
