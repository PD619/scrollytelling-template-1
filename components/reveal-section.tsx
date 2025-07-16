"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Eye, Lightbulb, Target, Rocket } from 'lucide-react';

const reveals = [
  {
    id: 1,
    title: "VISION",
    description: "See beyond the ordinary and imagine the extraordinary",
    icon: Eye,
    delay: 0
  },
  {
    id: 2,
    title: "INNOVATION",
    description: "Transform bright ideas into breakthrough solutions",
    icon: Lightbulb,
    delay: 0.2
  },
  {
    id: 3,
    title: "PRECISION",
    description: "Execute with accuracy and attention to detail",
    icon: Target,
    delay: 0.4
  },
  {
    id: 4,
    title: "LAUNCH",
    description: "Deploy solutions that make a lasting impact",
    icon: Rocket,
    delay: 0.6
  }
];

export function RevealSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 overflow-hidden"
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
            REVEALS
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Elements that unveil themselves as they enter your viewport
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reveals.map((reveal, index) => (
            <motion.div
              key={reveal.id}
              className="group relative"
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: reveal.delay,
                type: "spring",
                stiffness: 100
              }}
            >
              <div className="relative h-80 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50"></div>
                
                <motion.div
                  className="absolute inset-0 bg-white/5"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 1, delay: reveal.delay + 0.3 }}
                />
                
                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                  <motion.div
                    className="self-end"
                    initial={{ rotate: 0 }}
                    animate={isInView ? { rotate: 360 } : {}}
                    transition={{ duration: 1, delay: reveal.delay + 0.5 }}
                  >
                    <reveal.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <div>
                    <motion.h3 
                      className="text-3xl font-bold text-white mb-4"
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: reveal.delay + 0.7 }}
                    >
                      {reveal.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-gray-300 text-lg"
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: reveal.delay + 0.9 }}
                    >
                      {reveal.description}
                    </motion.p>
                  </div>
                </div>
                
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1, delay: reveal.delay + 1.1 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="inline-block px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <span className="text-white font-semibold">
              Scroll-triggered animations complete
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}