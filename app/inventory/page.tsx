"use client";

import InventoryTable from "@/features/inventory/InventoryTable";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";

export default function Inventory() {
    useBreadcrumb(['Inventory'])

    return (
        <div>
            <InventoryTable />
        </div>
    );
}