"use client"

import Badge, { BadgeColor } from "@/components/base/Badge";
import { Button } from "@/components/ui/button";
import { Progress, ProgressValue } from "@/components/ui/progress";
import { convertDate, typeBadgeStatusPurchase } from "@/lib/utils";
import { PurchaseOrderListItem } from "@/types";
import { Eye } from "lucide-react";
import Link from "next/link";

const usePurchaseOrders = () => {
    const requestPurchaseHeaders = [
        {
            label: "PO Number",
            key: "orderNumber",
        },
        {
            label: "Supplier",
            key: "supplier.name",
            renderItem: (_v: string, row: any) => row?.supplier?.name,
        },
        {
            label: "Warehouse",
            key: "warehouse.name",
            renderItem: (_v: string, row: any) => row?.warehouse?.name,
        },
        {
            label: "Total Items",
            key: "totalItems",
        },
        {
            label: "Received Progress",
            key: "receivingProgress",
            renderItem: (value: number) => (
                <Progress value={value} className="w-full max-w-sm">
                    <ProgressValue />
                </Progress>
            )
        },
        {
            label: "Status",
            key: "status",
            renderItem: (value: keyof typeof typeBadgeStatusPurchase) => (
                <Badge
                    label={value?.toLowerCase()?.replaceAll('_', ' ')}
                    color={typeBadgeStatusPurchase[value] as BadgeColor}
                    className="capitalize"
                />
            ),
        },
        {
            label: "Created Date",
            key: "createdAt",
            renderItem: (value: string) =>
                value ? convertDate(value, "DD MMM YYYY") : "",
        },
        {
            label: "Action",
            key: "actions",
            renderItem: (_v: string, row: PurchaseOrderListItem) => (
                <Link href={'/purchase-orders/' + row?.id} >
                    <Button variant="outline">
                        <Eye /> View
                    </Button>
                </Link>
            ),
        },
    ];

    return {
        requestPurchaseHeaders,
    }
}

export default usePurchaseOrders