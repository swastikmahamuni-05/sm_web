/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Award, BookOpen, Medal, Star, CheckCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { staggerContainer, revealItem, revealScaleItem } from '../utils/animationVariants.ts';

export default function AchievementsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return Trophy;
      case 1:
        return Award;
      case 2:
        return BookOpen;
      case 3:
        return Medal;
      case 4:
        return Star;
      default:
        return Trophy;
    }
  };

  return (
    <section id="achievements" ref={ref} className="bg-black py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Subtle radial backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        variants={staggerContainer(0.12, 0.08)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Section Header */}
        <motion.div
          variants={revealItem}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-16 gap-4"
        >
          <div>
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">
              04 // Milestones & Honors
            </p>
            <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight">
              Achievements
            </h2>
          </div>
          <p className="text-white/60 text-sm max-w-md leading-relaxed font-light">
            National hackathon selections, innovation competitions, peer-reviewed publications, and university branch honors.
          </p>
        </motion.div>

        {/* Achievements Cards Grid */}
        <motion.div
          variants={staggerContainer(0.12, 0.08)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PORTFOLIO_DATA.achievements.map((item, idx) => {
            const Icon = getIcon(idx);
            return (
              <motion.div
                key={item.title}
                variants={revealScaleItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="liquid-glass rounded-3xl p-7 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="liquid-glass rounded-full p-2.5 text-white">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-white/50 text-xs font-mono">
                      {item.date}
                    </span>
                  </div>

                  <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1.5">
                    {item.category}
                  </p>

                  <h3 className="text-lg font-semibold text-white tracking-tight mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-3.5 flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <CheckCheck className="w-4 h-4 shrink-0" />
                  <span>{item.impact}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
