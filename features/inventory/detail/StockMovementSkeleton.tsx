import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StockMovementSkeleton = () => {
    return (
        <div className="space-y-6" aria-busy="true" aria-label="Loading stock movements">
            <Card>
                <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-7 w-56" />
                        <Skeleton className="h-4 w-44" />
                    </div>
                    <div className="space-y-2 sm:items-end sm:flex sm:flex-col">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-12 w-32" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-3">
                    <Skeleton className="h-5 w-28" />
                </CardHeader>
                <CardContent className="divide-y border-t p-0">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 px-6 py-3">
                            <Skeleton className="size-9 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-48" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                            <Skeleton className="h-6 w-14" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

export default StockMovementSkeleton