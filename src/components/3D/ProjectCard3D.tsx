
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Float, PerspectiveCamera } from '@react-three/drei';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/pages/Index';
import { Github, Link, ArrowUp } from 'lucide-react';
import * as THREE from 'three';

interface ProjectCard3DProps {
  project: Project;
  onClick: () => void;
  index: number;
}

const Card3DMesh = ({ isHovered }: { isHovered: boolean }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.scale.setScalar(isHovered ? 1.05 : 1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <RoundedBox 
        ref={meshRef}
        args={[4, 2.5, 0.2]} 
        radius={0.1}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color="#1a1a2e" 
          transparent 
          opacity={0.8}
          emissive="#00d4ff"
          emissiveIntensity={isHovered ? 0.2 : 0.1}
        />
      </RoundedBox>
      
      {/* Glowing border */}
      <RoundedBox 
        args={[4.1, 2.6, 0.15]} 
        radius={0.12}
        position={[0, 0, -0.05]}
      >
        <meshStandardMaterial 
          color="#00d4ff" 
          transparent 
          opacity={isHovered ? 0.3 : 0.1}
          emissive="#00d4ff"
          emissiveIntensity={0.5}
        />
      </RoundedBox>
    </Float>
  );
};

export const ProjectCard3D = ({ project, onClick, index }: ProjectCard3DProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="relative h-96 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8b5cf6" />
          
          <Card3DMesh isHovered={isHovered} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <motion.h3 
              className="text-2xl font-orbitron font-bold text-white group-hover:text-cyber transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {project.title}
            </motion.h3>
            
            <motion.div
              whileHover={{ scale: 1.2, rotate: 45 }}
              className="p-2 rounded-full bg-white/10 group-hover:bg-cyber-blue/30 transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4 transform -rotate-45" />
            </motion.div>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.1 }}
                className="px-3 py-1 bg-white/10 rounded-full text-sm text-cyber-blue border border-cyber-blue/30 backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-400">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
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
              <span className="text-sm">Demo</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Holographic effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${index % 2 === 0 ? '#00d4ff' : '#8b5cf6'} 0%, transparent 50%, ${index % 2 === 0 ? '#8b5cf6' : '#00d4ff'} 100%)`
        }}
      />
    </motion.div>
  );
};
