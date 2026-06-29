import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { pageEnter } from '@/lib/motionVariants'

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageEnter}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
