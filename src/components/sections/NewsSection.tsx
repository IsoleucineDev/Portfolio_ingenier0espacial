import { motion } from 'framer-motion'
import { UnderlineDoodle } from '@/components/Doodles'
import { easeOut } from '@/lib/motionVariants'

const HS = { fontFamily: "'Fredoka', 'Klee One', 'Yomogi', cursive" } as const

const NEWS_ITEMS = [
  { date: '04.15', category: 'MUSIC',    title: "Nuevo Single 'Juliette!' Disponible" },
  { date: '04.08', category: 'TV',       title: 'Presentación en Vivo — Programa Musical' },
  { date: '03.28', category: 'RADIO',    title: 'Entrevista Especial en Radio FM' },
  { date: '03.20', category: 'MAGAZINE', title: 'Artículo en Revista de Música Indie' },
  { date: '03.12', category: 'MUSIC',    title: 'Lanzamiento de Álbum Completo' },
]

const CATEGORY_COLOR: Record<string, string> = {
  MUSIC:    '#7ECED4',
  TV:       '#f6a570',
  RADIO:    '#7CA36A',
  MAGAZINE: '#A8889A',
}

export default function NewsSection() {
  return (
    <section
      id="news"
      aria-label="Noticias"
      className="relative py-24 px-4"
      style={{ background: '#FDF6F0' }}
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
          <h2
            className="text-5xl md:text-6xl font-bold text-[#54343f] mb-3 inline-block"
            style={HS}
          >
            ニュース
          </h2>
          <div className="flex justify-center">
            <UnderlineDoodle className="text-[#e77a77]" width={150} />
          </div>
        </motion.div>

        {/* News list */}
        <motion.div
          className="relative bg-white rounded-3xl p-6 md:p-8 shadow-2xl"
          style={{ border: '2px solid rgba(84,52,63,0.08)' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
        >
          {NEWS_ITEMS.map((item) => (
            <div
              key={item.date + item.category}
              className="flex items-center gap-4 md:gap-6 py-4 border-b-2 border-[#E8E4E0] last:border-b-0 cursor-pointer group"
            >
              <span
                className="text-xl md:text-2xl font-bold text-[#54343f] shrink-0 w-16"
                style={HS}
              >
                {item.date}
              </span>
              <span
                className="text-xs font-bold px-3 py-1 rounded-full shrink-0 w-24 text-center"
                style={{
                  ...HS,
                  color:  CATEGORY_COLOR[item.category] ?? '#7CA36A',
                  border: `2px solid ${CATEGORY_COLOR[item.category] ?? '#7CA36A'}`,
                }}
              >
                {item.category}
              </span>
              <span
                className="text-[#54343f] flex-1 group-hover:text-[#e77a77] transition-colors text-sm md:text-base"
                style={HS}
              >
                {item.title}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
