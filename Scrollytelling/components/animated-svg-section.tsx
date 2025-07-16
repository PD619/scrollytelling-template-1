"use client";

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function AnimatedSVGSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
            ANIMATED SVG
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Scalable vector animations that respond to scroll and interaction
          </p>
        </motion.div>

        <div className="relative h-96 flex items-center justify-center">
          <motion.div
            style={{ opacity }}
            className="relative w-full max-w-4xl"
          >
            <svg
              width="100%"
              height="400"
              viewBox="0 0 800 400"
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
                </linearGradient>
                
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Animated Path */}
              <motion.path
                d="M 50 200 Q 200 50 400 200 Q 600 350 750 200"
                stroke="url(#strokeGradient)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
                style={{ pathLength }}
                strokeDasharray={isPlaying ? "0 0" : "10 10"}
                animate={isPlaying ? {
                  strokeDashoffset: [0, -20],
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{
                  strokeDashoffset: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear"
                  },
                  opacity: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }
                }}
              />
              
              {/* Animated Circles */}
              {[0, 0.25, 0.5, 0.75, 1].map((progress, index) => (
                <motion.circle
                  key={index}
                  cx={50 + progress * 700}
                  cy={200 + Math.sin(progress * Math.PI * 2) * 100}
                  r="8"
                  fill="url(#strokeGradient)"
                  filter="url(#glow)"
                  animate={isPlaying ? {
                    r: [8, 12, 8],
                    opacity: [0.3, 1, 0.3]
                  } : {}}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              {/* Geometric Shapes */}
              <motion.polygon
                points="400,50 450,100 350,100"
                fill="none"
                stroke="url(#strokeGradient)"
                strokeWidth="2"
                filter="url(#glow)"
                animate={isPlaying ? {
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                } : {}}
                transition={{
                  rotate: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "linear"
                  },
                  scale: {
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }
                }}
                style={{ transformOrigin: '400px 75px' }}
              />
              
              <motion.rect
                x="350"
                y="300"
                width="100"
                height="100"
                fill="none"
                stroke="url(#strokeGradient)"
                strokeWidth="2"
                filter="url(#glow)"
                animate={isPlaying ? {
                  rotate: [0, -360],
                  scale: [1, 0.8, 1]
                } : {}}
                transition={{
                  rotate: {
                    repeat: Infinity,
                    duration: 5,
                    ease: "linear"
                  },
                  scale: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }
                }}
                style={{ transformOrigin: '400px 350px' }}
              />
              
              {/* Morphing Path */}
              <motion.path
                d="M 100 300 Q 200 250 300 300 Q 400 350 500 300"
                stroke="url(#strokeGradient)"
                strokeWidth="2"
                fill="none"
                filter="url(#glow)"
                animate={isPlaying ? {
                  d: [
                    "M 100 300 Q 200 250 300 300 Q 400 350 500 300",
                    "M 100 300 Q 200 350 300 300 Q 400 250 500 300",
                    "M 100 300 Q 200 250 300 300 Q 400 350 500 300"
                  ]
                } : {}}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
              />
            </svg>
          </motion.div>
          
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleAnimation}
              className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300"
            >
              {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {[
            { 
              title: "Scalable", 
              description: "Perfect quality at any size",
              icon: "📏"
            },
            { 
              title: "Interactive", 
              description: "Responds to user actions",
              icon: "🖱️"
            },
            { 
              title: "Morphing", 
              description: "Smooth shape transformations",
              icon: "🔄"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <RotateCcw className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">
              SVG animations driven by scroll progress
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}