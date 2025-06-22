import { motion } from "framer-motion";
import { Code, Database, Cloud, Cpu, Palette, Zap } from "lucide-react";

export const TechStack = () => {
  const categories = [
    {
      title: "Frontend Development",
      icon: <Palette className="w-6 h-6" />,
      color: "cyber-blue",
      technologies: [
        { name: "React", level: "Medium", description: "frontend framework" },
        { name: "Next.js 14", level: "beginer", description: "Frontend framework" },
        { name: "TypeScript", level: "Intermediate", description: "Type-safe development" },
        { name: "Tailwind CSS", level: "Advanced", description: "AI-assisted utility-first styling" },
        { name: "Framer Motion", level: "Intermediate", description: "AI-guided smooth animations" }
      ]
    },
    {
      title: "AI-Driven Backend & APIs",
      icon: <Database className="w-6 h-6" />,
      color: "cyber-green",
      technologies: [
        
          { name: "Node.js", level: "Advanced", description: "Server-side JavaScript runtime for scalable backend services" },
          { name: "Express.js", level: "Advanced", description: "Minimal and flexible Node.js web application framework" },
          { name: "MongoDB", level: "Advanced", description: "NoSQL database for high-performance data storage and retrieval" },
          { name: "PostgreSQL", level: "Intermediate", description: "Relational database with strong ACID compliance and indexing" },
          { name: "SQL", level: "Advanced", description: "Structured query language for relational database operations" },
          { name: "Redis", level: "Intermediate", description: "In-memory key-value store for caching and session management" },
          { name: "Docker", level: "Intermediate", description: "Containerization for consistent and portable development environments" },
          { name: "JWT", level: "Advanced", description: "Token-based authentication for secure API access" },
          { name: "Prisma", level: "Intermediate", description: "Next-gen ORM for PostgreSQL and other SQL databases" },
         
        
        
      ]
    },
    {
      title: "AI Integration",
      icon: <Cpu className="w-6 h-6" />,
      color: "cyber-purple",
      technologies: [
        { name: "Groq AI", level: "Advanced", description: "Ultra-fast AI processing" },
        { name: "Google Gemini", level: "Advanced", description: "Multi-modal AI" },
        { name: "HuggingFace", level: "Intermediate", description: "Open-source AI models" },
      ]
    },
    {
      title: "Tools & Platforms",
      icon: <Cloud className="w-6 h-6" />,
      color: "cyber-yellow",
      technologies: [
        { name: "Vercel", level: "Advanced", description: "Deployment & hosting" },
        { name: "Cloudinary", level: "Intermediate", description: "Media management" },
        { name: "VS Code + AI", level: "Expert", description: "AI-enhanced development" },
        { name: "Git & GitHub", level: "Advanced", description: "Version control" },
        { name: "Recharts", level: "Intermediate", description: "Data visualization" },
        { name: "Render", level: "Intermediate", description: "Deployment & hosting" },

      ]
    },
    {
      title: "Development Approach",
      icon: <Zap className="w-6 h-6" />,
      color: "cyber-pink",
      technologies: [
        { name: "AI-Driven Architecture", level: "Expert", description: "System design through AI" },
        { name: "Error Prevention", level: "Advanced", description: "Proactive debugging" },
        { name: "Resource Optimization", level: "Expert", description: "Maximum impact, zero cost" },
        { name: "Continuous Learning", level: "Expert", description: "Adapting to new technologies" }
      ]
    },
    {
      title: "Specialized Skills",
      icon: <Code className="w-6 h-6" />,
      color: "cyber-orange",
      technologies: [
       
        [
        
         
          { name: "Role-Based Access", level: "Advanced", description: "Secure route and permission control" },
          { name: "Authentication & Authorization", level: "Advanced", description: "JWT-based session handling and identity verification" },
          { name: "Performance Optimization", level: "Intermediate", description: "Improving application speed and efficiency" },
          { name: "Containerization (Docker)", level: "Intermediate", description: "Portable and consistent development environments" },
          { name: "Database Optimization", level: "Advanced", description: "Indexing, query planning, and schema tuning" },
          { name: "Real-Time Systems", level: "Intermediate", description: "WebSocket-based collaborative features" }
        ]
        
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert": return "text-cyber-yellow";
      case "Advanced": return "text-cyber-green";
      case "Intermediate": return "text-cyber-blue";
      default: return "text-gray-400";
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case "Expert": return "w-full";
      case "Advanced": return "w-4/5";
      case "Intermediate": return "w-3/5";
      default: return "w-2/5";
    }
  };

  return (
    <section className="py-8 sm:py-12 md:py-20 relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 text-cyber">
            Technology Arsenal
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit mastered.
          </p>
        </motion.div>

        {/* Tech Categories Grid */}
        <div className="grid lg:grid-cols-2 gap-8 tech-grid">
          {categories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass-card p-6 hover:bg-white/5 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-full bg-${category.color}/20 text-${category.color}`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-orbitron font-bold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Technologies List */}
              <div className="space-y-4">
                {category.technologies.map((tech, techIndex) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (techIndex * 0.05) }}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white group-hover:text-cyber-blue transition-colors duration-200">
                        {tech.name}
                      </span>
                      <span className={`text-sm font-medium ${getLevelColor(tech.level)}`}>
                        {tech.level}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700/50 rounded-full h-2 mb-1">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: (categoryIndex * 0.1) + (techIndex * 0.1) }}
                        className={`h-2 rounded-full ${getLevelWidth(tech.level)}`}
                        style={{
                          background: category.color === "cyber-blue" ? "linear-gradient(to right, #00d4ff, #00d4ff99)" :
                                     category.color === "cyber-green" ? "linear-gradient(to right, #00ff88, #00ff8899)" :
                                     category.color === "cyber-purple" ? "linear-gradient(to right, #8b5cf6, #8b5cf699)" :
                                     category.color === "cyber-yellow" ? "linear-gradient(to right, #ffff00, #ffff0099)" :
                                     category.color === "cyber-pink" ? "linear-gradient(to right, #ff0080, #ff008099)" :
                                     "linear-gradient(to right, #ff8c00, #ff8c0099)"
                        }}
                      />
                    </div>
                    
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
                      {tech.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Learning Philosophy - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card p-8 mt-16 max-w-4xl mx-auto text-center hidden md:block"
        >
          <h3 className="text-2xl font-orbitron font-bold text-cyber mb-4">
            Continuous Evolution
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            My technology stack isn't just a list of tools—it's a living ecosystem that grows learning. 
            Each project teaches me new patterns, each challenge reveals new possibilities, and each AI interaction 
            deepens my understanding of what's possible.
          </p>
          <div className="flex items-center justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-blue">6+</div>
              <div className="text-sm text-gray-400">Tech Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-green">30+</div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyber-purple">∞</div>
              <div className="text-sm text-gray-400">Learning Potential</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
