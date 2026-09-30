'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import skills from '@/data/skills';

const categoryColors: Record<string, string> = {
  'ai-ml': 'text-primary-400 border-primary-500/20 bg-primary-500/10',
  data: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
  automation: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10',
  'cv-iot': 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
};

const skillTagColors: Record<string, string> = {
  'ai-ml': 'bg-primary-500/10 border-primary-500/20 text-primary-300 hover:border-primary-400/50 hover:bg-primary-500/20',
  data: 'bg-amber-500/10 border-amber-500/20 text-amber-300 hover:border-amber-400/50 hover:bg-amber-500/20',
  automation: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/20',
  'cv-iot': 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300 hover:border-emerald-400/50 hover:bg-emerald-500/20',
};

export default function Skills() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('ai-ml');

  const activeCategory = skills.find(s => s.id === activeTab)!;

  return (
    <section id="skills" className="section-padding bg-[hsl(var(--surface-elevated))]/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="tech-label text-primary-400 mb-3">// skills</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--text-primary))] mb-4">
            {t.skillsSection.title}
          </h2>
          <p className="text-body text-[hsl(var(--text-secondary))]">{t.skillsSection.subtitle}</p>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
          role="tablist"
          aria-label="Skill categories"
        >
          {skills.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              role="tab"
              aria-selected={activeTab === category.id}
              aria-controls={`panel-${category.id}`}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200',
                activeTab === category.id
                  ? categoryColors[category.id]
                  : 'border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:border-[hsl(var(--surface-border))]/80'
              )}
            >
              <span>{category.icon}</span>
              <span>{lang === 'ar' ? category.titleAr : category.titleEn}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-label={lang === 'ar' ? activeCategory.titleAr : activeCategory.titleEn}
          className="glass border border-[hsl(var(--surface-border))] rounded-2xl p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{activeCategory.icon}</span>
            <div>
              <h3 className={cn('font-bold text-lg', categoryColors[activeTab].split(' ')[0])}>
                {lang === 'ar' ? activeCategory.titleAr : activeCategory.titleEn}
              </h3>
              <p className="tech-label text-[hsl(var(--text-muted))]">
                {activeCategory.skills.length} {lang === 'ar' ? 'مهارة' : 'skills'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {activeCategory.skills.map((skill, i) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className={cn(
                  'px-3 py-1.5 rounded-lg border text-sm font-mono cursor-default transition-all duration-200',
                  skillTagColors[activeTab]
                )}
              >
                {lang === 'ar' ? skill.nameAr : skill.name}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-[hsl(var(--text-muted))] mt-6"
        >
          {lang === 'ar'
            ? 'جميع التقنيات مدعومة بمشاريع حقيقية أو برامج تدريبية'
            : 'All technologies are backed by real projects or training programs'}
        </motion.p>
      </div>
    </section>
  );
}

