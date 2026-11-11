/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Cpu, Bot, Waves, Compass } from 'lucide-react';

export interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  specs: { label: string; value: string }[];
  tech: string[];
  icon: typeof Cpu;
}

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'amr-robotics',
    tag: 'Physical Computing',
    title: 'Autonomous Mobile Robot',
    subtitle: '2D LiDAR SLAM & Split-Compute Architecture',
    description:
      'Autonomous indoor material transfer platform utilizing 2D LiDAR mapping, adaptive path planning, and embedded Linux telemetry for factory warehouse operations.',
    details: [
      'Engineered sensor fusion pipeline integrating 2D LiDAR and wheel odometry for sub-5cm positional accuracy.',
      'Implemented costmap-based local obstacle avoidance and dynamic trajectory recalculation.',
      'Constructed distributed compute framework offloading heavy SLAM computation from microcontrollers.',
    ],
    specs: [
      { label: 'Precision', value: '±3.5 cm' },
      { label: 'Localization', value: 'LiDAR SLAM' },
      { label: 'Runtime OS', value: 'ROS 2 Humble' },
    ],
    tech: ['ROS 2', '2D LiDAR', 'C++', 'Embedded Linux', 'Python'],
    icon: Bot,
  },
  {
    id: 'aumbyte',
    tag: 'Edge AI & Vision',
    title: 'AUMByte Agricultural Edge AI',
    subtitle: 'Zero-Connectivity Plant Pathology Diagnostics',
    description:
      'Offline-first edge AI system engineered for rural micro-farms to diagnose leaf pathologies in real-time, dispatching automated SMS advisories without persistent internet.',
    details: [
      'Quantized convolutional vision models running locally on low-power edge hardware.',
      'Integrated cellular SMS fallback protocol delivering instantaneous treatment regimens to farmers.',
      'Resilient power management unit operating on localized solar-battery recharge cycles.',
    ],
    specs: [
      { label: 'Inference', value: '110 ms' },
      { label: 'Connectivity', value: 'Offline + GSM' },
      { label: 'Accuracy', value: '94.2% mAP' },
    ],
    tech: ['PyTorch', 'OpenCV', 'Edge AI', 'Python', 'GSM Hardware'],
    icon: Cpu,
  },
  {
    id: 'orca',
    tag: 'Spatial Intelligence',
    title: 'ORCA Maritime Decision Engine',
    subtitle: 'Synthesizing Oceanographic & Navigational Data',
    description:
      'Maritime spatial decision-support platform synthesizing real-time oceanographic currents, meteorological feeds, and vessel telemetry into dynamic route optimization.',
    details: [
      'Real-time streaming pipeline processing multi-layer bathymetric and tidal vectors.',
      'Spatial visualization canvas with interactive vector overlays and safety envelope alerts.',
      'Predictive fuel optimization algorithm cutting transit energy expenditure.',
    ],
    specs: [
      { label: 'Data Feeds', value: '12 Live Streams' },
      { label: 'Latency', value: '<250 ms' },
      { label: 'Map Engine', value: 'WebGL Canvas' },
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'GeoJSON', 'REST / RPC'],
    icon: Waves,
  },
  {
    id: 'shesh',
    tag: 'Autonomous Agents',
    title: 'SHESH Multi-Agent Framework',
    subtitle: 'Distributed Personal AI Intelligence Companion',
    description:
      'Multi-agent orchestration architecture for contextual memory graph traversal, multi-tool delegation, and personalized workflow execution.',
    details: [
      'Hierarchical agent coordinator allocating sub-tasks across specialized domain workers.',
      'Persistent episodic memory store indexed with vector embeddings and graph relations.',
      'Proactive notification dispatcher anticipating scheduling friction and task deadlines.',
    ],
    specs: [
      { label: 'Topology', value: 'Multi-Agent Mesh' },
      { label: 'Memory', value: 'Graph + Vector' },
      { label: 'Interface', value: 'Live CLI & Web' },
    ],
    tech: ['LLM Orchestration', 'TypeScript', 'Vector Stores', 'Node.js'],
    icon: Compass,
  },
];

interface WorksSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function WorksSection({ onSelectProject }: WorksSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="works"
      ref={ref}
      className="bg-black py-28 md:py-40 px-6 overflow-hidden relative"
    >
      {/* Subtle radial backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between border-b border-white/10 pb-6 mb-12 md:mb-16"
        >
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-2 font-medium">
              Selected Systems & Engineering
            </p>
            <h2 className="text-3xl md:text-5xl text-white tracking-tight">
              Featured Works
            </h2>
          </div>
          <span className="text-white/40 text-sm hidden md:block tracking-wider uppercase font-medium">
            Swastik Mahamuni · Projects
          </span>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {FEATURED_PROJECTS.map((project, idx) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => onSelectProject(project)}
                className="liquid-glass rounded-3xl p-6 md:p-8 group cursor-pointer flex flex-col justify-between hover:bg-white/[0.03] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="liquid-glass rounded-full p-2.5 text-white/80">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white/40 text-xs tracking-widest uppercase font-medium">
                        {project.tag}
                      </span>
                    </div>
                    <div className="liquid-glass rounded-full p-2 text-white/70 group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-white text-xl md:text-2xl font-medium tracking-tight mb-1">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-xs mb-4 font-mono tracking-tight">
                    {project.subtitle}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Key Metrics / Specs */}
                  <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mb-4">
                    {project.specs.map((spec) => (
                      <div key={spec.label}>
                        <p className="text-white/40 text-[10px] uppercase tracking-wider font-mono">
                          {spec.label}
                        </p>
                        <p className="text-white text-xs font-semibold tracking-tight mt-0.5 tabular-nums">
                          {spec.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Clean unboxed tags */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-white/40">
                    {project.tech.map((t, i) => (
                      <React.Fragment key={t}>
                        <span>{t}</span>
                        {i < project.tech.length - 1 && (
                          <span aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
