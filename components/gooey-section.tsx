"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Droplets, Waves, Zap, Sparkles, Circle, Star } from 'lucide-react';

export function GooeySection() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((event.clientX - centerX) / 10);
    mouseY.set((event.clientY - centerY) / 10);
  };

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
            GOOEY
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Fluid, organic animations that feel alive and responsive
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          className="relative h-96 flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 400"
            className="absolute inset-0"
          >
            <defs>
              <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey" />
                <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
              </filter>
              
              <linearGradient id="gooeyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            
            <g filter="url(#gooey)">
              <motion.circle
                cx={400}
                cy={200}
                r={60}
                fill="url(#gooeyGradient)"
                animate={{
                  r: isHovered ? [60, 80, 60] : 60,
                  cx: 400 + springX.get(),
                  cy: 200 + springY.get()
                }}
                transition={{
                  r: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                  cx: { type: "spring", stiffness: 300, damping: 30 },
                  cy: { type: "spring", stiffness: 300, damping: 30 }
                }}
              />
              
              <motion.circle
                cx={320}
                cy={160}
                r={40}
                fill="url(#gooeyGradient)"
                animate={{
                  r: isHovered ? [40, 60, 40] : 40,
                  cx: 320 + springX.get() * 0.5,
                  cy: 160 + springY.get() * 0.5
                }}
                transition={{
                  r: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
                  cx: { type: "spring", stiffness: 300, damping: 30 },
                  cy: { type: "spring", stiffness: 300, damping: 30 }
                }}
              />
              
              <motion.circle
                cx={480}
                cy={240}
                r={35}
                fill="url(#gooeyGradient)"
                animate={{
                  r: isHovered ? [35, 55, 35] : 35,
                  cx: 480 + springX.get() * 0.3,
                  cy: 240 + springY.get() * 0.3
                }}
                transition={{
                  r: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
                  cx: { type: "spring", stiffness: 300, damping: 30 },
                  cy: { type: "spring", stiffness: 300, damping: 30 }
                }}
              />
              
              <motion.circle
                cx={360}
                cy={280}
                r={30}
                fill="url(#gooeyGradient)"
                animate={{
                  r: isHovered ? [30, 50, 30] : 30,
                  cx: 360 + springX.get() * 0.7,
                  cy: 280 + springY.get() * 0.7
                }}
                transition={{
                  r: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
                  cx: { type: "spring", stiffness: 300, damping: 30 },
                  cy: { type: "spring", stiffness: 300, damping: 30 }
                }}
              />
              
              <motion.circle
                cx={440}
                cy={160}
                r={25}
                fill="url(#gooeyGradient)"
                animate={{
                  r: isHovered ? [25, 45, 25] : 25,
                  cx: 440 + springX.get() * 0.4,
                  cy: 160 + springY.get() * 0.4
                }}
                transition={{
                  r: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                  cx: { type: "spring", stiffness: 300, damping: 30 },
                  cy: { type: "spring", stiffness: 300, damping: 30 }
                }}
              />
            </g>
          </svg>
          
          <div className="relative z-10 text-center">
            <motion.div
              animate={{
                x: springX.get() * 0.1,
                y: springY.get() * 0.1
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Droplets className="w-16 h-16 text-white mb-4 mx-auto" />
              <h3 className="text-2xl font-bold text-white mb-2">
                Fluid Motion
              </h3>
              <p className="text-gray-300">
                Move your mouse to interact
              </p>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            { icon: Droplets, title: "Organic", description: "Natural, flowing animations" },
            { icon: Waves, title: "Fluid", description: "Smooth, continuous motion" },
            { icon: Zap, title: "Responsive", description: "Reacts to user interaction" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <item.icon className="w-12 h-12 text-white mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}