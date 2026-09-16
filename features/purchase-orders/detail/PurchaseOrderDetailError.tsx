import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";

const PurchaseOrderDetailError = ({
    onRetry,
}: {
    onRetry?: () => void;
}) => {
    return (
        <div className="mx-auto space-y-4 px-4 py-16 border rounded-xl">
            <div className="flex flex-col gap-2 items-center justify-center">
                <AlertCircleIcon className="size-10 mb-4 text-red-500" />
                <div className="flex gap-2">
                    {onRetry && <Button onClick={onRetry}>Try again</Button>}
                    <Button variant="outline">
                        <Link href={'/purchase-orders'}>Back to purchase orders</Link>
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default PurchaseOrderDetailError