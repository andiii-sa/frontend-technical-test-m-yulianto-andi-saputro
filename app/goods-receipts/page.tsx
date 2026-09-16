"use client";

import GoodsReceiptTable from "@/features/goods-recepits/GoodsReceiptTable";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";

export default function PurchaseRequest() {
    useBreadcrumb(['Goods Receipts'])

    return (
        <div>
            <GoodsReceiptTable />
        </div>
    );
}