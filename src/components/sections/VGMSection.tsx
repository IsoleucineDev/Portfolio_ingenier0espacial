import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faVideo } from '@fortawesome/free-solid-svg-icons'
import MusicArchive, { type ArchiveTrack } from '@/components/music/MusicArchive'
import VideoPlayer, { type VideoItem } from '@/components/video/VideoPlayer'
import { useLanguage } from '@/context/LanguageContext'

const MONO = { fontFamily: 'var(--font-mono)' } as const

const VGM_VIDEOS: VideoItem[] = [
  { title: 'Minecraft VGM Style',               src: '/media/Minecraft VGM Style.mp4' },
  { title: 'Persona 5 VGM Style',               src: '/media/Persona 5 VGM Style.mp4' },
  { title: 'VGM ex1 pt1',                       src: '/media/VGM ex1 pt1.mp4' },
  { title: 'VGM ex1 pt2',                       src: '/media/VGM ex1 pt2.mp4' },
  { title: 'Video Game Music Aereo Style pt1',   src: '/media/Video Game Music Aereo Style pt1.mp4' },
  { title: 'Video Game Music Aereo_Latin Style pt2', src: '/media/Video Game Music Aereo_Latin Style pt2.mp4' },
]

const VGM_TRACKS: ArchiveTrack[] = [
  {
    id: 'vgm-01',
    num: 1,
    title: 'Aéreo',
    category: 'Ambient',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/aereo-manu',
    description: 'Composición ambiental de corte cinematográfico para escenas de vuelo y exploración etérea sobre paisajes abiertos.',
    genre: 'Ambient / VGM',
  },
  {
    id: 'vgm-02',
    num: 2,
    title: 'Minecraft Theme',
    category: 'Chiptune',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/minecraft-tema',
    description: 'Homenaje al sonido icónico de Minecraft con arreglos originales que conservan la nostalgia del 8-bit.',
    genre: 'Chiptune / Tribute',
  },
  {
    id: 'vgm-03',
    num: 3,
    title: 'Persona 5 Track',
    category: 'Urban',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/persona5-track',
    description: 'Pieza inspirada en el estilo jazz-urban de la saga Persona, con bajo funky y piano staccato de estilo Atlus.',
    genre: 'Jazz / Urban RPG',
  },
  {
    id: 'vgm-04',
    num: 4,
    title: 'Night Waves',
    category: 'Chill',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/night-waves',
    description: 'Soundscape nocturno con texturas de sintetizador suaves y ritmos hipnóticos, ideal para exploración nocturna.',
    genre: 'Chill / Lo-fi',
  },
  {
    id: 'vgm-05',
    num: 5,
    title: 'Title Screen — Aly Game',
    category: 'Title',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/title-aly-game',
    description: 'Tema de pantalla de inicio para Aly Game: memorable, optimista y con identidad melódica clara desde los primeros segundos.',
    genre: 'VGM / Title Screen',
  },
  {
    id: 'vgm-06',
    num: 6,
    title: 'In-Game — Aly Game',
    category: 'In-Game',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/in-game-aly-game',
    description: 'Bucle dinámica para el gameplay principal de Aly Game, con energía sostenida y transiciones orgánicas.',
    genre: 'VGM / Loop',
  },
  {
    id: 'vgm-07',
    num: 7,
    title: 'Puzzle — Aly Game',
    category: 'Puzzle',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/puzzle-aly-game',
    description: 'Tema de puzzle con estructura rítmica que acompaña la mecánica de resolución sin distraer la concentración del jugador.',
    genre: 'VGM / Puzzle',
  },
  {
    id: 'vgm-08',
    num: 8,
    title: 'Tony — Pantalla de Título',
    category: 'Title',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/tony-pantalla-de-titulo',
    description: 'Pantalla de título del proyecto Tony: épica y emotiva, introduce el personaje con carácter desde el primer acorde.',
    genre: 'VGM / Title Screen',
  },
  {
    id: 'vgm-09',
    num: 9,
    title: 'Tony — In-Game Var. 2',
    category: 'In-Game',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/tony-in-game-variacion-2',
    description: 'Segunda variación del tema in-game de Tony, para contextos de acción y secuencias de mayor intensidad dramática.',
    genre: 'VGM / Action Loop',
  },
  {
    id: 'vgm-10',
    num: 10,
    title: 'Tony — In-Game Var. 3',
    category: 'In-Game',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/tony-in-game-variacion-3',
    description: 'Tercera variación: atmósfera de exploración y descubrimiento, con textura más abierta y espaciosa.',
    genre: 'VGM / Ambient Loop',
  },
  {
    id: 'vgm-11',
    num: 11,
    title: 'Tony — In-Game Var. 4',
    category: 'In-Game',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/tony-in-game-variacion-4',
    description: 'Cuarta variación con mayor tensión dramática, diseñada para secciones críticas o encuentros clave de la narrativa.',
    genre: 'VGM / Tense Loop',
  },
  {
    id: 'vgm-12',
    num: 12,
    title: 'Tony — Final (Exterior Paz)',
    category: 'Ending',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/tony-final-exterior-paz',
    description: 'Tema final del proyecto Tony: un paisaje sonoro de paz y cierre emocional, con resolución armónica luminosa.',
    genre: 'VGM / Ending',
  },
  {
    id: 'vgm-13',
    num: 13,
    title: '¿Cómo sonaría el Nintendo?',
    category: 'Chiptune',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/como-sonaria-el-nintendo',
    description: 'Exploración de cómo sonarían composiciones modernas procesadas por hardware de 8 bits al estilo Famicom / NES.',
    genre: 'Chiptune / Experimental',
  },
  {
    id: 'vgm-14',
    num: 14,
    title: 'Momento al Toreo Contigo 3:43',
    category: 'Original',
    soundcloudUrl: 'https://soundcloud.com/manuespacial-419137814/momentoalatoreocontigo343-leer-descripcion',
    description: 'Composición original de carácter emotivo e intimista, inspirada en la memoria de un lugar y un momento específico.',
    genre: 'Original / Cinematic',
  },
  {
    id: 'vgm-15',
    num: 15,
    title: 'Momento al Toreo Contigo 5:23',
    category: 'Original',
    soundcloudUrl: 'https://soundcloud.com/manuespacial-419137814/momentoalatoreocontigo523leer-descripcion',
    description: 'Versión extendida con mayor desarrollo armónico y textural, añadiendo capas orquestales al material original.',
    genre: 'Original / Extended',
  },
]

