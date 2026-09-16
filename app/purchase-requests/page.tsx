"use client";

import PurchaseRequestTable from "@/features/purchase-requests/PurchaseRequestTable";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";

export default function PurchaseRequest() {
    useBreadcrumb(['Purchase Requests'])

    return (
        <div>
            <PurchaseRequestTable />
        </div>
    );
}