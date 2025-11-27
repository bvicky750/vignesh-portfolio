import React from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import Footer from "./Footer";

// ✅ Import the new animated background correctly
import ParticleBackground from "./ParticleBackground";

const Layout = ({ children, theme, toggleTheme, sideNavOpen, setSideNavOpen }) => {
  return (
    <div className="relative min-h-screen flex flex-col text-foreground overflow-x-hidden">
      
      {/* Animated Background */}
      <ParticleBackground theme={theme} />
      
      <Header
        toggleTheme={toggleTheme}
        currentTheme={theme}
        onHamburgerClick={() => setSideNavOpen(true)}
      />

      <SideNav open={sideNavOpen} onClose={() => setSideNavOpen(false)} />

      <main className="flex-grow pt-20 outline-none" tabIndex={-1}>
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default React.memo(Layout);
