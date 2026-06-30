import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipForward, SkipBack, Disc } from 'lucide-react'
import { UnderlineDoodle } from '@/components/Doodles'

const HS = { fontFamily: "'Fredoka', 'Klee One', 'Yomogi', cursive" } as const

interface Track {
  id: string
  title: string
  duration: string
  audioUrl: string
}

const TRACKS: Track[] = [
  { id: 'j1', title: 'Juliette!',             duration: '3:45', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'j2', title: 'Canción 2 (Demo)',       duration: '2:58', audioUrl: '' },
  { id: 'j3', title: 'Ensayo Acústico',        duration: '4:12', audioUrl: '' },
  { id: 'j4', title: 'Juliette! — Instrumental', duration: '3:45', audioUrl: '' },
]

function formatTime(s: number) {
  if (!isFinite(s) || isNaN(s) || s <= 0) return '00:00'
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`
}

export default function DiscographySection() {
  const [currentIdx, setCurrentIdx]   = useState(0)
  const [isPlaying, setIsPlaying]     = useState(false)
  const [progress, setProgress]       = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration]       = useState(0)

  const audioRef = useRef<HTMLAudioElement>(null)
  const currentTrack = TRACKS[currentIdx]

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    el.load(); setProgress(0); setCurrentTime(0); setDuration(0)
    if (isPlaying) el.play().catch(() => setIsPlaying(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    isPlaying ? el.play().catch(() => setIsPlaying(false)) : el.pause()
  }, [isPlaying])

  const handleTimeUpdate = useCallback(() => {
    const el = audioRef.current
    if (!el) return
    const dur = el.duration || 0
    setCurrentTime(el.currentTime)
    setProgress(dur > 0 ? (el.currentTime / dur) * 100 : 0)
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) setDuration(audioRef.current.duration || 0)
  }, [])

  const handleEnded = useCallback(() => {
    setCurrentIdx(i => (i + 1) % TRACKS.length)
    setIsPlaying(true)
  }, [])

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setProgress(val)
    if (audioRef.current && duration > 0)
      audioRef.current.currentTime = (val / 100) * duration
  }, [duration])

  const nextTrack = useCallback(() => {
    setCurrentIdx(i => (i + 1) % TRACKS.length)
    setIsPlaying(true)
  }, [])

  const prevTrack = useCallback(() => {
    setCurrentIdx(i => (i - 1 + TRACKS.length) % TRACKS.length)
    setIsPlaying(true)
  }, [])

  return (
    <section
      id="juliette"
      aria-label="Proyecto Juliette!"
      className="relative py-24 md:py-32 px-4"
      style={{ background: '#E8E4E0', overflowX: 'clip' }}
    >
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl || undefined}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.35, 1], delay: 0.04 }}
        >
          {/* Japanese label row */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16" style={{ background: '#48613C50' }} />
            <span
              className="text-[10px] font-bold tracking-[0.26em] uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: '#48613C' }}
            >
              ジュリエット — JULIETTE!
            </span>
            <div className="h-px w-16" style={{ background: '#48613C50' }} />
          </div>

          <h2 className="leading-[0.88] mb-4 inline-block">
            <span
              className="block text-[#414441]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              }}
            >
              Proyecto:
            </span>
            <span
              className="block text-[#414441]"
              style={{
                fontFamily: "'Nerko One', 'Fredoka', cursive",
                fontWeight: 400,
                fontSize: 'clamp(3rem, 7vw, 6rem)',
              }}
            >
              Juliette!
            </span>
          </h2>
          <div className="flex justify-center">
            <UnderlineDoodle className="text-[#48613C]" width={220} />
          </div>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* LEFT: Album art card (5/12) */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.35, 1], delay: 0.1 }}
          >
            {/* Rotated shadow card */}
            <div
              className="absolute inset-0 rounded-3xl shadow-xl"
              style={{ background: '#7CA36A', transform: 'rotate(2deg) translate(8px, 8px)' }}
            />

            {/* Main card */}
            <div
              className="relative bg-white rounded-3xl p-5 shadow-2xl"
              style={{ border: '4px solid #48613C', transform: 'rotate(-1deg)' }}
            >
              {/* Album art */}
              <div
                className="relative rounded-2xl overflow-hidden mb-5 flex items-center justify-center"
                style={{ aspectRatio: '1', border: '3px solid #48613C', background: '#0a0a0a' }}
              >
                {/* Live concert background — Manu_1 */}
                <img
                  src="/media/manu_1.jpg"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ opacity: 0.55, filter: 'saturate(0.6)' }}
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }}
                  aria-hidden="true"
                />
                <img
                  src="/media/juliette_cover.jpg"
                  alt="Juliette! cover art"
                  className="relative w-full h-full object-cover"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                />

                {/* Spinning disc when playing */}
                {isPlaying && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute bottom-4 right-4 p-2 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.85)', border: '2px solid #48613C' }}
                  >
                    <Disc className="w-6 h-6 text-[#DF822A]" />
                  </motion.div>
                )}

                {/* Live badge */}
                <span
                  className="absolute top-3 left-3 text-white text-xs px-3 py-1 rounded-full uppercase font-bold tracking-widest shadow"
                  style={{ ...HS, background: '#DF822A' }}
                >
                  Live Feed
                </span>
              </div>

              {/* Now playing info */}
              <div className="text-center mb-5">
                <h3 className="text-2xl md:text-3xl font-bold text-[#54343f] mb-1" style={HS}>
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-[#54343f]/60 font-semibold uppercase tracking-wider" style={HS}>
                  Lanzamiento Oficial
                </p>
              </div>

              {/* Progress bar */}
              <div className="mb-5 px-1">
                <input
                  type="range"
                  min={0} max={100} step={0.1}
                  value={progress}
                  onChange={handleSeek}
                  disabled={!currentTrack.audioUrl}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                  style={{
                    WebkitAppearance: 'none',
                    background: `linear-gradient(to right, #DF822A ${progress}%, #E8E4E0 ${progress}%)`,
                    border: '2px solid #48613C',
                    opacity: currentTrack.audioUrl ? 1 : 0.4,
                  }}
                />
                <div
                  className="flex justify-between text-xs font-bold text-[#54343f]/70 mt-1.5"
                  style={{ fontFamily: "'Space Mono', monospace" }}
                >
                  <span>{formatTime(currentTime)}</span>
                  <span>{currentTrack.audioUrl ? formatTime(duration) : currentTrack.duration}</span>
                </div>
              </div>

              {/* Transport controls */}
              <div className="flex items-center justify-center gap-5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevTrack}
                  aria-label="Pista anterior"
                  className="p-3 rounded-full shadow-md"
                  style={{ background: '#AFE695', border: '2px solid #48613C', color: '#54343f' }}
                >
                  <SkipBack className="w-5 h-5 fill-current" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => currentTrack.audioUrl && setIsPlaying(p => !p)}
                  aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                  className="p-4 md:p-5 rounded-full shadow-xl text-white"
                  style={{
                    background: '#DF822A',
                    border: '3px solid #48613C',
                    opacity: currentTrack.audioUrl ? 1 : 0.5,
                    cursor: currentTrack.audioUrl ? 'pointer' : 'not-allowed',
                  }}
                >
                  {isPlaying
                    ? <Pause className="w-6 h-6 md:w-7 md:h-7 fill-current" />
                    : <Play  className="w-6 h-6 md:w-7 md:h-7 fill-current translate-x-0.5" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextTrack}
                  aria-label="Siguiente pista"
                  className="p-3 rounded-full shadow-md"
                  style={{ background: '#AFE695', border: '2px solid #48613C', color: '#54343f' }}
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </motion.button>
              </div>

            </div>
          </motion.div>

          {/* RIGHT: Spotify embed + band info (7/12) */}
          <motion.div
            className="lg:col-span-7 space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.35, 1], delay: 0.2 }}
          >
            <div
              className="rounded-3xl overflow-hidden shadow-xl"
              style={{ border: '3px solid #48613C' }}
            >
              <iframe
                style={{ borderRadius: '0', display: 'block' }}
                src="https://open.spotify.com/embed/artist/4F2qB8AattAcKT4noCIqcd?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Juliette! en Spotify"
              />
            </div>

            {/* Band blurb */}
            <div
              className="p-5 rounded-3xl"
              style={{ background: 'rgba(175,230,149,0.2)', border: '1.5px dashed #48613C' }}
            >
              <p className="text-sm text-[#54343f]/80 leading-relaxed" style={HS}>
                Banda mexicana que combina el rock japonés con influencias latinas — bossa nova y rock alternativo. Armonías dinámicas y líricas sobre enfrentar los sentimientos como una realidad.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Rock Alternativo', 'Rock Japonés', 'Bossa Nova', 'Banda'].map(tag => (
                  <span
                    key={tag}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ ...HS, background: 'rgba(255,255,255,0.7)', color: '#48613C', border: '1px dashed #48613C' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
