'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const focusIcons = ['🧠', '✨', '📊', '⚡', '👁️', '🔗'];
const accentColors = [
  'from-primary-500/20 to-violet-600/10 border-primary-500/20 hover:border-primary-400/40',
  'from-violet-500/20 to-purple-600/10 border-violet-500/20 hover:border-violet-400/40',
  'from-amber-500/20 to-orange-600/10 border-amber-500/20 hover:border-amber-400/40',
  'from-cyan-500/20 to-blue-600/10 border-cyan-500/20 hover:border-cyan-400/40',
  'from-emerald-500/20 to-green-600/10 border-emerald-500/20 hover:border-emerald-400/40',
  'from-rose-500/20 to-pink-600/10 border-rose-500/20 hover:border-rose-400/40',
];

const textColors = [
  'text-primary-400',
  'text-violet-400',
  'text-amber-400',
  'text-cyan-400',
  'text-emerald-400',
  'text-rose-400',
];

export default function CoreFocus() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="section-padding bg-[hsl(var(--surface-elevated))]/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="tech-label text-primary-400 mb-3">{t.focus.title}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--text-primary))]">
            {t.focus.title}
          </h2>
          <p className="mt-3 text-body text-[hsl(var(--text-secondary))]">{t.focus.subtitle}</p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.focus.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className={cn(
                'group relative p-6 rounded-2xl border bg-gradient-to-br transition-all duration-300 cursor-default',
                accentColors[i]
              )}
            >
              {/* Icon */}
              <div className="text-3xl mb-4">{focusIcons[i]}</div>

              {/* Title */}
              <h3 className={cn('font-bold text-lg mb-2', textColors[i])}>
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed">
                {card.desc}
              </p>

              {/* Corner accent */}
              <div
                className="absolute top-4 right-4 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              >
                <div className={cn('w-full h-full rounded-full blur-sm', `bg-gradient-to-br ${accentColors[i].split(' ')[0]}  ${accentColors[i].split(' ')[1]}`)} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

