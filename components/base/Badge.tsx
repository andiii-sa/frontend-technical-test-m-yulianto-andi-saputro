import { cn } from 'cn'
import React, { ReactNode } from 'react'

export type BadgeColor = "gray" | 'blue' | 'green' | 'yellow' | 'red'

interface BadgeProps {
    label: ReactNode | string | number
    color: BadgeColor
    className?: string
}

const colors = {
    gray: 'bg-surface text-fg-muted border-fg-muted',
    blue: 'bg-info-bg text-info-fg border-info-border',
    green: 'bg-success-bg text-success-fg border-success-border',
    yellow: 'bg-warning-bg text-warning-fg border-warning-border',
    red: 'bg-danger-bg text-danger-fg border-danger-border',
}

const Badge = ({ color, label, className }: BadgeProps) => {
    return (
        <div className={cn('inline-flex items-center px-1 py-2 rounded-sm text-[10px] font-medium border', colors[color], className)}>
            {label}
        </div>
    )
}

export default Badge