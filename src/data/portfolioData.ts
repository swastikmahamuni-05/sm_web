/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Verified, authentic content from https://www.swastikmahamuni.in/ and LinkedIn
 * Written in clear, accessible portfolio language. Zero confusing jargon.
 */

export interface Project {
  id: string;
  name: string;
  tagline: string;
  category: string;
  overview: string;
  recognition?: string;
  focusAreas: string[];
  specs: { label: string; value: string }[];
  technologies: string[];
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  points: string[];
  technologies: string[];
}

export interface Achievement {
  title: string;
  category: string;
  date: string;
  description: string;
  impact: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'SWASTIK MAHAMUNI',
    brandSubline: 'software × ai',
    discipline: 'Electronics & Computer Engineering',
    tagline: 'AI/ML | Deep Learning | Edge AI | Intelligent Systems',
    motto: "Building Intelligence. Engineering What's Next.",
    title: 'Software & AI Engineer',
    location: 'Pune, Maharashtra, India',
    email: 'swastikmahamuni@gmail.com',
    github: 'https://github.com/swastikmahamuni-05',
    linkedin: 'https://www.linkedin.com/in/swastikmahamuni/',
    website: 'https://www.swastikmahamuni.in/',
    bio: 'I am an Electronics and Computer Engineering student at MIT ADT University, Pune, with a strong interest in Artificial Intelligence, Machine Learning, Deep Learning and Edge AI. My focus is on understanding, developing and deploying intelligent systems that solve real-world problems. With a foundation in electronics and computer engineering, I am particularly interested in bridging AI with software and hardware — from developing intelligent algorithms to deploying them on real-world computing platforms.',
    approach: 'I enjoy learning through experimentation, engineering projects, research and technical collaboration.',
    introLines: [
      "I'm Swastik Mahamuni — Electronics & Computer Engineering student at MIT ADT University, Pune.",
      'Focused on Artificial Intelligence, Machine Learning, Deep Learning, and Edge AI.',
      'Bridging intelligent algorithms with real-world software and embedded hardware.',
    ],
    education: {
      degree: 'B.Tech, Electronics and Computer Engineering',
      institution: 'MIT ADT University',
      location: 'Pune, India',
      timeline: '2024 — 2028',
      cgpa: '9.13 / 10',
      academicStanding: 'Second Rank in Branch (First Year)',
      focus:
        'Artificial Intelligence, Machine Learning, Deep Learning, Neural Networks, Computer Vision, Embedded Systems, and GPU Computing.',
    },
    areasOfInterest: [
      'Artificial Intelligence & Machine Learning',
      'Deep Learning & Neural Networks',
      'Computer Vision',
      'Edge AI & Embedded Intelligence',
      'GPU Computing & Accelerated Computing',
      'Intelligent Systems & Robotics',
      'Hardware-Software Integration',
    ],
    openTo: [
      'AI/ML Engineering Internships',
      'Deep Learning and AI Research',
      'Edge AI and Embedded Intelligence',
      'Technical Collaborations',
      'Hackathons and Engineering Projects',
    ],
  },

  skills: {
    software: [
      'React & Next.js',
      'TypeScript / JavaScript',
      'Node.js & Express',
      'Python & C++',
      'PostgreSQL',
      'REST APIs',
      'Tailwind CSS',
      'Git & GitHub',
    ],
    ai: [
      'Deep Learning',
      'Neural Networks',
      'Computer Vision',
      'PyTorch & OpenCV',
      'Edge AI & Embedded Intelligence',
      'LLMs & AI Agents',
      'Multi-Agent Systems',
    ],
    systems: [
      'GPU & Accelerated Computing',
      'ROS 2 (Robot Operating System)',
      'Lidar Navigation & SLAM',
      'ESP32 & Sensors (BMP280)',
      'Hardware-Software Integration',
      'Embedded Linux',
      'Sensor Integration',
    ],
  },

  projects: [
    {
      id: 'orca',
      name: 'ORCA',
      tagline: 'Marine AI Decision Support Platform',
      category: 'Marine AI & Agents',
      overview:
        'An AI-driven marine intelligence platform exploring collaborative AI agents, marine data integration and intelligent decision support.',
      recognition: 'Smart India Hackathon 2026 Selection',
      focusAreas: [
        'Artificial Intelligence',
        'LLMs and AI Agents',
        'Multi-Agent Systems',
        'Data Integration',
        'Marine Intelligence',
      ],
      specs: [
        { label: 'Recognition', value: 'SIH 2026 Selected' },
        { label: 'Core AI', value: 'Multi-Agent LLMs' },
        { label: 'Domain', value: 'Marine Intelligence' },
        { label: 'Architecture', value: 'Distributed Agents' },
      ],
      technologies: ['Artificial Intelligence', 'LLMs & AI Agents', 'Multi-Agent Systems', 'Data Integration', 'Python', 'React'],
      videoUrl:
        'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
    },
    {
      id: 'aumbyte',
      name: 'AUMByte',
      tagline: 'Edge AI Leaf Disease Detection System',
      category: 'Edge AI & Agriculture',
      overview:
        'An offline-capable agricultural disease detection system using computer vision and edge intelligence to identify plant leaf diseases.',
      recognition: 'IEIL Competition Winner',
      focusAreas: [
        'Edge AI',
        'Computer Vision',
        'Machine Learning',
        'Embedded Intelligence',
        'Agricultural Technology',
      ],
      specs: [
        { label: 'Award', value: 'IEIL Winner' },
        { label: 'Deployment', value: 'Offline Edge AI' },
        { label: 'Vision Model', value: 'PyTorch / OpenCV' },
        { label: 'Impact', value: 'Leaf Diagnostics' },
      ],
      technologies: ['Edge AI', 'Computer Vision', 'Machine Learning', 'Embedded Intelligence', 'PyTorch', 'Python'],
      videoUrl:
        'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
    },
    {
      id: 'vyom',
      name: 'VYOM',
      tagline: 'Intelligent Autonomous Mobile Robot',
      category: 'Autonomous Robotics',
      overview:
        'An industrial robotics platform exploring autonomous mobility, environmental perception and intelligent monitoring.',
      recognition: 'CRiEYA L3 Incubation',
      focusAreas: [
        'Autonomous Robotics',
        'Computer Vision',
        'Lidar Navigation',
        'Embedded Systems',
        'Sensor Integration',
        'Intelligent Automation',
      ],
      specs: [
        { label: 'Navigation', value: '2D LiDAR SLAM' },
        { label: 'Framework', value: 'ROS 2' },
        { label: 'Stage', value: 'CRiEYA L3 Funded' },
        { label: 'Languages', value: 'C++ & Python' },
      ],
      technologies: ['Autonomous Robotics', 'Computer Vision', 'Lidar Navigation', 'Embedded Systems', 'ROS 2', 'C++'],
      videoUrl:
        'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4',
    },
    {
      id: 'rutuvedh',
      name: 'RutuVedh',
      tagline: 'IoT-Based Smart Weather Station',
      category: 'IoT & Environmental Monitoring',
      overview:
        'An ESP32-based environmental monitoring system integrating sensors, wireless connectivity and a live web dashboard.',
      recognition: 'Autonomous IoT Hardware',
      focusAreas: [
        'Embedded Systems',
        'IoT',
        'Sensor Integration',
        'Environmental Monitoring',
      ],
      specs: [
        { label: 'Microcontroller', value: 'ESP32 Wi-Fi' },
        { label: 'Atmospheric Sensor', value: 'BMP280' },
        { label: 'File System', value: 'LittleFS' },
        { label: 'Dashboard', value: 'HTML/CSS/JS' },
      ],
      technologies: ['ESP32', 'BMP280', 'Wi-Fi', 'LittleFS', 'HTML', 'CSS', 'JavaScript', 'IoT'],
      videoUrl:
        'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4',
    },
    {
      id: 'visitor-management-system',
      name: 'Visitor Management System',
      tagline: 'Industry-Oriented Software Solution',
      category: 'Industry Software Solution',
      overview:
        'A digital visitor management solution developed in collaboration with Vishay Components.',
      recognition: 'Industry Collaboration',
      focusAreas: [
        'QR-Based Authentication',
        'Role-Based Access',
        'Software Development',
        'Database Integration',
        'Digital Workflows',
      ],
      specs: [
        { label: 'Partner', value: 'Vishay Components' },
        { label: 'Security', value: 'QR Authentication' },
        { label: 'Access Control', value: 'Role-Based RBAC' },
        { label: 'Data', value: 'Database Integration' },
      ],
      technologies: ['QR-Based Auth', 'Role-Based Access', 'React', 'Node.js', 'Database Integration', 'Digital Workflows'],
      videoUrl:
        'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4',
    },
  ],

  experience: [
    {
      company: 'Vidyut Veda',
      role: 'Secretary',
      period: 'MIT ADT University',
      location: 'Official Technical Club',
      description:
        "Contributing to the organization and development of the university's technical community.",
      points: [
        'Technical event coordination across university departments.',
        'Organizational communication with student groups and technical societies.',
        'Student and faculty engagement for innovation programs.',
        'Planning and execution of club activities, workshops, and hackathons.',
        'Supporting technical initiatives and multidisciplinary engineering collaborations.',
      ],
      technologies: ['Technical Event Coordination', 'Organizational Communication', 'Student Engagement', 'Technical Initiatives'],
    },
    {
      company: 'Vishay Components',
      role: 'Industry-Academia Collaboration',
      period: 'Pune, India',
      location: 'Industry Collaboration',
      description:
        'Worked on an industry-oriented Visitor Management System, exploring software development and practical implementation requirements.',
      points: [
        'Developed digital visitor management workflows to replace manual plant gate logs.',
        'Implemented secure QR-based check-in authentication and role-based permissions.',
        'Designed database schemas and user management pipelines tailored to industrial operations.',
        'Collaborated closely with industry stakeholders to refine user experience and data reliability.',
      ],
      technologies: ['Visitor Management System', 'QR Authentication', 'Role-Based Access', 'Database Integration'],
    },
    {
      company: 'Research Contribution',
      role: 'UV Ray Detection Using Comparator',
      period: 'November 2025',
      location: 'IRJET Published Research',
      description:
        'Contributed to the design and development of an analog UV radiation detection system using sensor interfacing and comparator-based signal processing.',
      points: [
        'Designed comparator-based analog signal processing circuitry for precision UV sensing.',
        'Interfaced ultraviolet radiation sensors with threshold calibration stages.',
        'Conducted experimental testing and signal validation under varying light intensities.',
        'Published findings in the International Research Journal of Engineering and Technology (IRJET).',
      ],
      technologies: ['Analog Comparator Design', 'Sensor Interfacing', 'Signal Processing', 'IRJET Publication'],
    },
  ],

  achievements: [
    {
      title: 'Smart India Hackathon 2026 — Selected Project',
      category: 'National Hackathon',
      date: '2026',
      description:
        'Project ORCA (Marine AI Decision Support Platform) selected in the prestigious Smart India Hackathon 2026 for its multi-agent marine intelligence architecture.',
      impact: 'Selected Project (ORCA)',
    },
    {
      title: 'IEIL Competition Winner',
      category: 'Innovation Competition',
      date: '2025',
      description:
        'AUMByte (Edge AI Leaf Disease Detection System) awarded Winner at the IEIL Competition for offline edge agricultural intelligence.',
      impact: 'Winner (AUMByte)',
    },
    {
      title: 'Research Publication — IRJET',
      category: 'Academic Research',
      date: 'November 2025',
      description:
        'Published research paper titled "UV Ray Detection Using Comparator" in the International Research Journal of Engineering and Technology (IRJET).',
      impact: 'Published in IRJET',
    },
    {
      title: 'Second Rank in Branch',
      category: 'Academic Honor',
      date: 'First Year',
      description:
        'Awarded Second Rank in the Department of Electronics and Computer Engineering during First Year at MIT ADT University, Pune.',
      impact: 'Second Rank (First Year)',
    },
    {
      title: 'Academic Performance — CGPA 9.13 / 10',
      category: 'University Distinction',
      date: '2024 — Present',
      description:
        'Consistently maintaining an exceptional academic performance of 9.13/10 CGPA in B.Tech Electronics and Computer Engineering at MIT ADT University.',
      impact: '9.13 / 10 CGPA',
    },
  ],

  shesh: {
    name: 'SHESH',
    title: 'Exploring the Future of Personal AI',
    quote:
      'Moving from conversational intelligence towards systems that can understand, reason, collaborate and act.',
    description:
      'SHESH is my exploration of building a personal AI companion that evolves beyond conventional conversational systems into an intelligent, context-aware and agentic ecosystem. The vision is to combine reasoning, memory, tool usage and multi-agent collaboration into a unified AI experience.',
    vision:
      'Moving from conversational intelligence towards systems that can understand, reason, collaborate and act.',
    pillars: [
      {
        title: 'Conversational AI',
        description:
          'Deep natural language dialogue that understands nuance, intent, and personal communication preferences.',
      },
      {
        title: 'Contextual Intelligence & Memory',
        description:
          'Persistent long-term memory across projects, research notes, and ongoing workflows.',
      },
      {
        title: 'AI Agents & Multi-Agent Systems',
        description:
          'Coordinated specialist agents collaborating together to decompose and execute complex engineering tasks.',
      },
      {
        title: 'Tool Integration & Autonomous Execution',
        description:
          'Direct integration with local compilers, file systems, web research, and external APIs for autonomous task completion.',
      },
    ],
  },
};
