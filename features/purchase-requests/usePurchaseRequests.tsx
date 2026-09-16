"use client"

import Badge, { BadgeColor } from "@/components/base/Badge";
import { useDialogConfirm } from "@/components/shared/DialogConfirmation/useDialogConfirm";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { convertDate, typeBadgeStatusPurchase } from "@/lib/utils";
import { useGeneralStore } from "@/providers";
import { usePurchaseRequestApprove, usePurchaseRequestCreate, usePurchaseRequestDelete, usePurchaseRequestUpdate } from "@/services/purchase-request/queries";
import { PurchaseRequestListItem } from "@/types";
import { Eye, FileCheck, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const usePurchaseRequests = () => {
    const { isUser, isApprover } = useGeneralStore((s) => s);
    const searchParams = useSearchParams()
    const statusParams = searchParams.get('status')
    const createParams = searchParams.get('create')

    const initialFilter = {
        q: "",
        perPage: 5,
        page: 1,
        status: '',
        warehouseId: ""
    }
    const [filter, setFilter] = useState({ ...initialFilter, status: statusParams || '' })
    const [paramsApi, setParamsApi] = useState({ ...initialFilter, status: statusParams || '' })

    const { dialogConfirm, setDialogConfirm } = useDialogConfirm();
    const [dialogForm, setDialogForm] = useState<{
        open: boolean;
        type: "ADD" | "EDIT" | "VIEW" | "APPROVE_REJECT";
        data?: PurchaseRequestListItem | null;
        form?: any;
        rejectReason?: string;
        isDraft?: boolean
    }>({ open: createParams === 'true' || false, type: "ADD", data: null, isDraft: false });

    const purchaseRequestCreate = usePurchaseRequestCreate();
    const purchaseRequestUpdate = usePurchaseRequestUpdate();
    const purchaseRequestApprove = usePurchaseRequestApprove();
    const purchaseRequestDelete = usePurchaseRequestDelete();

    const requestPurchaseHeaders = [
        {
            label: "Request Number",
            key: "requestNumber",
        },
        {
            label: "Warehouse",
            key: "warehouse.name",
            renderItem: (_v: string, row: any) => row?.warehouse?.name,
        },
        {
            label: "Request By",
            key: "requestedBy.name",
            renderItem: (_v: string, row: any) => row?.requestedBy?.name,
        },
        {
            label: "Total Items",
            key: "totalItems",
        },
        {
            label: "Status",
            key: "status",
            renderItem: (value: keyof typeof typeBadgeStatusPurchase) => (
                <Badge
                    label={value?.toLowerCase()}
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
            renderItem: (_v: string, row: PurchaseRequestListItem) => (
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="outline">
                                <MoreHorizontal />
                            </Button>
                        }
                    />
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => handleView(row)}>
                                <Eye /> View
                            </DropdownMenuItem>
                            {isUser && row.status === 'DRAFT' && (
                                <DropdownMenuItem onClick={() => handleEdit(row)}>
                                    <Pencil /> Edit
                                </DropdownMenuItem>
                            )}
                            {isApprover && row.status === 'SUBMITTED' && (
                                <DropdownMenuItem onClick={() => handleApproveReject(row)}>
                                    <FileCheck /> Approve & Reject
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                                onClick={() => handleDelete(row)}
                                className="text-red-600"
                            >
                                <Trash2 /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const handleAdd = () => {
        setDialogForm({ open: true, type: "ADD", data: null });
    };

    const handleView = (item: PurchaseRequestListItem) => {
        setDialogForm({ open: true, type: "VIEW", data: item });
    };

    const handleEdit = (item: PurchaseRequestListItem) => {
        setDialogForm({ open: true, type: "EDIT", data: item });
    };

    const handleApproveReject = (item: PurchaseRequestListItem) => {
        setDialogForm({ open: true, type: "APPROVE_REJECT", data: item, rejectReason: "" });
    };

    const handleDelete = (item: PurchaseRequestListItem) => {
        setDialogForm({ open: false, type: "VIEW", data: item });
        setDialogConfirm({
            open: true,
            type: "cancel",
            action: "DELETE",
            title: "Delete Purchase Request",
            description: "Are you sure you want to delete this purchase request?",
            textClose: "Cancel",
            textSubmit: "Delete",
            persistent: true,
        });
    };

    const handleClose = (dirty: boolean) => {
        if (!dirty) {
            setDialogForm((prev) => ({ ...prev, open: false }));
        } else {
            setDialogConfirm({
                open: true,
                type: "warning",
                action: "LEAVE",
                title: "Leave Page",
                description:
                    "You have unsaved changes. Are you sure you want to leave?",
                textClose: "Cancel",
                textSubmit: "Leave",
                persistent: true,
            });
        }
    };

    const handleSubmit = (data: any, isDraft: boolean) => {
        setDialogForm((prev) => ({ ...prev, form: data, isDraft: isDraft }));

        setDialogConfirm({
            open: true,
            type: "confirm",
            action: dialogForm.type === "ADD" ? "ADD" : "EDIT",
            title:
                dialogForm.type === "ADD"
                    ? isDraft
                        ? "Save as Draft Purchase Request"
                        : "Add Purchase Request"
                    : isDraft
                        ? "Save as Draft Purchase Request"
                        : "Edit Purchase Request",
            description:
                dialogForm.type === "ADD"
                    ? isDraft
                        ? "Are you sure you want to save this purchase request as draft?"
                        : "Are you sure you want to add this purchase request?"
                    : isDraft
                        ? "Are you sure you want to save this purchase request as draft?"
                        : "Are you sure you want to edit this purchase request?",
            textClose: "Cancel",
            textSubmit:
                dialogForm.type === "ADD"
                    ? isDraft
                        ? "Save as Draft"
                        : "Save"
                    : isDraft
                        ? "Save as Draft"
                        : "Save",
            persistent: true,
        });
    };

    const handleApprove = () => {
        setDialogConfirm({
            open: true,
            type: "confirm",
            action: "APPROVE",
            title: "Approve Purchase Request",
            description: "Are you sure you want to approve this purchase request?",
            textClose: "Cancel",
            textSubmit: "Approve",
            persistent: true,
        });
    }

    const handleReject = () => {
        setDialogConfirm({
            open: true,
            type: "cancel",
            action: "REJECT",
            title: "Reject Purchase Request",
            description: "Are you sure you want to reject this purchase request?",
            textClose: "Cancel",
            textSubmit: "Reject",
            persistent: true,
        });
    }

    const onApprove = async () => {
        setDialogConfirm((prev) => ({ ...prev, loading: true }));

        try {
            await purchaseRequestApprove.mutateAsync({ id: Number(dialogForm.data?.id), payload: { action: "APPROVE", reason: "" } })

            setDialogForm((prev) => ({ ...prev, open: false }));
            onActionSuccess("Purchase Request approved successfully");
        } catch (err) {
            toast.add({
                title: "Error",
                description:
                    err instanceof Error
                        ? err.message
                        : "Ooops, something wrong, please try again.",
                type: "error",
            });
            setDialogConfirm((prev) => ({ ...prev, loading: false }));
        }
    };

    const onReject = async () => {
        if (!dialogForm.rejectReason?.trim()) {
            toast.add({
                title: "Error",
                description: "Reject reason is required",
                type: "error",
            })
            return;
        } else if (dialogForm.rejectReason.trim().length < 5 || dialogForm.rejectReason.trim().length > 500) {
            toast.add({
                title: "Error",
                description: "Reject reason must be at least 5 characters and at most 500 characters",
                type: "error",
            })
            return;
        }
        setDialogConfirm((prev) => ({ ...prev, loading: true }));

        try {
            await purchaseRequestApprove.mutateAsync({ id: Number(dialogForm.data?.id), payload: { action: "REJECT", reason: dialogForm.rejectReason } })

            setDialogForm((prev) => ({ ...prev, open: false }));
            onActionSuccess("Purchase Request rejected successfully");
        } catch (err) {
            toast.add({
                title: "Error",
                description:
                    err instanceof Error
                        ? err.message
                        : "Ooops, something wrong, please try again.",
                type: "error",
            });
            setDialogConfirm((prev) => ({ ...prev, loading: false }));
        }
    };

    const onActionSuccess = (title: string, description?: string) => {
        setDialogConfirm({
            open: true,
            type: "check",
            action: "SUCCESS",
            title: title,
            description: description || "",
            textClose: "Close",
            showClose: true,
            showSubmit: false,
            persistent: false,
        });
    };

    const onActionDelete = async () => {
        setDialogConfirm((prev) => ({ ...prev, loading: true }));
        try {
            await purchaseRequestDelete.mutateAsync(Number(dialogForm.data?.id))
            onActionSuccess("Purchase Request deleted successfully");
        } catch (err) {
            toast.add({
                title: "Error",
                description:
                    err instanceof Error
                        ? err.message
                        : "Ooops, something wrong, please try again.",
                type: "error",
            });
            setDialogConfirm((prev) => ({ ...prev, loading: false }));
        }
    };

    const onActionAdd = async () => {
        setDialogConfirm((prev) => ({ ...prev, loading: true }));

        try {
            await purchaseRequestCreate.mutateAsync({
                ...dialogForm.form,
                isDraft: dialogForm?.isDraft
            })
            setDialogForm((prev) => ({ ...prev, open: false }));
            onActionSuccess("Purchase Request created successfully");
        } catch (err) {
            toast.add({
                title: "Error",
                description:
                    err instanceof Error
                        ? err.message
                        : "Ooops, something wrong, please try again.",
                type: "error",
            });
            setDialogConfirm((prev) => ({ ...prev, loading: false }));
        }
    };

    const onActionEdit = async () => {
        setDialogConfirm((prev) => ({ ...prev, loading: true }));

        try {
            await purchaseRequestUpdate.mutateAsync({
                id: Number(dialogForm.data?.id),
                payload: {
                    ...dialogForm.form,
                    isDraft: dialogForm?.isDraft
                }
            })
            setDialogForm((prev) => ({ ...prev, open: false }));
            onActionSuccess("Purchase Request edited successfully");
        } catch (err) {
            toast.add({
                title: "Error",
                description:
                    err instanceof Error
                        ? err.message
                        : "Ooops, something wrong, please try again.",
                type: "error",
            });
            setDialogConfirm((prev) => ({ ...prev, loading: false }));
        }
    };

    const onActionLeave = () => {
        setDialogConfirm((prev) => ({ ...prev, open: false }));
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
        requestPurchaseHeaders,
        dialogForm,
        setDialogForm,
        dialogConfirm,
        setDialogConfirm,
        handleAdd,
        handleView,
        handleEdit,
        handleApproveReject,
        handleDelete,
        handleClose,
        handleSubmit,
        onApprove,
        onReject,
        onActionSuccess,
        onActionDelete,
        onActionAdd,
        onActionEdit,
        onActionLeave,
        isApprover,
        isUser,
        handleApprove,
        handleReject,

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

export default usePurchaseRequests