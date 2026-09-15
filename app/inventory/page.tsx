"use client";

import { listInventoryStocks } from "@/constants";
import InventoryTable from "@/features/inventory/InventoryTable";
import { InventoryStockListItem } from "@/types";

export default function Inventory() {
    return (
        <div>
            <InventoryTable
                items={(listInventoryStocks as InventoryStockListItem[]) || []}
                handleRetryFetch={() => { }}
            />
        </div>
    );
}