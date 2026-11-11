/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';
import { Sparkles, Construction } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';
import { staggerContainer, revealItem, revealScaleItem } from '../utils/animationVariants.ts';

export default function SheshSection() {
  const ref = useRef<HTMLElement>(null);
  const orbContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isDark } = useTheme();

  // Mouse tracking applied strictly to the Orb itself (not the card)
  const [isHoveringOrb, setIsHoveringOrb] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs so the Orb gently responds and moves with the cursor
  const springConfig = { damping: 18, stiffness: 180 };
  const orbX = useSpring(mouseX, springConfig);
  const orbY = useSpring(mouseY, springConfig);

  const handleOrbMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbContainerRef.current) return;
    const rect = orbContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Normalized gentle displacement (up to 16px)
    const dx = Math.max(-20, Math.min(20, (e.clientX - centerX) * 0.25));
    const dy = Math.max(-20, Math.min(20, (e.clientY - centerY) * 0.25));
    mouseX.set(dx);
    mouseY.set(dy);
  };

  const handleOrbMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHoveringOrb(false);
  };

  return (
    <section
      id="shesh"
      ref={ref}
      className="bg-black py-28 md:py-36 px-6 relative overflow-hidden transition-colors duration-300"
    >
      {/* Subtle radial backdrop tuned to theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.04)_0%,_transparent_65%)] pointer-events-none" />

      <motion.div
        variants={staggerContainer(0.12, 0.06)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Minimal Section Header */}
        <motion.div
          variants={revealItem}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-5 mb-14 gap-3"
        >
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-white/40 text-xs font-mono uppercase tracking-widest">
                05 // Personal AI Companion
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight">
              SHESH
            </h2>
          </div>
          <p className="text-white/50 text-xs sm:text-sm font-mono font-light">
            Autonomous intelligence & personal companion
          </p>
        </motion.div>

        {/* Minimalist Card (Standard Cursor & Clean Design) */}
        <motion.div
          variants={revealScaleItem}
          className="liquid-glass rounded-3xl p-8 sm:p-12 md:p-16 border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors duration-300"
        >
          {/* THE LIVING ORB: Radiating Energy, Moving, and Responding to Cursor */}
          <div
            ref={orbContainerRef}
            onMouseMove={handleOrbMouseMove}
            onMouseEnter={() => setIsHoveringOrb(true)}
            onMouseLeave={handleOrbMouseLeave}
            className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-8 select-none"
          >
            {/* Outward Radiating Energy Wave 1 */}
            <motion.div
              animate={{
                scale: [0.85, 1.9],
                opacity: isDark ? [0.65, 0] : [0.75, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className={`absolute w-32 h-32 rounded-full pointer-events-none ${
                isDark
                  ? 'border border-emerald-400/50 shadow-[0_0_35px_rgba(16,185,129,0.35)]'
                  : 'border border-emerald-600/60 shadow-[0_0_30px_rgba(5,150,105,0.3)]'
              }`}
            />

            {/* Outward Radiating Energy Wave 2 (Staggered offset) */}
            <motion.div
              animate={{
                scale: [0.85, 1.9],
                opacity: isDark ? [0.65, 0] : [0.75, 0],
              }}
              transition={{
                duration: 2.8,
                delay: 1.4,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className={`absolute w-32 h-32 rounded-full pointer-events-none ${
                isDark
                  ? 'border border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.3)]'
                  : 'border border-teal-500/50 shadow-[0_0_25px_rgba(20,184,166,0.3)]'
              }`}
            />

            {/* Swirling Orbital Particle Halo */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-48 h-48 rounded-full border border-dashed border-emerald-400/30 pointer-events-none"
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </motion.div>

            {/* Core Living Orb (Directly Responds & Moves with Spring) */}
            <motion.div
              style={{
                x: orbX,
                y: orbY,
              }}
              animate={{
                y: [-6, 6, -6],
                scale: isHoveringOrb ? 1.08 : [1, 1.04, 1],
              }}
              transition={{
                y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
                scale: isHoveringOrb ? { duration: 0.25 } : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
              }}
              className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                isDark
                  ? 'bg-gradient-to-tr from-emerald-400 via-teal-500 to-cyan-300 shadow-[0_0_60px_rgba(16,185,129,0.7),inset_0_0_25px_rgba(255,255,255,0.75)]'
                  : 'bg-gradient-to-tr from-emerald-500 via-teal-600 to-cyan-400 shadow-[0_0_45px_rgba(5,150,105,0.55),inset_0_0_25px_rgba(255,255,255,0.85)]'
              }`}
            >
              {/* Internal Breathing Plasma Layer */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute inset-1 rounded-full bg-gradient-to-br from-white/40 via-transparent to-black/30 pointer-events-none"
              />

              {/* Surface Specular Highlight */}
              <div className="absolute top-2 left-3 w-8 h-8 rounded-full bg-white/70 blur-[1px] pointer-events-none" />

              {/* Center Sparkle Core */}
              <motion.div
                animate={{
                  scale: isHoveringOrb ? [1.1, 1.3, 1.1] : [1, 1.15, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
                }}
                className="relative z-10 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </motion.div>
          </div>

          {/* Identity & Status: WORK IN PROGRESS */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl text-white font-medium tracking-tight mb-1 font-instrument">
              SHESH
            </h3>
            <p className="text-white/50 text-xs font-mono tracking-widest uppercase mb-4">
              Personal AI Companion
            </p>

            <div className="liquid-glass rounded-full px-5 py-2 border border-amber-400/30 bg-amber-400/10 text-amber-300 flex items-center gap-2 text-xs font-mono tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.15)]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <Construction className="w-3.5 h-3.5" />
              <span className="font-semibold uppercase">Work In Progress</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
