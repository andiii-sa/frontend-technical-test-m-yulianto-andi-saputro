"use client"

import Badge, { BadgeColor } from "@/components/base/Badge";
import { Button } from "@/components/ui/button";
import { Progress, ProgressValue } from "@/components/ui/progress";
import { convertDate, typeBadgeStatusPurchase } from "@/lib/utils";
import { PurchaseOrderListItem } from "@/types";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const usePurchaseOrders = () => {
    const initialFilter = {
        q: "",
        perPage: 5,
        page: 1,
        status: '',
        warehouseId: ""
    }
    const searchParams = useSearchParams()
    const statusParams = searchParams.get('status')

    const [filter, setFilter] = useState({
        ...initialFilter,
        status: statusParams || ''
    })
    const [paramsApi, setParamsApi] = useState({
        ...initialFilter,
        status: statusParams || ''
    })


    const requestPurchaseHeaders = [
        {
            label: "PO Number",
            key: "orderNumber",
        },
        {
            label: "Supplier",
            key: "supplier.name",
            renderItem: (_v: string, row: any) => row?.supplier?.name,
        },
        {
            label: "Warehouse",
            key: "warehouse.name",
            renderItem: (_v: string, row: any) => row?.warehouse?.name,
        },
        {
            label: "Total Items",
            key: "totalItems",
        },
        {
            label: "Received Progress",
            key: "receivingProgress",
            renderItem: (value: number) => (
                <Progress value={value} className="w-full max-w-sm">
                    <ProgressValue />
                </Progress>
            )
        },
        {
            label: "Status",
            key: "status",
            renderItem: (value: keyof typeof typeBadgeStatusPurchase) => (
                <Badge
                    label={value?.toLowerCase()?.replaceAll('_', ' ')}
                    color={typeBadgeStatusPurchase[value] as BadgeColor}
                    className="capitalize"
                />
            ),
        },
        {
            label: "Created Date",
            key: "createdAt",
            renderItem: (value: string) =>
                value ? convertDate(value, "DD MMM YYYY") : "",
        },
        {
            label: "Action",
            key: "actions",
            renderItem: (_v: string, row: PurchaseOrderListItem) => (
                <Link href={'/purchase-orders/' + row?.id} >
                    <Button variant="outline">
                        <Eye /> View
                    </Button>
                </Link>
            ),
        },
    ];

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
        requestPurchaseHeaders,
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

export default usePurchaseOrders