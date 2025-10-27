import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
}

const variantClasses = {
  primary:
    'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-black font-semibold hover:shadow-[var(--shadow-neon-strong)] transition-all hover:-translate-y-0.5',
  secondary:
    'bg-[var(--card)] text-[var(--primary)] border-2 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-black transition-all',
  outline:
    'bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--card)] transition-all',
  ghost:
    'bg-transparent text-[var(--foreground)] hover:bg-[var(--card)] transition-all',
  danger:
    'bg-red-600 text-white hover:bg-red-700 transition-all',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', glow = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          variantClasses[variant],
          sizeClasses[size],
          glow && variant === 'primary' && 'shadow-[var(--shadow-neon)] animate-glow',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
