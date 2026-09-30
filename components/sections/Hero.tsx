'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Zap } from 'lucide-react';
import { GithubIcon } from '@/components/ui/icons';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/* ── Particle Canvas ──────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = [];
    const NODE_COUNT = 48;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    const init = () => {
      nodes.length = 0;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Move
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,102,241,${(1 - dist / 120) * 0.25})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99,102,241,${n.opacity})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas.parentElement!);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

/* ── Profile Reboot ───────────────────────────────────────────── */
const REBOOT_STEPS = ['step1', 'step2', 'step3', 'step4'] as const;

function ProfileImage() {
  const { t, isRTL } = useLanguage();
  const [isRebooting, setIsRebooting] = useState(false);
  const [rebootStep, setRebootStep] = useState(0);
  const prefersReduced = useReducedMotion();
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const startReboot = () => {
    if (isRebooting || prefersReduced) return;
    setIsRebooting(true);
    setRebootStep(0);
    clearAllTimeouts();

    const schedule = [
      { step: 0, delay: 0 },
      { step: 1, delay: 900 },
      { step: 2, delay: 1800 },
      { step: 3, delay: 2700 },
    ];

    schedule.forEach(({ step, delay }) => {
      const id = setTimeout(() => setRebootStep(step), delay);
      timeoutsRef.current.push(id);
    });

    const finishId = setTimeout(() => {
      setIsRebooting(false);
      setRebootStep(0);
    }, 3600);
    timeoutsRef.current.push(finishId);
  };

  useEffect(() => () => clearAllTimeouts(), []);

  const rebootLabel = isRebooting
    ? t.reboot[REBOOT_STEPS[rebootStep]]
    : t.reboot.idle;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative flex-shrink-0 cursor-pointer select-none group"
      onMouseEnter={startReboot}
      onClick={startReboot}
      onTouchStart={startReboot}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          startReboot();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label="Amin Reda - AI Engineer Profile Image. Hover or tap to initiate reboot sequence."
    >
      {/* Ambient Outer rotating glowing ring */}
      <motion.div
        animate={prefersReduced ? {} : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-3.5 rounded-full pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, #6366f1 20%, transparent 40%, #06b6d4 60%, transparent 80%, #8b5cf6 90%, transparent 100%)',
          opacity: isRebooting ? 0.85 : 0.45,
          filter: isRebooting ? 'blur(4px)' : 'blur(2px)',
          transition: 'opacity 0.4s ease, filter 0.4s ease',
        }}
        aria-hidden="true"
      />

      {/* Frame Container */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full border-2 border-primary-500/40 overflow-hidden shadow-2xl shadow-primary-500/25 bg-slate-950">
        <div className="relative w-full h-full">
          {/* Base Human Profile Photo */}
          <motion.div
            initial={false}
            animate={{
              opacity: isRebooting ? 0 : 1,
              scale: isRebooting ? 1.05 : 1,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src="/images/amin-reda.jpg"
              alt="Amin Reda - AI Engineer"
              fill
              priority
              sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
              className="object-cover object-top"
            />
          </motion.div>

          {/* Alternate Cybernetic Robot State */}
          <motion.div
            initial={false}
            animate={{
              opacity: isRebooting ? 1 : 0,
              scale: isRebooting ? 1 : 0.96,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src="/images/amin-reda-robot.jpg"
              alt="Amin Reda - AI Cybernetic Core Mode"
              fill
              priority
              sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
              className="object-cover object-top"
            />
            {/* Subtle cybernetic energy glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/50 via-transparent to-primary-950/30 mix-blend-color-dodge pointer-events-none" />
          </motion.div>

          {/* Vignette Edge Shading for Seamless Tech Aesthetics */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(15,23,42,0.85)] pointer-events-none" />

          {/* HUD Overlay during Reboot */}
          <AnimatePresence>
            {isRebooting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 pointer-events-none"
                aria-live="polite"
              >
                {/* Cybernetic holographic tint */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/15 via-transparent to-violet-600/20 mix-blend-screen" />

                {/* Digital scanlines effect */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(6,182,212,0.2) 0px, rgba(6,182,212,0.2) 1px, transparent 1px, transparent 4px)',
                  }}
                />

                {/* Sweeping laser scanline */}
                <motion.div
                  animate={{ top: ['0%', '100%'] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-85 shadow-[0_0_14px_#22d3ee]"
                />

                {/* Rotating biometric targeting reticle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-dashed border-cyan-400/50"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-primary-400/40"
                  />
                  {/* Center targeting crosshairs */}
                  <div className="absolute w-8 h-px bg-cyan-400/60" />
                  <div className="absolute h-8 w-px bg-cyan-400/60" />
                </div>

                {/* Dynamic Telemetry HUD overlay at bottom of frame */}
                <div className="absolute bottom-11 inset-x-0 flex flex-col items-center gap-1 z-20 px-4">
                  <div className="glass px-3 py-1 rounded-full border border-cyan-400/60 backdrop-blur-md shadow-lg shadow-cyan-500/25 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="tech-label text-[10px] text-cyan-100 tracking-wider">
                      {rebootLabel}
                    </span>
                  </div>
                  <span className="tech-label text-[8px] text-cyan-300/90 font-mono tracking-widest">
                    {rebootStep === 0 && 'INITIALIZING // HARDWARE_RESET'}
                    {rebootStep === 1 && 'AI_CORE // SYNCHRONIZING_NEURAL_NET'}
                    {rebootStep === 2 && 'LOADING // QUANTUM_PIPELINE'}
                    {rebootStep === 3 && 'ONLINE // SYSTEM_DIAGNOSTICS_OK'}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Futuristic Corner Target Brackets */}
      {[
        { pos: '-top-1.5 -left-1.5', border: 'border-t-2 border-l-2' },
        { pos: '-top-1.5 -right-1.5', border: 'border-t-2 border-r-2' },
        { pos: '-bottom-1.5 -left-1.5', border: 'border-b-2 border-l-2' },
        { pos: '-bottom-1.5 -right-1.5', border: 'border-b-2 border-r-2' },
      ].map(({ pos, border }, i) => (
        <div
          key={i}
          className={cn(
            'absolute w-5 h-5 rounded-sm transition-colors duration-300 pointer-events-none',
            pos,
            border,
            isRebooting ? 'border-cyan-400 shadow-[0_0_8px_#22d3ee]' : 'border-primary-400/70 group-hover:border-primary-300'
          )}
          aria-hidden="true"
        />
      ))}

      {/* Technical UI Badge: AI CORE (Top) */}
      <div
        className={cn(
          'absolute -top-3 glass rounded-full px-3 py-1 border shadow-md backdrop-blur-md transition-all duration-300 z-30',
          isRTL ? 'right-4' : 'left-4',
          isRebooting
            ? 'border-cyan-400/70 text-cyan-300 shadow-cyan-500/20'
            : 'border-violet-500/40 text-violet-300'
        )}
        aria-hidden="true"
      >
        <span className="tech-label text-[10px] tracking-wider font-semibold">
          {t.reboot.aiCore}
        </span>
      </div>

      {/* Technical UI Badge: READY (Top Opposite) */}
      <div
        className={cn(
          'absolute -top-3 glass rounded-full px-3 py-1 border shadow-md backdrop-blur-md transition-all duration-300 z-30 flex items-center gap-1.5',
          isRTL ? 'left-4' : 'right-4',
          isRebooting
            ? 'border-amber-400/60 text-amber-300 shadow-amber-500/20'
            : 'border-emerald-500/40 text-emerald-300'
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            isRebooting ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'
          )}
        />
        <span className="tech-label text-[10px] tracking-wider font-semibold">
          {t.reboot.ready}
        </span>
      </div>

      {/* Technical UI Badge: SYSTEM ONLINE / REBOOT STATUS (Bottom Center) */}
      <motion.div
        animate={prefersReduced ? {} : { y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className={cn(
          'absolute -bottom-3.5 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-1.5 border shadow-lg backdrop-blur-md transition-all duration-300 z-30 flex items-center gap-2 whitespace-nowrap',
          isRebooting
            ? 'border-cyan-400 text-cyan-300 shadow-cyan-500/30'
            : 'border-primary-500/40 text-emerald-400 shadow-primary-500/20'
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            'w-2 h-2 rounded-full',
            isRebooting ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400 animate-pulse'
          )}
        />
        <span className="tech-label text-[10.5px] font-semibold tracking-wider">
          {rebootLabel}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ── Hero ─────────────────────────────────────────────────────── */
export default function Hero() {
  const { t, isRTL } = useLanguage();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Particle network */}
      <ParticleCanvas />

      {/* Ambient glows */}
      <div className="ambient-glow w-96 h-96 bg-primary-500 top-1/4 left-1/4" aria-hidden="true" />
      <div className="ambient-glow w-80 h-80 bg-violet-600 bottom-1/4 right-1/4" aria-hidden="true" />
      <div className="ambient-glow w-64 h-64 bg-cyan-500 top-1/2 right-1/3" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div
          className={cn(
            'flex flex-col lg:flex-row items-center gap-12 lg:gap-16',
            isRTL ? 'lg:flex-row-reverse' : ''
          )}
        >
          {/* Text content */}
          <div className={cn('flex-1 text-center lg:text-start', isRTL && 'lg:text-right')}>
            {/* Label */}
            <motion.div {...fadeUp(0.1)} className="mb-5">
              <span className="inline-flex items-center gap-2 glass border border-primary-500/30 rounded-full px-4 py-1.5">
                <Zap size={12} className="text-primary-400" aria-hidden="true" />
                <span className="tech-label text-primary-300">{t.hero.label}</span>
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1 {...fadeUp(0.2)} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
              <span className="gradient-text">{t.hero.name}</span>
            </motion.h1>

            {/* Title */}
            <motion.p {...fadeUp(0.3)} className="text-xl sm:text-2xl text-[hsl(var(--text-secondary))] font-medium mb-6">
              {t.hero.title}
            </motion.p>

            {/* Headline */}
            <motion.h2
              {...fadeUp(0.4)}
              className="text-2xl sm:text-3xl font-bold text-[hsl(var(--text-primary))] mb-6 leading-snug"
            >
              {t.hero.headline}
            </motion.h2>

            {/* Description */}
            <motion.p
              {...fadeUp(0.5)}
              className="text-base sm:text-lg text-body max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.6)}
              className={cn(
                'flex flex-wrap gap-3 justify-center',
                isRTL ? 'lg:justify-end' : 'lg:justify-start'
              )}
            >
              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-sm shadow-lg shadow-primary-500/30 transition-all"
              >
                {t.hero.ctaExplore}
                <ArrowRight size={16} aria-hidden="true" />
              </motion.a>

              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[hsl(var(--surface-border))] text-[hsl(var(--text-primary))] hover:border-primary-500/60 hover:text-primary-400 font-semibold text-sm glass transition-all"
              >
                {t.hero.ctaConnect}
              </motion.a>

              <motion.a
                href="https://github.com/amin-reda"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))] hover:border-primary-500/60 hover:text-primary-400 font-semibold text-sm glass transition-all"
                aria-label="Visit GitHub profile"
              >
                <GithubIcon style={{ width: 16, height: 16 }} aria-hidden="true" />
                {t.hero.ctaGitHub}
              </motion.a>
            </motion.div>

            {/* Quick stats strip */}
            <motion.div
              {...fadeUp(0.7)}
              className={cn(
                'flex flex-wrap gap-6 mt-10 text-center justify-center',
                isRTL ? 'lg:justify-end' : 'lg:justify-start'
              )}
            >
              {[
                { value: '4+', labelEn: 'Projects Built', labelAr: 'مشاريع منجزة' },
                { value: '5+', labelEn: 'Technologies', labelAr: 'تقنيات' },
                { value: '3', labelEn: 'Training Programs', labelAr: 'برامج تدريبية' },
              ].map(({ value, labelEn, labelAr }, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-bold gradient-text">{value}</span>
                  <span className="tech-label text-[hsl(var(--text-muted))]">
                    {labelEn}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Profile image */}
          <div className="flex-shrink-0">
            <ProfileImage />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} className="text-[hsl(var(--text-muted))]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
