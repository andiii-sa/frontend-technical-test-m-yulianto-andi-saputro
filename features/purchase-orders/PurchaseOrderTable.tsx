import AppTable from "@/components/base/AppTable";
import BaseSelect from "@/components/base/BaseSelect";
import { Button } from "@/components/ui/button";
import {
    Field
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { listStatusPurchaseOrders, listWarehouses } from "@/constants";
import { PurchaseOrderListItem } from "@/types";
import {
    Filter
} from "lucide-react";

import usePurchaseOrders from "./usePurchaseOrders";

interface PurchaseOrderTableProps {
    items: PurchaseOrderListItem[];
    handleRetryFetch: () => void;
}

const PurchaseOrderTable = ({
    items,
    handleRetryFetch,
}: PurchaseOrderTableProps) => {
    const {
        requestPurchaseHeaders,
    } = usePurchaseOrders();

    return (
        <div>
            <AppTable
                className=" mt-3"
                headers={requestPurchaseHeaders}
                data={items || []}
                isLoading={false}
                perPage={10}
                total={100}
                pageNumber={1}
                lengthPage={10}
                isHaveFilter={false}
                titleEmpty="No purchase orders yet"
                subtitleEmpty={`Anda belum memiliki data.`}
                isErrorFetch={false}
                handleChangePage={() => { }}
                handleChangePerPage={() => { }}
                showAddButton={true}
                handleAddData={() => { }}
                handleResetFilter={() => { }}
                headContent={
                    <div className="px-3.5 py-1.5 gap-2 border-b flex flex-col md:flex-row md:items-center justify-between flex-wrap">
                        <h4 className="font-medium text-xs text-fg">Purchase Order List</h4>

                        <div className="flex items-center gap-2">
                            <Field orientation="horizontal">
                                <Input type="search" placeholder="Search PO/supplier..." />
                                <BaseSelect items={listStatusPurchaseOrders} placeholder="Status" value="" />
                                <BaseSelect
                                    items={[
                                        { value: "", label: "All Warehouse" },
                                        ...(listWarehouses?.map((item) => ({
                                            value: item.id.toString(),
                                            label: item.name,
                                        })) || []),
                                    ]}
                                    placeholder="Warehouse"
                                    value=""
                                />
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
        </div>
    );
};

export default PurchaseOrderTable;
