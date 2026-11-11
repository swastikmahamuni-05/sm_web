/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Waves, Cpu, Bot, CloudSun, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData.ts';
import {
  staggerContainer,
  revealItem,
  revealScaleItem,
  badgeVariant,
} from '../utils/animationVariants.ts';

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export default function WorkSection({ onSelectProject }: WorkSectionProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'orca':
        return Waves;
      case 'aumbyte':
        return Cpu;
      case 'vyom':
        return Bot;
      case 'rutuvedh':
        return CloudSun;
      case 'visitor-management-system':
        return ShieldCheck;
      default:
        return Cpu;
    }
  };

  return (
    <section id="work" className="bg-black py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

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
              02 // Selected Projects & Engineering
            </p>
            <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight">
              Selected Work
            </h2>
          </div>
          <p className="text-white/60 text-sm max-w-md leading-relaxed font-light">
            AI-driven platforms, edge intelligence, autonomous robotics, IoT environmental monitoring, and industry-oriented software solutions.
          </p>
        </motion.div>

        {/* Projects Grid using whileInView staggered container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer(0.16, 0.08)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PORTFOLIO_DATA.projects.map((project) => {
            const IconComponent = getIcon(project.id);
            return (
              <motion.div
                key={project.id}
                variants={revealScaleItem}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="liquid-glass rounded-3xl overflow-hidden group border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Media Container */}
                <div className="relative aspect-video overflow-hidden bg-neutral-950">
                  {project.videoUrl && (
                    <video
                      src={project.videoUrl}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 project-video"
                      muted
                      autoPlay
                      loop
                      playsInline
                      preload="auto"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Category & Recognition Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="liquid-glass rounded-full px-3 py-1 text-[10px] text-white/90 font-mono tracking-wider border border-white/10">
                      {project.category}
                    </span>
                    {project.recognition && (
                      <span className="liquid-glass rounded-full px-2.5 py-1 text-[10px] text-emerald-300 font-mono tracking-wider border border-emerald-500/30 bg-emerald-500/10">
                        {project.recognition}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-white">
                        <IconComponent className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-xl font-semibold tracking-tight">
                          {project.name}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="liquid-glass rounded-full p-2 text-white/80 group-hover:text-white group-hover:bg-white/10 transition-colors cursor-pointer"
                        title="View Architecture Details"
                        aria-label="View Architecture Details"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-white/60 text-xs font-mono mb-3 tracking-tight">
                      {project.tagline}
                    </p>

                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-5 font-light">
                      {project.overview}
                    </p>

                    {/* Focus Areas list */}
                    <div className="mb-4">
                      <p className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-2">
                        Focus Areas
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.focusAreas.map((area) => (
                          <span
                            key={area}
                            className="liquid-glass rounded-md px-2 py-0.5 text-[10px] text-white/80 font-mono border border-white/5"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Specifications & Action */}
                  <div>
                    <div className="grid grid-cols-2 gap-2 py-3 border-t border-white/5 mb-4 text-xs font-mono">
                      {project.specs.slice(0, 2).map((spec) => (
                        <div key={spec.label}>
                          <p className="text-white/40 text-[9px] uppercase tracking-wider">
                            {spec.label}
                          </p>
                          <p className="text-white text-[11px] font-medium mt-0.5 truncate">
                            {spec.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="w-full py-2 liquid-glass rounded-xl text-xs font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-white/5"
                    >
                      <span>Explore Project Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
