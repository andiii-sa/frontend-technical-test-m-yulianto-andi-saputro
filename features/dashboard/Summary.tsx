import React from 'react'

interface SummaryProps {
    items: {
        label: string;
        value: number,
        description: string
    }[]
}

const Summary = ({ items }: SummaryProps) => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mt-3.5">
            {items.map((item, idx) => (
                <div key={idx} className="card">
                    <div className="text-fg-muted font-normal text-xs text-">
                        {item.label}
                    </div>
                    <div className="font-semibold text-2xl mt-2">{item.value}</div>
                    <div className="text-fg-subtle font-medium text-[10px] mt-1">
                        {item.description}
                    </div>
                </div>
            ))}
        </section>
    )
}

export default Summary