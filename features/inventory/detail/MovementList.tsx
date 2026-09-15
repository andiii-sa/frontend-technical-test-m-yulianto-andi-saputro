import Badge from "@/components/base/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertDate } from "@/lib/utils";
import { InventoryMovementDetail } from "@/types";
import { cn } from "cn";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import MovementEmptyState from "./MovementEmptyState";
import { formatMovementType, formatSignedQuantity } from "@/helpers/inventory";

const MovementList = ({ movements }: { movements: InventoryMovementDetail[] }) => {
    const sorted = [...movements].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <Card>
            <CardHeader className="py-0">
                <CardTitle className="text-lg">
                    Movements
                    {sorted.length > 0 && (
                        <span className="ml-2 font-normal text-muted-foreground">
                            {sorted.length}
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {sorted.length === 0 ? (
                    <MovementEmptyState />
                ) : (
                    <ul className="divide-y border-t">
                        {sorted.map((m) => (
                            <MovementItem key={m.id} movement={m} />
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}

export default MovementList


const MovementItem = ({ movement }: { movement: InventoryMovementDetail }) => {
    const isIn = movement.quantity >= 0;
    const Icon = isIn ? ArrowDownLeft : ArrowUpRight;

    return (
        <li className="flex items-center gap-4 px-4 py-3 sm:px-6">
            <div
                className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full",
                    isIn
                        ? "bg-emerald-500/10 text-emerald-600 "
                        : "bg-red-500/10 text-red-600 "
                )}
            >
                <Icon className="size-4" aria-hidden />
            </div>

            <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge color="gray" label={formatMovementType(movement.type)}></Badge>
                    {movement.purchaseOrderId ? (
                        <Link
                            href={`/purchase-orders/${movement.purchaseOrderId}`}
                            className="font-mono text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
                            title={
                                movement.purchaseOrderNumber
                                    ? `Open ${movement.purchaseOrderNumber}`
                                    : undefined
                            }
                        >
                            {movement.referenceNumber}
                        </Link>
                    ) : (
                        <span className="font-mono text-sm">{movement.referenceNumber}</span>
                    )}
                </div>
                <p className="text-xs text-muted-foreground">
                    <time dateTime={movement.createdAt}>
                        {convertDate(movement.createdAt, 'DD MMM YYYY')}
                    </time>
                    {movement.purchaseOrderNumber && (
                        <>, from {movement.purchaseOrderNumber}</>
                    )}
                </p>
            </div>

            <p
                className={cn(
                    "shrink-0 text-right text-lg font-semibold tabular-nums",
                    isIn
                        ? "text-emerald-600"
                        : "text-red-600"
                )}
            >
                {formatSignedQuantity(movement.quantity)}
                <span className="ml-1 text-xs font-normal text-muted-foreground">
                    {movement.product.unit}
                </span>
            </p>
        </li>
    );
}
