import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

const PurchaseOrderDetailNotFound = ({ }) => {
    return (
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
            <FileQuestion className="size-10 text-muted-foreground" aria-hidden />
            <div className="space-y-1">
                <h1 className="text-xl font-semibold">Purchase order not found</h1>
                <p className="text-sm text-muted-foreground">
                    It may have been removed, or the link is incorrect. Check the order
                    number and try again.
                </p>
            </div>
            <Button variant="outline">
                <Link href={'/purchase-orders'}>Back to purchase orders</Link>
            </Button>
        </div>
    );
};

export default PurchaseOrderDetailNotFound