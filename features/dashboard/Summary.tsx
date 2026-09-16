import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSummary } from '@/types'
import React from 'react'

interface SummaryProps {
    items: DashboardSummary[]
    isLoading: boolean
    isError: boolean
    handleRetryFetch: () => void
}

const Summary = ({ items, isLoading }: SummaryProps) => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-3.5">
            {
                isLoading ? (
                    Array.from({ length: 4 }, (_, i) => (
                        <SummaryItemSkeleton key={i} />
                    ))
                ) :
                    items.map((item, idx) => (
                        <SummaryItem key={idx} item={item} />
                    ))}
        </section>
    )
}

export default Summary

const SummaryItem = ({ item }: { item: DashboardSummary }) => {
    return (
        <div className="card">
            <div className="text-fg-muted font-normal text-xs text-">
                {item.label}
            </div>
            <div className="font-semibold text-2xl mt-2">{item.value}</div>
            <div className="text-fg-subtle font-medium text-[10px] mt-1">
                {item.description}
            </div>
        </div>
    )
}

const SummaryItemSkeleton = () => {
    return (
        <div className="card">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-16 mt-2" />
            <Skeleton className="h-2.5 w-32 mt-1" />
        </div>
    )
}
