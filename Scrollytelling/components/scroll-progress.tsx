"use client";

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollPercentage(Math.round(latest * 100));
    });

    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-800">
      <motion.div
        className="h-full bg-gradient-to-r from-white via-gray-300 to-white origin-left"
        style={{ scaleX }}
      />
      <div className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full border-2 border-white/30 relative">
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white"
              style={{
                background: `conic-gradient(from 0deg, white ${scrollPercentage * 3.6}deg, transparent ${scrollPercentage * 3.6}deg)`
              }}
            />
            <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{scrollPercentage}</span>
            </div>
          </div>
          <span className="text-sm font-medium text-white">%</span>
        </div>
      </div>
    </div>
  );
}