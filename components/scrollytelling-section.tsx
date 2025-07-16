"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Circle, Square, Triangle, Hexagon } from "lucide-react";

const storySteps = [
  {
    id: 1,
    title: "BEGINNING",
    content: "Every great story starts with a single moment",
    icon: Circle,
    color: "from-blue-500 to-purple-600",
    shape: "circle",
  },
  {
    id: 2,
    title: "DEVELOPMENT",
    content: "Ideas take shape and transform into reality",
    icon: Square,
    color: "from-purple-600 to-pink-600",
    shape: "square",
  },
  {
    id: 3,
    title: "CLIMAX",
    content: "The moment where everything comes together",
    icon: Triangle,
    color: "from-pink-600 to-red-600",
    shape: "triangle",
  },
  {
    id: 4,
    title: "RESOLUTION",
    content: "A perfect ending that becomes a new beginning",
    icon: Hexagon,
    color: "from-red-600 to-orange-600",
    shape: "hexagon",
  },
];

export function ScrollytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.8, 1.2, 1, 1.2, 0.8]
  );
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [50, 10, 50, 10, 50]
  );

  const sectionHeight = storySteps.length * 100; // vh per step

  return (
    <section className="relative bg-black">
      <div ref={containerRef} style={{ height: `${sectionHeight}vh` }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                className="text-6xl md:text-8xl font-black text-white mb-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                STORY
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Watch elements transform as you scroll
              </motion.p>
            </div>

            <div className="relative h-96 flex items-center justify-center">
              <motion.div
                style={{
                  scale,
                  rotate,
                  borderRadius,
                }}
                className="w-64 h-64 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/30 flex items-center justify-center relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: scrollYProgress
                      .to([0, 0.25, 0.5, 0.75, 1], [
                        "linear-gradient(to bottom right, #3b82f6, #9333ea)",
                        "linear-gradient(to bottom right, #9333ea, #ec4899)",
                        "linear-gradient(to bottom right, #ec4899, #ef4444)",
                        "linear-gradient(to bottom right, #ef4444, #f97316)",
                        "linear-gradient(to bottom right, #3b82f6, #9333ea)",
                      ]),
                  }}
                />

                <div className="relative z-10 text-center">
                  {storySteps.map((step, index) => {
                    const start = index / storySteps.length;
                    const end = (index + 1) / storySteps.length;
                    const opacity = useTransform(
                      scrollYProgress,
                      [start, end],
                      [0, 1]
                    );
                    return (
                      <motion.div
                        key={step.id}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ opacity }}
                      >
                        <step.icon className="w-16 h-16 text-white" />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <div className="mt-16 text-center relative h-32">
              {storySteps.map((step, index) => {
                const start = index / storySteps.length;
                const end = (index + 1) / storySteps.length;
                const opacity = useTransform(
                  scrollYProgress,
                  [start, end],
                  [0, 1]
                );

                return (
                  <motion.div
                    key={step.id}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ opacity }}
                  >
                    <h3 className="text-4xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-300 max-w-2xl">
                      {step.content}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
