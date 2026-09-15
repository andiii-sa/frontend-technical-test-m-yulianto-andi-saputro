"use client";

import { listPurchaseOrders } from "@/constants";
import PurchaseOrderTable from "@/features/purchase-orders/PurchaseOrderTable";
import { PurchaseOrderListItem } from "@/types";

export default function PurchaseOrders() {
    return (
        <div>
            <PurchaseOrderTable
                items={(listPurchaseOrders as PurchaseOrderListItem[]) || []}
                handleRetryFetch={() => { }}
            />
        </div>
    );
}