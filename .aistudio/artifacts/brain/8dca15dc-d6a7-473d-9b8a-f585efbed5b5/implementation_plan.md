# Asme x Swastik Mahamuni — Liquid Glass Landing Site

A single-page landing site combining the liquid-glass visual architecture, high-fidelity video canvases, and Instrument Serif typography of the Asme creative design with the engineering portfolio and projects of Swastik Mahamuni.

### User Review & Critical Decisions

> [!IMPORTANT]
> The clarifying questions have confirmed key architectural directions:
> 1. **Branding**: Blends Asme's minimalist aesthetic with Swastik Mahamuni's engineering identity.
> 2. **Interactivity**: Includes fully working liquid-glass modals for Sign Up, Login, and Manifesto, accompanied by real-time toast confirmations.
> 3. **Portfolio**: Adds a liquid-glass Featured Works showcase highlighting AMR, AUMByte, ORCA, and SHESH.

- **Confirmed Decision 1**: All 5 core specified video and typography sections will be implemented with exact URLs, aspect ratios, responsive scaling, and animation timings.
- **Confirmed Decision 2**: Interactive modals for Authentication and the Studio Manifesto will render within liquid-glass dialogs without leaving the single-page flow.
- **Confirmed Decision 3**: The hero video utilizes requestAnimationFrame vanilla JS opacity fading for seamless looping without CSS transition glitches.

---

### 1. Overview & Core Concept

- **What It Does**: A cinematic, dark-mode landing experience that bridges avant-garde creative direction with physical computing and autonomous AI systems engineering.
- **Target Audience / Persona**: Creative directors, AI researchers, robotics founders, design engineers, and technical collaborators.
- **Key Value**: Delivers a tactile, high-performance web experience featuring optical liquid-glass reflections, ambient video loops, and editorial typography.

---

### 2. User Experience & Visual Design

#### Key User Flows
1. **Hero Entry & Ambient Immersion**: The visitor arrives at an all-black viewport (`bg-black`). The background video fades in smoothly over 500ms once ready. The navbar pill floats at the top with quick links and authentication triggers.
2. **Newsletter & Manifesto Engagement**: Users can subscribe with their email (receiving an immediate liquid-glass toast notification) or open the Manifesto modal to read the design and systems philosophy.
3. **Narrative Scroll**:
   - **About Section**: High-contrast typography with Instrument Serif italics fading up as the viewport reaches the threshold.
   - **Featured Video**: Cinematic 16:9 widescreen showcase container with overlay glass card and interactive "Explore more" action.
   - **Philosophy Section**: 2-column split with autonomous system video loop on the left and disciplined strategy copy blocks on the right.
   - **Services Section**: Two interactive glass cards featuring Strategy (Research & Insight) and Craft (Design & Execution) with subtle hover scale effects.
   - **Featured Works Showcase**: Interactive portfolio grid presenting Swastik's flagship projects (AMR LiDAR SLAM, AUMByte Edge AI, ORCA Maritime Intelligence, SHESH Multi-Agent).
4. **Interactive Overlays**: Clicking Login, Sign Up, Manifesto, or any Project card launches a liquid-glass modal with backdrop blur and keyboard escape/click-outside dismissal.

#### Visual Identity & Theme
- **Background**: Deep solid black (`#000000`) with subtle radial gradients (`rgba(255, 255, 255, 0.02 - 0.03)`).
- **Glassmorphism**: Bespoke `.liquid-glass` class with `rgba(255, 255, 255, 0.01)` fill, luminosity blending, `blur(4px)` backdrop filter, and a dual-mask 1.4px gradient border.
- **Typography**:
  - Primary Display: **Instrument Serif** (regular and italic) for hero headlines, italic accents, and philosophical titles.
  - Body & UI: Clean neo-grotesque sans-serif with tight letter-spacing and optical compensation for dark surfaces.
- **Rhythm & Hierarchy**: Generous vertical pacing (`py-28 md:py-40`), balanced headline wrapping (`text-wrap: balance`), and single-elevation depth.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Direct Vanilla JS Animation Frames for Hero Video**
  - *Chosen Approach*: Track `canplay`, `timeupdate`, and `ended` events via video element refs, interpolating opacity using `requestAnimationFrame`.
  - *Why*: Eliminates CSS transition flicker on browser loop resets and provides an exact 500ms crossfade to black.
- **Decision 2: Seamless Modular Architecture**
  - *Chosen Approach*: Separate distinct sections into dedicated, clean components (`AboutSection.tsx`, `FeaturedVideoSection.tsx`, `PhilosophySection.tsx`, `ServicesSection.tsx`, `WorksSection.tsx`, and `GlassModal.tsx`) orchestrated by `App.tsx`.
  - *Why*: Ensures strict adherence to the prompt specifications while keeping scroll animations and event handlers maintainable and isolated.
- **Decision 3: Unboxed Metadata & Anti-Slop Discipline**
  - *Chosen Approach*: Service tags and project metadata render as clean, quiet typographic elements rather than candy pills or fake terminal prefixes (`//`).

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                                App.tsx                                 │
│  - Active Modals State (Auth, Manifesto, Project Details)              │
│  - Toast Notification Manager                                          │
│  - Global Smooth Scroll Anchors                                        │
└───────┬───────────────────┬───────────────────┬───────────────────┬────┘
        │                   │                   │                   │
┌───────▼───────┐   ┌───────▼───────┐   ┌───────▼───────┐   ┌───────▼───────┐
│ Hero Section  │   │ About Section │   │Featured Video │   │  Philosophy   │
│ - Video loop  │   │ - InView hook │   │ - Aspect 16:9 │   │ - 2-col grid  │
│ - Pill Navbar │   │ - Typographic │   │ - Liquid glass│   │ - Video +     │
│ - Email Form  │   │   fade-in     │   │   overlay card│   │   Dual blocks │
└───────┬───────┘   └───────────────┘   └───────────────┘   └───────────────┘
        │
┌───────▼──────────────┐   ┌──────────────────────┐   ┌─────────────────────┐
│   Services Section   │   │ Featured Works Grid  │   │ Liquid-Glass Modals │
│ - 2 video cards      │   │ - Real AMR, AUMByte, │   │ - Sign Up / Login   │
│ - Hover scale motion │   │   ORCA, SHESH cards  │   │ - Manifesto Reader  │
│ - Staggered reveal   │   │ - Modal inspection   │   │ - Toast alerts      │
└──────────────────────┘   └──────────────────────┘   └─────────────────────┘
```

#### Media Asset Directory
- **Hero Video**: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4`
- **Featured Video**: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4`
- **Philosophy Video**: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4`
- **Strategy Video**: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4`
- **Craft Video**: `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4`
