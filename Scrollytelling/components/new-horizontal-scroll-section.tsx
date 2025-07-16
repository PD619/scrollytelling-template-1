"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Star, Heart, Zap, Crown, Flame, Sparkles } from 'lucide-react';

const scrollItems = [
  {
    id: 1,
    title: "STELLAR",
    subtitle: "Outstanding Performance",
    description: "Experience unparalleled quality and attention to detail in every interaction",
    icon: Star,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop",
    color: "from-blue-500 to-purple-600",
    textColor: "text-blue-400"
  },
  {
    id: 2,
    title: "PASSION",
    subtitle: "Heartfelt Creation",
    description: "Every project is crafted with love and dedication to excellence",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    color: "from-pink-500 to-red-600",
    textColor: "text-pink-400"
  },
  {
    id: 3,
    title: "ENERGY",
    subtitle: "Dynamic Innovation",
    description: "Bringing electric creativity to every interaction and experience",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    color: "from-yellow-500 to-orange-600",
    textColor: "text-yellow-400"
  },
  {
    id: 4,
    title: "ROYAL",
    subtitle: "Premium Quality",
    description: "Delivering royal treatment with premium features and luxury design",
    icon: Crown,
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=400&fit=crop",
    color: "from-purple-500 to-indigo-600",
    textColor: "text-purple-400"
  },
  {
    id: 5,
    title: "FIERCE",
    subtitle: "Bold Innovation",
    description: "Fierce dedication to pushing boundaries and creating bold experiences",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop",
    color: "from-red-500 to-orange-600",
    textColor: "text-red-400"
  },
  {
    id: 6,
    title: "MAGIC",
    subtitle: "Enchanting Design",
    description: "Creating magical moments through enchanting design and interactions",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    color: "from-indigo-500 to-purple-600",
    textColor: "text-indigo-400"
  }
];

export function NewHorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % scrollItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView]);

  // Smooth scroll to item
  const scrollToItem = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = 400; // Width of each item
      const scrollLeft = index * itemWidth;
      scrollRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToItem(currentIndex);
  }, [currentIndex]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
            SHOWCASE
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Horizontal scrolling showcase featuring our premium collection
          </p>
        </motion.div>

        <motion.div 
          className="relative"
          style={{ opacity }}
        >
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto overflow-y-hidden space-x-8 pb-8 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {scrollItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0 w-96 h-80 relative cursor-pointer group"
                initial={{ opacity: 0, x: 100 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="relative h-full bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-2xl overflow-hidden backdrop-blur-sm">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(${item.image})`,
                      filter: 'brightness(0.4)'
                    }}
                  />
                  
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <motion.div
                        className={`p-3 rounded-full bg-white/10 backdrop-blur-sm ${item.textColor}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="w-6 h-6" />
                      </motion.div>
                      
                      <div className="text-right">
                        <span className="text-white/60 text-sm font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-black text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-lg text-gray-300 mb-3">
                        {item.subtitle}
                      </p>
                      <p className="text-sm text-gray-400 line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {scrollItems.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/30'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Auto-scroll indicator */}
          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center space-x-2 text-white/60">
              <motion.div
                className="w-2 h-2 bg-white/60 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm">Auto-scrolling showcase</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}