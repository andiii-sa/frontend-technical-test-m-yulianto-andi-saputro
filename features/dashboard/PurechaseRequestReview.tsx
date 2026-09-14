import { Button } from '@/components/ui/button'

const PurechaseRequestReview = () => {
    return (
        <section className="flex flex-col sm:flex-row justify-between gap-2 border border-slate-300 rounded-lg p-3 mt-3.5">
            <div className="space-y-1">
                <h2 className="text-fg font-medium text-xs">
                    8 purchase requests need your attention.
                </h2>
                <p className="text-fg-muted font-normal text-[11px]">
                    Review pending requests before they delay downstream purchasing.
                </p>
            </div>
            <Button size="sm">Review requests</Button>
        </section>
    )
}

export default PurechaseRequestReview