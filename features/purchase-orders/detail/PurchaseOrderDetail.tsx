"use client";


import DialogConfirmation from "@/components/shared/DialogConfirmation";
import { useDialogConfirm } from "@/components/shared/DialogConfirmation/useDialogConfirm";
import {
    getReceiveAction
} from "@/helpers/purchase-order";
import { ApiError } from "@/lib/api-client";
import { useGeneralStore } from "@/providers";
import { usePurchaseOrderDetail } from "@/services/purchase-order/queries";
import { useMemo, useState } from "react";
import Header from "./Header";
import ItemsPanel from "./ItemsPanel";
import OrderInformationPanel from "./OrderInformationPanel";
import PurchaseOrderDetailError from "./PurchaseOrderDetailError";
import PurchaseOrderDetailSkeleton from "./PurchaseOrderDetailSkeleton";
import PurchaseOrderDetailNotFound from "./PurchaseOrderNotFound";
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
        if (error instanceof ApiError && error.status === 404) return <PurchaseOrderDetailNotFound />;
        return <PurchaseOrderDetailError onRetry={() => refetch()} />;
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
                            purchaseRequestHref={() => "/"}
                        />
                    </div>
                    <ReceivingProgressPanel data={data} />
                </div>

                <ItemsPanel items={data.items} />
                <ReceiptHistoryPanel
                    receipts={data.goodsReceipts}
                    goodsReceiptHref={(value) => "/goods-recepits/" + value}
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

