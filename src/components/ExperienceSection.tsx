/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Users2, Building2, BookOpen, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import {
  staggerContainer,
  revealItem,
  revealScaleItem,
  listItemVariant,
  badgeVariant,
} from '../utils/animationVariants.ts';

export default function ExperienceSection() {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return Users2;
      case 1:
        return Building2;
      case 2:
        return BookOpen;
      default:
        return Users2;
    }
  };

  return (
    <section id="experience" className="bg-black py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Subtle radial backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header using whileInView */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={revealItem}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-16 gap-4"
        >
          <div>
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">
              03 // Experience & Research
            </p>
            <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight">
              Experience
            </h2>
          </div>
          <p className="text-white/60 text-sm max-w-md leading-relaxed font-light">
            Leadership in university technical communities, industry-academia software collaboration, and peer-reviewed hardware research.
          </p>
        </motion.div>

        {/* Timeline Cards Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer(0.18, 0.08)}
          className="space-y-8"
        >
          {PORTFOLIO_DATA.experience.map((exp, idx) => {
            const Icon = getIcon(idx);
            return (
              <motion.div
                key={exp.role}
                variants={revealScaleItem}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="liquid-glass rounded-3xl p-8 md:p-10 border border-white/10 hover:border-white/25 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="liquid-glass rounded-full p-2.5 text-white">
                        <Icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                          {exp.role}
                        </h3>
                        <p className="text-white/80 text-sm font-medium">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/50">
                    <span className="flex items-center gap-1.5 liquid-glass rounded-full px-3 py-1 border border-white/5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5 liquid-glass rounded-full px-3 py-1 border border-white/5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 font-light">
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <motion.div
                  variants={staggerContainer(0.08, 0.05)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3 mb-8"
                >
                  {exp.points.map((pt, pIdx) => (
                    <motion.div
                      key={pIdx}
                      variants={listItemVariant}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <p className="text-white/70 text-sm leading-relaxed font-light">
                        {pt}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Tech & Skills Badges */}
                <motion.div
                  variants={staggerContainer(0.05, 0.05)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/5"
                >
                  <span className="text-white/40 text-xs font-mono mr-2">Core Focus:</span>
                  {exp.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      variants={badgeVariant}
                      className="liquid-glass rounded-md px-3 py-1 text-xs text-white/80 font-mono border border-white/5"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
