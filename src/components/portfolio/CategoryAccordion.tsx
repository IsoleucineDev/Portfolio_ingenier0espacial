import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Category, Project } from '@/types/content'
import { useIsTouch } from '@/hooks/useIsTouch'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { TagList } from '@/components/ui/Tag'
import SoundCloudEmbed from '@/components/portfolio/SoundCloudEmbed'
import Stitch from '@/components/effects/Stitch'

interface CategoryAccordionProps {
  categories: Category[]
}

// Accent palette for dark-on-light artisanal scheme
const accentColorMap: Record<string, {
  border: string
  text: string
  bg: string
  badge: string
}> = {
  sky:      { border: '#A8889A', text: '#7A5A7A', bg: 'rgba(212,191,207,0.35)', badge: '#EAD9E5' },
  rust:     { border: '#C98B6A', text: '#A06548', bg: 'rgba(232,180,160,0.30)', badge: '#F5E8DE' },
  lavender: { border: '#A8889A', text: '#7A5A7A', bg: 'rgba(212,191,207,0.35)', badge: '#EDE8F5' },
  sage:     { border: '#7CA36A', text: '#4A7A3D', bg: 'rgba(181,201,168,0.30)', badge: '#E0ECD8' },
  gold:     { border: '#DF822A', text: '#9A5010', bg: 'rgba(240,208,144,0.35)', badge: '#F5EFD8' },
}

export default function CategoryAccordion({ categories }: CategoryAccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const isTouch = useIsTouch()
  const navigate = useNavigate()

  const visible = categories.filter(c => c.visible)

  const handleActivate = useCallback((id: string) => {
    setActiveId(prev => (prev === id && isTouch ? null : id))
  }, [isTouch])

  const handleDeactivateAll = useCallback(() => {
    if (!isTouch) setActiveId(null)
  }, [isTouch])

  return (
    <section
      id="portfolio"
      className="w-full flex flex-col"
      style={{ minHeight: '100svh' }}
      onMouseLeave={handleDeactivateAll}
      aria-label="Portfolio de categorías"
    >
      {visible.map((category, index) => (
        <CategoryBand
          key={category.id}
          category={category}
          index={index}
          total={visible.length}
          isActive={activeId === category.id}
          isInactive={activeId !== null && activeId !== category.id}
          isTouch={isTouch}
          onActivate={() => handleActivate(category.id)}
          onNavigate={() => navigate(`/${category.slug}`)}
        />
      ))}
    </section>
  )
}

// ── CategoryBand ───────────────────────────────────────────────────────────────

interface BandProps {
  category: Category
  index: number
  total: number
  isActive: boolean
  isInactive: boolean
  isTouch: boolean
  onActivate: () => void
  onNavigate: () => void
}

