
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProjectModal } from "@/components/ProjectModal";
import { ParticleBackground } from "@/components/ParticleBackground";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    id: "event-manager",
    title: "Event Manager",
    description: "Full-stack event management system for NIT Silchar with real-time features",
    longDescription: "A comprehensive event management platform built for NIT Silchar that revolutionizes how academic events are organized and managed. Features include real-time event tracking, automated registration, participant management, and analytics dashboard.",
    technologies: ["React", "Node.js", "Firebase", "Recharts", "Framer Motion"],
    demoUrl: "https://event-manager-demo.com",
    githubUrl: "https://github.com/username/event-manager",
    imageUrl: "/placeholder.svg",
    highlights: [
      "Real-time event tracking and notifications",
      "Automated registration and payment processing",
      "Analytics dashboard with interactive charts",
      "Mobile-responsive design with smooth animations"
    ]
  },
  {
    id: "gitiq",
    title: "GitIQ",
    description: "AI-powered GitHub insights tool providing intelligent repository analysis",
    longDescription: "An intelligent GitHub analytics platform that leverages AI to provide deep insights into repositories, code quality, contributor patterns, and project health. Built with cutting-edge technologies to deliver actionable intelligence.",
    technologies: ["React", "GitHub APIs", "OpenAI", "Recharts", "Cloudinary"],
    demoUrl: "https://gitiq-demo.com",
    githubUrl: "https://github.com/username/gitiq",
    imageUrl: "/placeholder.svg",
    highlights: [
      "AI-powered code analysis and recommendations",
      "Interactive repository health dashboards",
      "Contributor pattern recognition",
      "Automated code quality scoring"
    ]
  }
];

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <Hero />
        <ProjectsSection 
          projects={projects} 
          onProjectClick={setSelectedProject} 
        />
      </motion.div>

      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Index;
