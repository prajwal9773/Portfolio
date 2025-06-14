
import { motion } from "framer-motion";
import { ProjectCard3D } from "./3D/ProjectCard3D";
import { ScrollContainer3D } from "./3D/ScrollContainer3D";
import { Project } from "@/pages/Index";

interface ProjectsSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const ProjectsSection = ({ projects, onProjectClick }: ProjectsSectionProps) => {
  return (
    <section className="py-32 relative min-h-screen">
      <div className="container mx-auto px-6">
        <ScrollContainer3D>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold mb-8 text-cyber"
              style={{
                filter: "drop-shadow(0 0 20px #00d4ff)",
                textShadow: "0 0 30px #00d4ff, 0 0 60px #8b5cf6"
              }}
              animate={{
                textShadow: [
                  "0 0 30px #00d4ff, 0 0 60px #8b5cf6",
                  "0 0 40px #8b5cf6, 0 0 80px #00d4ff",
                  "0 0 30px #00d4ff, 0 0 60px #8b5cf6"
                ]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              FEATURED PROJECTS
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Explore my latest creations - from AI-powered tools to full-stack applications, 
              each project showcases innovation and technical excellence
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <ScrollContainer3D key={project.id}>
                <ProjectCard3D
                  project={project}
                  onClick={() => onProjectClick(project)}
                  index={index}
                />
              </ScrollContainer3D>
            ))}
          </div>
        </ScrollContainer3D>

        {/* 3D Background Elements */}
        <motion.div
          animate={{
            rotateY: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/4 -left-20 w-40 h-40 opacity-20"
          style={{
            background: "linear-gradient(45deg, #00d4ff, transparent, #8b5cf6)",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            filter: "blur(2px)",
            transform: "perspective(1000px) rotateX(30deg)"
          }}
        />

        <motion.div
          animate={{
            rotateX: [0, 360],
            y: [0, -50, 0],
          }}
          transition={{
            rotateX: { duration: 30, repeat: Infinity, ease: "linear" },
            y: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-1/4 -right-20 w-32 h-32 opacity-15"
          style={{
            background: "conic-gradient(#00ff88, #ff0080, #ffff00, #00ff88)",
            borderRadius: "50%",
            filter: "blur(3px)",
            transform: "perspective(1000px) rotateZ(45deg)"
          }}
        />
      </div>
    </section>
  );
};
