// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";

import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

// Background (FIXED import)
import AnimatedBackground from "./components/AnimatedBackground";

// Pages
import About from "./components/About";
import Skills from "./components/Skills";
import Academics from "./components/Academics";
import Projects from "./components/Projects";
import CP from "./components/CP";
import Contact from "./components/Contact";

// -----------------------------
// Clean Page Transition
// -----------------------------
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.35, ease: "easeInOut" }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

// -----------------------------
// Inner Routes Component
// -----------------------------
function AppRoutes({ theme, toggleTheme, sideNavOpen, setSideNavOpen }) {
  const location = useLocation();

  const routes = [
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
      <Layout
        theme={theme}
        toggleTheme={toggleTheme}
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
      >
        <Routes location={location} key={location.pathname}>
          {routes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <PageTransition>
                  <Component />
                </PageTransition>
              }
            />
          ))}
        </Routes>
      </Layout>
    </AnimatePresence>
  );
}

// -----------------------------
// Main App Component
// -----------------------------
export default function App() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
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
      <AnimatedBackground theme={theme} />

      <AppRoutes
        theme={theme}
        toggleTheme={toggleTheme}
        sideNavOpen={sideNavOpen}
        setSideNavOpen={setSideNavOpen}
      />

      <Analytics />
    </Router>
  );
}
