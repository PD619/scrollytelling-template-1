"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Heart, Zap } from 'lucide-react';

const cards = [
  {
    id: 1,
    title: "STELLAR",
    subtitle: "Outstanding Performance",
    description: "Experience unparalleled quality and attention to detail",
    icon: Star,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=800&fit=crop",
    color: "from-blue-500 to-purple-600"
  },
  {
    id: 2,
    title: "PASSION",
    subtitle: "Heartfelt Creation",
    description: "Every project is crafted with love and dedication",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=800&fit=crop",
    color: "from-pink-500 to-red-600"
  },
  {
    id: 3,
    title: "ENERGY",
    subtitle: "Dynamic Innovation",
    description: "Bringing electric creativity to every interaction",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop",
    color: "from-yellow-500 to-orange-600"
  },
  {
    id: 4,
    title: "FUTURE",
    subtitle: "Tomorrow's Vision",
    description: "Building the next generation of digital experiences",
    icon: Star,
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=800&fit=crop",
    color: "from-green-500 to-blue-600"
  },
  {
    id: 5,
    title: "CRAFT",
    subtitle: "Artistic Excellence",
    description: "Meticulous attention to every detail and nuance",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=800&fit=crop",
    color: "from-purple-500 to-pink-600"
  }
];

export function CarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInCarouselView, setIsInCarouselView] = useState(false);
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.5 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), {
    stiffness: 300,
    damping: 30
  });
  
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), {
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

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Auto-cycle functionality
  useEffect(() => {
    if (!isInView || hasCompletedCycle) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % cards.length;
        if (nextIndex === 0 && prev === cards.length - 1) {
          setHasCompletedCycle(true);
        }
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, hasCompletedCycle]);

  // Prevent page scrolling when carousel is in view and hasn't completed cycle
  useEffect(() => {
    if (isInView && !hasCompletedCycle) {
      setIsInCarouselView(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsInCarouselView(false);
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isInView, hasCompletedCycle]);

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
            CAROUSEL
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Interactive cards that auto-cycle through all items
          </p>
          {isInCarouselView && !hasCompletedCycle && (
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="inline-flex items-center space-x-2 text-white/60">
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                <span className="text-sm">Auto-cycling in progress...</span>
              </div>
            </motion.div>
          )}
          {hasCompletedCycle && (
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center space-x-2 text-green-400">
                <span className="text-sm">✓ Cycle complete - You can scroll again!</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div 
          ref={containerRef}
          className="relative h-96 flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full max-w-4xl">
            {cards.map((card, index) => {
              const offset = index - currentIndex;
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;
              
              return (
                <motion.div
                  key={card.id}
                  className="absolute left-1/2 top-1/2 w-80 h-96 cursor-pointer"
                  style={{
                    rotateX: isActive && isHovered ? rotateX : 0,
                    rotateY: isActive && isHovered ? rotateY : 0,
                    transformPerspective: 1000,
                  }}
                  animate={{
                    x: `-50% + ${offset * 100}px`,
                    y: "-50%",
                    scale: isActive ? 1 : 0.8 - absOffset * 0.1,
                    zIndex: cards.length - absOffset,
                    opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.3
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  whileHover={{
                    scale: isActive ? 1.05 : 0.85,
                    transition: { duration: 0.2 }
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div className="relative h-full bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-2xl overflow-hidden backdrop-blur-sm group">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ 
                        backgroundImage: `url(${card.image})`,
                        filter: 'brightness(0.4)'
                      }}
                    />
                    
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                    
                    <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <card.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        <div className="text-right">
                          <span className="text-white/60 text-sm">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-3xl font-black text-white mb-2">
                          {card.title}
                        </h3>
                        <p className="text-lg text-gray-300 mb-4">
                          {card.subtitle}
                        </p>
                        <p className="text-sm text-gray-400 line-clamp-3">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={prevCard}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextCard}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}