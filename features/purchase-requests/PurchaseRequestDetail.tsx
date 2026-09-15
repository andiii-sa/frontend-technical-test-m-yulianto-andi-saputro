import Badge, { BadgeColor } from "@/components/base/Badge";
import { Button } from "@/components/ui/button";
import { convertDate, typeBadgeStatusPurchase } from "@/lib/utils";
import { PurchaseRequestListItem } from "@/types";
import {
    ArrowUpRight,
    Package
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import AppTable from "@/components/base/AppTable";


interface PurchaseRequestDetailProps {
    data: PurchaseRequestListItem;
    isApproveReject: boolean;
    handleApprove: () => void;
    handleReject: () => void;
    handleClose: () => void;
}

const DetailField = ({ label, value }: { label: string; value?: string }) => {
    return (
        <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{label}</p>

            <p className="text-sm font-medium">{value || "-"}</p>
        </div>
    );
}

export const PurchaseRequestDetail = ({
    data,
    handleApprove,
    handleClose,
    handleReject,
    isApproveReject,
}: PurchaseRequestDetailProps) => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <div className="flex items-center gap-3 justify-between">
                        <h1 className="text-xl font-semibold">{data.requestNumber}</h1>

                        <Badge
                            label={data.status?.toLowerCase()}
                            color={typeBadgeStatusPurchase[data.status] as BadgeColor}
                            className="capitalize"
                        />
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">Purchase Request</p>
                </div>
            </div>

            {/* Request Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Request Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <DetailField label="Warehouse" value={data.warehouse.name} />

                        <DetailField label="Requested By" value={data.requestedBy.name} />

                        <DetailField
                            label="Created Date"
                            value={convertDate(data.createdAt, "DD MMM YYYY")}
                        />

                        {data.submittedAt && (
                            <DetailField
                                label="Submitted Date"
                                value={convertDate(data.submittedAt, "DD MMM YYYY")}
                            />
                        )}

                        {data.decidedBy && (
                            <DetailField label="Decided By" value={data.decidedBy.name} />
                        )}

                        {data.decidedAt && (
                            <DetailField
                                label="Decided Date"
                                value={convertDate(data.decidedAt, "DD MMM YYYY")}
                            />
                        )}
                    </div>

                    {data.notes && (
                        <>
                            <Separator />

                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Notes</p>

                                <p className="whitespace-pre-wrap text-sm leading-6">
                                    {data.notes}
                                </p>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            {/* Items */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Package className="size-4 text-muted-foreground" />

                        <CardTitle className="text-base">Items</CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="px-1 py-0">
                    <AppTable
                        headers={[
                            {
                                label: "Product",
                                key: "product",
                                renderItem: (_v: string, row: any) => row?.product?.name
                            },
                            {
                                label: "SKU",
                                key: "sku",
                                renderItem: (_v: string, row: any) => row?.product?.sku
                            },
                            {
                                label: "Quantity",
                                key: "quantity",
                                renderItem: (_v: string, row: any) => row?.quantity
                            },
                            {
                                label: "Unit",
                                key: "unit",
                            },
                        ]}
                        data={data?.items || []}
                        showPaginationMore={false}
                        showPaginationNumber={false}
                        titleEmpty="This request has no items."
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

            {/* Rejection Reason */}
            {data.status === "REJECTED" && data.rejectionReason && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base text-destructive">
                            Rejection Reason
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="rounded-md border border-destructive/20 bg-destructive/5 p-4">
                            <p className="text-sm leading-6">{data.rejectionReason}</p>
                        </div>

                        {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <DetailField
                label="Rejected By"
                value={data.decidedBy?.name}
              />

              <DetailField
                label="Rejected Date"
                value={convertDate(data.decidedAt!,'DD MMM YYYY')}
              />
            </div> */}
                    </CardContent>
                </Card>
            )}

            {/* Linked PO */}
            {data.purchaseOrder?.orderNumber && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Linked Purchase Order</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Link
                            href={`/purchase-orders/${data.purchaseOrder?.id}`}
                            className="group flex items-center justify-between rounded-md border p-4 transition-colors hover:bg-muted/50"
                        >
                            <div>
                                <p className="text-sm text-muted-foreground">Purchase Order</p>

                                <p className="mt-1 text-sm font-semibold">
                                    {data.purchaseOrder?.orderNumber}
                                </p>
                            </div>

                            <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </CardContent>
                </Card>
            )}

            {/* Button Approve Reject */}
            {isApproveReject && (
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => handleClose()}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={() => handleReject()}>
                        Reject
                    </Button>
                    <Button variant="default" onClick={() => handleApprove()}>
                        Approve
                    </Button>
                </div>
            )}
        </div>
    );
}