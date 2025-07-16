"use client";

import { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Circle, Sparkles, Zap, Star } from 'lucide-react';

const floatingElements = [
  { icon: Circle, delay: 0, x: 100, y: 50, scale: 0.8, duration: 3 },
  { icon: Sparkles, delay: 0.2, x: -150, y: 120, scale: 1.2, duration: 4 },
  { icon: Zap, delay: 0.4, x: 200, y: -80, scale: 0.9, duration: 3.5 },
  { icon: Star, delay: 0.6, x: -100, y: -60, scale: 1.1, duration: 4.2 },
  { icon: Circle, delay: 0.8, x: 80, y: 180, scale: 0.7, duration: 3.8 },
  { icon: Sparkles, delay: 1, x: -200, y: -120, scale: 1.3, duration: 3.2 },
  { icon: Zap, delay: 1.2, x: 150, y: 100, scale: 1.0, duration: 4.5 },
  { icon: Star, delay: 1.4, x: -80, y: 140, scale: 0.9, duration: 3.7 },
];

const words = ["TRANSFORM", "EVOLVE", "EMERGE", "FLOURISH", "TRANSCEND"];

export function TriggerTransitionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const currentWord = useMemo(() => {
    const progress = scrollYProgress.get();
    const index = Math.floor(progress * words.length);
    return words[Math.min(index, words.length - 1)];
  }, [scrollYProgress]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-800 to-black overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        {/* Main content area */}
        <div className="relative h-screen flex items-center justify-center">
          {/* Floating elements */}
          {floatingElements.map((element, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{ opacity }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { 
                opacity: 1, 
                scale: element.scale,
                x: element.x,
                y: element.y,
                rotate: [0, 360]
              } : {}}
              transition={{ 
                duration: element.duration, 
                delay: element.delay,
                rotate: { repeat: Infinity, duration: element.duration, ease: "linear" }
              }}
            >
              <element.icon className="w-8 h-8 text-white/60" />
            </motion.div>
          ))}

          {/* Central morphing text */}
          <motion.div 
            className="text-center"
            style={{ y: textY }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
            >
              <motion.h2 
                className="text-8xl md:text-9xl font-black text-white mb-8 leading-none"
                animate={isInView ? {
                  textShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.3)",
                    "0 0 40px rgba(255, 255, 255, 0.5)",
                    "0 0 20px rgba(255, 255, 255, 0.3)",
                  ]
                } : {}}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {currentWord}
              </motion.h2>
              
              <motion.p 
                className="text-2xl text-gray-300 max-w-4xl mx-auto mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Experience the journey from story to revelation through dynamic transformations
              </motion.p>
            </motion.div>

            {/* Animated connection line */}
            <motion.div
              className="relative mx-auto w-96 h-2 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 2, delay: 1 }}
            >
              <motion.div
                className="absolute top-1/2 left-0 w-4 h-4 bg-white rounded-full -translate-y-1/2"
                animate={isInView ? { x: "calc(100vw - 16px)" } : {}}
                transition={{ duration: 3, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 2 }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6 text-white rotate-90" />
              </motion.div>
              <span className="text-white/60 text-sm mt-2">Continue scrolling</span>
            </div>
          </motion.div>
        </div>

        {/* Trigger elements grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          {[
            {
              title: "TRIGGER",
              description: "Scroll-activated animations that respond to user interaction",
              icon: Zap,
              delay: 0
            },
            {
              title: "TRANSITION",
              description: "Smooth morphing between different visual states",
              icon: Sparkles,
              delay: 0.2
            },
            {
              title: "TRANSFORM",
              description: "Dynamic elements that evolve as you explore",
              icon: Star,
              delay: 0.4
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="group relative p-8 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-2xl backdrop-blur-sm"
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: item.delay + 2.5 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.div
                className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {item.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {item.description}
              </p>
              
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white/50 to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: item.delay + 3 }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}