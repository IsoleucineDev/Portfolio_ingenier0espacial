import { motion } from 'framer-motion'
import { ExternalLink, Play } from 'lucide-react'
import type { Project } from '@/types/content'
import { TagList } from '@/components/ui/Tag'
import { fadeUp } from '@/lib/motionVariants'

interface ProjectCardProps {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Cover placeholder / image */}
      <div className="aspect-video w-full bg-paper flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-paper to-canvas" />
        {project.cover.publicId && !project.cover.publicId.startsWith('PLACEHOLDER') ? (
          <img
            src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? 'demo'}/image/upload/f_auto,q_auto,w_600/${project.cover.publicId}`}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            loading="lazy"
            className="relative z-10 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-2 opacity-30">
            <Play size={32} strokeWidth={1} className="text-muted" />
            <span className="font-mono text-xs text-muted">{project.title}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-subtle mb-1">
              {project.category ?? ''} {project.year}
            </p>
            <h3 className="font-display font-bold text-lg leading-tight text-prose">
              {project.title}
            </h3>
          </div>
          {project.video && (
            <a
              href={project.video.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ver ${project.title} en ${project.video.platform}`}
              className="shrink-0 p-1.5 rounded-full border border-border text-muted hover:text-prose hover:border-border-strong transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {project.tags.length > 0 && (
          <TagList tags={project.tags} maxVisible={4} />
        )}

        {project.tools && project.tools.length > 0 && (
          <p className="text-xs font-mono text-subtle">
            {project.tools.join(' · ')}
          </p>
        )}
      </div>
    </motion.article>
  )
}
