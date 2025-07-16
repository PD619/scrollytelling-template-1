"use client";

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-line", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      })
      .from(".hero-subtitle", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .from(".hero-scroll", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      <motion.div 
        ref={textRef}
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 max-w-6xl"
      >
        <div className="overflow-hidden">
          <h1 className="hero-line text-7xl md:text-9xl font-black leading-none mb-4">
            SCROLL
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line text-7xl md:text-9xl font-black leading-none mb-4">
            THROUGH
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line text-7xl md:text-9xl font-black leading-none mb-8">
            STORIES
          </h1>
        </div>
        
        <p className="hero-subtitle text-xl md:text-2xl font-light text-gray-300 max-w-2xl mx-auto mb-16">
          Experience immersive storytelling through advanced scroll interactions, 
          parallax effects, and dynamic animations
        </p>
        
        <motion.div 
          className="hero-scroll flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-sm uppercase tracking-widest mb-2">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}