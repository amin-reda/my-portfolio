'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import journey from '@/data/journey';
import { JourneyStatus } from '@/data/journey';

const statusConfig: Record<JourneyStatus, { icon: typeof CheckCircle; label: 'statusCompleted' | 'statusInProgress' | 'statusActive'; color: string; bg: string }> = {
  completed: {
    icon: CheckCircle,
    label: 'statusCompleted',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  'in-progress': {
    icon: Clock,
    label: 'statusInProgress',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  active: {
    icon: Zap,
    label: 'statusActive',
    color: 'text-primary-400',
    bg: 'bg-primary-500/10 border-primary-500/20',
  },
};

export default function Journey() {
  const { t, lang, isRTL } = useLanguage();

  return (
    <section id="journey" className="section-padding bg-[hsl(var(--surface-elevated))]/20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="tech-label text-primary-400 mb-3">// journey</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--text-primary))] mb-4">
            {t.journey.title}
          </h2>
          <p className="text-body text-[hsl(var(--text-secondary))]">{t.journey.subtitle}</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className={cn(
              'absolute top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/60 via-primary-500/30 to-transparent',
              isRTL ? 'right-6 sm:right-8' : 'left-6 sm:left-8'
            )}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {journey.map((item, i) => {
              const cfg = statusConfig[item.status];
              const StatusIcon = cfg.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={cn(
                    'relative flex gap-5 sm:gap-8',
                    isRTL ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  {/* Node */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className={cn('w-12 h-12 sm:w-16 sm:h-16 rounded-xl border flex items-center justify-center', cfg.bg)}>
                      <StatusIcon size={20} className={cfg.color} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Content */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex-1 glass border border-[hsl(var(--surface-border))] rounded-2xl p-5 hover:border-primary-500/30 transition-all"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="tech-label text-primary-400 text-[11px]">
                            {lang === 'ar' ? item.organizationAr : item.organization}
                          </span>
                          <span className="text-[hsl(var(--text-muted))] text-xs">{item.year}</span>
                        </div>
                        <h3 className="font-bold text-[hsl(var(--text-primary))] text-base">
                          {lang === 'ar' ? item.programAr : item.program}
                        </h3>
                      </div>
                      <span className={cn('flex items-center gap-1.5 tech-label text-[10px] px-2.5 py-1 rounded-full border', cfg.bg, cfg.color)}>
                        <StatusIcon size={10} aria-hidden="true" />
                        {t.journey[cfg.label]}
                      </span>
                    </div>

                    <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed mb-3">
                      {lang === 'ar' ? item.detailsAr : item.details}
                    </p>

                    {/* Dates */}
                    {(item.startDate || item.endDate) && (
                      <div className="flex flex-wrap gap-4 text-xs text-[hsl(var(--text-muted))]">
                        {item.startDate && (
                          <span>
                            {lang === 'ar' ? 'بدأ: ' : 'Started: '}
                            <span className="text-[hsl(var(--text-secondary))]">
                              {lang === 'ar' ? item.startDateAr : item.startDate}
                            </span>
                          </span>
                        )}
                        {item.endDate && (
                          <span>
                            {lang === 'ar' ? 'انتهى: ' : 'Completed: '}
                            <span className="text-[hsl(var(--text-secondary))]">
                              {lang === 'ar' ? item.endDateAr : item.endDate}
                            </span>
                          </span>
                        )}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

