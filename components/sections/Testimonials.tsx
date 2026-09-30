'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote, CheckCircle2, ExternalLink, X, Sparkles, Building2, Eye } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import testimonials, { Testimonial } from '@/data/testimonials';

export default function Testimonials() {
  const { t, lang, isRTL } = useLanguage();
  const [activeScreenshot, setActiveScreenshot] = useState<Testimonial | null>(null);

  return (
    <section id="feedback" className="section-padding relative overflow-hidden bg-[hsl(var(--surface-elevated))]/25">
      {/* Ambient Glow */}
      <div
        className="ambient-glow w-96 h-96 bg-primary-500/10 top-1/4 left-1/3"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass px-3.5 py-1.5 rounded-full border border-primary-500/30 mb-4">
            <MessageSquareQuote size={13} className="text-primary-400" aria-hidden="true" />
            <span className="tech-label text-primary-300">
              {t.feedback.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[hsl(var(--text-primary))] mb-4">
            {t.feedback.title}
          </h2>
          <p className="text-body text-[hsl(var(--text-secondary))] max-w-2xl mx-auto text-base sm:text-lg">
            {t.feedback.subtitle}
          </p>
        </motion.div>

        {/* Featured Technical Review: Muhammed Gheryani */}
        {testimonials.filter(tItem => tItem.featured && tItem.id === 'muhammed-gheryani').map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 relative glass border border-primary-500/40 rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden shadow-xl shadow-primary-500/10"
          >
            {/* Corner highlight glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-[hsl(var(--surface-border))]">
              {/* Reviewer Profile */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-primary-400 shadow-md shadow-primary-500/20 flex-shrink-0">
                  <Image
                    src={item.avatar}
                    alt={lang === 'ar' ? item.nameAr : item.name}
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xl text-[hsl(var(--text-primary))]">
                      {lang === 'ar' ? item.nameAr : item.name}
                    </h3>
                    <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" aria-label={t.feedback.verified} />
                  </div>
                  <p className="text-sm font-medium text-primary-400">
                    {lang === 'ar' ? item.roleAr : item.roleEn}
                  </p>
                  <p className="tech-label text-xs text-[hsl(var(--text-muted))]">
                    {lang === 'ar' ? item.organizationAr : item.organizationEn}
                  </p>
                </div>
              </div>

              {/* Tags & Action */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="tech-label text-[10px] px-3 py-1 rounded-full border border-primary-500/40 bg-primary-500/10 text-primary-300 flex items-center gap-1.5">
                  <Sparkles size={11} />
                  {lang === 'ar' ? item.tagAr : item.tagEn}
                </span>

                {item.projectReferencedEn && (
                  <span className="tech-label text-[10px] px-3 py-1 rounded-full border border-violet-500/40 bg-violet-500/10 text-violet-300">
                    {t.feedback.referencedProject} {lang === 'ar' ? item.projectReferencedAr : item.projectReferencedEn}
                  </span>
                )}

                <button
                  onClick={() => setActiveScreenshot(item)}
                  className="flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[hsl(var(--surface-border))] text-xs text-[hsl(var(--text-secondary))] hover:text-primary-400 hover:border-primary-500/40 transition-all glass"
                >
                  <Eye size={13} />
                  {t.feedback.viewScreenshot}
                </button>
              </div>
            </div>

            {/* Comment Body */}
            <div className="pt-6">
              <p className="text-base sm:text-lg text-[hsl(var(--text-primary))] leading-relaxed font-normal whitespace-pre-line">
                "{lang === 'ar' ? item.commentAr : item.commentEn}"
              </p>

              {lang === 'en' && (
                <p className="mt-3 text-xs text-[hsl(var(--text-muted))] italic" dir="rtl">
                  التعليق الأصلي: &quot;{item.commentAr}&quot;
                </p>
              )}
            </div>
          </motion.div>
        ))}

        {/* Grid of Other Instructors & Mentors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.filter(tItem => tItem.id !== 'muhammed-gheryani').map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass border border-[hsl(var(--surface-border))] hover:border-primary-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-primary-500/10"
            >
              <div>
                {/* Top header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary-500/30 flex-shrink-0">
                      <Image
                        src={item.avatar}
                        alt={lang === 'ar' ? item.nameAr : item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-[hsl(var(--text-primary))]">
                          {lang === 'ar' ? item.nameAr : item.name}
                        </h4>
                        <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-primary-400 font-medium line-clamp-1">
                        {lang === 'ar' ? item.roleAr : item.roleEn}
                      </p>
                      <p className="tech-label text-[10px] text-[hsl(var(--text-muted))]">
                        {lang === 'ar' ? item.organizationAr : item.organizationEn}
                      </p>
                    </div>
                  </div>

                  <span
                    className="tech-label text-[9px] px-2 py-0.5 rounded-full border flex-shrink-0"
                    style={{
                      background: `${item.accentColor}15`,
                      color: item.accentColor,
                      borderColor: `${item.accentColor}35`,
                    }}
                  >
                    {lang === 'ar' ? item.tagAr : item.tagEn}
                  </span>
                </div>

                {/* Quote Content */}
                <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed mb-4">
                  "{lang === 'ar' ? item.commentAr : item.commentEn}"
                </p>

                {lang === 'en' && item.commentAr !== item.commentEn && (
                  <p className="text-[11px] text-[hsl(var(--text-muted))] italic mb-4" dir="rtl">
                    &quot;{item.commentAr}&quot;
                  </p>
                )}
              </div>

              {/* Bottom Card Action */}
              <div className="pt-3 border-t border-[hsl(var(--surface-border))] flex items-center justify-between">
                <span className="tech-label text-[9px] text-[hsl(var(--text-muted))] flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-cyan-400" />
                  {t.feedback.verified}
                </span>

                <button
                  onClick={() => setActiveScreenshot(item)}
                  className="flex items-center gap-1 text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors"
                >
                  <Eye size={12} />
                  {t.feedback.viewScreenshot}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Screenshot Proof Modal */}
      <AnimatePresence>
        {activeScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
            style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.85)' }}
            onClick={() => setActiveScreenshot(null)}
            role="dialog"
            aria-modal="true"
            aria-label={t.feedback.viewScreenshot}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-2xl w-full glass border border-[hsl(var(--surface-border))] rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6"
              onClick={e => e.stopPropagation()}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[hsl(var(--surface-border))]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-cyan-400" />
                  <span className="font-semibold text-sm text-[hsl(var(--text-primary))]">
                    {lang === 'ar' ? activeScreenshot.nameAr : activeScreenshot.name} — {t.feedback.verified}
                  </span>
                </div>
                <button
                  onClick={() => setActiveScreenshot(null)}
                  className="p-1.5 rounded-lg border border-[hsl(var(--surface-border))] text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))] transition-all"
                  aria-label={t.feedback.close}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Full Screenshot Image */}
              <div className="relative w-full rounded-xl overflow-hidden border border-[hsl(var(--surface-border))] bg-black/40">
                <Image
                  src={activeScreenshot.screenshot}
                  alt={`Screenshot of comment by ${activeScreenshot.name}`}
                  width={1080}
                  height={600}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="mt-4 flex items-center justify-between text-xs text-[hsl(var(--text-muted))]">
                <span>{lang === 'ar' ? activeScreenshot.roleAr : activeScreenshot.roleEn}</span>
                <button
                  onClick={() => setActiveScreenshot(null)}
                  className="px-4 py-1.5 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-medium transition-all"
                >
                  {t.feedback.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

