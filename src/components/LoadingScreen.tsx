import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Code, Cpu, Zap } from "lucide-react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { icon: <Code className="w-6 h-6" />, text: "Loading Components...", color: "cyber-blue" },
    { icon: <Cpu className="w-6 h-6" />, text: "Initializing AI Systems...", color: "cyber-purple" },
    { icon: <Zap className="w-6 h-6" />, text: "Preparing Portfolio...", color: "cyber-green" }
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onLoadingComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % loadingSteps.length);
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-50 flex items-center justify-center"
    >
      <div className="text-center max-w-md mx-auto px-4 sm:px-6">
        {/* Main Logo/Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-cyber mb-4"
            animate={{
              textShadow: [
                "0 0 20px #00d4ff",
                "0 0 30px #00d4ff",
                "0 0 20px #00d4ff"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg text-gray-300 font-rajdhani"
          >
            AI-Orchestrated Development
          </motion.p>
        </motion.div>

        {/* Loading Step */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className={`p-3 rounded-full bg-${loadingSteps[currentStep].color}/20 text-${loadingSteps[currentStep].color}`}
            >
              {loadingSteps[currentStep].icon}
            </motion.div>
            <span className="text-white font-medium text-sm sm:text-base md:text-lg">
              {loadingSteps[currentStep].text}
            </span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-3">
            <span>Loading Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
              className="h-full bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green rounded-full relative"
            >
              <motion.div
                animate={{ x: [0, 100, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
        </div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-3 gap-2 sm:gap-4 text-center"
        >
          <div className="glass-card p-2 sm:p-3">
            <div className="text-sm sm:text-base md:text-lg font-bold text-cyber-blue">115K+</div>
            <div className="text-xs text-gray-400">Lines of Code</div>
          </div>
          <div className="glass-card p-2 sm:p-3">
            <div className="text-sm sm:text-base md:text-lg font-bold text-cyber-green">$0</div>
            <div className="text-xs text-gray-400">Budget Used</div>
          </div>
          <div className="glass-card p-2 sm:p-3">
            <div className="text-sm sm:text-base md:text-lg font-bold text-cyber-purple">3</div>
            <div className="text-xs text-gray-400">Projects</div>
          </div>
        </motion.div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute w-1 h-1 bg-cyber-blue rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
