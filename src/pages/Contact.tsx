import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { MessageCircle, Instagram, Send } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import { UnderlineDoodle, StarDoodle, SparkDoodle } from '@/components/Doodles'
import { useContent } from '@/context/ContentContext'
import { easeOut } from '@/lib/motionVariants'

const HS   = { fontFamily: "'Fredoka', 'Klee One', 'Yomogi', cursive" } as const
const MONO = { fontFamily: 'var(--font-mono)' } as const

type FormState = 'idle' | 'loading' | 'success' | 'error'

const methodIconMap: Record<string, React.FC<{ size?: number; strokeWidth?: number }>> = {
  whatsapp: MessageCircle,
  social:   Instagram,
  email:    Send,
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
} as const

const itemVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
} as const

export default function Contact() {
  const contact = useContent('contact')
  const meta    = useContent('meta')
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData]   = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (contact.form.endpoint === 'REPLACE_WITH_FORMSPREE_ID') {
      setFormState('error')
      return
    }
    setFormState('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${contact.form.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setFormState(res.ok ? 'success' : 'error')
    } catch {
      setFormState('error')
    }
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{`Contacto | ${meta.siteName}`}</title>
        <meta name="description" content={contact.description} />
      </Helmet>

      <div
        className="relative min-h-screen overflow-hidden"
        style={{
          background: 'var(--color-canvas)',
          paddingTop: 'clamp(5.5rem, 12vw, 9rem)',
          paddingBottom: 'clamp(5rem, 10vw, 8rem)',
        }}
      >
        {/* Ambient decorations */}
        <motion.div
          className="absolute top-20 right-10 pointer-events-none"
          style={{ color: '#DF822A', opacity: 0.12 }}
          animate={{ y: [-8, 8, -8], rotate: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <StarDoodle size={46} />
        </motion.div>
        <motion.div
          className="absolute bottom-24 left-8 pointer-events-none"
          style={{ color: '#7CA36A', opacity: 0.08 }}
          animate={{ y: [6, -6, 6], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          aria-hidden
        >
          <SparkDoodle size={30} />
        </motion.div>

        <div className="max-w-5xl mx-auto px-5 md:px-10 relative z-10">

          {/* ── Header ──────────────────────────────────────────────────────── */}
          <motion.div
            className="mb-16 md:mb-20"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-16" style={{ background: '#DF822A50' }} />
              <span
                className="text-[10px] font-bold tracking-[0.26em] uppercase"
                style={{ ...MONO, color: '#DF822A' }}
              >
                お問い合わせ — CONTACTO
              </span>
            </div>

            <h1 className="leading-[0.88] mb-4">
              {contact.headline.split('\n').map((line: string, i: number) => (
                <span
                  key={i}
                  className="block text-[#414441]"
                  style={i === 0 ? {
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                  } : {
                    fontFamily: "'Nerko One', 'Fredoka', cursive",
                    fontWeight: 400,
                    fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                  }}
                >
                  {line}
                </span>
              ))}
            </h1>

            <div className="flex mt-4">
              <span style={{ color: '#DF822A' }}>
                <UnderlineDoodle width={180} />
              </span>
            </div>

            <p
              className="mt-5 max-w-md leading-relaxed"
              style={{ ...HS, color: 'rgba(65,68,65,0.65)', fontSize: '0.9375rem' }}
            >
              {contact.description}
            </p>
          </motion.div>

          {/* ── Body ────────────────────────────────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

            {/* Contact methods */}
            <motion.div
              className="flex flex-col gap-5"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-2"
              >
                <span
                  className="text-[10px] font-bold tracking-[0.22em] uppercase"
                  style={{ ...MONO, color: 'rgba(65,68,65,0.40)' }}
                >
                  Canales directos
                </span>
              </motion.div>

              {contact.methods.map((method: {
                id: string; type: string; label: string; value: string;
                href: string; cta: string
              }) => {
                const Icon = methodIconMap[method.type] ?? Send
                return (
                  <motion.a
                    key={method.id}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.76)',
                      border: '1px solid rgba(84,52,63,0.09)',
                      boxShadow: '0 2px 14px rgba(84,52,63,0.06)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(84,52,63,0.12), 0 2px 8px rgba(84,52,63,0.07)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 14px rgba(84,52,63,0.06)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    }}
                    aria-label={method.cta}
                  >
                    {/* Icon circle */}
                    <div
                      className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'rgba(223,130,42,0.09)',
                        border: '1px solid rgba(223,130,42,0.22)',
                        color: '#DF822A',
                      }}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm" style={{ ...HS, color: '#414441' }}>
                        {method.label}
                      </p>
                      <p className="text-xs mt-0.5 truncate" style={{ ...HS, color: 'rgba(65,68,65,0.55)' }}>
                        {method.value}
                      </p>
                    </div>

                    <span
                      className="text-xs font-bold shrink-0 transition-colors duration-150"
                      style={{ ...MONO, color: 'rgba(65,68,65,0.35)' }}
                    >
                      →
                    </span>
                  </motion.a>
                )
              })}
            </motion.div>

            {/* Form */}
            {contact.form.enabled && (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease: easeOut }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-[10px] font-bold tracking-[0.22em] uppercase"
                    style={{ ...MONO, color: 'rgba(65,68,65,0.40)' }}
                  >
                    O envíame un mensaje
                  </span>
                </div>

                {formState === 'success' ? (
                  <motion.div
                    className="flex flex-col items-center gap-5 py-14 text-center rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.76)',
                      border: '1px solid rgba(124,163,106,0.25)',
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(124,163,106,0.12)', border: '1.5px solid #7CA36A60' }}
                    >
                      <Send size={20} style={{ color: '#7CA36A' }} />
                    </div>
                    <p className="font-bold max-w-xs leading-snug" style={{ ...HS, color: '#414441' }}>
                      {contact.form.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 rounded-2xl p-6"
                    style={{
                      background: 'rgba(255,255,255,0.76)',
                      border: '1px solid rgba(84,52,63,0.08)',
                      boxShadow: '0 2px 18px rgba(84,52,63,0.06)',
                    }}
                  >
                    {contact.form.fields.map((field: {
                      name: string; type: string; label: string;
                      placeholder: string; required: boolean; options?: string[]
                    }) => (
                      <div key={field.name} className="flex flex-col gap-1.5">
                        <label
                          htmlFor={field.name}
                          className="text-sm font-bold"
                          style={{ ...HS, color: '#414441' }}
                        >
                          {field.label}
                          {field.required && (
                            <span className="ml-1" style={{ color: '#DF822A' }} aria-hidden="true">*</span>
                          )}
                        </label>

                        {field.type === 'textarea' ? (
                          <textarea
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            rows={4}
                            className="px-4 py-3 text-sm resize-none transition-all duration-150 focus:outline-none"
                            style={{
                              ...HS,
                              borderRadius: '10px',
                              border: '1.5px solid rgba(84,52,63,0.14)',
                              background: 'rgba(253,246,240,0.8)',
                              color: '#414441',
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = '#DF822A60'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(223,130,42,0.10)' }}
                            onBlur={e =>  { e.currentTarget.style.borderColor = 'rgba(84,52,63,0.14)'; e.currentTarget.style.boxShadow = 'none' }}
                            onChange={e => setFormData(p => ({ ...p, [field.name]: e.target.value }))}
                          />
                        ) : field.type === 'select' ? (
                          <select
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            className="px-4 py-3 text-sm transition-all duration-150 focus:outline-none appearance-none"
                            style={{
                              ...HS,
                              borderRadius: '10px',
                              border: '1.5px solid rgba(84,52,63,0.14)',
                              background: 'rgba(253,246,240,0.8)',
                              color: '#414441',
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = '#DF822A60'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(223,130,42,0.10)' }}
                            onBlur={e =>  { e.currentTarget.style.borderColor = 'rgba(84,52,63,0.14)'; e.currentTarget.style.boxShadow = 'none' }}
                            onChange={e => setFormData(p => ({ ...p, [field.name]: e.target.value }))}
                          >
                            <option value="">{field.placeholder}</option>
                            {field.options?.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={field.name}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="px-4 py-3 text-sm transition-all duration-150 focus:outline-none"
                            style={{
                              ...HS,
                              borderRadius: '10px',
                              border: '1.5px solid rgba(84,52,63,0.14)',
                              background: 'rgba(253,246,240,0.8)',
                              color: '#414441',
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = '#DF822A60'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(223,130,42,0.10)' }}
                            onBlur={e =>  { e.currentTarget.style.borderColor = 'rgba(84,52,63,0.14)'; e.currentTarget.style.boxShadow = 'none' }}
                            onChange={e => setFormData(p => ({ ...p, [field.name]: e.target.value }))}
                          />
                        )}
                      </div>
                    ))}

                    {formState === 'error' && (
                      <p className="text-sm" style={{ ...HS, color: '#DF822A' }}>
                        {contact.form.errorMessage}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={formState === 'loading'}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.975 }}
                      transition={{ type: 'spring', stiffness: 460, damping: 24 }}
                      className="mt-2 w-full py-3.5 rounded-xl font-bold text-white transition-opacity"
                      style={{
                        ...HS,
                        background: '#DF822A',
                        fontSize: '0.9375rem',
                        opacity: formState === 'loading' ? 0.65 : 1,
                        boxShadow: '0 4px 18px rgba(223,130,42,0.32)',
                      }}
                    >
                      {formState === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </PageTransition>
  )
}
