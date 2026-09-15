"use client";

import {
    PurchaseOrderListItem
} from "@/types";

import DialogConfirmation from "@/components/shared/DialogConfirmation";
import { useDialogConfirm } from "@/components/shared/DialogConfirmation/useDialogConfirm";
import { listPurchaseOrders } from "@/constants";
import {
    getReceiveAction
} from "@/helpers/purchase-order";
import { useGeneralStore } from "@/providers";
import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./Header";
import ItemsPanel from "./ItemsPanel";
import OrderInformationPanel from "./OrderInformationPanel";
import PurchaseOrderDetailSkeleton from "./PurchaseOrderDetailSkeleton";
import PurchaseOrderDetailNotFound from "./PurchaseOrderNotFound";
import ReceiptHistoryPanel from "./ReceiptHistoryPanel";
import ReceiveGoodsDialog from "./ReceiveGoodsDialog";
import ReceivingProgressPanel from "./ReceivingProgressPanel";

/** Payload yang dikirim dialog Receive Goods ke parent. Sesuaikan dengan endpoint. */

export interface PurchaseOrderDetailProps {
    id: number;
}

export const PurchaseOrderDetail = ({
    id,
}: PurchaseOrderDetailProps) => {
    const role = useGeneralStore(s => s.user.role)
    const [dialogOpen, setDialogOpen] = useState(false);
    const { dialogConfirm, setDialogConfirm } = useDialogConfirm()
    const [data, setData] = useState<PurchaseOrderListItem>();
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        const find = listPurchaseOrders.find((f) => f.id === id);
        // setLoading(true)

        setTimeout(() => {
            setData(find as PurchaseOrderListItem);
            setLoading(false);
        }, 3000);
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const action = useMemo(() => {
        return getReceiveAction(role, data?.status || "");
    }, [role, data]);

    const handleSuccessSubmitGoods = () => {
        console.log('success')
        setDialogConfirm(prev => ({ ...prev, open: true }))
        setLoading(true)
        fetchData()
    }

    return (
        <>
            {loading ? (
                <PurchaseOrderDetailSkeleton />
            ) : !data ? (
                <PurchaseOrderDetailNotFound />
            ) : (
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

                </>
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

