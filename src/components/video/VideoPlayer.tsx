import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faYoutube } from '@fortawesome/free-brands-svg-icons'

export type VideoItem = {
  title: string
  src: string   // local path OR youtube URL (youtu.be/... or youtube.com/...)
}

type Props = {
  videos: VideoItem[]
  accentColor?: string
}

const MONO = { fontFamily: 'var(--font-mono)' } as const

function getYouTubeId(src: string): string | null {
  const match = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function VideoPlayer({ videos, accentColor = '#7CA36A' }: Props) {
  const [selected, setSelected] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const current  = videos[selected]
  const ytId     = getYouTubeId(current.src)

  useEffect(() => {
    if (!ytId && videoRef.current) videoRef.current.load()
  }, [selected, ytId])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">

      {/* ── Player (2/3) ───────────────────────────────────────────── */}
      <div
        className="lg:col-span-2 rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#111', border: `2px solid ${accentColor}30` }}
      >
        {ytId ? (
          <iframe
            key={ytId}
            src={`https://www.youtube.com/embed/${ytId}`}
            title={current.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video block"
            style={{ border: 'none' }}
          />
        ) : (
          <video
            ref={videoRef}
            src={current.src}
            controls
            preload="metadata"
            className="w-full block aspect-video"
            style={{ background: '#111' }}
          />
        )}

        <div
          className="px-4 py-2.5 flex items-center gap-2"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
        >
          <FontAwesomeIcon
            icon={ytId ? faYoutube : faPlay}
            style={{ width: 11, height: 11, color: ytId ? '#FF0000' : accentColor }}
          />
          <span
            className="text-xs font-bold truncate"
            style={{ ...MONO, color: '#fff', opacity: 0.85, letterSpacing: '0.04em' }}
          >
            {current.title}
          </span>
        </div>
      </div>

      {/* ── Track list (1/3) ──────────────────────────────────────── */}
      <div
        className="flex flex-col gap-1 overflow-y-auto rounded-xl py-2"
        style={{ maxHeight: 'min(420px, 60vh)', scrollbarWidth: 'thin' }}
      >
        {videos.map((v, i) => {
          const isActive = i === selected
          const isYT     = !!getYouTubeId(v.src)
          return (
            <motion.button
              key={v.src}
              onClick={() => setSelected(i)}
              whileHover={{ x: 3 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              className="flex items-center gap-3 text-left px-3 py-2.5 rounded-lg transition-colors duration-150 w-full"
              style={{
                background: isActive ? `${accentColor}18` : 'transparent',
                border: `1.5px solid ${isActive ? accentColor + '55' : 'transparent'}`,
                cursor: 'pointer',
              }}
            >
              <span
                className="shrink-0 w-5 text-right text-[10px] font-bold"
                style={{ ...MONO, color: isActive ? accentColor : 'rgba(65,68,65,0.35)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {isActive && (
                <motion.span
                  layoutId="video-playing-dot"
                  className="shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: accentColor }}
                />
              )}

              <span
                className="text-[11px] font-semibold leading-snug flex-1"
                style={{
                  ...MONO,
                  color: isActive ? '#414441' : 'rgba(65,68,65,0.60)',
                  letterSpacing: '0.01em',
                }}
              >
                {v.title}
              </span>

              {isYT && (
                <FontAwesomeIcon
                  icon={faYoutube}
                  style={{ width: 10, height: 10, color: '#FF0000', opacity: 0.6, flexShrink: 0 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
