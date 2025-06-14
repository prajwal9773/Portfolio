
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Link } from "lucide-react";
import { useRef } from "react";
import { Scene3D } from "./3D/Scene3D";

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <Scene3D />
      
      <motion.div 
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-orbitron font-bold mb-6 text-cyber"
            style={{
              filter: "drop-shadow(0 0 20px #00d4ff) drop-shadow(0 0 40px #00d4ff)",
              textShadow: "0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 60px #00d4ff"
            }}
            animate={{ 
              textShadow: [
                "0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 60px #00d4ff",
                "0 0 30px #8b5cf6, 0 0 60px #8b5cf6, 0 0 90px #8b5cf6",
                "0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 60px #00d4ff"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            DEVELOPER
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, z: -100 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="glass-card p-8 max-w-3xl mx-auto mb-12 relative"
            style={{
              transform: "perspective(1000px) rotateX(10deg)",
              boxShadow: "0 20px 40px rgba(0, 212, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            }}
          >
            <motion.div
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-2xl opacity-30"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent)",
                backgroundSize: "200% 100%"
              }}
            />
            
            <h2 className="text-3xl md:text-4xl font-rajdhani font-medium mb-6 text-white relative z-10">
              Crafting Digital Experiences
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed relative z-10">
              Full-stack developer specializing in cutting-edge web technologies. 
              Building scalable applications with modern frameworks and AI integration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex gap-8 justify-center flex-wrap"
          >
            <motion.button
              whileHover={{ 
                scale: 1.1, 
                y: -10,
                rotateX: 10,
                rotateY: 5
              }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-10 py-5 flex items-center gap-4 hover:bg-white/20 transition-all duration-500"
              style={{
                boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)",
                transform: "perspective(1000px)"
              }}
            >
              <Github className="w-6 h-6" />
              <span className="font-medium text-lg">GitHub</span>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.1, 
                y: -10,
                rotateX: -10,
                rotateY: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="glass-card px-10 py-5 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #8b5cf6)",
                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)",
                transform: "perspective(1000px)"
              }}
            >
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{ width: "200%" }}
              />
              <span className="font-medium text-white text-lg relative z-10">View Projects</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* 3D Floating Elements */}
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            y: [0, -30, 0],
          }}
          transition={{ 
            rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 right-20 w-24 h-24 hidden lg:block"
          style={{
            background: "linear-gradient(45deg, #00d4ff, #8b5cf6)",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            filter: "drop-shadow(0 0 20px #00d4ff)",
            transform: "perspective(1000px) rotateX(45deg)"
          }}
        />
        
        <motion.div
          animate={{ 
            rotateX: [0, 360],
            x: [0, 20, -20, 0]
          }}
          transition={{ 
            rotateX: { duration: 15, repeat: Infinity, ease: "linear" },
            x: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-40 left-20 w-20 h-20 hidden lg:block"
          style={{
            background: "linear-gradient(45deg, #8b5cf6, #00ff88)",
            borderRadius: "50%",
            filter: "drop-shadow(0 0 15px #8b5cf6)",
            transform: "perspective(1000px) rotateY(45deg)"
          }}
        />
      </motion.div>
    </section>
  );
};
