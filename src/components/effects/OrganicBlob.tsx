import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface OrganicBlobProps {
  color: string
  size?: number
  opacity?: number
  animated?: boolean
  className?: string
  delay?: number
}

export default function OrganicBlob({
  color,
  size = 400,
  opacity = 0.35,
  animated = true,
  className = '',
  delay = 0,
}: OrganicBlobProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] ${className}`}
      style={{ width: size, height: size, background: color, opacity }}
      animate={animated && !reduced ? {
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%',
          '30% 60% 70% 40% / 50% 60% 30% 60%',
          '50% 30% 50% 50% / 30% 50% 50% 60%',
          '60% 40% 30% 70% / 60% 30% 70% 40%',
        ],
      } : undefined}
      transition={animated && !reduced ? {
        duration: 10,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      } : undefined}
    />
  )
}
