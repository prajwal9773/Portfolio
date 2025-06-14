import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Tech Stack", href: "#tech" },
    { label: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-card backdrop-blur-md bg-black/80 border-b border-white/10"
            : "bg-black/50 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-center">
            {/* Centered Portfolio Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl sm:text-2xl md:text-3xl font-orbitron font-bold text-cyber cursor-pointer"
              onClick={() => scrollToSection("#home")}
            >
              Portfolio
            </motion.div>

            {/* Desktop Navigation - Hidden since we have bottom nav */}
            <div className="hidden md:flex items-center space-x-8 absolute right-4">
              {navItems.slice(1).map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2, color: "#00d4ff" }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-cyber-blue transition-colors duration-300 font-medium text-sm"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>


    </>
  );
};