export default function VGMSection() {
  const { lang } = useLanguage()
  const heading    = lang === 'es' ? 'Música de Videojuegos' : 'Video Game Music'
  const subheading = lang === 'es'
    ? 'Composiciones originales, atmósferas y soundscapes interactivos diseñados para mundos virtuales.'
    : 'Original compositions, atmospheres and interactive soundscapes designed for virtual worlds.'

  const videoLabel = lang === 'es' ? 'Videos — VGM' : 'Videos — VGM'

  return (
    <>
      <MusicArchive
        sectionId="videogames"
        label="映像音楽 — VGM"
        heading={heading}
        subheading={subheading}
        tracks={VGM_TRACKS}
        accentColor="#DF822A"
        accentHex="DF822A"
        bg="rgba(223,130,42,0.055)"
        washiColor="gold"
        bgImage="/media/panoramica.jpg"
        nextSectionId="short-films"
        nextSectionLabel="Short Films"
        icon={
          <FontAwesomeIcon
            icon={faGamepad}
            style={{ width: 32, height: 32, color: '#DF822A', opacity: 0.7 }}
          />
        }
      />

      {/* ── VGM Video Player ──────────────────────────────────────────── */}
      <section
        aria-label="Videos VGM"
        className="relative px-4"
        style={{
          background: 'rgba(223,130,42,0.04)',
          borderTop: '1px solid rgba(223,130,42,0.12)',
          paddingTop: 'clamp(3.5rem, 7vw, 6rem)',
          paddingBottom: 'clamp(3.5rem, 7vw, 6rem)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.55, ease: [0.25, 1, 0.35, 1] }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12" style={{ background: '#DF822A40' }} />
              <FontAwesomeIcon icon={faVideo} style={{ color: '#DF822A', opacity: 0.7, width: 14, height: 14 }} />
              <span
                className="text-[10px] font-bold tracking-[0.24em] uppercase"
                style={{ ...MONO, color: '#DF822A' }}
              >
                {videoLabel}
              </span>
            </div>
            <p
              className="text-sm"
              style={{ ...MONO, color: 'rgba(65,68,65,0.45)', letterSpacing: '0.02em' }}
            >
              {lang === 'es'
                ? 'Ejemplos visuales de composición para videojuegos'
                : 'Visual examples of video game composition'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.35, 1], delay: 0.1 }}
          >
            <VideoPlayer videos={VGM_VIDEOS} accentColor="#DF822A" />
          </motion.div>
        </div>
      </section>
    </>
  )
}
