"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollProgress } from '@/components/scroll-progress';
import { HeroSection } from '@/components/hero-section';
import { ParallaxSection } from '@/components/parallax-section';
import { VideoScrollSection } from '@/components/video-scroll-section';
import { HorizontalScrollSection } from '@/components/horizontal-scroll-section';
import { ScrollytellingSection } from '@/components/scrollytelling-section';
import { TriggerTransitionSection } from '@/components/trigger-transition-section';
import { RevealSection } from '@/components/reveal-section';
import { NewHorizontalScrollSection } from '@/components/new-horizontal-scroll-section';
import { EnhancedGooeySection } from '@/components/enhanced-gooey-section';
import { ThreeDSection } from '@/components/threed-section';
import { AnimatedSVGSection } from '@/components/animated-svg-section';
import { Footer } from '@/components/footer';

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      <ScrollProgress />
      <HeroSection />
      <ParallaxSection />
      <VideoScrollSection />
      <HorizontalScrollSection />
      <ScrollytellingSection />
      <TriggerTransitionSection />
      <RevealSection />
      <NewHorizontalScrollSection />
      <EnhancedGooeySection />
      <ThreeDSection />
      <AnimatedSVGSection />
      <Footer />
    </main>
  );
}