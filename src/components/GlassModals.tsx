/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ManifestoModal({ isOpen, onClose }: ManifestoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto liquid-glass rounded-3xl p-8 md:p-12 border border-white/10 bg-neutral-950/95 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 liquid-glass rounded-full p-2 text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-white/40 text-xs uppercase tracking-widest font-mono mb-3">
              Engineering Creed
            </p>
            <h2 className="text-3xl md:text-5xl text-white tracking-tight mb-6 font-instrument">
              Building with Purpose & <em className="italic">Curiosity</em>
            </h2>

            <div className="space-y-6 text-white/80 text-sm md:text-base leading-relaxed border-t border-white/10 pt-6 font-light">
              <p>
                I believe great software doesn't live in a vacuum. The most exciting projects happen when smart code connects with the physical world — whether that's an autonomous robot delivering parts in a factory, an offline AI tool helping a farmer protect their crops, or a clean web app modernizing everyday business tasks.
              </p>
              <blockquote className="liquid-glass rounded-2xl p-6 border-l-0 text-white italic font-instrument text-xl md:text-2xl leading-snug">
                "Build software that solves real problems, feels effortless to use, and works reliably when it matters most."
              </blockquote>
              <p>
                As an engineering student at MIT ADT University and an intern at Vishay Components, I approach every project with continuous curiosity, attention to detail, and a commitment to writing clean, maintainable code.
              </p>
              <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/10 gap-2 text-xs font-mono text-white/40">
                <span>Swastik Mahamuni · Software & AI Engineer</span>
                <span>Pune, India · swastikmahamuni.in</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 liquid-glass rounded-full px-6 py-3 border border-white/20 bg-neutral-900/90 shadow-2xl flex items-center gap-3 text-xs sm:text-sm text-white font-mono"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="truncate max-w-xs sm:max-w-md">{message}</span>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white ml-2 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
