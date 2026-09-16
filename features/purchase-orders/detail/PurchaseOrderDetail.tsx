"use client";


import DialogConfirmation from "@/components/shared/DialogConfirmation";
import { useDialogConfirm } from "@/components/shared/DialogConfirmation/useDialogConfirm";
import ErrorState from "@/components/shared/ErrorState";
import { Button } from "@/components/ui/button";
import {
    getReceiveAction
} from "@/helpers/purchase-order";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";
import { ApiError } from "@/lib/api-client";
import { useGeneralStore } from "@/providers";
import { usePurchaseOrderDetail } from "@/services/purchase-order/queries";
import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "./Header";
import ItemsPanel from "./ItemsPanel";
import OrderInformationPanel from "./OrderInformationPanel";
import PurchaseOrderDetailSkeleton from "./PurchaseOrderDetailSkeleton";
import ReceiptHistoryPanel from "./ReceiptHistoryPanel";
import ReceiveGoodsDialog from "./ReceiveGoodsDialog";
import ReceivingProgressPanel from "./ReceivingProgressPanel";

export interface PurchaseOrderDetailProps {
    id: number;
}

export const PurchaseOrderDetail = ({
    id,
}: PurchaseOrderDetailProps) => {
    const role = useGeneralStore(s => s.user.role)
    useBreadcrumb(['Purchase Orders'])

    const [dialogOpen, setDialogOpen] = useState(false);
    const { dialogConfirm, setDialogConfirm } = useDialogConfirm()

    const { data, isPending, isError, error, refetch } = usePurchaseOrderDetail(Number(id));
    const action = useMemo(() => {
        return getReceiveAction(role, data?.status || "");
    }, [role, data]);

    const handleSuccessSubmitGoods = () => {
        setDialogConfirm(prev => ({ ...prev, open: true }))
    }

    if (isPending) return <PurchaseOrderDetailSkeleton />;
    if (isError) {
        return <ErrorState
            isErrorFetch={isError && error instanceof ApiError && error.status !== 404 ? true : false}
            handleRetryFetch={() => refetch()}
            isHaveFilter={false}
            subtitleEmpty={`Data tidak ditemukan atau terhapus.`}
            isLoading={isPending}
            data={data}
            isBordered={true}
            showAddButton={false}
        >
            <Link href={'/purchase-orders'}>
                <Button variant="outline">
                    Back to Purchase Orders
                </Button>
            </Link>
        </ErrorState>
    }

    return (
        <>
            <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6">
                <Header
                    data={data}
                    action={action}
                    onReceive={() => setDialogOpen(true)}
                />

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <OrderInformationPanel
                            data={data}
                            purchaseRequestHref={() => "#"}
                        />
                    </div>
                    <ReceivingProgressPanel data={data} />
                </div>

                <ItemsPanel items={data.items} />
                <ReceiptHistoryPanel
                    receipts={data.goodsReceipts}
                    goodsReceiptHref={() => "#"}
                />
            </div>

            {action.visible && action.enabled && (
                <ReceiveGoodsDialog
                    data={data}
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                    handleSuccessSubmit={handleSuccessSubmitGoods}
                />
            )}
            <DialogConfirmation
                open={dialogConfirm.open}
                onCancel={() => setDialogConfirm(prev => ({ ...prev, open: false }))}
                type="check"
                title="Success"
                description="Goods have been received successfully."
                showSubmit={false}
            />
        </>
    );
};

