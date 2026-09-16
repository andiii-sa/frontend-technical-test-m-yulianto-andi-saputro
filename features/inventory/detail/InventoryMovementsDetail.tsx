"use client";


import ErrorState from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/button";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";
import { ApiError } from "@/lib/api-client";
import { useInventoryMovementDetail, useInventoryStockDetail } from "@/services/inventory/queries";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "./Header";
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
    useBreadcrumb(['Inventory'])

    const { data: stock, isPending: isPendingStock, isError: isErrorStock, error: errorStock, refetch: refetchStock } = useInventoryStockDetail(productId, warehouseId);
    const { data: movement, isPending: isPendingMovement, refetch: refetchMovement } = useInventoryMovementDetail(productId, warehouseId);

    return (
        <>
            {isPendingStock || isPendingMovement ? (
                <StockMovementSkeleton />
            ) : !stock ? (
                <ErrorState
                    isErrorFetch={isErrorStock && errorStock instanceof ApiError && errorStock.status !== 404 ? true : false}
                    handleRetryFetch={() => {
                        refetchStock()
                        refetchMovement()
                    }}
                    isHaveFilter={false}
                    subtitleEmpty={`Data tidak ditemukan atau terhapus.`}
                    isLoading={isPendingStock}
                    data={stock}
                    isBordered={true}
                    showAddButton={false}
                >
                    <Link href={'/inventory'}>
                        <Button variant="outline">
                            Back to Inventory
                        </Button>
                    </Link>
                </ErrorState>
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