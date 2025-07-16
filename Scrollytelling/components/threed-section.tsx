"use client";

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Box, RotateCcw, Maximize } from 'lucide-react';

export function ThreeDSection() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), {
    stiffness: 300,
    damping: 30
  });
  
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), {
    stiffness: 300,
    damping: 30
  });

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const cubes = [
    { x: 0, y: 0, z: 0, size: 100, color: 'from-blue-500 to-purple-600' },
    { x: 150, y: -50, z: -50, size: 80, color: 'from-purple-500 to-pink-600' },
    { x: -150, y: 50, z: -100, size: 90, color: 'from-pink-500 to-red-600' },
    { x: 100, y: 100, z: -150, size: 70, color: 'from-red-500 to-orange-600' },
    { x: -100, y: -100, z: -200, size: 85, color: 'from-orange-500 to-yellow-600' },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
            3D SPACE
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Immersive three-dimensional interactions and depth
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          className="relative h-96 flex items-center justify-center perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ perspective: '1000px' }}
        >
          <motion.div
            className="relative preserve-3d"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d'
            }}
          >
            {cubes.map((cube, index) => (
              <motion.div
                key={index}
                className="absolute preserve-3d"
                style={{
                  x: cube.x,
                  y: cube.y,
                  z: cube.z,
                  width: cube.size,
                  height: cube.size,
                  transformStyle: 'preserve-3d'
                }}
                animate={{
                  rotateX: isHovered ? [0, 360] : 0,
                  rotateY: isHovered ? [0, 360] : 0,
                  rotateZ: isHovered ? [0, 360] : 0
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: isHovered ? Infinity : 0,
                  delay: index * 0.2
                }}
              >
                {/* Front face */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${cube.color} border border-white/20 flex items-center justify-center`}
                  style={{ transform: `translateZ(${cube.size / 2}px)` }}
                >
                  <Box className="w-8 h-8 text-white" />
                </div>
                
                {/* Back face */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${cube.color} border border-white/20 flex items-center justify-center`}
                  style={{ transform: `translateZ(-${cube.size / 2}px) rotateY(180deg)` }}
                >
                  <RotateCcw className="w-8 h-8 text-white" />
                </div>
                
                {/* Right face */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${cube.color} border border-white/20 flex items-center justify-center`}
                  style={{ transform: `rotateY(90deg) translateZ(${cube.size / 2}px)` }}
                >
                  <Maximize className="w-8 h-8 text-white" />
                </div>
                
                {/* Left face */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${cube.color} border border-white/20 flex items-center justify-center`}
                  style={{ transform: `rotateY(-90deg) translateZ(${cube.size / 2}px)` }}
                >
                  <Box className="w-8 h-8 text-white" />
                </div>
                
                {/* Top face */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${cube.color} border border-white/20 flex items-center justify-center`}
                  style={{ transform: `rotateX(90deg) translateZ(${cube.size / 2}px)` }}
                >
                  <RotateCcw className="w-8 h-8 text-white" />
                </div>
                
                {/* Bottom face */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${cube.color} border border-white/20 flex items-center justify-center`}
                  style={{ transform: `rotateX(-90deg) translateZ(${cube.size / 2}px)` }}
                >
                  <Maximize className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            { 
              icon: Box, 
              title: "Depth", 
              description: "Real 3D transformations with perspective",
              delay: 0
            },
            { 
              icon: RotateCcw, 
              title: "Rotation", 
              description: "Smooth multi-axis rotation animations",
              delay: 0.2
            },
            { 
              icon: Maximize, 
              title: "Interaction", 
              description: "Mouse-responsive 3D positioning",
              delay: 0.4
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: item.delay }}
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <item.icon className="w-12 h-12 text-white mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <span className="text-white font-semibold">
              Move your mouse to control the 3D space
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}