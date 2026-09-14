import { IconDownload, IconPlus } from "@/assets/icons"
import { Button } from "@/components/ui/button"

const ProcurementOverview = () => {
    return (
        <section className="flex flex-col sm:flex-row justify-between gap-2">
            <div className="space-y-1">
                <h1 className="text-fg font-semibold text-lg md:text-xl lg:text-2xl">
                    Procurement Overview
                </h1>
                <p className="text-fg-muted font-normal text-xs">
                    Track purchase requests, orders, receiving progress, and procurement
                    activity.
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm">
                    <IconDownload /> Export
                </Button>
                <Button size="sm">
                    <IconPlus /> Create Purchase Request
                </Button>
            </div>
        </section>
    )
}

export default ProcurementOverview