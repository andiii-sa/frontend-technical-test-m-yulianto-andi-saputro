"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { getRemaining } from "@/helpers/purchase-order";
import { formatNumber } from "@/lib/utils";
import {
    PurchaseOrderItemDetail,
    PurchaseOrderListItem,
} from "@/types";
import { useMemo, useState } from "react";

const ReceiveGoodsDialog = ({
    data,
    open,
    onOpenChange,
    handleSuccessSubmit,
}: {
    data: PurchaseOrderListItem;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    handleSuccessSubmit: () => void;
}) => {
    const openItems = useMemo(
        () => data.items.filter((i) => getRemaining(i) > 0),
        [data.items],
    );
    const [qty, setQty] = useState<Record<number, string>>({});
    const [submitting, setSubmitting] = useState(false);

    const fieldError = (item: PurchaseOrderItemDetail) => {
        const raw = qty[item.id];
        if (!raw) return null;
        const n = Number(raw);
        if (!Number.isInteger(n) || n < 0) return "Enter a whole number";
        if (n > getRemaining(item))
            return `Max ${formatNumber(getRemaining(item))}`;
        return null;
    };

    const total = openItems.reduce((s, i) => s + (Number(qty[i.id]) || 0), 0);
    const hasError = openItems.some((i) => fieldError(i));
    const canSubmit = total > 0 && !hasError && !submitting;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        setSubmitting(true);
        try {
            // await postData({
            //     purchaseOrderId: data.id,
            //     items: openItems
            //         .map((i) => ({
            //             purchaseOrderItemId: i.id,
            //             quantity: Number(qty[i.id]) || 0,
            //         }))
            //         .filter((l) => l.quantity > 0),
            // });

            setTimeout(() => {
                handleSuccessSubmit();
                onOpenChange(false);
            }, 2000);
        } catch (err) {
            toast.add({
                title: "Error",
                description:
                    err instanceof Error
                        ? err.message
                        : "Goods couldn't be received. Try again.",
                type: "error",
            });
        } finally {
            setTimeout(() => {
                setSubmitting(false);
            }, 2000);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(o) => !submitting && onOpenChange(o)}>
            <DialogContent className="sm:max-w-lg">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Receive goods</DialogTitle>
                        <DialogDescription>
                            Enter the quantity that arrived at {data.warehouse.name}. Leave a
                            line empty to skip it.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="my-3 flex justify-end">
                        <Button
                            type="button"
                            variant="link"
                            size="sm"
                            className="h-auto p-0"
                            onClick={() =>
                                setQty(
                                    Object.fromEntries(
                                        openItems.map((i) => [i.id, String(getRemaining(i))]),
                                    ),
                                )
                            }
                        >
                            Fill all remaining
                        </Button>
                    </div>

                    <ul className="max-h-[50vh] space-y-3 overflow-y-auto pr-1">
                        {openItems.map((item) => {
                            const err = fieldError(item);
                            const inputId = `receive-qty-${item.id}`;
                            return (
                                <li
                                    key={item.id}
                                    className="flex items-start justify-between gap-4 rounded-md border p-3"
                                >
                                    <label htmlFor={inputId} className="min-w-0">
                                        <span className="block truncate text-sm font-medium">
                                            {item.product.name}
                                        </span>
                                        <span className="block text-xs text-muted-foreground">
                                            {item.product.sku}, {formatNumber(getRemaining(item))}{" "}
                                            {item.unit} remaining
                                        </span>
                                    </label>
                                    <div className="w-28 shrink-0">
                                        <Input
                                            id={inputId}
                                            type="number"
                                            inputMode="numeric"
                                            min={0}
                                            max={getRemaining(item)}
                                            placeholder="0"
                                            value={qty[item.id] ?? ""}
                                            onChange={(e) =>
                                                setQty((q) => ({ ...q, [item.id]: e.target.value }))
                                            }
                                            aria-invalid={!!err}
                                            aria-describedby={err ? `${inputId}-err` : undefined}
                                            className="text-right tabular-nums"
                                        />
                                        {err && (
                                            <p
                                                id={`${inputId}-err`}
                                                className="mt-1 text-right text-xs text-destructive"
                                            >
                                                {err}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <DialogFooter className="mt-6 items-center gap-2 sm:justify-between">
                        <p className="text-sm tabular-nums text-muted-foreground">
                            {formatNumber(total)} items to receive
                        </p>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                disabled={submitting}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={!canSubmit} loading={submitting}>
                                Receive goods
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ReceiveGoodsDialog;
