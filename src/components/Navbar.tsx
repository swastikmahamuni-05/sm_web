/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData.ts';
import { useTheme } from '../context/ThemeContext.tsx';

const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#work' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'ACHIEVEMENTS', href: '#achievements' },
  { label: 'SHESH', href: '#shesh' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = ['about', 'work', 'experience', 'achievements', 'shesh', 'contact'];
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-5">
        <nav
          className={`liquid-glass rounded-full px-5 sm:px-8 py-3 flex items-center justify-between gap-4 transition-all duration-300 ${
            scrolled
              ? 'bg-black/85 backdrop-blur-2xl border border-white/15 shadow-2xl'
              : 'border border-white/10'
          }`}
        >
          {/* Clean minimal brand header: SWASTIK MAHAMUNI */}
          <a
            href="#"
            className="group cursor-pointer text-left shrink-0 pr-3"
          >
            <span className="text-white font-bold tracking-wider text-xs sm:text-sm md:text-base uppercase group-hover:text-white/90 transition-colors whitespace-nowrap">
              {PORTFOLIO_DATA.personal.name}
            </span>
          </a>

          {/* Horizontal Navigation List matching referenced position */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-7 overflow-x-auto no-scrollbar py-1">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-[10px] sm:text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer relative whitespace-nowrap py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />
                  )}
                </a>
              );
            })}

            {/* CONTACT pill button matching the reference image pill design */}
            <a
              href="#contact"
              className={`liquid-glass rounded-full px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white transition-all shrink-0 cursor-pointer border ${
                activeSection === 'contact'
                  ? 'border-white bg-white/15 text-white shadow-sm'
                  : 'border-white/20 hover:border-white/40 hover:bg-white/10'
              }`}
            >
              CONTACT
            </a>

            {/* High-Contrast Theme Toggle (Light / Dark) with smooth transition */}
            <button
              type="button"
              onClick={toggleTheme}
              className="liquid-glass rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer shrink-0 border border-white/20 hover:border-white/40 flex items-center justify-center group"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-neutral-800 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
