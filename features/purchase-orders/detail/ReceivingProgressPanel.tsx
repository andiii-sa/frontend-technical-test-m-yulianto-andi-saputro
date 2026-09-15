import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getPoProgress } from "@/helpers/purchase-order";
import { formatNumber } from "@/lib/utils";
import { PurchaseOrderListItem } from "@/types";

const ReceivingProgressPanel = ({ data }: { data: PurchaseOrderListItem }) => {
    const p = getPoProgress(data);
    const done = p.remaining === 0;

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-base">Receiving Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div
                    className="flex items-baseline justify-between gap-4"
                    aria-live="polite"
                >
                    <p className="text-sm">
                        <span className="text-2xl font-semibold tabular-nums">
                            {formatNumber(p.received)}
                        </span>
                        <span className="text-muted-foreground">
                            {" "}
                            / {formatNumber(p.ordered)} items received
                        </span>
                    </p>
                    <span className="text-sm font-medium tabular-nums">{p.percent}%</span>
                </div>
                <Progress
                    value={p.percent}
                    aria-label={`${p.received} of ${p.ordered} items received`}
                    className={done ? "[&>*]:bg-emerald-600" : undefined}
                />
                <dl className="grid grid-cols-2 gap-4 border-t pt-4 text-sm">
                    <div>
                        <dt className="text-muted-foreground">Remaining</dt>
                        <dd className="font-medium tabular-nums">
                            {formatNumber(p.remaining)} items
                        </dd>
                    </div>
                    <div>
                        <dt className="text-muted-foreground">Lines completed</dt>
                        <dd className="font-medium tabular-nums">
                            {p.completedLines} of {p.totalLines}
                        </dd>
                    </div>
                </dl>
            </CardContent>
        </Card>
    );
};

export default ReceivingProgressPanel