/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap,
  Award,
  MapPin,
  Cpu,
  Brain,
  Check,
  Sparkles,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { staggerContainer, revealItem, revealScaleItem } from '../utils/animationVariants.ts';

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const coreHighlights = [
    {
      title: 'Applied AI & Neural Networks',
      desc: 'Developing deep learning, edge computer vision, and offline inference models for real-world tasks.',
    },
    {
      title: 'Physical Systems & Robotics',
      desc: 'Interfacing autonomous LiDAR navigation, ROS 2, and embedded microcontrollers with physical hardware.',
    },
    {
      title: 'Full-Stack Software',
      desc: 'Building responsive interfaces, REST APIs, and database workflows deployed in industrial environments.',
    },
    {
      title: 'Engineering Philosophy',
      desc: 'Advancing through hands-on experimentation, hackathon engineering, and research collaborations.',
    },
  ];

  return (
    <section id="about" ref={ref} className="bg-black py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Subtle radial backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        variants={staggerContainer(0.12, 0.05)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Section Header */}
        <motion.div
          variants={revealItem}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-5 mb-12 gap-3"
        >
          <div>
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1.5">
              01 // About & Focus
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-medium tracking-tight">
              Building Intelligent Systems
            </h2>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs font-mono">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pune, Maharashtra, India</span>
          </div>
        </motion.div>

        {/* 2-Column Minimalist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-10">
          {/* Left Column: Key Bullet Points (No Wall of Text) */}
          <motion.div
            variants={revealItem}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-instrument tracking-tight leading-snug mb-6">
                Bridging intelligent algorithms with{' '}
                <em className="italic text-white/80">real-world computing platforms.</em>
              </h3>

              {/* Scannable Bullet Points */}
              <div className="space-y-3.5 mb-6">
                {coreHighlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="liquid-glass rounded-2xl p-4 border border-white/5 flex items-start gap-3.5 hover:border-white/15 transition-all"
                  >
                    <div className="liquid-glass rounded-full p-1.5 text-emerald-400 mt-0.5 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white tracking-tight mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-white/70 text-xs leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Skills Strip */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-white/40 text-xs font-mono mr-1">Core Areas:</span>
              {PORTFOLIO_DATA.personal.areasOfInterest.slice(0, 4).map((area) => (
                <span
                  key={area}
                  className="liquid-glass rounded-lg px-2.5 py-1 text-[11px] text-white/80 font-mono border border-white/5"
                >
                  {area}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Clean Education & Academic Standing Card */}
          <motion.div
            variants={revealScaleItem}
            className="lg:col-span-5"
          >
            <div className="liquid-glass rounded-3xl p-7 md:p-8 border border-white/10 h-full flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="liquid-glass rounded-full p-2.5 text-white">
                    <GraduationCap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="liquid-glass rounded-full px-3 py-1 text-xs font-mono text-white/60 border border-white/5">
                    {PORTFOLIO_DATA.personal.education.timeline}
                  </span>
                </div>

                <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-1">
                  Degree & Institution
                </p>
                <h4 className="text-lg sm:text-xl text-white font-medium tracking-tight mb-1">
                  {PORTFOLIO_DATA.personal.education.degree}
                </h4>
                <p className="text-white/70 text-xs sm:text-sm font-light mb-6">
                  {PORTFOLIO_DATA.personal.education.institution} · {PORTFOLIO_DATA.personal.education.location}
                </p>

                {/* Academic Highlights */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="liquid-glass rounded-xl p-3.5 border border-white/5">
                    <p className="text-white/40 text-[10px] font-mono uppercase">Academic CGPA</p>
                    <p className="text-emerald-400 font-bold text-lg mt-0.5">
                      {PORTFOLIO_DATA.personal.education.cgpa}
                    </p>
                  </div>
                  <div className="liquid-glass rounded-xl p-3.5 border border-white/5">
                    <p className="text-white/40 text-[10px] font-mono uppercase">Branch Rank</p>
                    <p className="text-white font-semibold text-xs sm:text-sm mt-1 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>2nd Rank (Year 1)</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4">
                <p className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-1.5">
                  Focus Disciplines
                </p>
                <p className="text-white/70 text-xs leading-relaxed font-light">
                  {PORTFOLIO_DATA.personal.education.focus}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Minimal Competencies Strip */}
        <motion.div
          variants={revealItem}
          className="liquid-glass rounded-2xl p-4 md:p-5 border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-2 text-white/50 font-mono">
            <Brain className="w-4 h-4 text-emerald-400" />
            <span className="uppercase text-[11px] tracking-wider">Engineering Focus:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-white/80">
            {PORTFOLIO_DATA.personal.areasOfInterest.map((interest, i) => (
              <span key={interest} className="flex items-center gap-2">
                <span>{interest}</span>
                {i < PORTFOLIO_DATA.personal.areasOfInterest.length - 1 && (
                  <span className="text-white/20 select-none">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
