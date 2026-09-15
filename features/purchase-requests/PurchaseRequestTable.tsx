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
import { PurchaseRequestListItem } from "@/types";
import {
    Filter
} from "lucide-react";

import DialogConfirmation from "@/components/shared/DialogConfirmation";
import { Textarea } from "@/components/ui/textarea";
import DialogFormPurchaseRequest from "./DialogFormPurchaseRequest";
import usePurchaseRequests from "./usePurchaseRequests";

interface PurchaseRequestTableProps {
    items: PurchaseRequestListItem[];
    handleRetryFetch: () => void;
}

const PurchaseRequestTable = ({
    items,
    handleRetryFetch,
}: PurchaseRequestTableProps) => {
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
        setDialogForm
    } = usePurchaseRequests();

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
                data={items || []}
                isLoading={false}
                perPage={10}
                total={100}
                pageNumber={1}
                lengthPage={10}
                isHaveFilter={false}
                titleEmpty="No purchase requests yet"
                subtitleEmpty={`Anda belum memiliki data.`}
                isErrorFetch={false}
                handleChangePage={() => { }}
                handleChangePerPage={() => { }}
                showAddButton={true}
                handleAddData={() => { }}
                handleResetFilter={() => { }}
                headContent={
                    <div className="px-3.5 py-1.5 gap-2 border-b flex flex-col md:flex-row md:items-center justify-between flex-wrap">
                        <h4 className="font-medium text-xs text-fg">Purchase Requests</h4>

                        <div className="flex items-center gap-2">
                            <Field orientation="horizontal">
                                <Input type="search" placeholder="Search requests..." />
                                <BaseSelect items={listStatus} placeholder="Status" value="" />
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
