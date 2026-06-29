import type { Variants } from 'framer-motion'

export const easeOut = [0.22, 1, 0.36, 1] as const
export const easeSpring = [0.34, 1.56, 0.64, 1] as const
export const easePage = [0.76, 0, 0.24, 1] as const

export const fadeUp: Variants = {
  hidden:  { y: 32, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.6, ease: easeOut } },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
}

export const scaleIn: Variants = {
  hidden:  { scale: 0.88, opacity: 0 },
  visible: { scale: 1,    opacity: 1, transition: { duration: 0.5, ease: easeSpring } },
}

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
}

export const slideRight: Variants = {
  hidden:  { x: -40, opacity: 0 },
  visible: { x: 0,   opacity: 1, transition: { duration: 0.6, ease: easeOut } },
}

export const slideLeft: Variants = {
  hidden:  { x: 40,  opacity: 0 },
  visible: { x: 0,   opacity: 1, transition: { duration: 0.6, ease: easeOut } },
}

export const pageEnter: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: easeOut } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3,  ease: 'easeIn' } },
}

export const clipReveal: Variants = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  animate: { clipPath: 'inset(0 0% 0 0)',   transition: { duration: 0.8, ease: easePage } },
}
