
import { motion } from "framer-motion";
import { Github, Link, ArrowUp } from "lucide-react";
import { Project } from "@/pages/Index";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export const ProjectCard = ({ project, onClick, index }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -15,
        rotateX: 8,
        rotateY: index % 2 === 0 ? 8 : -8,
        scale: 1.02,
        z: 50,
      }}
      whileTap={{ scale: 0.98 }}
      className="glass-card p-4 sm:p-6 md:p-8 cursor-pointer group hover:bg-white/10 transition-all duration-500 relative overflow-hidden h-full flex flex-col"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onClick={onClick}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyber-blue/10 to-cyber-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <motion.h3
            className="text-lg sm:text-xl md:text-2xl font-orbitron font-bold text-white group-hover:text-cyber transition-colors duration-300 flex-1 leading-tight"
            whileHover={{ scale: 1.05 }}
          >
            {project.title}
          </motion.h3>

          <motion.div
            whileHover={{ scale: 1.1, rotate: 45 }}
            className="p-2 rounded-full bg-white/10 group-hover:bg-cyber-blue/20 transition-all duration-300 flex-shrink-0"
          >
            <ArrowUp className="w-4 h-4 transform -rotate-45" />
          </motion.div>
        </div>

        <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: techIndex * 0.1 }}
              className="px-2 sm:px-3 py-1 bg-white/10 rounded-full text-xs sm:text-sm text-cyber-blue border border-cyber-blue/30 hover:bg-cyber-blue/20 transition-colors duration-300"
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 sm:px-3 py-1 bg-white/5 rounded-full text-xs sm:text-sm text-gray-400 border border-gray-600">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        <div className="flex gap-3 sm:gap-4 mt-auto">
          <motion.button
            whileHover={{ scale: 1.05, x: 5 }}
            className="flex items-center gap-2 text-gray-300 hover:text-cyber-blue transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.githubUrl, '_blank');
            }}
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">Code</span>
          </motion.button>

          {project.demoUrl && (
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              className="flex items-center gap-2 text-gray-300 hover:text-cyber-green transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demoUrl, '_blank');
              }}
            >
              <Link className="w-4 h-4" />
              <span className="text-sm">Website</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at center, ${index % 2 === 0 ? '#00d4ff' : '#8b5cf6'} 0%, transparent 70%)`
        }}
      />
    </motion.div>
  );
};
