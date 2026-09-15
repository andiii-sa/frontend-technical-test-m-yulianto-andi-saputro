"use client"

import { Button } from "@/components/ui/button";
import { convertDate } from "@/lib/utils";
import { InventoryStockListItem } from "@/types";
import { Eye } from "lucide-react";
import Link from "next/link";

const useInventory = () => {
    const inventoryHeaders = [
        {
            label: "Product",
            key: "product.name",
            renderItem: (_v: string, row: any) => row?.product?.name,
        },
        {
            label: "SKU",
            key: "product.sku",
            renderItem: (_v: string, row: any) => row?.product?.sku,
        },
        {
            label: "Warehouse",
            key: "warehouse.name",
            renderItem: (_v: string, row: any) => row?.warehouse?.name,
        },
        {
            label: "Current Stock",
            key: "quantity",
        },
        {
            label: "Unit",
            key: "unit",
        },
        {
            label: "Last Updated",
            key: "updatedAt",
            renderItem: (value: string) =>
                value ? convertDate(value, "DD MMM YYYY") : "",
        },
        {
            label: "Action",
            key: "actions",
            renderItem: (_v: string, row: InventoryStockListItem) => (
                <Link href={'/inventory/' + row?.productId + '/' + row?.warehouseId} >
                    <Button variant="outline">
                        <Eye /> View Movements
                    </Button>
                </Link>
            ),
        },
    ];

    return {
        inventoryHeaders,
    }
}

export default useInventory