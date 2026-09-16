import { IconPlus } from "@/assets/icons";
import AppTable from "@/components/base/AppTable";
import BaseSelect from "@/components/base/BaseSelect";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { listStatus, listWarehouses } from "@/constants";
import {
    Filter
} from "lucide-react";

import DialogConfirmation from "@/components/shared/DialogConfirmation";
import { Textarea } from "@/components/ui/textarea";
import { usePurchaseRequestList } from "@/services/purchase-request/queries";
import DialogFormPurchaseRequest from "./DialogFormPurchaseRequest";
import usePurchaseRequests from "./usePurchaseRequests";

const PurchaseRequestTable = () => {
    const {
        requestPurchaseHeaders,
        isUser,
        handleAdd,
        dialogForm,
        handleClose,
        handleSubmit,
        onApprove,
        onReject,
        dialogConfirm,
        setDialogConfirm,
        handleApprove,
        handleReject,
        onActionAdd,
        onActionDelete,
        onActionEdit,
        onActionLeave,
        setDialogForm,

        filter,
        handleChangeFilter,
        handleChangePage,
        handleChangePerPage,
        handleFilter,
        handleReset,
        paramsApi,
    } = usePurchaseRequests();

    const { data, isPending, isFetching, isError, refetch } = usePurchaseRequestList(paramsApi);

    return (
        <div>
            {
                isUser && (
                    <Button onClick={handleAdd}>
                        <IconPlus /> Create Purchase Request
                    </Button>
                )
            }
            <AppTable
                className=" mt-3"
                headers={requestPurchaseHeaders}
                data={data?.data || []}
                isLoading={isPending || isFetching}
                perPage={filter.perPage || 0}
                total={data?.stats.totalData || 0}
                pageNumber={filter.page || 0}
                lengthPage={data?.stats.totalPage || 0}
                isHaveFilter={
                    filter?.q.trim() || filter?.status || filter?.warehouseId
                        ? true
                        : false
                }
                titleEmpty="No purchase requests yet"
                subtitleEmpty={`Anda belum memiliki data.`}
                isErrorFetch={isError}
                handleChangePage={handleChangePage}
                handleChangePerPage={handleChangePerPage}
                showAddButton={false}
                handleAddData={() => { }}
                handleResetFilter={handleReset}
                headContent={
                    <div className="px-3.5 py-1.5 gap-2 border-b flex flex-col md:flex-row md:items-center justify-between flex-wrap">
                        <h4 className="font-medium text-xs text-fg">Purchase Requests</h4>

                        <div className="flex items-center gap-2">
                            <Field orientation="horizontal">
                                <Input
                                    type="search"
                                    placeholder="Search requests..."
                                    value={filter.q}
                                    onChange={(e) => handleChangeFilter("q", e.target.value)}
                                />
                                <BaseSelect
                                    items={listStatus}
                                    placeholder="Status"
                                    value={filter.status}
                                    onValueChange={(e: any) => handleChangeFilter("status", e)}
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
                handleSubmit={handleSubmit}
                type={dialogForm.type}
                data={dialogForm.data}
                handleApprove={handleApprove}
                handleReject={handleReject}
            />

            <DialogConfirmation
                open={dialogConfirm.open}
                type={dialogConfirm.type}
                title={dialogConfirm.title}
                description={dialogConfirm.description}
                textClose={dialogConfirm.textClose}
                textSubmit={dialogConfirm.textSubmit}
                showClose={dialogConfirm.showClose}
                showSubmit={dialogConfirm.showSubmit}
                loading={dialogConfirm.loading}
                showLoading={dialogConfirm.showLoading}
                classSubmit={dialogConfirm.classSubmit}
                classClose={dialogConfirm.classClose}
                persistent={dialogConfirm.persistent}
                trigger={dialogConfirm.trigger}
                heading={dialogConfirm.heading}
                footerLeft={dialogConfirm.footerLeft}
                footerRight={dialogConfirm.footerRight}
                onCancel={() => {
                    setDialogConfirm((prev) => ({ ...prev, open: false }));
                }}
                onSubmit={() => {
                    if (dialogConfirm.action === "DELETE") {
                        onActionDelete();
                    } else if (dialogConfirm.action === "ADD") {
                        onActionAdd();
                    } else if (dialogConfirm.action === "EDIT") {
                        onActionEdit();
                    } else if (dialogConfirm.action === "LEAVE") {
                        onActionLeave();
                    } else if (dialogConfirm.action === "APPROVE") {
                        onApprove();
                    } else if (dialogConfirm.action === "REJECT") {
                        onReject();
                    }
                }}
            >
                {
                    dialogConfirm.action === 'REJECT' && (
                        <Field className="mt-3 gap-1">
                            <FieldLabel htmlFor="reject-reason" className="">Reject Reason</FieldLabel>
                            <Textarea
                                id="reject-reason"
                                placeholder="Type reject reason."
                                className="min-h-20"
                                value={dialogForm.rejectReason}
                                onChange={(e) => setDialogForm(prev => ({ ...prev, rejectReason: e.target.value }))}
                            />
                        </Field>
                    )
                }
            </DialogConfirmation>
        </div>
    );
};

export default PurchaseRequestTable;
