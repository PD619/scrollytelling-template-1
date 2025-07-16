"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Sparkles, Zap } from 'lucide-react';

const items = [
  {
    id: 1,
    title: "INNOVATION",
    description: "Breaking boundaries with cutting-edge technology",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    title: "CREATIVITY",
    description: "Transforming ideas into extraordinary experiences",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    title: "EXCELLENCE",
    description: "Delivering perfection in every pixel and interaction",
    icon: Star,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    title: "FUTURE",
    description: "Building tomorrow's digital experiences today",
    icon: ArrowRight,
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop"
  }
];

export function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black"
    >
      <div className="sticky top-0 flex items-center h-screen">
        <motion.div 
          style={{ x }}
          className="flex gap-8 pl-4"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="min-w-[80vw] md:min-w-[60vw] lg:min-w-[40vw] h-[80vh] relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="relative h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/20 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ 
                    backgroundImage: `url(${item.image})`,
                    filter: 'brightness(0.3)'
                  }}
                ></div>
                
                <div className="relative z-20 p-8 h-full flex flex-col justify-end">
                  <motion.div
                    className="mb-6"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="w-12 h-12 text-white mb-4" />
                  </motion.div>
                  
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
                    {item.title}
                  </h3>
                  
                  <p className="text-lg text-gray-300 mb-6 max-w-md">
                    {item.description}
                  </p>
                  
                  <motion.button
                    className="self-start px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-white font-semibold transition-all duration-300 flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
                
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 z-20">
                  <span className="text-white font-bold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-30">
        <div className="writing-mode-vertical text-white font-bold tracking-widest">
          HORIZONTAL SCROLL
        </div>
      </div>
    </section>
  );
}