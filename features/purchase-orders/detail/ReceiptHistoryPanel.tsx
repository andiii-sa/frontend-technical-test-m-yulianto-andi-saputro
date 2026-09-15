import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertDate } from "@/lib/utils";
import { GoodsReceiptSummary } from "@/types";
import Link from "next/link";

const ReceiptHistoryPanel = ({
    receipts,
    goodsReceiptHref,
}: {
    receipts: GoodsReceiptSummary[];
    goodsReceiptHref: (id: number) => string;
}) => {
    const sorted = [...receipts].sort(
        (a, b) => +new Date(b.receivedAt) - +new Date(a.receivedAt),
    );
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Receipt History</CardTitle>
            </CardHeader>
            <CardContent>
                {sorted.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No goods have been received for this order yet.
                    </p>
                ) : (
                    <ol className="divide-y">
                        {sorted.map((gr) => (
                            <li
                                key={gr.id}
                                className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                            >
                                <div className="min-w-0 space-y-0.5">
                                    <Link
                                        href={goodsReceiptHref(gr.id)}
                                        className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                                    >
                                        {gr.receiptNumber}
                                    </Link>
                                    <p className="text-xs text-muted-foreground">
                                        {convertDate(gr.receivedAt, "DD MMM YYYY")} by{" "}
                                        {gr.receivedBy.name}
                                    </p>
                                </div>
                                <span className="shrink-0 text-sm tabular-nums">
                                    {Number(gr.totalQuantity)} items
                                </span>
                            </li>
                        ))}
                    </ol>
                )}
            </CardContent>
        </Card>
    );
};

export default ReceiptHistoryPanel