
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center, Environment, PerspectiveCamera } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { Vector3, Color } from 'three';
import * as THREE from 'three';

interface FloatingCubeProps {
  position: [number, number, number];
  color: string;
  scale?: number;
}

const FloatingCube = ({ position, color, scale = 1 }: FloatingCubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.8}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

const FloatingTorus = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
};

const Particles = () => {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      particlesRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00d4ff" transparent opacity={0.6} />
    </points>
  );
};

export const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Environment preset="night" />
        
        <Particles />
        
        <FloatingCube position={[-5, 3, -2]} color="#00d4ff" scale={0.8} />
        <FloatingCube position={[5, -2, -3]} color="#8b5cf6" scale={1.2} />
        <FloatingCube position={[3, 4, -5]} color="#00ff88" scale={0.6} />
        
        <FloatingTorus position={[-3, -3, -4]} color="#ff0080" />
        <FloatingTorus position={[4, 2, -6]} color="#ffff00" />
        
        <Float speed={3} rotationIntensity={0.5} floatIntensity={3}>
          <mesh position={[0, 0, -8]} scale={2}>
            <octahedronGeometry args={[1]} />
            <meshStandardMaterial 
              color="#00d4ff" 
              transparent 
              opacity={0.3}
              wireframe
            />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
};
