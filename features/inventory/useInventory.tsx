"use client"

import { Button } from "@/components/ui/button";
import { convertDate } from "@/lib/utils";
import { InventoryStockListItem } from "@/types";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const useInventory = () => {
    const initialFilter = {
        q: "",
        perPage: 5,
        page: 1,
        warehouseId: ""
    }
    const [filter, setFilter] = useState(initialFilter)
    const [paramsApi, setParamsApi] = useState(initialFilter)

    const inventoryHeaders = [
        {
            label: "Product",
            key: "product.name",
            renderItem: (_v: string, row: any) => row?.product?.name,
        },
        {
            label: "SKU",
            key: "product.sku",
            renderItem: (_v: string, row: any) => row?.product?.sku,
        },
        {
            label: "Warehouse",
            key: "warehouse.name",
            renderItem: (_v: string, row: any) => row?.warehouse?.name,
        },
        {
            label: "Current Stock",
            key: "quantity",
        },
        {
            label: "Unit",
            key: "unit",
        },
        {
            label: "Last Updated",
            key: "updatedAt",
            renderItem: (value: string) =>
                value ? convertDate(value, "DD MMM YYYY") : "",
        },
        {
            label: "Action",
            key: "actions",
            renderItem: (_v: string, row: InventoryStockListItem) => (
                <Link href={'/inventory/' + row?.productId + '/' + row?.warehouseId} >
                    <Button variant="outline">
                        <Eye /> View Movements
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
        inventoryHeaders,
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

export default useInventory