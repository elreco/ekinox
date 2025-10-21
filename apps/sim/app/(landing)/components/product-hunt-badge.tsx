'use client'

import { motion } from 'framer-motion'

interface ProductHuntBadgeProps {
  theme?: 'light' | 'dark'
  size?: 'small' | 'medium' | 'large'
  className?: string
  animate?: boolean
}

export function ProductHuntBadge({
  theme = 'light',
  size = 'medium',
  className = '',
  animate = true,
}: ProductHuntBadgeProps) {
  const dimensions = {
    small: { width: 200, height: 43 },
    medium: { width: 250, height: 54 },
    large: { width: 300, height: 65 },
  }

  const { width, height } = dimensions[size]

  const badge = (
    <a
      href="https://www.producthunt.com/products/ekinox?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-ekinox"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block transition-opacity hover:opacity-80 ${className}`}
      aria-label="Ekinox on Product Hunt"
    >
      <img
        src={`https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1028862&theme=${theme}&t=1761031595802`}
        alt="Ekinox - Visual AI workflow builder with 80+ integrations | Product Hunt"
        style={{ width: `${width}px`, height: `${height}px` }}
        width={width}
        height={height}
      />
    </a>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="inline-block"
      >
        {badge}
      </motion.div>
    )
  }

  return badge
}

