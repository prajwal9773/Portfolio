import { motion } from "framer-motion";
import { useState } from "react";
import { Home, FolderOpen, User, Code, Mail } from "lucide-react";

interface BottomNavigationProps {
  showLoading?: boolean;
  isProjectModalOpen?: boolean;
}

export const BottomNavigation = ({ showLoading = false, isProjectModalOpen = false }: BottomNavigationProps) => {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "#home" },
    { id: "projects", label: "Projects", icon: FolderOpen, href: "#projects" },
    { id: "about", label: "About", icon: User, href: "#about" },
    { id: "tech", label: "Skills", icon: Code, href: "#tech" },
    { id: "contact", label: "Contact", icon: Mail, href: "#contact" }
  ];

  const scrollToSection = (href: string, id: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveTab(id);
    }
  };

  // Hide bottom navigation during loading or when project modal is open
  if (showLoading || isProjectModalOpen) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div className="glass-card bg-black/90 backdrop-blur-md border-t border-white/10 px-2 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => scrollToSection(item.href, item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 min-w-[60px] ${
                  isActive 
                    ? "text-cyber-blue bg-cyber-blue/10" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-5 h-5 mb-1" />
                </motion.div>
                <span className={`text-xs font-medium ${isActive ? "text-cyber-blue" : ""}`}>
                  {item.label}
                </span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyber-blue rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
