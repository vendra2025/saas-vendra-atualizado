'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface StatItemProps {
  value: number
  suffix: string
  label: string
  delay?: number
}

function StatItem({ value, suffix, label, delay = 0 }: StatItemProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const timer = setTimeout(() => {
      let start = 0
      const end = value
      const duration = 2000
      const increment = end / (duration / 16)

      const counter = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(counter)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(counter)
    }, delay)

    return () => clearTimeout(timer)
  }, [isInView, value, delay])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-gradient glow-text">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-[var(--foreground)]/70 mt-2">{label}</div>
    </div>
  )
}

export function StatsCounter() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
      <StatItem value={2300} suffix="+" label="Clientes Ativos" delay={0} />
      <StatItem value={115} suffix="+" label="Empresas" delay={200} />
      <StatItem value={98} suffix="%" label="Satisfação" delay={400} />
      <StatItem value={24} suffix="/7" label="Suporte" delay={600} />
    </div>
  )
}
