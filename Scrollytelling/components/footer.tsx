"use client";

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-t from-black via-gray-900 to-black py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            THE END
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            You've experienced the power of modern scrollytelling. 
            Ready to create your own immersive stories?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Technologies</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Next.js 14</li>
              <li>Framer Motion</li>
              <li>Lenis Smooth Scroll</li>
              <li>GSAP</li>
              <li>Tailwind CSS</li>
            </ul>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Parallax Scrolling</li>
              <li>3D Animations</li>
              <li>Morphing Effects</li>
              <li>Smooth Transitions</li>
              <li>Mobile Responsive</li>
            </ul>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Connect</h3>
            <div className="flex justify-center space-x-4">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Twitter, label: "Twitter" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Mail, label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-6 h-6 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Scrollytelling Experience. All rights reserved.
            </p>
            
            <motion.button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Back to Top</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
    </footer>
  );
}