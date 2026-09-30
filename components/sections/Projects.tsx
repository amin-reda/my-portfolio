'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronRight, Users, ArrowRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/icons';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import projects, { comingSoonProjects, Project, ProjectCategory } from '@/data/projects';

/* ── Architecture Diagram ─────────────────────────────────────── */
function ArchDiagram({ project, isRTL }: { project: Project; isRTL: boolean }) {
  const { lang } = useLanguage();
  const rows = project.architecture;

  return (
    <div className="flex flex-col items-center gap-1.5 my-2">
      {rows.map((row, ri) => (
        <div key={ri} className="flex flex-col items-center gap-1.5 w-full">
          {/* Connector from previous */}
          {ri > 0 && (
            <div className="w-px h-5 bg-gradient-to-b from-primary-500/60 to-primary-500/20" />
          )}
          <div className="flex gap-3 justify-center flex-wrap">
            {row.map((step, si) => (
              <div
                key={si}
                className="px-3 py-1.5 rounded-lg bg-primary-500/10 border border-primary-500/25 text-primary-300 text-xs font-mono text-center"
              >
                {lang === 'ar' ? step.labelAr : step.label}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Project Detail Modal ─────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t, lang, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features' | 'learnings'>('overview');

  const tabs = [
    { key: 'overview' as const, label: t.modal.overview },
    { key: 'architecture' as const, label: t.modal.architecture },
    { key: 'features' as const, label: t.modal.features },
    { key: 'learnings' as const, label: t.modal.keyLearnings },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
        style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.7)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={lang === 'ar' ? project.titleAr : project.titleEn}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-3xl glass border border-[hsl(var(--surface-border))] rounded-2xl overflow-hidden my-8 shadow-2xl"
          onClick={e => e.stopPropagation()}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div
            className="relative p-6 border-b border-[hsl(var(--surface-border))]"
            style={{ background: `linear-gradient(135deg, ${project.accentColor}20, transparent)` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {project.categories.map(cat => (
                    <span
                      key={cat}
                      className="tech-label text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: `${project.accentColor}25`, color: project.accentColor, border: `1px solid ${project.accentColor}40` }}
                    >
                      {cat}
                    </span>
                  ))}
                  {project.isTeamProject && (
                    <span className="flex items-center gap-1 tech-label text-[10px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/30">
                      <Users size={10} />
                      {t.projects.teamProject}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-[hsl(var(--text-primary))]">
                  {lang === 'ar' ? project.titleAr : project.titleEn}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 p-2 rounded-xl border border-[hsl(var(--surface-border))] text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))] hover:border-primary-500/40 transition-all"
                aria-label={t.modal.close}
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-1 mt-5">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                    activeTab === tab.key
                      ? 'text-white'
                      : 'text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))]'
                  )}
                  style={activeTab === tab.key ? { background: project.accentColor } : {}}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'overview' && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="tech-label text-[hsl(var(--text-muted))] mb-2">{t.modal.overview}</h3>
                      <p className="text-[hsl(var(--text-secondary))] leading-relaxed text-sm">
                        {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
                      </p>
                    </div>
                    <div>
                      <h3 className="tech-label text-[hsl(var(--text-muted))] mb-2">{t.modal.problem}</h3>
                      <p className="text-[hsl(var(--text-secondary))] leading-relaxed text-sm">
                        {lang === 'ar' ? project.problemAr : project.problemEn}
                      </p>
                    </div>
                    <div>
                      <h3 className="tech-label text-[hsl(var(--text-muted))] mb-2">{t.modal.solution}</h3>
                      <p className="text-[hsl(var(--text-secondary))] leading-relaxed text-sm">
                        {lang === 'ar' ? project.solutionAr : project.solutionEn}
                      </p>
                    </div>
                    <div>
                      <h3 className="tech-label text-[hsl(var(--text-muted))] mb-3">{t.modal.technologies}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-xs font-mono border"
                            style={{ background: `${project.accentColor}15`, color: project.accentColor, borderColor: `${project.accentColor}35` }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    {project.contribution && (
                      <div className="p-4 rounded-xl border border-violet-500/25 bg-violet-500/10">
                        <h3 className="tech-label text-violet-400 mb-2">
                          {lang === 'ar' ? project.contribution.labelAr : project.contribution.label}
                        </h3>
                        <ul className="space-y-1">
                          {(lang === 'ar' ? project.contribution.itemsAr : project.contribution.items).map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--text-secondary))]">
                              <ChevronRight size={14} className="text-violet-400 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'architecture' && (
                  <div>
                    <h3 className="tech-label text-[hsl(var(--text-muted))] mb-4">{t.modal.architecture}</h3>
                    <ArchDiagram project={project} isRTL={isRTL} />
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h3 className="tech-label text-[hsl(var(--text-muted))] mb-4">{t.modal.features}</h3>
                    <ul className="space-y-2">
                      {(lang === 'ar' ? project.featuresAr : project.features).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[hsl(var(--text-secondary))]">
                          <div
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ background: project.accentColor }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'learnings' && (
                  <div>
                    <h3 className="tech-label text-[hsl(var(--text-muted))] mb-4">{t.modal.keyLearnings}</h3>
                    <ul className="space-y-3">
                      {(lang === 'ar' ? project.keyLearningsAr : project.keyLearnings).map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[hsl(var(--text-secondary))]">
                          <span
                            className="font-bold text-xs mt-0.5 flex-shrink-0"
                            style={{ color: project.accentColor }}
                          >
                            0{i + 1}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 p-6 border-t border-[hsl(var(--surface-border))]">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 shadow-lg"
              style={{ background: project.accentColor, boxShadow: `0 4px 20px ${project.accentColor}40` }}
            >
              <GithubIcon style={{ width: 16, height: 16 }} />
              {t.modal.viewGitHub}
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))] text-sm hover:text-[hsl(var(--text-primary))] transition-all"
            >
              {t.modal.close}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Project Card ─────────────────────────────────────────────── */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { t, lang } = useLanguage();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="group relative glass border border-[hsl(var(--surface-border))] rounded-2xl overflow-hidden hover:border-opacity-60 transition-all duration-300"
      style={{ '--accent': project.accentColor } as React.CSSProperties}
    >
      {/* Color accent bar */}
      <div
        className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
        style={{ background: `linear-gradient(90deg, ${project.accentColor}, transparent)` }}
      />

      {/* Status chip */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-1.5">
          {project.isTeamProject && (
            <span className="flex items-center gap-1 tech-label text-[10px] px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/25">
              <Users size={10} />
              {lang === 'ar' ? 'جماعي' : 'Team'}
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="p-6">
        {/* System label */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: project.accentColor }} />
          <span className="tech-label text-[10px]" style={{ color: project.accentColor }}>
            {project.systemLabel}
          </span>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.categories.map(cat => (
            <span
              key={cat}
              className="tech-label text-[10px] px-2 py-0.5 rounded-full border"
              style={{ background: `${project.accentColor}15`, color: project.accentColor, borderColor: `${project.accentColor}30` }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-[hsl(var(--text-primary))] mb-2 group-hover:text-primary-300 transition-colors">
          {lang === 'ar' ? project.titleAr : project.titleEn}
        </h3>

        {/* Description */}
        <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed mb-5 line-clamp-3">
          {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.technologies.slice(0, 5).map(tech => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-xs font-mono bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--surface-border))] text-[hsl(var(--text-muted))]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-0.5 rounded-md text-xs font-mono text-[hsl(var(--text-muted))]">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpen}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 shadow-md"
            style={{ background: project.accentColor, boxShadow: `0 2px 12px ${project.accentColor}35` }}
          >
            {t.projects.viewDetails}
            <ArrowRight size={14} />
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm border border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))] hover:text-primary-400 hover:border-primary-500/40 transition-all"
            aria-label={`View ${project.titleEn} on GitHub`}
          >
            <GithubIcon style={{ width: 14, height: 14 }} />
            {t.projects.viewGitHub}
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Coming Soon Card ─────────────────────────────────────────── */
function ComingSoonCard({ project }: { project: typeof comingSoonProjects[number] }) {
  const { lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative glass border border-dashed border-[hsl(var(--surface-border))] rounded-2xl p-6 opacity-60"
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: project.accentColor }}
        />
        <span
          className="tech-label text-[10px] px-2 py-0.5 rounded-full border"
          style={{ background: `${project.accentColor}15`, color: project.accentColor, borderColor: `${project.accentColor}30` }}
        >
          {project.status === 'coming-soon' ? 'COMING SOON' : 'IN PROGRESS'}
        </span>
      </div>
      <h3 className="font-bold text-[hsl(var(--text-primary))] mb-2">
        {lang === 'ar' ? project.titleAr : project.titleEn}
      </h3>
      <p className="text-sm text-[hsl(var(--text-muted))]">
        {lang === 'ar' ? project.descriptionAr : project.descriptionEn}
      </p>
    </motion.div>
  );
}

/* ── Projects Section ─────────────────────────────────────────── */
const FILTER_KEYS: Array<'All' | ProjectCategory> = ['All', 'AI', 'GenAI', 'Data', 'Automation', 'IoT'];

export default function Projects() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<'All' | ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = filter === 'All'
    ? projects
    : projects.filter(p => p.categories.includes(filter));

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="tech-label text-primary-400 mb-3">// projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--text-primary))] mb-4">
            {t.projects.title}
          </h2>
          <p className="text-body text-[hsl(var(--text-secondary))] max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="group"
          aria-label="Project category filters"
        >
          {FILTER_KEYS.map(key => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                filter === key
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'glass border border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:border-primary-500/30'
              )}
            >
              {t.projects.filters[key]}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <AnimatePresence mode="popLayout">
            {filtered.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Coming soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <p className="tech-label text-[hsl(var(--text-muted))] text-center mb-5">
            {t.projects.moreTitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {comingSoonProjects.map(p => (
              <ComingSoonCard key={p.id} project={p} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
