"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, Mountain, Zap } from 'lucide-react';

export function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0 z-10"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl"></div>
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 z-20 flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <Layers className="w-16 h-16 mx-auto mb-4 text-white" />
            <h2 className="text-5xl md:text-7xl font-black mb-4">LAYERS</h2>
            <p className="text-xl text-gray-300 max-w-2xl">
              Multiple parallax layers create depth and dimension
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        style={{ y: y3 }}
        className="absolute inset-0 z-30"
      >
        <div className="absolute top-1/3 left-1/6 transform -rotate-12">
          <Mountain className="w-32 h-32 text-white/20" />
        </div>
        <div className="absolute bottom-1/3 right-1/6 transform rotate-12">
          <Zap className="w-24 h-24 text-white/30" />
        </div>
      </motion.div>

      <motion.div 
        style={{ y: y4 }}
        className="absolute inset-0 z-40"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-1/4 right-1/3">
          <div className="w-1 h-1 bg-white/70 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/3">
          <div className="w-1 h-1 bg-white/70 rounded-full animate-pulse"></div>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-50"></div>
    </section>
  );
}