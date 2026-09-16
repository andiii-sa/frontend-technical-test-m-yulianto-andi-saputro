"use client"

import { Button } from "@/components/ui/button";
import { convertDate } from "@/lib/utils";
import { GoodsReceiptDetail } from "@/types";
import { Eye } from "lucide-react";
import { useState } from "react";

const useGoodsRecceipts = () => {
    const [dialogForm, setDialogForm] = useState<{
        open: boolean;
        data?: GoodsReceiptDetail;
    }>({ open: false, data: undefined });


    const goodsReceiptHeaders = [
        {
            label: "Receipt Number",
            key: "receiptNumber",
        },
        {
            label: "Purchase Order",
            key: "purchaseOrder.poNumber",
            renderItem: (_v: string, row: any) => row?.purchaseOrder?.orderNumber,
        },
        {
            label: "Warehouse",
            key: "warehouse.name",
            renderItem: (_v: string, row: any) => row?.warehouse?.name,
        },
        {
            label: "Received By",
            key: "receivedBy.name",
            renderItem: (_v: string, row: any) => row?.receivedBy?.name,
        },
        {
            label: "Total Quantity",
            key: "totalQuantity",
        },
        {
            label: "Received Date",
            key: "receivedAt",
            renderItem: (value: string) =>
                value ? convertDate(value, "DD MMM YYYY") : "",
        },
        {
            label: "Action",
            key: "actions",
            renderItem: (_v: string, row: GoodsReceiptDetail) => (
                <Button variant={"outline"} onClick={() => handleView(row)}>
                    <Eye /> View
                </Button>
            ),
        },
    ];

    const handleView = (item: GoodsReceiptDetail) => {
        setDialogForm({ open: true, data: item });
    };

    const handleClose = () => {
        setDialogForm((prev) => ({ ...prev, open: false }));

    };

    return {
        goodsReceiptHeaders,
        dialogForm,
        setDialogForm,
        handleClose,
    }
}

export default useGoodsRecceipts