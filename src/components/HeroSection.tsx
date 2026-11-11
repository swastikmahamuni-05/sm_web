/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';

interface HeroSectionProps {
  onOpenManifesto: () => void;
  onCopyEmail: () => void;
}

export default function HeroSection({
  onCopyEmail,
}: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeAnimRef = useRef<number | null>(null);
  const isFadingOutRef = useRef(false);

  // Video opacity animation loop
  const animateOpacity = (
    targetOpacity: number,
    durationMs: number,
    onComplete?: () => void
  ) => {
    const video = videoRef.current;
    if (!video) return;

    if (fadeAnimRef.current) {
      cancelAnimationFrame(fadeAnimRef.current);
      fadeAnimRef.current = null;
    }

    const startOpacity = parseFloat(video.style.opacity || '0');
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const current = startOpacity + (targetOpacity - startOpacity) * progress;
      if (video) {
        video.style.opacity = current.toString();
      }

      if (progress < 1) {
        fadeAnimRef.current = requestAnimationFrame(step);
      } else {
        fadeAnimRef.current = null;
        onComplete?.();
      }
    };

    fadeAnimRef.current = requestAnimationFrame(step);
  };

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    animateOpacity(1, 500);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const remaining = video.duration - video.currentTime;
    if (remaining <= 0.55 && !isFadingOutRef.current) {
      isFadingOutRef.current = true;
      animateOpacity(0, 500);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    if (fadeAnimRef.current) {
      cancelAnimationFrame(fadeAnimRef.current);
      fadeAnimRef.current = null;
    }

    video.style.opacity = '0';
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        isFadingOutRef.current = false;
        videoRef.current.play().catch(() => {});
        animateOpacity(1, 500);
      }
    }, 100);
  };

  return (
    <section className="min-h-screen overflow-hidden relative flex flex-col justify-between pt-28 md:pt-36 pb-12 px-6">
      {/* Background Video Canvas */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none hero-ambient-video"
        muted
        autoPlay
        playsInline
        preload="auto"
        style={{ opacity: 0 }}
        onCanPlay={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      {/* Ambient Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black pointer-events-none hero-video-scrim transition-all duration-300" />

      {/* Clean Minimal Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto text-center flex flex-col items-center">
        {/* Status Pill */}
        <div className="liquid-glass rounded-full px-4 py-1.5 flex items-center gap-2 mb-6 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/80 text-xs font-mono tracking-wider">
            Pune, India · MIT ADT University
          </span>
        </div>

        {/* Display Heading */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl text-white tracking-tight font-instrument mb-4 leading-[1.05]">
          I'm Swastik <em className="italic font-normal">Mahamuni</em>
        </h1>

        {/* Minimal Discipline Subtitle */}
        <p className="text-emerald-400 text-xs sm:text-sm font-mono tracking-wider uppercase mb-5">
          Electronics & Computer Engineering · Intelligent Systems
        </p>

        {/* Punchy, minimal intro */}
        <p className="text-white/80 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-9">
          Developing and deploying practical AI, deep learning, and autonomous robotic systems that solve real-world problems.
        </p>

        {/* Direct Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href="#work"
            className="liquid-glass rounded-full px-7 py-3 text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer group border border-white/15"
          >
            <span>View Projects</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="liquid-glass rounded-full px-7 py-3 text-white/90 text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
          >
            Get in Touch
          </a>
        </div>

        {/* Key Metrics Strip (Clean & Minimal) */}
        <div className="liquid-glass rounded-2xl p-4 border border-white/5 max-w-2xl w-full grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-wider">
              Discipline
            </p>
            <p className="text-white text-xs font-medium mt-0.5">
              E&CE (2024–2028)
            </p>
          </div>
          <div>
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-wider">
              Academic
            </p>
            <p className="text-white text-xs font-medium mt-0.5">
              9.13 CGPA · 2nd Rank
            </p>
          </div>
          <div>
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-wider">
              Hackathon
            </p>
            <p className="text-white text-xs font-medium mt-0.5">
              SIH 2026 Selected
            </p>
          </div>
          <div>
            <p className="text-white/40 text-[10px] font-mono uppercase tracking-wider">
              Leadership
            </p>
            <p className="text-white text-xs font-medium mt-0.5">
              Secretary, Vidyut Veda
            </p>
          </div>
        </div>
      </div>

      {/* Social / Direct Coordinates Footer Strip */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5 text-xs text-white/50">
        <div className="flex items-center gap-3">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full p-2 text-white/80 hover:text-white transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass rounded-full p-2 text-white/80 hover:text-white transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={onCopyEmail}
            className="liquid-glass rounded-full px-3 py-1.5 text-white/80 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-mono text-[11px]"
            title="Copy email to clipboard"
          >
            <Mail className="w-3 h-3" />
            <span>{PORTFOLIO_DATA.personal.email}</span>
          </button>
        </div>

        <div className="font-mono text-[11px] text-white/40">
          <span>MIT ADT University, Pune</span>
        </div>
      </div>
    </section>
  );
}
