import AppTable from "@/components/base/AppTable";
import BaseSelect from "@/components/base/BaseSelect";
import { Button } from "@/components/ui/button";
import {
    Field
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { listWarehouses } from "@/constants";
import { InventoryStockListItem } from "@/types";
import {
    Filter
} from "lucide-react";

import useInventory from "./useInventory";

interface InventoryTableProps {
    items: InventoryStockListItem[];
    handleRetryFetch: () => void;
}

const InventoryTable = ({
    items,
    handleRetryFetch,
}: InventoryTableProps) => {
    const {
        inventoryHeaders,
    } = useInventory();

    return (
        <div>
            <AppTable
                className=" mt-3"
                headers={inventoryHeaders}
                data={items || []}
                isLoading={false}
                perPage={10}
                total={100}
                pageNumber={1}
                lengthPage={10}
                isHaveFilter={false}
                titleEmpty="No inventorys yet"
                subtitleEmpty={`Anda belum memiliki data.`}
                isErrorFetch={false}
                handleChangePage={() => { }}
                handleChangePerPage={() => { }}
                showAddButton={true}
                handleAddData={() => { }}
                handleResetFilter={() => { }}
                headContent={
                    <div className="px-3.5 py-1.5 gap-2 border-b flex flex-col md:flex-row md:items-center justify-between flex-wrap">
                        <h4 className="font-medium text-xs text-fg">Inventory List</h4>

                        <div className="flex items-center gap-2">
                            <Field orientation="horizontal">
                                <Input type="search" placeholder="Search Product / SKU ..." />
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

export default InventoryTable;