function CategoryBand({
  category,
  index,
  isActive,
  isInactive,
  isTouch,
  onActivate,
  onNavigate,
}: BandProps) {
  const reduced = useReducedMotion()
  const accent  = accentColorMap[category.theme.accentColor] ?? accentColorMap.sage
  const indexStr = String(index + 1).padStart(2, '0')
  const flexValue = isActive ? 5 : isInactive ? 0.6 : 1

  return (
    <motion.article
      className="relative flex flex-col overflow-hidden cursor-pointer"
      animate={reduced ? {} : { flex: flexValue }}
      transition={{ type: 'spring', damping: 28, stiffness: 140 }}
      style={{ flex: flexValue, minHeight: 72 }}
      onMouseEnter={!isTouch ? onActivate : undefined}
      onClick={isTouch ? onActivate : undefined}
      aria-expanded={isActive}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onActivate() }}
      aria-label={`${category.title} — ${category.subtitle}`}
    >
      {/* ── Background ─────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: isActive ? category.theme.bandBg : 'var(--color-canvas)' }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Soft patchwork glow when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: `radial-gradient(ellipse at 25% 50%, ${accent.bg} 0%, transparent 65%)` }}
          />
        )}
      </AnimatePresence>

      {/* ── Stitched top border ─────────────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-6 right-6 flex items-center"
        animate={{ opacity: isActive ? 0.7 : 0.35 }}
        transition={{ duration: 0.3 }}
      >
        <Stitch className="text-border-strong w-full" length={800} />
      </motion.div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row">

        {/* Left panel — always-visible metadata */}
        <div className="flex items-start gap-4 px-6 md:px-10 pt-6 pb-4 md:w-2/5">

          {/* Index number */}
          <motion.span
            className="font-mono text-xs mt-1 shrink-0"
            animate={{ color: isActive ? accent.text : 'var(--color-subtle)' }}
            transition={{ duration: 0.3 }}
          >
            {indexStr}
          </motion.span>

          <div className="flex-1 min-w-0">

            {/* Subtitle / type label */}
            <motion.p
              className="font-mono text-[10px] tracking-[0.22em] uppercase mb-1.5"
              animate={{ color: isActive ? accent.text : 'var(--color-subtle)' }}
              transition={{ duration: 0.3 }}
            >
              {category.subtitle}
            </motion.p>

            {/* Title — grows on active */}
            <motion.h2
              className="font-display font-bold leading-tight text-prose"
              animate={{
                fontSize: isActive ? 'clamp(1.8rem, 3.5vw, 3rem)' : 'clamp(1.2rem, 2.5vw, 1.75rem)',
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {category.title}
            </motion.h2>

            {/* Tagline — revealed on active */}
            <AnimatePresence>
              {isActive && (
                <motion.p
                  className="mt-2 text-sm md:text-base leading-relaxed max-w-xs text-muted"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ delay: 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {category.tagline}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Tags */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  className="mt-3"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.18, duration: 0.35 }}
                >
                  <TagList
                    tags={
                      category.type === 'playlist'
                        ? [category.subtitle, 'SoundCloud', ...(category.soundcloud?.trackCount ? [`${category.soundcloud.trackCount} pistas`] : [])]
                        : [category.subtitle, `${category.projects?.length ?? 0} proyectos`]
                    }
                    maxVisible={4}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence>
              {isActive && (
                <motion.p
                  className="mt-4 text-sm leading-relaxed max-w-sm text-muted hidden md:block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.22, duration: 0.4 }}
                >
                  {category.description}
                </motion.p>
              )}
            </AnimatePresence>

            {/* CTA — fabric label style */}
            <AnimatePresence>
              {isActive && (
                <motion.button
                  onClick={e => { e.stopPropagation(); onNavigate() }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-body"
                  style={{
                    padding:       '7px 16px',
                    background:    accent.badge,
                    border:        `1.5px dashed ${accent.border}`,
                    borderRadius:  '3px',
                    color:         accent.text,
                    letterSpacing: '0.01em',
                    cursor:        'pointer',
                    transition:    'background 0.2s',
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.28, duration: 0.35 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Explorar
                  <ArrowRight size={13} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right panel — media preview */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="flex-1 flex items-center justify-center px-6 md:px-10 pb-6 md:pb-0 overflow-hidden"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {category.type === 'playlist' && category.soundcloud.embedUrl !== 'PLACEHOLDER_SHORT_FILMS_EMBED'
                ? (
                  <SoundCloudEmbed
                    embedUrl={category.soundcloud.embedUrl}
                    title={category.title}
                    compact
                  />
                )
                : category.type === 'portfolio'
                ? <ProjectPreviewGrid projects={category.projects} accent={accent} />
                : <ComingSoonPreview accent={accent} />
              }
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

// ── Project preview grid ───────────────────────────────────────────────────────

function ProjectPreviewGrid({
  projects,
  accent,
}: {
  projects: Project[]
  accent: { border: string; text: string; bg: string; badge: string }
}) {
  const preview = projects.slice(0, 3)

  return (
    <div className="w-full max-w-md">
      <div className="grid grid-cols-3 gap-2">
        {preview.map(project => (
          <div
            key={project.id}
            className="aspect-video overflow-hidden"
            style={{
              borderRadius: '3px',
              border: `1.5px dashed ${accent.border}`,
              backgroundColor: accent.badge,
            }}
          >
            <div className="w-full h-full flex items-center justify-center p-1">
              <span
                className="font-mono text-center leading-tight"
                style={{ fontSize: '9px', color: accent.text, opacity: 0.8 }}
              >
                {project.title.slice(0, 22)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p
        className="mt-3 text-[10px] font-mono text-center"
        style={{ color: 'var(--color-subtle)' }}
      >
        {projects.length} proyecto{projects.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}

function ComingSoonPreview({ accent }: { accent: { border: string; text: string } }) {
  return (
    <div className="flex flex-col items-center gap-3 opacity-60">
      <div className="flex gap-1.5">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accent.border, opacity: 0.6 + i * 0.15 }}
          />
        ))}
      </div>
      <p className="font-mono text-xs tracking-widest uppercase" style={{ color: accent.text }}>
        Próximamente
      </p>
    </div>
  )
}
