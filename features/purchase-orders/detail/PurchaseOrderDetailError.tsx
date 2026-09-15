import { Button } from "@/components/ui/button";
import Link from "next/link";

const PurchaseOrderDetailError = ({
    onRetry,
}: {
    onRetry?: () => void;
}) => {
    return (
        <div className="mx-auto max-w-xl space-y-4 px-4 py-16">
            <div className="flex gap-2">
                {onRetry && <Button onClick={onRetry}>Try again</Button>}
                <Button variant="outline">
                    <Link href={'/purchase-orders'}>Back to purchase orders</Link>
                </Button>
            </div>
        </div>
    );
};

export default PurchaseOrderDetailError