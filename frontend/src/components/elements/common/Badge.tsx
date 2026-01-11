import React from 'react'
export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'
interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}
export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-slate-800',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-rose-100 text-rose-800',
    info: 'bg-cyan-100 text-cyan-800',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
