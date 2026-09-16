import AppTable from "@/components/base/AppTable";
import BaseSelect from "@/components/base/BaseSelect";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { listWarehouses } from "@/constants";
import { Filter } from "lucide-react";

import { useGoodsReceiptList } from "@/services/goods-receipt/queries";
import DialogFormPurchaseRequest from "./DialogDetailGoodsReceipts";
import useGoodsRecceipts from "./useGoodsRecceipts";

const GoodsReceiptTable = () => {
    const {
        goodsReceiptHeaders,
        dialogForm,
        handleClose,
        filter,
        handleChangeFilter,
        handleChangePage,
        handleChangePerPage,
        handleFilter,
        handleReset,
        paramsApi,
    } = useGoodsRecceipts();

    const { data, isPending, isFetching, isError, refetch } =
        useGoodsReceiptList(paramsApi);

    return (
        <div>
            <AppTable
                className=" mt-3"
                headers={goodsReceiptHeaders}
                data={data?.data || []}
                isLoading={isPending || isFetching}
                perPage={filter.perPage || 0}
                total={data?.stats.totalData || 0}
                pageNumber={filter.page || 0}
                lengthPage={data?.stats.totalPage || 0}
                isHaveFilter={filter?.q.trim() || filter?.warehouseId ? true : false}
                titleEmpty="No goods receipt yet"
                subtitleEmpty={`Anda belum memiliki data.`}
                isErrorFetch={isError}
                handleChangePage={handleChangePage}
                handleChangePerPage={handleChangePerPage}
                showAddButton={false}
                handleAddData={() => { }}
                handleResetFilter={handleReset}
                headContent={
                    <div className="px-3.5 py-1.5 gap-2 border-b flex flex-col md:flex-row md:items-center justify-between flex-wrap">
                        <h4 className="font-medium text-xs text-fg">Goods Receipt List</h4>

                        <div className="flex items-center gap-2">
                            <Field orientation="horizontal" className="max-sm:flex-wrap">
                                <Input
                                    type="search"
                                    placeholder="Search Receipt/purchase ..."
                                    value={filter.q}
                                    onChange={(e) => handleChangeFilter("q", e.target.value)}
                                />
                                <BaseSelect
                                    items={[
                                        { value: "", label: "All Warehouse" },
                                        ...(listWarehouses?.map((item) => ({
                                            value: item.id.toString(),
                                            label: item.name,
                                        })) || []),
                                    ]}
                                    placeholder="Warehouse"
                                    onValueChange={(e: any) =>
                                        handleChangeFilter("warehouseId", e)
                                    }
                                    value={filter?.warehouseId}
                                />
                                <Button
                                    variant="outline"
                                    loading={isPending || isFetching}
                                    onClick={handleFilter}
                                >
                                    <Filter />
                                    Filter
                                </Button>
                            </Field>
                        </div>
                    </div>
                }
                handleRetryFetch={refetch}
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
