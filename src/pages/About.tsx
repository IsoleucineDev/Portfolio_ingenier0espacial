import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import PageTransition from '@/components/layout/PageTransition'
import { UnderlineDoodle, StarDoodle, SparkDoodle } from '@/components/Doodles'
import WashiTape from '@/components/effects/WashiTape'
import { useContent } from '@/context/ContentContext'
import { easeOut } from '@/lib/motionVariants'

// Typography constants
const PLAYFAIR = { fontFamily: "'Playfair Display', Georgia, serif" } as const
const NERKO    = { fontFamily: "'Nerko One', 'Fredoka', cursive" } as const
const CAVEAT   = { fontFamily: "'Caveat', cursive" } as const
const MONO     = { fontFamily: 'var(--font-mono)' } as const
const HS       = { fontFamily: "'Fredoka', 'Klee One', 'Yomogi', cursive" } as const

const ORANGE_VIVID  = '#E8620A'
const ORANGE_BRIGHT = '#FF7B2F'
const ORANGE_LIGHT  = '#FFF0E6'
const GREEN_DARK    = '#48613C'
const GREEN_MID     = '#7CA36A'

function Planet({ size = 60, color = '#AFE695', ringColor = '#7CA36A' }: { size?: number; color?: string; ringColor?: string }) {
  const cx = size, cy = size * 0.74, r = size * 0.38
  const rx = size * 0.92, ry = size * 0.17
  return (
    <svg width={size * 2} height={size * 1.48} viewBox={`0 0 ${size * 2} ${size * 1.48}`} aria-hidden>
      {/* ring — back half */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={ringColor} strokeWidth={size * 0.055} opacity={0.45}
        strokeDasharray={`${Math.PI * rx} ${Math.PI * rx}`} strokeDashoffset={`${Math.PI * rx * 0.5}`} />
      {/* planet body */}
      <circle cx={cx} cy={cy} r={r} fill={color} opacity={0.82} />
      {/* subtle highlight */}
      <circle cx={cx - r * 0.28} cy={cy - r * 0.28} r={r * 0.32} fill="rgba(255,255,255,0.18)" />
      {/* ring — front half */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={ringColor} strokeWidth={size * 0.055} opacity={0.82}
        strokeDasharray={`${Math.PI * rx} ${Math.PI * rx}`} strokeDashoffset={`${-Math.PI * rx * 0.5}`} />
    </svg>
  )
}

function BearSilhouette() {
  return (
    <svg
      viewBox="0 0 200 210"
      fill="currentColor"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      {/* Ears */}
      <circle cx="44"  cy="58" r="34" />
      <circle cx="156" cy="58" r="34" />
      {/* Head */}
      <circle cx="100" cy="118" r="82" />
      {/* Snout */}
      <ellipse cx="100" cy="162" rx="34" ry="26" />
    </svg>
  )
}

const listVariants = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
} as const

const itemUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
} as const

