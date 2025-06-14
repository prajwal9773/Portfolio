import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "About", href: "#about", id: "about" },
    { label: "Tech Stack", href: "#tech", id: "tech" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/DhrubaAgarwalla",
      label: "GitHub",
      color: "hover:text-white"
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/dhruba-kumar-agarwalla-7a5346270/",
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/919395386870",
      label: "WhatsApp",
      color: "hover:text-green-400"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? "glass-card backdrop-blur-xl bg-black/90 border-b border-cyber-blue/20 shadow-2xl"
            : "bg-black/30 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-5">
          <div className="flex items-center justify-between">

            {/* Left: Brand/Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => scrollToSection("#home")}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center group-hover:shadow-lg group-hover:shadow-cyber-blue/25 transition-all duration-300">
                <span className="text-white font-orbitron font-bold text-lg">D</span>
              </div>
              <div className="hidden lg:block">
                <div className="text-xl font-orbitron font-bold text-white group-hover:text-cyber transition-colors duration-300">
                  Dhruba Agarwalla
                </div>
                <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  AI-Orchestrated Developer
                </div>
              </div>
            </motion.div>

            {/* Center: Portfolio Text (Mobile) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden absolute left-1/2 transform -translate-x-1/2 cursor-pointer"
              onClick={() => scrollToSection("#home")}
            >
              <div className="text-xl font-orbitron font-bold text-cyber">
                Portfolio
              </div>
            </motion.div>

            {/* Center: Navigation Links (Desktop) */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-cyber-blue bg-cyber-blue/10 border border-cyber-blue/30"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right: Social Links & CTA */}
            <div className="flex items-center space-x-4">
              {/* Social Links */}
              <div className="hidden xl:flex items-center space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-lg bg-white/5 text-gray-400 ${social.color} transition-all duration-300 hover:bg-white/10`}
                    title={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>

              {/* CTA Button */}
              <motion.a
                href="mailto:dhrubagarwala67@gmail.com"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg text-white font-medium text-sm hover:shadow-lg hover:shadow-cyber-blue/25 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>Let's Connect</span>
              </motion.a>

              {/* Mobile Contact Button */}
              <motion.a
                href="mailto:dhrubagarwala67@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};
