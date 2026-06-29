import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import MusicArchive, { type ArchiveTrack } from '@/components/music/MusicArchive'
import { useLanguage } from '@/context/LanguageContext'

const SHORT_FILMS_TRACKS: ArchiveTrack[] = [
  {
    id: 'sf-01',
    num: 1,
    title: 'La Gran Cueva V2',
    category: 'Score',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/la-gran-cueva-v2',
    description: 'Banda sonora para cortometraje de aventura subterránea: cuerdas tensas y percusión dramática acompañan el descenso.',
    genre: 'Score / Adventure',
  },
  {
    id: 'sf-02',
    num: 2,
    title: 'Me Gustas y Ojalá un Día',
    category: 'Romance',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/me-gustas-y-oajala-un-dia',
    description: 'Composición romántica y delicada para cortometraje de amor contemporáneo, con guitarra y piano en primer plano.',
    genre: 'Score / Romance',
  },
  {
    id: 'sf-03',
    num: 3,
    title: 'Corto Prop',
    category: 'Score',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/corto-prop',
    description: 'Propuesta sonora preliminar para cortometraje estudiantil: paisaje sonoro exploratorio y adaptable al corte.',
    genre: 'Score / Proposal',
  },
  {
    id: 'sf-04',
    num: 4,
    title: 'Herencia',
    category: 'Drama',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/herencia-corto',
    description: 'Música para cortometraje dramático sobre legado familiar, con motivos que evocan la memoria y el peso generacional.',
    genre: 'Score / Drama',
  },
  {
    id: 'sf-05',
    num: 5,
    title: 'Créditos — Tony',
    category: 'Credits',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/musica-creditos-corto-tony',
    description: 'Música de créditos finales para el cortometraje Tony: cierre emotivo que recapitula los temas del film.',
    genre: 'Score / Credits',
  },
  {
    id: 'sf-06',
    num: 6,
    title: 'Corto JM',
    category: 'Score',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/corto-jm',
    description: 'Composición original para cortometraje de graduación universitaria, con orquestación de cámara y textura íntima.',
    genre: 'Score / Student Film',
  },
  {
    id: 'sf-07',
    num: 7,
    title: 'Cuando Me Enamoro (Instrumental)',
    category: 'Instrumental',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/cuando-me-enamoro-instrumental',
    description: 'Versión puramente instrumental de la pieza romántica, concebida para uso en montaje cinematográfico sin letra.',
    genre: 'Score / Instrumental',
  },
  {
    id: 'sf-08',
    num: 8,
    title: 'Animación 30 seg',
    category: 'Animation',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/animacion-en30-seg-corto',
    description: 'Música para animación de treinta segundos: dinámicas puntuales sincronizadas con cada acción visual del clip.',
    genre: 'Score / Animation',
  },
  {
    id: 'sf-09',
    num: 9,
    title: 'Una Despedida en un Pueblo',
    category: 'Drama',
    soundcloudUrl: 'https://soundcloud.com/manuespacial-419137814/una-despedida-en-un-pueblo',
    description: 'Pieza emotiva para escena de despedida en entorno rural: melodía desnuda que deja espacio al silencio y la imagen.',
    genre: 'Score / Drama',
  },
  {
    id: 'sf-10',
    num: 10,
    title: 'Comercial Corporativo',
    category: 'Corporate',
    soundcloudUrl: 'https://soundcloud.com/user-483599245/comercial-corporativo',
    description: 'Música de fondo para video corporativo: tono profesional y dinámico que acompaña la narrativa de marca.',
    genre: 'Score / Corporate',
  },
]

export default function ShortFilmsSection() {
  const { lang } = useLanguage()
  const heading    = lang === 'es' ? 'Cortometrajes' : 'Short Films'
  const subheading = lang === 'es'
    ? 'Bandas sonoras originales y rescores para cine independiente y proyectos audiovisuales.'
    : 'Original scores and rescores for independent cinema and audiovisual projects.'

  return (
    <MusicArchive
      sectionId="short-films"
      label="映画音楽 — CINE"
      heading={heading}
      subheading={subheading}
      tracks={SHORT_FILMS_TRACKS}
      accentColor="#7CA36A"
      accentHex="7CA36A"
      bg="rgba(124,163,106,0.055)"
      washiColor="sage"
      icon={
        <FontAwesomeIcon
          icon={faFilm}
          style={{ width: 32, height: 32, color: '#7CA36A', opacity: 0.7 }}
        />
      }
    />
  )
}
