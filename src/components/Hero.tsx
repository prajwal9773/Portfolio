
import { motion } from "framer-motion";
import { Github, Link } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative cyber-grid">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-orbitron font-bold mb-6 text-cyber animate-glow"
            animate={{ 
              textShadow: [
                "0 0 20px #00d4ff",
                "0 0 40px #00d4ff, 0 0 60px #8b5cf6",
                "0 0 20px #00d4ff"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            DEVELOPER
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card p-8 max-w-2xl mx-auto mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-rajdhani font-medium mb-4 text-white">
              Crafting Digital Experiences
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Full-stack developer specializing in cutting-edge web technologies. 
              Building scalable applications with modern frameworks and AI integration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex gap-6 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-8 py-4 flex items-center gap-3 hover:bg-white/10 transition-all duration-300 neon-glow"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-8 py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-blue transition-all duration-500"
            >
              <span className="font-medium text-white">View Projects</span>
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-20 right-20 w-20 h-20 border border-cyber-blue/30 rounded-full animate-pulse-glow hidden lg:block"
        />
        
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            x: [0, -10, 10, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute bottom-40 left-20 w-16 h-16 border border-cyber-purple/30 rotate-45 animate-pulse-glow hidden lg:block"
        />
      </div>
    </section>
  );
};
