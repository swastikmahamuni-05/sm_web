/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';

export default function SectionDivider() {
  return (
    <div
      className="max-w-7xl mx-auto px-6 overflow-hidden pointer-events-none py-1 relative z-10"
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center">
        {/* Animated Expanding Hairline */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px origin-center bg-gradient-to-r from-transparent via-white/15 to-transparent section-divider-line transition-all duration-300"
        />

        {/* Subtle luminous center glint */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.5 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)] section-divider-dot transition-all duration-300"
        />
      </div>
    </div>
  );
}
