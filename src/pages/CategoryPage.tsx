import { useParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '@/components/layout/PageTransition'
import SoundCloudEmbed from '@/components/portfolio/SoundCloudEmbed'
import ProjectCard from '@/components/portfolio/ProjectCard'
import { useContent } from '@/context/ContentContext'
import { staggerContainer, fadeUp } from '@/lib/motionVariants'
import type { PlaylistCategory, PortfolioCategory } from '@/types/content'

const accentMap: Record<string, string> = {
  sky:      'var(--color-sky)',
  rust:     'var(--color-rust)',
  lavender: 'var(--color-lavender)',
  sage:     'var(--color-sage)',
  gold:     'var(--color-gold)',
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const { categories } = useContent('portfolio')
  const meta = useContent('meta')

  const category = categories.find(c => c.slug === slug)
  if (!category) return <Navigate to="/" replace />

  const accent = accentMap[category.theme.accentColor] ?? 'var(--color-sage)'
  const pageTitle = `${category.title} | ${meta.siteName}`

  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={category.description} />
      </Helmet>

      {/* Hero band */}
      <div
        className="relative min-h-[45vh] flex flex-col justify-end px-6 md:px-16 pb-12 pt-24"
        style={{ backgroundColor: category.theme.bandBg }}
      >
        {/* Back link */}
        <Link
          to="/"
          className="absolute top-6 left-6 md:left-16 flex items-center gap-2 text-sm font-mono tracking-wider text-white/50 hover:text-white/90 transition-colors"
          aria-label="Volver al inicio"
        >
          <ArrowLeft size={14} />
          Portfolio
        </Link>

        <div className="max-w-4xl">
          <motion.p
            className="font-mono text-xs tracking-[0.2em] uppercase mb-3"
            style={{ color: accent }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {category.subtitle}
          </motion.p>

          <motion.h1
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {category.title}
          </motion.h1>

          <motion.p
            className="mt-4 max-w-xl leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            {category.longDescription}
          </motion.p>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-canvas min-h-screen">
        {category.type === 'playlist' ? (
          <PlaylistContent category={category} accent={accent} />
        ) : (
          <PortfolioContent category={category} />
        )}
      </div>
    </PageTransition>
  )
}

// ── Playlist Content (Games / Films) ─────────────────────────────────────────

function PlaylistContent({ category, accent }: { category: PlaylistCategory; accent: string }) {
  const hasRealEmbed = !category.soundcloud.embedUrl.startsWith('PLACEHOLDER')

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-16 py-16">
      <div className="grid md:grid-cols-5 gap-12">
        {/* Player */}
        <div className="md:col-span-3">
          <h2 className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: accent }}>
            Escuchar
          </h2>
          {hasRealEmbed ? (
            <SoundCloudEmbed
              embedUrl={category.soundcloud.embedUrl}
              title={category.title}
            />
          ) : (
            <div className="rounded-2xl border border-border bg-paper flex items-center justify-center aspect-video">
              <p className="font-mono text-sm text-subtle text-center px-6">
                Playlist próximamente.<br />Visita SoundCloud para escuchar el trabajo.
              </p>
            </div>
          )}
          {category.soundcloud.playlistUrl !== 'PLACEHOLDER_SHORT_FILMS_URL' && (
            <a
              href={category.soundcloud.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-mono text-muted hover:text-prose transition-colors"
              aria-label={`Abrir ${category.title} en SoundCloud`}
            >
              Abrir en SoundCloud →
            </a>
          )}
        </div>

        {/* Info */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <div>
            <h2 className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: accent }}>
              Sobre este portfolio
            </h2>
            <p className="text-muted leading-relaxed text-sm">{category.description}</p>
          </div>

          {/* Process */}
          {category.process && (
            <ProcessSection process={category.process} accent={accent} />
          )}
        </div>
      </div>

      {/* Videos */}
      {category.videos && category.videos.length > 0 && (
        <VideoSection videos={category.videos} accent={accent} />
      )}
    </div>
  )
}

function ProcessSection({
  process,
  accent,
}: {
  process: NonNullable<PlaylistCategory['process']>
  accent: string
}) {
  return (
    <div>
      <h2 className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: accent }}>
        {process.title}
      </h2>
      <p className="text-muted text-sm leading-relaxed mb-6">{process.description}</p>
      <ol className="flex flex-col gap-4">
        {process.steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span className="font-mono text-xs mt-1 shrink-0" style={{ color: accent }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p className="font-medium text-prose text-sm">{step.title}</p>
              <p className="text-muted text-xs mt-0.5 leading-relaxed">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function VideoSection({
  videos,
  accent,
}: {
  videos: NonNullable<PlaylistCategory['videos']>
  accent: string
}) {
  return (
    <div className="mt-16">
      <h2 className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: accent }}>
        Videos del proceso
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {videos.map((video, i) => (
          <div key={i} className="rounded-2xl border border-border overflow-hidden bg-paper">
            <div className="aspect-video flex items-center justify-center">
              <p className="font-mono text-sm text-subtle">{video.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Portfolio Content (Foley / Alternative) ───────────────────────────────────

function PortfolioContent({ category }: { category: PortfolioCategory }) {
  const accent = accentMap[category.theme.accentColor] ?? 'var(--color-sage)'

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-16 py-16">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="font-mono text-xs tracking-widest uppercase" style={{ color: accent }}>
          Proyectos — {category.projects.length}
        </h2>
      </div>

      {category.projects.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-mono text-sm text-subtle">Proyectos próximamente.</p>
        </div>
      ) : (
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {category.projects.map((project, i) => (
            <motion.div key={project.id} variants={fadeUp} custom={i}>
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
