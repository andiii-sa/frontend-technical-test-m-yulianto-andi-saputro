"use client";


import { Button } from "@/components/ui/button";
import { useInventoryMovementDetail, useInventoryStockDetail } from "@/services/inventory/queries";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import MovementEmptyState from "./MovementEmptyState";
import MovementList from "./MovementList";
import StockMovementSkeleton from "./StockMovementSkeleton";

export interface InventoryMovementsDetailProps {
    productId: number;
    warehouseId: number;
}

export const InventoryMovementsDetail = ({
    productId,
    warehouseId,
}: InventoryMovementsDetailProps) => {
    const router = useRouter()
    const { data: stock, isPending: isPendingStock } = useInventoryStockDetail(productId, warehouseId);
    const { data: movement, isPending: isPendingMovement } = useInventoryMovementDetail(productId, warehouseId);

    return (
        <>
            {isPendingStock || isPendingMovement ? (
                <StockMovementSkeleton />
            ) : !stock ? (
                <MovementEmptyState />
            ) : (
                <div className="w-full space-y-4">
                    <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground" onClick={() => router.back()} >
                        <ArrowLeft className="size-4" />
                        Inventory Movement
                    </Button>
                    <Header
                        data={stock}
                    />
                    <MovementList movements={movement ?? []} />
                </div>
            )}

        </>
    );
};