import { motion } from "framer-motion";
import { Brain, Code, Zap, Target, Award, Lightbulb } from "lucide-react";

export const AboutSection = () => {
  const achievements = [
  
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Selected Among top 50 teams",
      description: "Scale91 fintech hackathon",
      color: "cyber-green"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Runners up",
      description: "International healthcare hackathon winner",
      color: "cyber-purple"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "2nd Place Winner",
      description: "Smart India Hackathon",
      color: "cyber-yellow"
    }
  ];

  const methodology = [
    {
      step: "01",
      title: "Problem Analysis",
      description: "Break down complex requirements into manageable AI-solvable components"
    },
    {
      step: "02", 
      title: "Technology Research",
      description: "Identify optimal free resources and tools for maximum efficiency"
    },
    {
      step: "03",
      title: "AI Collaboration",
      description: "Strategic help  AI tools"
    },
    {
      step: "04",
      title: "Continuous Monitoring",
      description: "Constant progress tracking and error prevention to maintain project integrity"
    }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* About Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-orbitron font-bold mb-4 sm:mb-6 text-cyber">
            The AI Revolution
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
            Pioneering the future of development through intelligent AI collaboration.
          </p>
        </motion.div>

        {/* Story Section - Two separate containers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          {/* Profile Photo Container - Right Side on Desktop, First on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:order-2 glass-card p-6 flex items-center justify-center"
          >
            <div className="relative">
              <motion.img
                src="/Prajwal.jpg"
                alt="Prajwal Kumar"
                className="w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-full lg:h-auto lg:max-w-xs rounded-2xl object-cover border-4 border-cyber-blue/30 shadow-2xl"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
              />
              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-cyber-blue/50"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* My Journey Container - Left Side on Desktop, Second on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 lg:order-1 glass-card p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Brain className="w-8 h-8 text-cyber-blue" />
              <h3 className="text-2xl font-orbitron font-bold text-white">My Journey</h3>
            </div>

            <p className="text-gray-300 leading-relaxed mb-4">
            Prajwal Kumar is a passionate Computer Science student at IIIT Sricity with a strong foundation in backend development 
            and full-stack web technologies. He enjoys building real-world applications, especially with the MERN stack, and has 
            contributed to several complex team projects involving authentication systems, drag-and-drop UIs, and real-time collaboration tools
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
            Beyond academics, Prajwal has experience with cloud infrastructure, containerization using Docker,
             and has explored domains like 3D point cloud registration and geospatial analysis for 5G optimization.
              He was a runner-up at the Smart India Hackathon and has completed multiple certifications
             in machine learning and web developmen
            </p>
            <p className="text-gray-300 leading-relaxed">
            Prajwal enjoys solving system design problems and is keen on making tech impactful and scalable
            </p>
          </motion.div>
        </div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 md:mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="glass-card p-3 sm:p-4 md:p-6 text-center group hover:bg-white/10 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${achievement.color}/20 text-${achievement.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {achievement.icon}
              </div>
              <h4 className="text-sm sm:text-base md:text-lg font-orbitron font-bold text-white mb-1 sm:mb-2">
                {achievement.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-400">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Methodology Section - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto hidden md:block"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-orbitron font-bold text-cyber mb-4">
              AI Collaboration Methodology
            </h3>
            <p className="text-gray-300">
              My proven 4-step process for building production-scale applications through AI orchestration
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {methodology.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="glass-card p-6 relative overflow-hidden group hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl font-orbitron font-bold text-cyber-blue/30 group-hover:text-cyber-blue/50 transition-colors duration-300">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-orbitron font-bold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyber-blue/5 to-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Future Vision - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass-card p-8 mt-16 max-w-4xl mx-auto text-center hidden md:block"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Lightbulb className="w-8 h-8 text-cyber-yellow" />
            <h3 className="text-2xl font-orbitron font-bold text-white">Future Vision</h3>
          </div>
          <p className="text-gray-300 leading-relaxed mb-4">
          My goal is to build impactful tech products that solve real-world problems at scale.
           I aim to lead innovative projects that blend practical utility with cutting-edge technology.
          </p>
          <p className="text-cyber-blue font-medium">
            "Building tomorrow's solutions today, one AI collaboration at a time."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
