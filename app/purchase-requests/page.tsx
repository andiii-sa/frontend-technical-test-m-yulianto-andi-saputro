"use client";

import { listPurchaseRequests } from "@/constants";
import PurchaseRequestTable from "@/features/purchase-requests/PurchaseRequestTable";
import { PurchaseRequestListItem } from "@/types";

export default function PurchaseRequest() {
    return (
        <div>
            <PurchaseRequestTable
                items={(listPurchaseRequests as PurchaseRequestListItem[]) || []}
                handleRetryFetch={() => { }}
            />
        </div>
    );
}