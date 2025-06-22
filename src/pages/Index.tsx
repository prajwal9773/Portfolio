
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ProjectModal } from "@/components/ProjectModal";
import { ParticleBackground } from "@/components/ParticleBackground";
import { AboutSection } from "@/components/AboutSection";
import { TechStack } from "@/components/TechStack";
import { ContactSection } from "@/components/ContactSection";
import { Navigation } from "@/components/Navigation";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LoadingScreen } from "@/components/LoadingScreen";
import { BottomNavigation } from "@/components/BottomNavigation";
import Chatbot from "@/components/Chatbot";
import { AnimatePresence } from "framer-motion";
import "../styles/mobile.css";


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
    id: "task-manager",
    title: "Collaborative Task Management Platform",
    description: "A full-featured project management tool inspired by Trello and Jira with real-time collaboration",
    longDescription: "A robust task management platform designed for teams to plan, track, and manage work efficiently. Built with a full-stack architecture, it includes drag-and-drop task cards, project-based boards, user authentication, and role-based access control. The backend is powered by Node.js, Express, MongoDB, and Redis for caching, while the frontend uses React with intuitive UI components. This system supports real-time updates, seamless team collaboration, and scalable project organization.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Redis",
      "JWT",
      "Socket.io",
      "Docker",
      "Tailwind CSS"
    ],
    demoUrl: "https://planity-1.onrender.com/",
    githubUrl: "https://github.com/prajwal9773/FDFSD",
    imageUrl: "/task-manager-preview.png",
    highlights: [
      "Drag-and-drop task cards with real-time updates",
      "Role-based access control and full user authentication",
      "Board-based organization similar to Trello/Jira",
      "MongoDB + Redis powered backend with Docker containerization",
      "Socket.io-based real-time collaboration features",
      "Responsive UI with Tailwind CSS and custom modals/forms"
    ]
  }
  ,
  {
    id: "chartsync",
    title: "ChartSync - Real-Time Chat & Collaboration Platform",
    description: "Real-time collaborative chatting and charting system using Socket.io and WebSockets",
    longDescription: "ChartSync is a scalable real-time chatting and collaboration platform that enables seamless bi-directional communication using WebSockets. Built with the MERN stack, it allows users to interact through dynamic charts and live chat, with persistent storage in MongoDB and optimized media handling via Cloudinary. Featuring responsive UI with DaisyUI and efficient backend logic via Express.js, the system is engineered for low-latency interactions in multi-user environments.",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "WebSockets",
      "Cloudinary",
      "DaisyUI"
    ],
    demoUrl: "",
    githubUrl: "https://github.com/prajwal9773/",
    imageUrl: "/chartsync-preview.png",
    highlights: [
      "Real-time bi-directional communication using Socket.io",
      "Collaborative chart editing with persistent state",
      "Low-latency WebSocket-based architecture for seamless UX",
      "Cloudinary integration for optimized media handling",
      "Scalable MongoDB-based backend with efficient query performance",
      "Modular and responsive UI built with React.js and DaisyUI",
      "Supports multi-user sessions and collaborative workflows"
    ]
  }
  ,
  {
    id: "portfolio-website",
    title: "AI-Orchestrated Portfolio",
    description: "This revolutionary portfolio website showcasing the future of AI-driven development",
    longDescription: "A cutting-edge portfolio website that demonstrates the pinnacle of AI-human collaboration in web development. Built with modern technologies and cyberpunk aesthetics, this portfolio itself is a testament to what's possible when strategic AI orchestration meets creative vision. Features advanced animations, responsive design, and a comprehensive showcase of AI-driven development methodology.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "shadcn/ui"],
    demoUrl: window.location.href,
    githubUrl: "",
    imageUrl: "/portfolio.png",
    highlights: [
      "Meta-project: Portfolio showcasing AI-orchestrated development",
      "Advanced cyberpunk design with glassmorphism effects",
      "Comprehensive sections: Hero, Projects, About, Tech Stack, Contact",
      "Enhanced 3D card effects and smooth animations",
      "Mobile-responsive with professional loading screen",
      "Built through strategic AI collaboration and prompt engineering"
    ]
  }
];

const Index = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {showLoading && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <div
        className="min-h-screen relative overflow-hidden page-container"
        style={{
          backgroundColor: '#0a0a0a',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          backgroundAttachment: 'fixed'
        }}
      >
        <Navigation />
        <ParticleBackground />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded && !showLoading ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
          style={{ backgroundColor: 'transparent' }}
        >
        <div id="home">
          <Hero />
        </div>
        <ProjectsSection
          projects={projects}
          onProjectClick={setSelectedProject}
        />
        <div id="about">
          <AboutSection />
        </div>
        <div id="tech">
          <TechStack />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </motion.div>

      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />

        <ScrollToTop isProjectModalOpen={selectedProject !== null} />
        <BottomNavigation
          showLoading={showLoading}
          isProjectModalOpen={selectedProject !== null}
        />

        {/* AI Chatbot */}
        {!showLoading && <Chatbot isProjectModalOpen={selectedProject !== null} />}
      </div>
    </>
  );
};

export default Index;
