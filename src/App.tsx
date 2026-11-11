/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import CustomCursor from './components/CustomCursor.tsx';
import Navbar from './components/Navbar.tsx';
import HeroSection from './components/HeroSection.tsx';
import WorkSection from './components/WorkSection.tsx';
import AboutSection from './components/AboutSection.tsx';
import ExperienceSection from './components/ExperienceSection.tsx';
import AchievementsSection from './components/AchievementsSection.tsx';
import SheshSection from './components/SheshSection.tsx';
import ContactSection from './components/ContactSection.tsx';
import SectionDivider from './components/SectionDivider.tsx';
import SnakeGame from './components/SnakeGame.tsx';
import ProjectModal from './components/ProjectModal.tsx';
import { ManifestoModal, Toast } from './components/GlassModals.tsx';
import { PORTFOLIO_DATA, Project } from './data/portfolioData.ts';
import { ThemeProvider, useTheme } from './context/ThemeContext.tsx';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

function PortfolioApp() {
  const { isDark } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll Progress Bar tracking viewport scroll depth
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setToastMessage(`Copied ${PORTFOLIO_DATA.personal.email} to clipboard.`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`${
        isDark
          ? 'bg-black text-white selection:bg-white/20 selection:text-white'
          : 'bg-white text-zinc-900 selection:bg-black/10 selection:text-black'
      } min-h-screen relative transition-colors duration-300`}
    >
      {/* Interactive Liquid Glass Custom Cursor */}
      <CustomCursor />

      {/* Thin progress bar at the very top of the viewport tracking scroll position */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-white top-progress-bar origin-left z-[100] pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300"
        aria-hidden="true"
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Navigation matching reference image with High-Contrast Theme Toggle */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        onOpenManifesto={() => setManifestoOpen(true)}
        onCopyEmail={handleCopyEmail}
      />

      <SectionDivider />

      {/* Main Portfolio Sections */}
      <main>
        {/* ABOUT (01) */}
        <AboutSection />

        <SectionDivider />

        {/* WORK (02) */}
        <WorkSection onSelectProject={(project) => setSelectedProject(project)} />

        <SectionDivider />

        {/* EXPERIENCE (03) */}
        <ExperienceSection />

        <SectionDivider />

        {/* ACHIEVEMENTS (04) */}
        <AchievementsSection />

        <SectionDivider />

        {/* SHESH (05) */}
        <SheshSection />

        <SectionDivider />

        {/* CONTACT (06) */}
        <ContactSection onNotify={(msg) => setToastMessage(msg)} />
      </main>

      {/* Modals & Games */}
      <SnakeGame />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ManifestoModal
        isOpen={manifestoOpen}
        onClose={() => setManifestoOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16 px-6 relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex flex-col mb-2">
              <span className="text-white font-bold tracking-wider text-base uppercase">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="text-white/50 text-xs font-mono tracking-widest lowercase">
                {PORTFOLIO_DATA.personal.tagline}
              </span>
            </div>
            <p className="text-white/60 text-xs max-w-sm font-light leading-relaxed">
              Electronics & Computer Engineering at MIT ADT University, Pune.
              Building intelligence and practical software-hardware platforms.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-white/60">
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{PORTFOLIO_DATA.personal.email}</span>
            </a>
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-2"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <p>© {new Date().getFullYear()} Swastik Mahamuni. All verified content.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setManifestoOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Creed
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
