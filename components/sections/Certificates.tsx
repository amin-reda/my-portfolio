'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, ExternalLink, X, Eye, ShieldCheck, Clock, BookOpen, Layers } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import certificates, { Certificate } from '@/data/certificates';

type FilterType = 'All' | 'NVIDIA' | 'Google & Global' | 'ITI & MCIT' | 'Specialized';

export default function Certificates() {
  const { t, lang, isRTL } = useLanguage();
  const [filter, setFilter] = useState<FilterType>('All');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const filtered = filter === 'All'
    ? certificates
    : certificates.filter(c => c.category === filter);

  const filterButtons: { key: FilterType; label: string }[] = [
    { key: 'All', label: t.certificates.filterAll },
    { key: 'NVIDIA', label: t.certificates.filterNvidia },
    { key: 'Google & Global', label: t.certificates.filterGlobal },
    { key: 'ITI & MCIT', label: t.certificates.filterIti },
    { key: 'Specialized', label: t.certificates.filterSpecialized },
  ];

  return (
    <section id="certificates" className="section-padding relative overflow-hidden bg-[hsl(var(--surface))]/40">
      {/* Ambient glow */}
      <div
        className="ambient-glow w-96 h-96 bg-primary-500/10 top-1/3 right-1/4 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass px-3.5 py-1.5 rounded-full border border-primary-500/30 mb-4">
            <Award size={14} className="text-primary-400" aria-hidden="true" />
            <span className="tech-label text-primary-300">
              {t.certificates.badge}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[hsl(var(--text-primary))] mb-4">
            {t.certificates.title}
          </h2>
          <p className="text-body text-[hsl(var(--text-secondary))] max-w-2xl mx-auto text-base sm:text-lg">
            {t.certificates.subtitle}
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Certificate filters">
          {filterButtons.map(btn => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              role="tab"
              aria-selected={filter === btn.key}
              className={cn(
                'px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border',
                filter === btn.key
                  ? 'bg-primary-600 text-white border-primary-500 shadow-lg shadow-primary-500/30'
                  : 'glass border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:border-primary-500/40'
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, index) => (
              <motion.article
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group relative glass border border-[hsl(var(--surface-border))] hover:border-primary-500/50 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-primary-500/10"
              >
                {/* Accent Top Border */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${cert.accentColor}, transparent)` }}
                />

                {/* Certificate Image Thumbnail Preview */}
                <div
                  className="relative w-full h-48 bg-slate-950 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  <Image
                    src={cert.image}
                    alt={lang === 'ar' ? cert.titleAr : cert.titleEn}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Subtle Gradient & Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--surface-elevated))] via-transparent to-black/20" />

                  {/* Hover Quick Action */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                    <span className="glass px-3.5 py-1.5 rounded-full text-xs text-white font-medium flex items-center gap-1.5 border border-white/20 shadow-lg">
                      <Eye size={14} />
                      {t.certificates.viewCertificate}
                    </span>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span
                      className="tech-label text-[10px] px-2.5 py-0.5 rounded-full border backdrop-blur-md shadow-md"
                      style={{
                        background: `${cert.accentColor}25`,
                        color: cert.accentColor,
                        borderColor: `${cert.accentColor}50`,
                      }}
                    >
                      {lang === 'ar' ? cert.badgeAr : cert.badgeEn}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Issuer & Date */}
                    <div className="flex items-center justify-between gap-2 text-xs text-[hsl(var(--text-muted))] mb-2">
                      <span className="tech-label text-[10px] text-primary-400">
                        {lang === 'ar' ? cert.issuerAr : cert.issuerEn}
                      </span>
                      <span>{lang === 'ar' ? cert.dateAr : cert.dateEn}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base text-[hsl(var(--text-primary))] mb-2 line-clamp-2 group-hover:text-primary-300 transition-colors">
                      {lang === 'ar' ? cert.titleAr : cert.titleEn}
                    </h3>

                    {/* Credential Type */}
                    <p className="text-xs text-[hsl(var(--text-secondary))] mb-3 flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-emerald-400 flex-shrink-0" />
                      <span>{lang === 'ar' ? cert.credentialTypeAr : cert.credentialTypeEn}</span>
                    </p>

                    {/* Credential ID if present */}
                    {cert.credentialId && (
                      <div className="mb-3 px-2.5 py-1 rounded-md bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--surface-border))] flex items-center justify-between text-[11px] font-mono text-[hsl(var(--text-muted))]">
                        <span className="text-[10px] uppercase tracking-wider">{t.certificates.credentialId}</span>
                        <span className="text-primary-300 font-semibold">{cert.credentialId}</span>
                      </div>
                    )}

                    {/* Curriculum Highlight (if 35 hours program) */}
                    {cert.curriculumEn && (
                      <div className="mb-3 p-2.5 rounded-lg bg-primary-500/10 border border-primary-500/20 text-xs">
                        <span className="tech-label text-[10px] text-primary-300 block mb-1">
                          {t.certificates.curriculum}
                        </span>
                        <ul className="space-y-0.5 text-[11px] text-[hsl(var(--text-secondary))]">
                          {(lang === 'ar' ? cert.curriculumAr : cert.curriculumEn)?.slice(0, 3).map((item, idx) => (
                            <li key={idx} className="line-clamp-1">• {item}</li>
                          ))}
                          {(cert.curriculumEn?.length || 0) > 3 && (
                            <li className="text-primary-400 text-[10px] font-mono">
                              +{(cert.curriculumEn?.length || 0) - 3} {lang === 'ar' ? 'وحدات إضافية' : 'more modules'}
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(lang === 'ar' ? cert.skillsAr : cert.skills).slice(0, 3).map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3 border-t border-[hsl(var(--surface-border))] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="w-full py-2 px-3 rounded-xl border border-[hsl(var(--surface-border))] hover:border-primary-500/40 text-xs text-[hsl(var(--text-primary))] hover:text-primary-400 font-semibold flex items-center justify-center gap-1.5 transition-all glass"
                    >
                      <Eye size={13} />
                      {t.certificates.viewCertificate}
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* High-Resolution Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
            style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0,0,0,0.85)' }}
            onClick={() => setSelectedCert(null)}
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'ar' ? selectedCert.titleAr : selectedCert.titleEn}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full glass border border-[hsl(var(--surface-border))] rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 my-4 max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[hsl(var(--surface-border))] flex-shrink-0">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className="tech-label text-[10px] px-2.5 py-0.5 rounded-full border"
                      style={{
                        background: `${selectedCert.accentColor}20`,
                        color: selectedCert.accentColor,
                        borderColor: `${selectedCert.accentColor}40`,
                      }}
                    >
                      {lang === 'ar' ? selectedCert.badgeAr : selectedCert.badgeEn}
                    </span>
                    <span className="text-xs text-[hsl(var(--text-muted))]">
                      {lang === 'ar' ? selectedCert.dateAr : selectedCert.dateEn}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-[hsl(var(--text-primary))]">
                    {lang === 'ar' ? selectedCert.titleAr : selectedCert.titleEn}
                  </h3>
                  <p className="text-xs text-primary-400">
                    {lang === 'ar' ? selectedCert.issuerAr : selectedCert.issuerEn}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl border border-[hsl(var(--surface-border))] text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))] transition-all flex-shrink-0"
                  aria-label={t.certificates.close}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Certificate Image View */}
              <div className="my-4 overflow-y-auto flex-1 rounded-xl border border-[hsl(var(--surface-border))] bg-black/50 p-2 flex items-center justify-center">
                <div className="relative w-full max-h-[60vh] flex items-center justify-center">
                  <Image
                    src={selectedCert.image}
                    alt={lang === 'ar' ? selectedCert.titleAr : selectedCert.titleEn}
                    width={1280}
                    height={850}
                    className="w-auto h-auto max-h-[58vh] max-w-full object-contain rounded-lg shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Modal Details Footer */}
              <div className="pt-3 border-t border-[hsl(var(--surface-border))] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[hsl(var(--text-muted))] flex-shrink-0">
                <div className="space-y-1">
                  {selectedCert.credentialId && (
                    <div className="font-mono">
                      <span className="text-[hsl(var(--text-muted))]">{t.certificates.credentialId} </span>
                      <span className="text-primary-300 font-semibold">{selectedCert.credentialId}</span>
                    </div>
                  )}
                  {selectedCert.signerEn && (
                    <div>
                      <span>{lang === 'ar' ? selectedCert.signerAr : selectedCert.signerEn}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-5 py-2 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium text-xs transition-all w-full sm:w-auto"
                >
                  {t.certificates.close}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

