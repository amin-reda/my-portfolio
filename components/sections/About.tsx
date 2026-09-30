'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const philosophyColors = ['text-primary-400', 'text-violet-400', 'text-cyan-400', 'text-emerald-400'];
const philosophyBg = [
  'bg-primary-500/10 border-primary-500/20',
  'bg-violet-500/10 border-violet-500/20',
  'bg-cyan-500/10 border-cyan-500/20',
  'bg-emerald-500/10 border-emerald-500/20',
];

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="tech-label text-primary-400 mb-3">// about</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--text-primary))] mb-6">
                {t.about.title}
              </h2>
              <p className="text-subtitle text-primary-300 font-medium mb-6 text-lg">
                {t.about.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-body text-[hsl(var(--text-secondary))] leading-relaxed">
                {t.about.bio1}
              </p>
              <p className="text-body text-[hsl(var(--text-secondary))] leading-relaxed">
                {t.about.bio2}
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <a
                href="https://github.com/amin-reda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-[hsl(var(--surface-border))] text-sm text-[hsl(var(--text-secondary))] hover:text-primary-400 hover:border-primary-500/40 transition-all"
              >
                GitHub <ArrowRight size={14} />
              </a>
              <a
                href="http://www.linkedin.com/in/amin-reda-"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-[hsl(var(--surface-border))] text-sm text-[hsl(var(--text-secondary))] hover:text-primary-400 hover:border-primary-500/40 transition-all"
              >
                LinkedIn <ArrowRight size={14} />
              </a>
              <a
                href="mailto:aminreda.ai77@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-[hsl(var(--surface-border))] text-sm text-[hsl(var(--text-secondary))] hover:text-primary-400 hover:border-primary-500/40 transition-all"
              >
                Email <ArrowRight size={14} />
              </a>
            </motion.div>
          </div>

          {/* Right: Philosophy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <p className="tech-label text-[hsl(var(--text-muted))] mb-6">{t.about.philosophy}</p>

              <div className="grid grid-cols-2 gap-4">
                {t.about.steps.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                    className={cn(
                      'rounded-xl border p-5 transition-all hover:scale-[1.02]',
                      philosophyBg[i]
                    )}
                  >
                    <div className={cn('text-2xl font-bold mb-1', philosophyColors[i])}>
                      0{i + 1}
                    </div>
                    <div className={cn('font-bold text-lg mb-1', philosophyColors[i])}>
                      {step}
                    </div>
                    <p className="text-xs text-[hsl(var(--text-muted))] leading-relaxed">
                      {t.about.stepsDesc[i]}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Tech stack strip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 p-5 rounded-2xl glass border border-[hsl(var(--surface-border))]"
              >
                <p className="tech-label text-[hsl(var(--text-muted))] mb-3">CORE STACK</p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'LLMs', 'RAG', 'n8n', 'LangChain', 'OpenCV', 'Pandas', 'Gemini'].map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

