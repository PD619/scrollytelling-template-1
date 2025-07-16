"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Droplets, Waves, Zap, Sparkles, Circle, Star, Hexagon, Triangle } from 'lucide-react';

const morphingShapes = [
  { id: 1, shape: 'sphere', color: '#ff6b6b', size: 1.2, position: { x: 0, y: 0, z: 0 } },
  { id: 2, shape: 'cube', color: '#4ecdc4', size: 0.8, position: { x: 100, y: -50, z: 20 } },
  { id: 3, shape: 'torus', color: '#45b7d1', size: 1.0, position: { x: -80, y: 60, z: -30 } },
  { id: 4, shape: 'cylinder', color: '#f9ca24', size: 0.9, position: { x: 120, y: 80, z: 10 } },
  { id: 5, shape: 'cone', color: '#6c5ce7', size: 1.1, position: { x: -120, y: -80, z: 40 } },
];

export function EnhancedGooeySection() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentMorph, setCurrentMorph] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Auto-morphing effect
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentMorph((prev) => (prev + 1) % morphingShapes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((event.clientX - centerX) / 5);
    mouseY.set((event.clientY - centerY) / 5);
  };

  const currentShape = morphingShapes[currentMorph];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
            FLUID
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            High-quality 3D morphing objects with gooey physics
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          className="relative h-96 flex items-center justify-center perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Enhanced 3D Gooey Effect */}
          <div className="relative w-full h-full">
            {/* Central 3D morphing object */}
            <motion.div
              className="absolute left-1/2 top-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate3d(${springX.get()}px, ${springY.get()}px, 0px)`,
                transformStyle: "preserve-3d"
              }}
              animate={{
                rotateX: isHovered ? [0, 360] : 0,
                rotateY: isHovered ? [0, 360] : 0,
                rotateZ: [0, 360],
              }}
              transition={{
                rotateZ: { repeat: Infinity, duration: 20, ease: "linear" },
                rotateX: { duration: 4, ease: "easeInOut" },
                rotateY: { duration: 4, ease: "easeInOut" }
              }}
            >
              <div
                className="w-full h-full rounded-full backdrop-blur-sm border-2 border-white/30 shadow-2xl"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${currentShape.color}40, ${currentShape.color}20, transparent 70%)`,
                  boxShadow: `0 0 60px ${currentShape.color}40, inset 0 0 60px ${currentShape.color}20`,
                  transform: `scale(${currentShape.size})`
                }}
              >
                {/* Inner gooey core */}
                <motion.div
                  className="absolute inset-4 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 40% 40%, ${currentShape.color}60, ${currentShape.color}30, transparent 80%)`,
                    boxShadow: `0 0 40px ${currentShape.color}60`,
                  }}
                  animate={{
                    scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: currentShape.color,
                      boxShadow: `0 0 20px ${currentShape.color}`,
                      left: `${30 + i * 8}%`,
                      top: `${20 + i * 10}%`,
                    }}
                    animate={{
                      x: [0, 20, -20, 0],
                      y: [0, -30, 30, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 3 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Orbiting elements */}
            {morphingShapes.map((shape, index) => (
              <motion.div
                key={shape.id}
                className="absolute w-16 h-16 rounded-full backdrop-blur-sm border border-white/20"
                style={{
                  background: `radial-gradient(circle at 40% 40%, ${shape.color}40, transparent 70%)`,
                  boxShadow: `0 0 30px ${shape.color}30`,
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  x: [
                    shape.position.x,
                    shape.position.x + 50,
                    shape.position.x - 50,
                    shape.position.x
                  ],
                  y: [
                    shape.position.y,
                    shape.position.y - 50,
                    shape.position.y + 50,
                    shape.position.y
                  ],
                  scale: currentMorph === index ? [1, 1.5, 1] : [0.8, 1, 0.8],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-2 rounded-full opacity-60" 
                     style={{ background: shape.color }} />
              </motion.div>
            ))}
          </div>
          
          {/* Interactive text */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
            <motion.div
              animate={{
                y: springY.get() * 0.1,
                x: springX.get() * 0.1
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Sparkles className="w-12 h-12 text-white mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-white mb-2">
                3D Morphing
              </h3>
              <p className="text-gray-300 text-sm">
                Move your mouse to interact
              </p>
            </motion.div>
          </div>
        </div>

        {/* Enhanced feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20">
          {[
            { 
              icon: Circle, 
              title: "3D Physics", 
              description: "Realistic depth and movement",
              color: "#ff6b6b" 
            },
            { 
              icon: Waves, 
              title: "Fluid Dynamics", 
              description: "Smooth morphing transitions",
              color: "#4ecdc4" 
            },
            { 
              icon: Sparkles, 
              title: "Particle System", 
              description: "Interactive floating elements",
              color: "#45b7d1" 
            },
            { 
              icon: Star, 
              title: "Auto-Morphing", 
              description: "Continuous shape evolution",
              color: "#f9ca24" 
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="group relative p-6 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: `radial-gradient(circle, ${item.color}40, transparent 70%)`,
                  boxShadow: `0 0 20px ${item.color}30`
                }}
                whileHover={{ 
                  rotate: 360,
                  boxShadow: `0 0 30px ${item.color}50`
                }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="w-7 h-7 text-white" />
              </motion.div>
              
              <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
              
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 rounded-full"
                style={{ background: item.color, transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}