
import { motion } from "framer-motion";
import { Github, Link } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-[80vh] md:min-h-screen flex items-center justify-center relative cyber-grid pt-4 md:pt-0">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-orbitron font-bold mb-4 text-cyber leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            DHRUBA KUMAR AGARWALLA
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-rajdhani font-medium mb-6 text-cyber-purple"
          >
            AI-Orchestrated Full-Stack Developer
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card p-3 sm:p-4 md:p-8 max-w-3xl mx-auto mb-6 md:mb-8"
          >
            <h3 className="text-base sm:text-lg md:text-2xl font-rajdhani font-medium mb-3 md:mb-4 text-white">
              Transforming Complex Ideas into Production Reality
            </h3>
            <p className="text-xs sm:text-sm md:text-lg text-gray-300 leading-relaxed mb-3 md:mb-4">
              2nd Year Civil Engineering Student at NIT Silchar pioneering the future of AI-driven development.
              I don't just write code - I orchestrate solutions through advanced AI collaboration.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2 md:gap-4 text-center">
              <div className="glass-card p-1.5 sm:p-2 md:p-3">
                <div className="text-cyber-blue font-bold text-xs sm:text-sm md:text-lg">115K+</div>
                <div className="text-xs text-gray-400">Lines</div>
              </div>
              <div className="glass-card p-1.5 sm:p-2 md:p-3">
                <div className="text-cyber-green font-bold text-xs sm:text-sm md:text-lg">$0</div>
                <div className="text-xs text-gray-400">Budget</div>
              </div>
              <div className="glass-card p-1.5 sm:p-2 md:p-3">
                <div className="text-cyber-purple font-bold text-xs sm:text-sm md:text-lg">3</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
              <div className="glass-card p-1.5 sm:p-2 md:p-3">
                <div className="text-cyber-yellow font-bold text-xs sm:text-sm md:text-lg">2nd</div>
                <div className="text-xs text-gray-400">Prize</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex gap-2 sm:gap-3 md:gap-6 justify-center flex-wrap"
          >
            <motion.a
              href="https://github.com/DhrubaAgarwalla"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 flex items-center gap-1 sm:gap-2 md:gap-3 hover:bg-white/10 transition-all duration-300 neon-glow text-xs sm:text-sm md:text-base"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/dhruba-kumar-agarwalla-7a5346270/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 flex items-center gap-1 sm:gap-2 md:gap-3 hover:bg-white/10 transition-all duration-300 text-xs sm:text-sm md:text-base"
            >
              <Link className="w-5 h-5" />
              <span className="font-medium">LinkedIn</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-blue transition-all duration-500 text-xs sm:text-sm md:text-base"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
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
