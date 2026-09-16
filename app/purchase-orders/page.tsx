"use client";

import PurchaseOrderTable from "@/features/purchase-orders/PurchaseOrderTable";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";

export default function PurchaseOrders() {
    useBreadcrumb(['Purchase Orders'])
    return (
        <div>
            <PurchaseOrderTable />
        </div>
    );
}