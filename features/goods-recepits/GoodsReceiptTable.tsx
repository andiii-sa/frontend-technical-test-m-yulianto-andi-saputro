import AppTable from "@/components/base/AppTable";
import BaseSelect from "@/components/base/BaseSelect";
import { Button } from "@/components/ui/button";
import {
    Field
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { listWarehouses } from "@/constants";
import { GoodsReceiptDetail } from "@/types";
import {
    Filter
} from "lucide-react";

import DialogFormPurchaseRequest from "./DialogDetailGoodsReceipts";
import useGoodsRecceipts from "./useGoodsRecceipts";

interface GoodsReceiptTableProps {
    items: GoodsReceiptDetail[];
    handleRetryFetch: () => void;
}

const GoodsReceiptTable = ({
    items,
    handleRetryFetch,
}: GoodsReceiptTableProps) => {
    const {
        goodsReceiptHeaders,
        dialogForm,
        handleClose,
    } = useGoodsRecceipts();

    return (
        <div>
            <AppTable
                className=" mt-3"
                headers={goodsReceiptHeaders}
                data={items || []}
                isLoading={false}
                perPage={10}
                total={100}
                pageNumber={1}
                lengthPage={10}
                isHaveFilter={false}
                titleEmpty="No goods receipt yet"
                subtitleEmpty={`Anda belum memiliki data.`}
                isErrorFetch={false}
                handleChangePage={() => { }}
                handleChangePerPage={() => { }}
                showAddButton={true}
                handleAddData={() => { }}
                handleResetFilter={() => { }}
                headContent={
                    <div className="px-3.5 py-1.5 gap-2 border-b flex flex-col md:flex-row md:items-center justify-between flex-wrap">
                        <h4 className="font-medium text-xs text-fg">Goods Receipt List</h4>

                        <div className="flex items-center gap-2">
                            <Field orientation="horizontal">
                                <Input type="search" placeholder="Search ..." />
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

            <DialogFormPurchaseRequest
                open={dialogForm.open}
                handleClose={handleClose}
                data={dialogForm.data}
            />
        </div>
    );
};

export default GoodsReceiptTable;
