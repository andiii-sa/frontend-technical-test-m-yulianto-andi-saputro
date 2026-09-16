"use client";

import { listGoodsReceipts } from "@/constants";
import GoodsReceiptTable from "@/features/goods-recepits/GoodsReceiptTable";
import { GoodsReceiptDetail } from "@/types";

export default function PurchaseRequest() {
    return (
        <div>
            <GoodsReceiptTable
                items={(listGoodsReceipts as GoodsReceiptDetail[]) || []}
                handleRetryFetch={() => { }}
            />
        </div>
    );
}