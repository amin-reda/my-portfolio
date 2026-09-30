'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const navLinks = [
  { key: 'home' as const, href: '#home' },
  { key: 'about' as const, href: '#about' },
  { key: 'skills' as const, href: '#skills' },
  { key: 'projects' as const, href: '#projects' },
  { key: 'certificates' as const, href: '#certificates' },
  { key: 'feedback' as const, href: '#feedback' },
  { key: 'journey' as const, href: '#journey' },
  { key: 'contact' as const, href: '#contact' },
];

export default function Navbar() {
  const { t, lang, setLang, isRTL } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'py-2 glass border-b border-[hsl(var(--surface-border))] shadow-lg'
            : 'py-4 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-2 group"
              aria-label="Go to home"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-white font-bold text-sm font-mono">AR</span>
              </div>
              <span className="hidden sm:block text-[hsl(var(--text-primary))] font-semibold text-sm tracking-wide group-hover:text-primary-400 transition-colors">
                Amin Reda
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map(({ key, href }) => (
                <button
                  key={key}
                  onClick={() => handleNavClick(href)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-md transition-all duration-200',
                    activeSection === href.slice(1)
                      ? 'text-primary-400 bg-primary-500/10'
                      : 'text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-white/5'
                  )}
                >
                  {t.nav[key]}
                </button>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-[hsl(var(--surface-border))] text-xs font-mono text-[hsl(var(--text-secondary))] hover:text-primary-400 hover:border-primary-500/50 transition-all"
                aria-label="Switch language"
              >
                <span className={lang === 'en' ? 'text-primary-400' : ''}>EN</span>
                <span className="opacity-30">|</span>
                <span className={lang === 'ar' ? 'text-primary-400' : ''}>AR</span>
              </button>

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-md border border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))] hover:text-primary-400 hover:border-primary-500/50 transition-all"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={theme}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                    </motion.div>
                  </AnimatePresence>
                </button>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-md border border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))] hover:text-primary-400 transition-all"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={menuOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {menuOpen ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <div
              className={cn(
                'absolute top-16 glass shadow-2xl border-[hsl(var(--surface-border))] border rounded-2xl p-6 mx-4',
                isRTL ? 'right-0 left-4' : 'left-0 right-4'
              )}
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {navLinks.map(({ key, href }, i) => (
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, x: isRTL ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleNavClick(href)}
                    className={cn(
                      'text-start px-4 py-3 rounded-xl text-sm transition-all',
                      activeSection === href.slice(1)
                        ? 'text-primary-400 bg-primary-500/10'
                        : 'text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-white/5'
                    )}
                  >
                    {t.nav[key]}
                  </motion.button>
                ))}
              </nav>

              <div className="mt-4 pt-4 border-t border-[hsl(var(--surface-border))] flex items-center gap-3">
                <button
                  onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-[hsl(var(--surface-border))] text-xs font-mono text-[hsl(var(--text-secondary))] hover:text-primary-400 hover:border-primary-500/50 transition-all"
                >
                  <span className={lang === 'en' ? 'text-primary-400' : ''}>EN</span>
                  <span className="opacity-30">|</span>
                  <span className={lang === 'ar' ? 'text-primary-400' : ''}>AR</span>
                </button>
                <a
                  href="https://github.com/amin-reda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))] hover:text-primary-400 hover:border-primary-500/50 transition-all"
                  aria-label="GitHub profile"
                >
                  <GithubIcon style={{ width: 16, height: 16 }} />
                </a>
                <a
                  href="http://www.linkedin.com/in/amin-reda-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))] hover:text-primary-400 hover:border-primary-500/50 transition-all"
                  aria-label="LinkedIn profile"
                >
                  <LinkedinIcon style={{ width: 16, height: 16 }} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
