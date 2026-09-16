import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface PurechaseRequestReviewProps {
    count: number;
    isLoading: boolean;
}
const PurechaseRequestReview = ({
    count,
    isLoading,
}: PurechaseRequestReviewProps) => {
    return (
        <section className="flex flex-col sm:flex-row justify-between gap-2 border border-slate-300 rounded-lg p-3 mt-3.5">
            <div className="space-y-1">
                {isLoading ? (
                    <Skeleton className="h-5 w-full" />
                ) : (
                    <h2 className="text-fg font-medium text-xs">
                        {count} purchase requests need your attention.
                    </h2>
                )}
                <p className="text-fg-muted font-normal text-[11px]">
                    Review pending requests before they delay downstream purchasing.
                </p>
            </div>
            <Link href={{ pathname: '/purchase-requests', query: { status: 'SUBMITTED' } }}>
                <Button size="sm">Review requests</Button>
            </Link>
        </section>
    );
};

export default PurechaseRequestReview;
