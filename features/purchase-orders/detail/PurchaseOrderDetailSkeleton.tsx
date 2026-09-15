import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PurchaseOrderDetailSkeleton = () => {
    return (
        <div
            className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6"
            aria-busy="true"
            aria-label="Loading purchase order"
        >
            <div className="space-y-4">
                <Skeleton className="h-8 w-36" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-56" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-9 w-36" />
                </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <Skeleton className="h-5 w-40" />
                    </CardHeader>
                    <CardContent className="grid gap-5 sm:grid-cols-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-40" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-2 w-full" />
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-5 w-20" />
                </CardHeader>
                <CardContent className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default PurchaseOrderDetailSkeleton