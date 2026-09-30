'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code2, GitBranch } from 'lucide-react';
import { GithubIcon } from '@/components/ui/icons';
import { useLanguage } from '@/lib/i18n';

export default function GitHubSection() {
  const { t } = useLanguage();

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative glass border border-[hsl(var(--surface-border))] rounded-3xl p-8 sm:p-12 text-center overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary-500/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-violet-500/10 blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Icon cluster */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {[Code2, GitBranch, GithubIcon].map((Icon, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="w-12 h-12 rounded-xl glass border border-[hsl(var(--surface-border))] flex items-center justify-center text-primary-400"
                >
                  <Icon size={20} aria-hidden="true" />
                </motion.div>
              ))}
            </div>

            <p className="tech-label text-primary-400 mb-3">// github</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--text-primary))] mb-4">
              {t.github.title}
            </h2>
            <p className="text-body text-[hsl(var(--text-secondary))] max-w-lg mx-auto mb-8">
              {t.github.desc}
            </p>

            <motion.a
              href="https://github.com/amin-reda"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[hsl(var(--text-primary))] text-[hsl(var(--surface))] font-bold text-base shadow-xl hover:opacity-90 transition-all"
            >
              <GithubIcon style={{ width: 20, height: 20 }} aria-hidden="true" />
              {t.github.cta}
              <ExternalLink size={16} aria-hidden="true" />
            </motion.a>

            {/* Stats disclaimer */}
            <p className="text-xs text-[hsl(var(--text-muted))] mt-6">
              github.com/amin-reda
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
