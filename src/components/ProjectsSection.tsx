
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { Project } from "@/pages/Index";

interface ProjectsSectionProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const ProjectsSection = ({ projects, onProjectClick }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="py-8 sm:py-12 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-orbitron font-bold mb-4 sm:mb-6 text-cyber">
             Projects
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto">
          I built a project management platform with features like drag-and-drop task cards,
           real-time collaboration, and full authentication. The system is designed to streamline team workflows,
            inspired by tools like Trello and Jira.

          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <ProjectCard
                project={project}
                onClick={() => onProjectClick(project)}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
