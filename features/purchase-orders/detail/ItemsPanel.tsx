import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPercent, getRemaining } from "@/helpers/purchase-order";
import { formatNumber } from "@/lib/utils";
import { PurchaseOrderItemDetail } from "@/types";
import { CheckCircle2 } from "lucide-react";

const ItemsPanel = ({ items }: { items: PurchaseOrderItemDetail[] }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Items</CardTitle>
            </CardHeader>
            <CardContent className="px-0 sm:px-6">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="min-w-56">Product</TableHead>
                                <TableHead className="text-right">Ordered</TableHead>
                                <TableHead className="text-right">Received</TableHead>
                                <TableHead className="text-right">Remaining</TableHead>
                                <TableHead className="min-w-40">Progress</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="py-8 text-center text-sm text-muted-foreground"
                                    >
                                        This order has no items.
                                    </TableCell>
                                </TableRow>
                            )}
                            {items.map((item) => {
                                const remaining = getRemaining(item);
                                const percent = getPercent(
                                    item.receivedQuantity,
                                    item.orderedQuantity,
                                );
                                const done = remaining === 0;
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="font-medium">{item.product.name}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {item.product.sku}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Qty value={item.orderedQuantity} unit={item.unit} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Qty value={item.receivedQuantity} unit={item.unit} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {done ? (
                                                <span className="inline-flex items-center gap-1.5 text-emerald-700">
                                                    <CheckCircle2 className="size-4" aria-hidden />
                                                    <span className="tabular-nums">0</span>
                                                    <span className="sr-only">
                                                        remaining, line complete
                                                    </span>
                                                </span>
                                            ) : (
                                                <Qty value={remaining} unit={item.unit} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Progress
                                                    value={percent}
                                                    aria-label={`${percent}% received`}
                                                    className={
                                                        done ? "h-1.5 [&>*]:bg-emerald-600" : "h-1.5"
                                                    }
                                                />
                                                <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                                                    {percent}%
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default ItemsPanel


const Qty = ({ value, unit }: { value: number; unit: string }) => {
    return (
        <span className="tabular-nums">
            {formatNumber(value)}{" "}
            <span className="text-xs text-muted-foreground">{unit}</span>
        </span>
    );
};

