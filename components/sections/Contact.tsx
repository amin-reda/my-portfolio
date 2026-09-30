'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';
import { useLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: Mail,
    labelKey: 'email' as const,
    value: 'aminreda.ai77@gmail.com',
    href: 'mailto:aminreda.ai77@gmail.com',
  },
  {
    icon: Phone,
    labelKey: 'phone' as const,
    value: '01060316085',
    href: 'tel:+201060316085',
  },
  {
    icon: MapPin,
    labelKey: 'location' as const,
    valueKey: 'locationValue' as const,
    href: null,
  },
  {
    icon: LinkedinIcon,
    labelKey: 'linkedin' as const,
    value: 'linkedin.com/in/amin-reda-',
    href: 'http://www.linkedin.com/in/amin-reda-',
  },
];

export default function Contact() {
  const { t, isRTL } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' });

  const onSubmit = async (data: FormData) => {
    setStatus('sending');
    try {
      // Open mailto as a fallback (no backend keys required)
      const subject = encodeURIComponent(data.subject);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
      );
      window.location.href = `mailto:aminreda.ai77@gmail.com?subject=${subject}&body=${body}`;
      setTimeout(() => {
        setStatus('success');
        reset();
        setTimeout(() => setStatus('idle'), 4000);
      }, 400);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const inputCls = (hasError: boolean) =>
    cn(
      'w-full px-4 py-3 rounded-xl border bg-[hsl(var(--surface-elevated))]/50 text-[hsl(var(--text-primary))] text-sm placeholder:text-[hsl(var(--text-muted))] transition-all outline-none',
      'focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500/60',
      hasError
        ? 'border-red-500/50'
        : 'border-[hsl(var(--surface-border))] hover:border-primary-500/30'
    );

  return (
    <section id="contact" className="section-padding bg-[hsl(var(--surface-elevated))]/20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="tech-label text-primary-400 mb-3">// contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--text-primary))] mb-4">
            {t.contact.title}
          </h2>
          <p className="text-body text-[hsl(var(--text-secondary))] max-w-xl mx-auto">
            {t.contact.desc}
          </p>
        </motion.div>

        <div className={cn('grid grid-cols-1 lg:grid-cols-5 gap-10', isRTL && 'lg:flex-row-reverse')}>
          {/* Contact Info (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map(({ icon: Icon, labelKey, value, valueKey, href }, i) => (
              <motion.div
                key={labelKey}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 glass border border-[hsl(var(--surface-border))] rounded-xl p-4 hover:border-primary-500/30 transition-all group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 group-hover:bg-primary-500/20 transition-all">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <div>
                  <p className="tech-label text-[10px] text-[hsl(var(--text-muted))] mb-0.5">
                    {t.contact[labelKey]}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-[hsl(var(--text-secondary))] hover:text-primary-400 transition-colors break-all"
                    >
                      {valueKey ? t.contact[valueKey] : value}
                    </a>
                  ) : (
                    <p className="text-sm text-[hsl(var(--text-secondary))]">
                      {valueKey ? t.contact[valueKey] : value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social icons row */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://github.com/amin-reda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass border border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))] hover:text-primary-400 hover:border-primary-500/40 transition-all text-sm"
                aria-label="GitHub"
              >
                <GithubIcon style={{ width: 18, height: 18 }} aria-hidden="true" />
                GitHub
              </a>
              <a
                href="http://www.linkedin.com/in/amin-reda-"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass border border-[hsl(var(--surface-border))] text-[hsl(var(--text-secondary))] hover:text-primary-400 hover:border-primary-500/40 transition-all text-sm"
                aria-label="LinkedIn"
              >
                <LinkedinIcon style={{ width: 18, height: 18 }} aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Contact Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass border border-[hsl(var(--surface-border))] rounded-2xl p-6 sm:p-8 space-y-5"
              noValidate
              aria-label="Contact form"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="tech-label text-[10px] text-[hsl(var(--text-muted))] mb-1.5 block" htmlFor="name">
                    {t.contact.formName}
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder={t.contact.formName}
                    autoComplete="name"
                    {...register('name', { required: t.contact.formNameRequired })}
                    className={inputCls(!!errors.name)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="text-red-400 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="tech-label text-[10px] text-[hsl(var(--text-muted))] mb-1.5 block" htmlFor="email">
                    {t.contact.formEmail}
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder={t.contact.formEmail}
                    autoComplete="email"
                    {...register('email', {
                      required: t.contact.formEmailRequired,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: t.contact.formEmailInvalid,
                      },
                    })}
                    className={inputCls(!!errors.email)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-red-400 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="tech-label text-[10px] text-[hsl(var(--text-muted))] mb-1.5 block" htmlFor="subject">
                  {t.contact.formSubject}
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder={t.contact.formSubject}
                  {...register('subject', { required: t.contact.formSubjectRequired })}
                  className={inputCls(!!errors.subject)}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" role="alert" className="text-red-400 text-xs mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="tech-label text-[10px] text-[hsl(var(--text-muted))] mb-1.5 block" htmlFor="message">
                  {t.contact.formMessage}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder={t.contact.formMessage}
                  {...register('message', { required: t.contact.formMessageRequired })}
                  className={cn(inputCls(!!errors.message), 'resize-none')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="text-red-400 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status !== 'sending' ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all',
                  status === 'success'
                    ? 'bg-emerald-600 text-white'
                    : status === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                )}
                aria-label={t.contact.formSend}
              >
                {status === 'sending' && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                )}
                {status === 'success' && <CheckCircle size={18} aria-hidden="true" />}
                {status === 'error' && <AlertCircle size={18} aria-hidden="true" />}
                {status === 'idle' && <Send size={16} aria-hidden="true" />}

                <span aria-live="polite">
                  {status === 'sending' ? t.contact.formSending :
                   status === 'success' ? t.contact.formSuccess :
                   status === 'error' ? t.contact.formError :
                   t.contact.formSend}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
