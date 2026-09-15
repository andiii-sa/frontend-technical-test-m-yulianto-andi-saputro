import AppTable from "@/components/base/AppTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
                <AppTable
                    headers={[
                        {
                            label: "Product",
                            key: "product",
                            renderItem: (_v: string, row: any) => (
                                <>
                                    <div className="font-medium">{row?.product?.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {row?.product?.sku}
                                    </div>
                                </>
                            )
                        },
                        {
                            label: "Ordered",
                            key: "orderedQuantity",
                            renderItem: (_v: string, row: any) => (
                                <Qty value={row?.orderedQuantity} unit={row?.unit} />
                            )
                        },
                        {
                            label: "Received",
                            key: "receivedQuantity",
                            renderItem: (_v: string, row: any) => (
                                <Qty value={row?.receivedQuantity} unit={row?.unit} />
                            )
                        },
                        {
                            label: "Remaining",
                            key: "remainingQuantity",
                            renderItem: (_v: string, row: any) => (
                                getRemaining(row) === 0 ? (
                                    <span className="inline-flex items-center gap-1.5 text-emerald-700">
                                        <CheckCircle2 className="size-4" aria-hidden />
                                        <span className="tabular-nums">0</span>
                                        <span className="sr-only">
                                            remaining, line complete
                                        </span>
                                    </span>
                                ) : (
                                    <Qty value={getRemaining(row)} unit={row?.unit} />
                                )
                            )
                        },
                        {
                            label: "Progress",
                            key: "progress",
                            renderItem: (_v: string, row: any) => (
                                <div className="flex items-center gap-3">
                                    <Progress
                                        value={getPercent(
                                            row?.receivedQuantity,
                                            row?.orderedQuantity,
                                        )}
                                        aria-label={`${getPercent(
                                            row?.receivedQuantity,
                                            row?.orderedQuantity,
                                        )}% received`}
                                        className={
                                            getRemaining(row) === 0 ? "h-1.5 [&>*]:bg-emerald-600" : "h-1.5"
                                        }
                                    />
                                    <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                                        {getPercent(
                                            row?.receivedQuantity,
                                            row?.orderedQuantity,
                                        )}%
                                    </span>
                                </div>
                            )
                        }
                    ]}
                    data={items || []}
                    showPaginationMore={false}
                    showPaginationNumber={false}
                    titleEmpty="This order has no items."
                    subtitleEmpty=""
                    perPage={0}
                    total={0}
                    pageNumber={1}
                    lengthPage={1}
                    handleChangePage={() => { }}
                    handleChangePerPage={() => { }}
                    handleRetryFetch={() => { }}
                />
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

