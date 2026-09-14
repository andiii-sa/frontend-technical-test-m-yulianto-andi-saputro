import AppTable from '@/components/base/AppTable'
import Badge, { BadgeColor } from '@/components/base/Badge';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { convertDate } from '@/lib/utils';
import { Filter } from 'lucide-react';
import React from 'react'

interface RecentPurchaseRequestsProps {
    items: {
        requestId: string,
        requestBy: string,
        warehouse: string,
        itemsTotal: number,
        date: string | Date,
        status: string,
    }[]
    handleRetryFetch: () => void
}

const typeBadgeStatusPurchase = {
    SUBMITTED: "blue",
    APPROVED: "green",
    DRAFT: "gray",
};

const RecentPurchaseRequests = ({ items, handleRetryFetch }: RecentPurchaseRequestsProps) => {

    const requestPurchaseHeaders = [
        {
            label: "Request ID",
            key: "requestId",
        },
        {
            label: "Request By",
            key: "requestBy",
            classCellHeader: "",
            classCellItem: "",
        },
        {
            label: "Warehouse",
            key: "warehouse",
            classCellHeader: "",
            classCellItem: "",
        },
        {
            label: "Items Total",
            key: "itemsTotal",
            classCellHeader: "",
            classCellItem: "",
        },
        {
            label: "Date",
            key: "date",
            classCellHeader: "",
            classCellItem: "",
            renderItem: (value: string) =>
                value ? convertDate(value, "DD MMM YYYY") : "",
        },
        {
            label: "Status",
            key: "status",
            classCellHeader: "",
            classCellItem: "",
            renderItem: (value: keyof typeof typeBadgeStatusPurchase) => (
                <Badge
                    label={value?.toLowerCase()}
                    color={typeBadgeStatusPurchase[value] as BadgeColor}
                    className="capitalize"
                />
            ),
        },
    ];

    return (
        <AppTable
            className="lg:col-span-7"
            headers={requestPurchaseHeaders}
            data={items || []}
            isLoading={false}
            perPage={10}
            total={100}
            pageNumber={1}
            lengthPage={10}
            isHaveFilter={false}
            titleEmpty="Data Tidak Ditemukan"
            subtitleEmpty={`Anda belum memiliki data.`}
            isErrorFetch={false}
            handleChangePage={() => { }}
            handleChangePerPage={() => { }}
            headContent={
                <div className="px-3.5 py-1.5 gap-2 border-b flex flex-col md:flex-row md:items-center justify-between flex-wrap">
                    <h4 className="font-medium text-xs text-fg">Recent Purchase Requests</h4>

                    <div className="flex items-center gap-2">
                        <Field orientation="horizontal">
                            <Input type="search" placeholder="Search requests..." />
                            <Button variant="outline" loading={false}>
                                <Filter />
                                Filter
                            </Button>
                        </Field>
                    </div>
                </div>
            }
            handleRetryFetch={handleRetryFetch}
        />
    )
}

export default RecentPurchaseRequests