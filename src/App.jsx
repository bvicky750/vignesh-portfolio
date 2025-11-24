import React, { useState, useEffect, useCallback, memo } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

// Components
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

// Pages
import About from "./components/About";
import Skills from "./components/Skills";
import Academics from "./components/Academics";
import Projects from "./components/Projects";
import CP from "./components/CP";
import Contact from "./components/Contact";


// ---------------------------------------------------------
// 🔥 NEW ANIMATED BACKGROUND (supports dark/light modes)
// ---------------------------------------------------------
export const AnimatedBG = memo(({ theme }) => {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden transition-all duration-500">

      {/* Glow Blob Left */}
      <div
        className={`
          absolute w-[500px] h-[500px] rounded-full blur-[130px]
          ${theme === "light" ? "bg-purple-400/30" : "bg-purple-700/40"}
          animate-float-slow
        `}
        style={{ top: "-120px", left: "-120px" }}
      />

      {/* Glow Blob Right */}
      <div
        className={`
          absolute w-[500px] h-[500px] rounded-full blur-[140px]
          ${theme === "light" ? "bg-blue-400/25" : "bg-blue-600/35"}
          animate-float-fast
        `}
        style={{ bottom: "-120px", right: "-120px" }}
      />

      {/* Subtle Grid */}
      <div
        className={`
          absolute inset-0
          ${theme === "light"
            ? "opacity-[0.18] bg-[linear-gradient(#cfcfcf55_1px,transparent_1px),linear-gradient(90deg,#cfcfcf55_1px,transparent_1px)] bg-[size:40px_40px]"
            : "opacity-[0.22] bg-[linear-gradient(#ffffff15_1px,transparent_1px),linear-gradient(90deg,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px]"
          }
        `}
      />
    </div>
  );
});
AnimatedBG.displayName = "AnimatedBG";


// ---------------------------------------------------------
// 🔄 PAGE ANIMATION SETTINGS
// ---------------------------------------------------------
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};
const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };


// ---------------------------------------------------------
// ROUTES WITH PAGE TRANSITIONS
// ---------------------------------------------------------
const AnimatedRoutes = memo(() => {
  const location = useLocation();

  const routesConfig = [
    { path: "/", Component: About },
    { path: "/about", Component: About },
    { path: "/skills", Component: Skills },
    { path: "/academics", Component: Academics },
    { path: "/projects", Component: Projects },
    { path: "/cp", Component: CP },
    { path: "/contact", Component: Contact },
  ];

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routesConfig.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
              >
                <Component />
              </motion.div>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
});
AnimatedRoutes.displayName = "AnimatedRoutes";


// ---------------------------------------------------------
// MAIN APP
// ---------------------------------------------------------
function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  const [sideNavOpen, setSideNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <Router>
      <ScrollToTop />

      {/* ⭐ This injects the new animated background */}
      <AnimatedBG theme={theme} />

      <Layout
        theme={theme}
        toggleTheme={toggleTheme}
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
      >
        <AnimatedRoutes />
      </Layout>

      <Analytics />
    </Router>
  );
}

export default App;
