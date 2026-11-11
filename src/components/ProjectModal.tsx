/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Project } from '../data/portfolioData.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const recognitionText = project.recognition;
  const focusList = project.focusAreas || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto liquid-glass rounded-3xl p-6 md:p-10 border border-white/10 bg-neutral-950/95 shadow-2xl"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 liquid-glass rounded-full p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/80 font-mono tracking-wider border border-white/10">
              {project.category}
            </span>
            {recognitionText && (
              <span className="liquid-glass rounded-full px-3 py-1 text-[11px] text-emerald-300 font-mono tracking-wider border border-emerald-500/30 bg-emerald-500/10">
                {recognitionText}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl text-white font-medium tracking-tight mb-1">
            {project.name}
          </h2>
          <p className="text-white/60 font-mono text-xs mb-6">
            {project.tagline}
          </p>

          {/* Overview */}
          <p className="text-white/80 text-sm leading-relaxed mb-8 font-light">
            {project.overview}
          </p>

          {/* Focus Areas Highlights */}
          {focusList.length > 0 && (
            <div className="mb-8">
              <h4 className="text-white text-xs uppercase tracking-widest font-mono mb-4 text-white/40">
                Core Focus Areas & Architecture
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {focusList.map((point, idx) => (
                  <div key={idx} className="liquid-glass rounded-xl p-3 border border-white/5 flex items-center gap-2.5">
                    <div className="liquid-glass rounded-full p-1 text-emerald-400 shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <p className="text-xs text-white/80 font-light">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Specifications Matrix */}
          <div className="liquid-glass rounded-2xl p-5 border border-white/5 mb-8">
            <h4 className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-3">
              Project Details & Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.specs.map((spec) => (
                <div key={spec.label}>
                  <p className="text-white/40 text-[10px] font-mono uppercase">
                    {spec.label}
                  </p>
                  <p className="text-white text-xs sm:text-sm font-semibold mt-0.5">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h4 className="text-white/40 text-[10px] font-mono uppercase tracking-wider mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="liquid-glass rounded-md px-2.5 py-1 text-xs text-white/80 font-mono border border-white/5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Close Action */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-white/40 text-xs font-mono">
              swastikmahamuni.in · Systems Architecture
            </span>
            <button
              type="button"
              onClick={onClose}
              className="liquid-glass rounded-full px-6 py-2 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
