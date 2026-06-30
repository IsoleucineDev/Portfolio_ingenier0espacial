import { motion } from 'framer-motion'
import { Disc } from 'lucide-react'
import { UnderlineDoodle } from '@/components/Doodles'

const HS   = { fontFamily: "'Fredoka', 'Klee One', 'Yomogi', cursive" } as const
const MONO = { fontFamily: 'var(--font-mono)' } as const

export default function DiscographySection() {
  return (
    <section
      id="juliette"
      aria-label="Proyecto Juliette!"
      className="relative py-24 md:py-32 px-4"
      style={{ background: '#E8E4E0', overflowX: 'clip' }}
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.35, 1], delay: 0.04 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16" style={{ background: '#48613C50' }} />
            <span
              className="text-[10px] font-bold tracking-[0.26em] uppercase"
              style={{ ...MONO, color: '#48613C' }}
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
              Project:
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

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* LEFT: Artist card (5/12) */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.35, 1], delay: 0.1 }}
          >
            {/* Rotated shadow */}
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

                {/* Spinning disc decoration */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="absolute bottom-4 right-4 p-2 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.85)', border: '2px solid #48613C' }}
                >
                  <Disc className="w-6 h-6 text-[#DF822A]" />
                </motion.div>

                {/* Live badge */}
                <span
                  className="absolute top-3 left-3 text-white text-xs px-3 py-1 rounded-full uppercase font-bold tracking-widest shadow"
                  style={{ ...HS, background: '#DF822A' }}
                >
                  Live Feed
                </span>
              </div>

              {/* Artist info */}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-[#54343f] mb-1" style={HS}>
                  Juliette!
                </h3>
                <p className="text-xs text-[#54343f]/60 font-semibold uppercase tracking-wider" style={HS}>
                  Official Release
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Spotify embed + project info (7/12) */}
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
                title="Juliette! on Spotify"
              />
            </div>

            {/* Project blurb */}
            <div
              className="p-5 rounded-3xl"
              style={{ background: 'rgba(175,230,149,0.2)', border: '1.5px dashed #48613C' }}
            >
              <p className="text-sm text-[#54343f]/80 leading-relaxed" style={HS}>
                My project that combines Japanese rock with Latin influences — bossa nova and alternative rock. Dynamic harmonies and lyrics about facing feelings as a reality.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Alternative Rock', 'Japanese Rock', 'Bossa Nova', 'My Project'].map(tag => (
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
