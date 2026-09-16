import Badge, { BadgeColor } from "@/components/base/Badge";
import { convertDate, formatNumber, typeBadgeStatusPurchase } from "@/lib/utils";
import { GoodsReceiptDetail as IGoodsReceiptDetail } from "@/types";

import AppTable from "@/components/base/AppTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";


interface GoodsReceiptDetailProps {
    data: IGoodsReceiptDetail;
}

export const GoodsReceiptDetail = ({
    data
}: GoodsReceiptDetailProps) => {
    return (
        <ScrollArea className="flex-1">
            <div className="space-y-3">
                <section className="flex flex-col gap-3 rounded-lg border bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Purchase order</p>
                        <div className="flex flex-col flex-wrap gap-2">
                            <Link
                                href={`/purchase-orders/${data.purchaseOrder.id}`}
                                className="inline-flex items-center gap-1 font-mono text-sm font-medium text-primary underline-offset-4 hover:underline"
                            >
                                {data.purchaseOrder.orderNumber}
                            </Link>
                            <Badge
                                label={data.purchaseOrder.status?.toLowerCase()?.replaceAll('_', ' ')}
                                color={typeBadgeStatusPurchase[data.purchaseOrder.status] as BadgeColor}
                                className="capitalize w-fit"
                            />
                        </div>
                    </div>
                    <div className="space-y-1 sm:text-right">
                        <p className="text-xs text-muted-foreground">Supplier</p>
                        <p className="text-sm font-medium">
                            {data.purchaseOrder.supplier.name}{" "}
                        </p>
                        <span className="font-normal text-muted-foreground">
                            ({data.purchaseOrder.supplier.code})
                        </span>
                    </div>
                </section>

                <dl className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <InfoRow label="Warehouse">
                        {data.warehouse.name}
                    </InfoRow>
                    <InfoRow label="Received at">
                        <time dateTime={data.receivedAt}>
                            {convertDate(data.receivedAt, "DD MMM YYYY")}
                        </time>
                    </InfoRow>
                    <InfoRow label="Received by">
                        {data.receivedBy.name}
                    </InfoRow>
                    <InfoRow label="Items received">
                        {data.items.length} product
                    </InfoRow>
                    <InfoRow label="Total Quantity">
                        {formatNumber(data.totalQuantity)}
                    </InfoRow>
                </dl>

                {/* Items */}
                <section className="space-y-2">
                    <h3 className="text-sm font-medium">Items</h3>

                    <AppTable
                        headers={[
                            {
                                label: "SKU",
                                key: "product.sku",
                                renderItem: (_v: string, row: any) => (row?.product?.sku)
                            },
                            {
                                label: "Product",
                                key: "product.name",
                                renderItem: (_v: string, row: any) => (
                                    <>
                                        <p className="font-medium">{row?.product?.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {row?.product?.category}
                                        </p>
                                    </>
                                )
                            },
                            {
                                label: "Received",
                                key: "receivedQuantity",
                                renderItem: (_v: string, row: any) => (
                                    <>
                                        <span className="font-semibold">
                                            {formatNumber(row.receivedQuantity)}
                                        </span>{" "}
                                        <span className="text-xs text-muted-foreground">
                                            {row.unit}
                                        </span>
                                    </>
                                )
                            },
                        ]}
                        data={data.items || []}
                        showPaginationMore={false}
                        showPaginationNumber={false}
                        titleEmpty="This goods receipt has no items."
                        subtitleEmpty=""
                        perPage={0}
                        total={0}
                        pageNumber={1}
                        lengthPage={1}
                        handleChangePage={() => { }}
                        handleChangePerPage={() => { }}
                        handleRetryFetch={() => { }}
                    />
                </section>

                <section className="space-y-2">
                    <h3 className="flex items-center gap-2 text-sm font-medium">
                        Note
                    </h3>
                    {data.note ? (
                        <p className="whitespace-pre-line rounded-lg border bg-muted/40 p-3 text-sm">
                            {data.note}
                        </p>
                    ) : (
                        <p className="text-sm text-muted-foreground">No note added.</p>
                    )}
                </section>
            </div>
        </ScrollArea>
    );
}


function InfoRow({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex gap-3">
            <div className="min-w-0 space-y-0.5">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="text-sm">{children}</dd>
            </div>
        </div>
    );
}