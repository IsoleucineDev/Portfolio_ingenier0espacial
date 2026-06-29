import { motion } from 'framer-motion'
import { UnderlineDoodle } from '@/components/Doodles'
import { easeOut } from '@/lib/motionVariants'

const HS = { fontFamily: "'Fredoka', 'Klee One', 'Yomogi', cursive" } as const

export interface SCTrack {
  num: string
  badge: string
  title: string
  url: string
}

interface Props {
  id: string
  heading: string
  icon: React.ReactNode
  tracks: SCTrack[]
  bg: string
  badgeColor: string
  numColor: string
  underlineColor: string
  borderColor: string
}

export default function SoundCloudListSection({
  id, heading, icon, tracks,
  bg, badgeColor, numColor, underlineColor, borderColor,
}: Props) {
  return (
    <section
      id={id}
      className="relative py-24 px-4"
      style={{ background: bg }}
    >
      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            {icon}
            <h2
              className="text-5xl md:text-6xl font-bold text-[#54343f] inline-block"
              style={HS}
            >
              {heading}
            </h2>
          </div>
          <div className="flex justify-center">
            <UnderlineDoodle className={underlineColor} width={200} />
          </div>
        </motion.div>

        {/* Track list card */}
        <motion.div
          className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl"
          style={{ border: `2px solid ${borderColor}` }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
        >
          {tracks.map((track) => (
            <a
              key={track.num}
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 md:gap-6 py-4 border-b-2 border-[#E8E4E0] last:border-b-0 group cursor-pointer"
            >
              {/* Number */}
              <span
                className="text-xl md:text-2xl font-bold shrink-0 w-10 text-center"
                style={{ ...HS, color: numColor }}
              >
                {track.num}
              </span>

              {/* Badge */}
              <span
                className="text-[11px] font-bold px-3 py-1 rounded-full shrink-0 w-28 text-center uppercase tracking-wide"
                style={{ ...HS, color: badgeColor, border: `2px solid ${badgeColor}` }}
              >
                {track.badge}
              </span>

              {/* Title */}
              <span
                className="text-[#54343f] flex-1 text-sm md:text-base font-medium transition-colors"
                style={{ ...HS, color: '#54343f' }}
                onMouseEnter={e => (e.currentTarget.style.color = numColor)}
                onMouseLeave={e => (e.currentTarget.style.color = '#54343f')}
              >
                {track.title}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
