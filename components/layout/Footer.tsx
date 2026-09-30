'use client';

import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';
import { useLanguage } from '@/lib/i18n';
import { motion } from 'framer-motion';

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

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-[hsl(var(--surface-border))] bg-[hsl(var(--surface-elevated))]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-white font-bold text-sm font-mono">AR</span>
              </div>
              <span className="font-semibold text-[hsl(var(--text-primary))]">{t.footer.name}</span>
            </div>
            <p className="tech-label text-primary-400 mb-2">{t.footer.title}</p>
            <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="tech-label text-[hsl(var(--text-muted))] mb-4">Navigation</h3>
            <nav className="grid grid-cols-2 gap-1">
              {navLinks.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm text-[hsl(var(--text-secondary))] hover:text-primary-400 transition-colors py-1"
                >
                  {t.nav[key]}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="tech-label text-[hsl(var(--text-muted))] mb-4">Connect</h3>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/amin-reda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[hsl(var(--text-secondary))] hover:text-primary-400 transition-colors group"
                aria-label="GitHub"
              >
                <GithubIcon style={{ width: 16, height: 16 }} className="group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
              <a
                href="http://www.linkedin.com/in/amin-reda-"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[hsl(var(--text-secondary))] hover:text-primary-400 transition-colors group"
                aria-label="LinkedIn"
              >
                <LinkedinIcon style={{ width: 16, height: 16 }} className="group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:aminreda.ai77@gmail.com"
                className="flex items-center gap-2 text-sm text-[hsl(var(--text-secondary))] hover:text-primary-400 transition-colors group"
                aria-label="Email"
              >
                <Mail size={16} className="group-hover:scale-110 transition-transform" />
                <span>aminreda.ai77@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-[hsl(var(--surface-border))] gap-4">
          <p className="text-xs text-[hsl(var(--text-muted))]">{t.footer.copyright}</p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs text-[hsl(var(--text-muted))] hover:text-primary-400 transition-colors group"
            aria-label={t.misc.backToTop}
          >
            <span>{t.misc.backToTop}</span>
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
