import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { ElementType } from 'react'

interface RevealTextProps {
  children: string
  as?: ElementType
  className?: string
  delay?: number
}

export default function RevealText({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
}: RevealTextProps) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const reduced = useReducedMotion()

  const lines = children.split('\n')

  return (
    <Tag ref={ref} className={className} aria-label={children}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={reduced ? {} : { y: '110%' }}
            animate={inView ? (reduced ? { opacity: 1 } : { y: '0%' }) : (reduced ? { opacity: 0 } : { y: '110%' })}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line || ' '}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
