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

    const initialFilter = {
        q: "",
        perPage: 5,
        page: 1,
        warehouseId: ""
    }
    const [filter, setFilter] = useState(initialFilter)
    const [paramsApi, setParamsApi] = useState(initialFilter)

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

    const handleChangeFilter = (field: keyof typeof initialFilter, value: string) => {
        setFilter(prev => ({
            ...prev,
            [field]: value
        }))
    }
    const handleChangeParamsApi = (field: keyof typeof initialFilter, value: string) => {
        setParamsApi(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleFilter = () => {
        setParamsApi(filter)
    }

    const handleReset = () => {
        setFilter(initialFilter)
        setParamsApi(initialFilter)
    }

    const handleChangePage = (value: number) => {
        handleChangeFilter('page', String(value))
        handleChangeParamsApi('page', String(value))
    }

    const handleChangePerPage = (value: number) => {
        handleChangeFilter('page', String(1))
        handleChangeParamsApi('page', String(1))

        handleChangeFilter('perPage', String(value))
        handleChangeParamsApi('perPage', String(value))
    }

    return {
        goodsReceiptHeaders,
        dialogForm,
        setDialogForm,
        handleClose,
        filter,
        setFilter,
        paramsApi,
        handleChangeFilter,
        handleChangePage,
        handleChangePerPage,
        handleFilter,
        handleReset
    }
}

export default useGoodsRecceipts