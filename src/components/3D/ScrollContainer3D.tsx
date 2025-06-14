
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollContainer3DProps {
  children: ReactNode;
}

export const ScrollContainer3D = ({ children }: ScrollContainer3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        y,
        rotateX,
        scale,
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};