export default function About() {
  const about = useContent('about')
  const meta  = useContent('meta')

  return (
    <PageTransition>
      <Helmet>
        <title>{`Acerca de | ${meta.siteName}`}</title>
        <meta name="description" content={about.bio.intro} />
      </Helmet>

      <div
        className="relative min-h-screen overflow-hidden"
        style={{ background: 'var(--color-canvas)' }}
      >

        {/* ── Hero band — full-width orange stripe behind the name ─────────── */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: 'clamp(340px, 52vw, 560px)',
            background: `linear-gradient(140deg, ${ORANGE_VIVID} 0%, ${ORANGE_BRIGHT} 55%, #FFA559 100%)`,
            clipPath: 'polygon(0 0, 100% 0, 100% 82%, 0 100%)',
            zIndex: 0,
          }}
          aria-hidden
        />

        {/* Noise grain overlay on orange */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: 'clamp(340px, 52vw, 560px)',
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.07\'/%3E%3C/svg%3E")',
            backgroundSize: '256px 256px',
            clipPath: 'polygon(0 0, 100% 0, 100% 82%, 0 100%)',
            zIndex: 1,
            opacity: 0.5,
          }}
          aria-hidden
        />

        {/* Floating ambient decorations */}
        <motion.div
          className="absolute top-8 right-10 pointer-events-none z-20"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          animate={{ y: [-8, 8, -8], rotate: [0, 18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <StarDoodle size={52} />
        </motion.div>
        <motion.div
          className="absolute top-32 left-8 pointer-events-none z-20"
          style={{ color: 'rgba(255,255,255,0.22)' }}
          animate={{ y: [5, -5, 5], rotate: [0, -14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          aria-hidden
        >
          <SparkDoodle size={34} />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-6 pointer-events-none z-20 hidden lg:block"
          style={{ color: GREEN_MID, opacity: 0.18 }}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          aria-hidden
        >
          <StarDoodle size={24} />
        </motion.div>

        {/* ── Green planets ─────────────────────────────────────────────────── */}
        {/* Large planet — top right */}
        <motion.div
          className="absolute pointer-events-none z-20"
          style={{ top: '6%', right: '18%' }}
          animate={{ y: [-10, 10, -10], rotate: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <Planet size={52} color="#AFE695" ringColor="#7CA36A" />
        </motion.div>
        {/* Small planet — mid left */}
        <motion.div
          className="absolute pointer-events-none z-20 hidden md:block"
          style={{ top: '28%', left: '6%' }}
          animate={{ y: [8, -8, 8], rotate: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          aria-hidden
        >
          <Planet size={30} color="#7CA36A" ringColor="#48613C" />
        </motion.div>
        {/* Tiny planet — lower right of band */}
        <motion.div
          className="absolute pointer-events-none z-20"
          style={{ top: '44%', right: '6%' }}
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          aria-hidden
        >
          <Planet size={22} color="#AFE695" ringColor="#7CA36A" />
        </motion.div>

        {/* ── Comet ──────────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20" aria-hidden>
          <motion.div
            style={{
              position: 'absolute',
              top: '18%',
              left: 0,
              width: 130,
              height: 2,
              borderRadius: 2,
              background: 'linear-gradient(to right, transparent 0%, rgba(175,230,149,0.85) 60%, rgba(255,255,255,0.95) 100%)',
              rotate: -28,
              transformOrigin: 'right center',
            }}
            initial={{ x: -160, opacity: 0 }}
            animate={{ x: ['calc(-10vw)', 'calc(110vw)'], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
              repeat: Infinity,
              repeatDelay: 9,
              times: [0, 0.15, 0.75, 1],
            }}
          />
        </div>

        {/* ── HERO ZONE: name + photo ──────────────────────────────────────── */}
        <div
          className="relative z-10 max-w-6xl mx-auto px-5 md:px-10"
          style={{ paddingTop: 'clamp(5rem, 10vw, 7.5rem)' }}
        >
          <div className="grid md:grid-cols-[1fr_auto] gap-6 items-end">

            {/* LEFT: classification + name */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: easeOut }}
            >
              {/* Classification label */}
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-sm"
                  style={{
                    ...MONO,
                    color: 'rgba(255,255,255,0.85)',
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  自己紹介 — ABOUT ME
                </span>
              </div>

              {/* Victor Manuel — Playfair Display italic */}
              <h1 style={{ lineHeight: 0.9, marginBottom: '0.15em' }}>
                <span
                  className="block text-white"
                  style={{
                    ...PLAYFAIR,
                    fontStyle: 'italic',
                    fontWeight: 900,
                    fontSize: 'clamp(3.2rem, 9vw, 7.5rem)',
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 24px rgba(0,0,0,0.18)',
                  }}
                >
                  Víctor Manuel
                </span>
                {/* Canchola Cervantes — Nerko One */}
                <span
                  className="block"
                  style={{
                    ...NERKO,
                    fontWeight: 400,
                    fontSize: 'clamp(1.4rem, 3.8vw, 3rem)',
                    color: 'rgba(255,255,255,0.72)',
                    letterSpacing: '0.04em',
                    marginTop: '0.1em',
                  }}
                >
                  Canchola Cervantes
                </span>
              </h1>

              {/* Handwritten role — Caveat */}
              <motion.p
                className="mt-4"
                style={{
                  ...CAVEAT,
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.7rem)',
                  color: 'rgba(255,255,255,0.88)',
                  fontWeight: 600,
                }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: easeOut }}
              >
                Composer · Producer · Sound Designer
              </motion.p>
            </motion.div>

            {/* RIGHT: Circular photo + bear */}
            <motion.div
              className="relative self-end hidden md:block"
              initial={{ opacity: 0, x: 40, rotate: 3 }}
              animate={{ opacity: 1, x: 0, rotate: -1.5 }}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div
                className="relative"
                style={{ width: 'clamp(200px, 24vw, 300px)', aspectRatio: '1/1' }}
              >
                {/* Bear silhouette — diagonal fade behind */}
                <div
                  className="absolute pointer-events-none select-none"
                  style={{
                    inset: '-32%',
                    color: 'rgba(255,255,255,0.13)',
                    transform: 'rotate(-22deg)',
                    zIndex: 0,
                  }}
                  aria-hidden
                >
                  <BearSilhouette />
                </div>

                {/* Drop shadow ghost */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'rgba(0,0,0,0.22)',
                    transform: 'translate(8px, 10px)',
                    zIndex: 1,
                  }}
                  aria-hidden
                />

                {/* Circular photo */}
                <div
                  className="relative rounded-full overflow-hidden"
                  style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    border: '3.5px solid rgba(255,255,255,0.65)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.30)',
                    zIndex: 2,
                  }}
                >
                  <img
                    src="/media/manu_1.jpg"
                    alt={about.image.alt}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                  />
                </div>

                {/* Washi tape on top */}
                <div className="absolute -top-1 right-4 z-10">
                  <WashiTape color="gold" rotate={-3} width={68} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── BODY CONTENT ─────────────────────────────────────────────────── */}
        <div
          className="relative z-10 max-w-6xl mx-auto px-5 md:px-10"
          style={{ paddingTop: 'clamp(3rem, 6vw, 5rem)', paddingBottom: 'clamp(5rem, 10vw, 8rem)' }}
        >

          {/* Mobile photo (shown only on mobile) */}
          <motion.div
            className="relative mb-10 md:hidden flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative" style={{ width: '200px', aspectRatio: '1/1' }}>
              {/* Bear behind */}
              <div
                className="absolute pointer-events-none select-none"
                style={{ inset: '-30%', color: `${ORANGE_VIVID}22`, transform: 'rotate(-20deg)' }}
                aria-hidden
              >
                <BearSilhouette />
              </div>
              <div
                className="rounded-full overflow-hidden relative"
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  border: `3px solid ${ORANGE_VIVID}50`,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                }}
              >
                <img
                  src="/media/manu_1.jpg"
                  alt={about.image.alt}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-[1fr_340px] gap-12 md:gap-16 items-start">

            {/* LEFT: content */}
            <motion.div
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-col gap-8"
            >

              {/* Quote — big and orange */}
              <motion.div variants={itemUp}>
                <blockquote
                  className="relative pl-6"
                  style={{ borderLeft: `4px solid ${ORANGE_VIVID}` }}
                >
                  <span
                    className="absolute -top-4 -left-1 select-none pointer-events-none"
                    style={{
                      ...PLAYFAIR,
                      fontSize: '5rem',
                      lineHeight: 1,
                      color: ORANGE_VIVID,
                      opacity: 0.22,
                      fontStyle: 'italic',
                    }}
                    aria-hidden
                  >"</span>
                  <p
                    style={{
                      ...PLAYFAIR,
                      fontStyle: 'italic',
                      fontWeight: 700,
                      fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
                      color: '#2C2C2C',
                      lineHeight: 1.4,
                    }}
                  >
                    {about.bio.quote}
                  </p>
                </blockquote>
              </motion.div>

              {/* Bio paragraphs */}
              <motion.div variants={itemUp} className="flex flex-col gap-4">
                {[about.bio.intro, ...about.bio.paragraphs].map((para: string, i: number) => (
                  <p
                    key={i}
                    className="leading-relaxed"
                    style={{ ...HS, color: 'rgba(44,44,44,0.72)', fontSize: '0.9375rem' }}
                  >
                    {para}
                  </p>
                ))}
              </motion.div>

              {/* Live photo strip — Manu 2 */}
              <motion.div
                variants={itemUp}
                className="relative rounded-2xl overflow-hidden"
                style={{ height: '170px' }}
              >
                <img
                  src="/media/manu_2.jpg"
                  alt="Víctor Manuel en concierto"
                  className="w-full h-full object-cover object-[center_30%]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${ORANGE_VIVID}CC 0%, transparent 60%)`,
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 flex items-end p-4">
                  <div>
                    <span
                      className="block text-white font-bold mb-1"
                      style={{ ...CAVEAT, fontSize: '1.35rem' }}
                    >
                      En vivo · Juliette!
                    </span>
                    <span
                      className="text-white/65 text-[10px] font-bold uppercase tracking-widest"
                      style={MONO}
                    >
                      Live Performance
                    </span>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* RIGHT: Skills sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.65, delay: 0.1, ease: easeOut }}
              className="flex flex-col gap-5"
            >
              {/* Skills header */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1" style={{ background: `${ORANGE_VIVID}30` }} />
                <span
                  className="text-[10px] font-bold tracking-[0.24em] uppercase shrink-0"
                  style={{ ...MONO, color: ORANGE_VIVID }}
                >
                  技術 — Skills
                </span>
                <div className="h-px flex-1" style={{ background: `${ORANGE_VIVID}30` }} />
              </div>

              {/* UnderlineDoodle */}
              <div style={{ color: ORANGE_VIVID, marginTop: '-8px' }}>
                <UnderlineDoodle width={180} />
              </div>

              {about.skills.map((skillGroup: { category: string; items: string[] }, gi: number) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.07, duration: 0.4, ease: easeOut }}
                  className="rounded-2xl p-4"
                  style={{
                    background: gi % 2 === 0
                      ? 'rgba(255,255,255,0.82)'
                      : ORANGE_LIGHT,
                    border: `1px solid ${gi % 2 === 0 ? 'rgba(84,52,63,0.08)' : ORANGE_VIVID + '22'}`,
                    boxShadow: '0 2px 14px rgba(84,52,63,0.05)',
                  }}
                >
                  <h3
                    className="font-bold mb-3 pb-2"
                    style={{
                      ...NERKO,
                      fontSize: '1rem',
                      color: gi % 2 === 0 ? '#414441' : ORANGE_VIVID,
                      borderBottom: `1.5px solid ${gi % 2 === 0 ? 'rgba(84,52,63,0.08)' : ORANGE_VIVID + '28'}`,
                    }}
                  >
                    {skillGroup.category}
                  </h3>
                  <ul className="flex flex-col gap-1.5">
                    {skillGroup.items.map((item: string) => (
                      <li
                        key={item}
                        className="text-sm flex items-center gap-2.5"
                        style={{ ...HS, color: 'rgba(65,68,65,0.70)' }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: gi % 2 === 0 ? GREEN_MID : ORANGE_BRIGHT }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {/* Querétaro stamp */}
              <div
                className="flex items-center gap-2 rounded-xl px-4 py-3 mt-1"
                style={{
                  background: GREEN_DARK,
                  border: `1.5px solid ${GREEN_MID}50`,
                }}
              >
                <span style={{ ...CAVEAT, fontSize: '1.05rem', color: '#AFE695', fontWeight: 600 }}>
                  Querétaro · México 🌵
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
