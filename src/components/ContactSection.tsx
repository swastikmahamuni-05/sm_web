/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  Globe,
  Copy,
  Check,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { staggerContainer, revealItem, revealScaleItem } from '../utils/animationVariants.ts';
import ContactForm from './ContactForm.tsx';

interface ContactSectionProps {
  onNotify: (message: string) => void;
}

export default function ContactSection({ onNotify }: ContactSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>('AI/ML Engineering Internships');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    onNotify(`Copied ${PORTFOLIO_DATA.personal.email} to clipboard.`);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" ref={ref} className="bg-black py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Subtle radial backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        variants={staggerContainer(0.14, 0.08)}
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
              06 // Get in Touch
            </p>
            <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight">
              Let's Connect.
            </h2>
          </div>
          <p className="text-white/70 text-sm max-w-md leading-relaxed font-light">
            Interested in connecting with engineers, AI researchers, developers and organizations working on meaningful engineering challenges.
          </p>
        </motion.div>

        {/* Two Column Grid */}
        <motion.div
          variants={staggerContainer(0.16, 0.1)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Direct Info, Open To Topics, and Coordinates */}
          <motion.div
            variants={revealScaleItem}
            className="lg:col-span-5 space-y-6"
          >
            <div className="liquid-glass rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all">
              <h3 className="text-2xl text-white font-medium tracking-tight mb-2">
                Open to Opportunities
              </h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                Select an area of interest to prefill your inquiry topic:
              </p>

              {/* Open to tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {PORTFOLIO_DATA.personal.openTo.map((topic) => {
                  const isSelected = selectedTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`liquid-glass rounded-xl px-3 py-1.5 text-xs font-mono transition-all cursor-pointer border text-left ${
                        isSelected
                          ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                          : 'border-white/5 text-white/70 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>

              {/* Direct Email Pill */}
              <div className="liquid-glass rounded-2xl p-4 border border-white/5 flex items-center justify-between gap-4 mb-6 hover:border-white/15 transition-all">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="liquid-glass rounded-full p-2 text-emerald-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-white/40 text-[10px] font-mono uppercase tracking-wider">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="text-white text-xs sm:text-sm font-mono hover:text-emerald-300 transition-colors truncate block"
                    >
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="liquid-glass rounded-full p-2 text-white/70 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 text-xs font-mono text-white/50 mb-8">
                <MapPin className="w-4 h-4 text-white/40" />
                <span>Pune, Maharashtra, India</span>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                <p className="text-white/40 text-xs font-mono uppercase tracking-wider">
                  Verified Channels & Profiles
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={PORTFOLIO_DATA.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass rounded-xl px-4 py-2.5 text-xs text-white/80 hover:text-white flex items-center justify-between transition-colors border border-white/5 hover:border-white/15"
                  >
                    <div className="flex items-center gap-2.5">
                      <Linkedin className="w-4 h-4 text-emerald-400" />
                      <span>linkedin.com/in/swastikmahamuni/</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                  </a>

                  <a
                    href={PORTFOLIO_DATA.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass rounded-xl px-4 py-2.5 text-xs text-white/80 hover:text-white flex items-center justify-between transition-colors border border-white/5 hover:border-white/15"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github className="w-4 h-4 text-emerald-400" />
                      <span>github.com/swastikmahamuni-05</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                  </a>

                  <a
                    href={PORTFOLIO_DATA.personal.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass rounded-xl px-4 py-2.5 text-xs text-white/80 hover:text-white flex items-center justify-between transition-colors border border-white/5 hover:border-white/15"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-emerald-400" />
                      <span>swastikmahamuni.in</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-white/40" />
                  </a>
                </div>
              </div>

              {/* Authentic Motto */}
              <div className="pt-6 border-t border-white/5">
                <p className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-1">
                  Engineering Creed
                </p>
                <p className="text-white text-sm font-medium italic font-instrument tracking-wide">
                  "{PORTFOLIO_DATA.personal.motto}"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Functional ContactForm Component */}
          <motion.div
            variants={revealScaleItem}
            className="lg:col-span-7"
          >
            <ContactForm
              onNotify={onNotify}
              selectedTopic={selectedTopic}
              onSelectTopic={(t) => setSelectedTopic(t)}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
