"use client";

import {
    InventoryMovementDetail,
    InventoryStockListItem
} from "@/types";

import { Button } from "@/components/ui/button";
import { listInventoryMovements, listInventoryStocks } from "@/constants";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
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
    const [data, setData] = useState<InventoryStockListItem>();
    const [movement, setMovement] = useState<InventoryMovementDetail[]>();
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        const findInventory = listInventoryStocks.find((f) => f.productId === productId && f.warehouseId === warehouseId);
        const findMovements = listInventoryMovements.filter((f) => f.productId === productId && f.warehouseId === warehouseId);
        // setLoading(true)

        setTimeout(() => {
            setData(findInventory as InventoryStockListItem);
            setMovement(findMovements as InventoryMovementDetail[]);
            setLoading(false);
        }, 3000);
    }, [productId, warehouseId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            {loading ? (
                <StockMovementSkeleton />
            ) : !data ? (
                <MovementEmptyState />
            ) : (
                <div className="w-full space-y-4">
                    <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground" onClick={() => router.back()} >
                        <ArrowLeft className="size-4" />
                        Inventory Movement
                    </Button>
                    <Header
                        data={data}
                    />
                    <MovementList movements={movement ?? []} />
                </div>
            )}

        </>
    );
};