import { IconPlus } from "@/assets/icons";
import BaseSelect from "@/components/base/BaseSelect";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { listProducts, listWarehouses } from "@/constants";
import { PurchaseRequestItemDetail, PurchaseRequestListItem } from "@/types";
import {
    Trash2
} from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import * as z from "zod";
import { PurchaseRequestDetail } from "./PurchaseRequestDetail";


type DialogFormPurchaseRequestProps = {
    open: boolean;
    handleSubmit: (data: any, isDraft: boolean) => void;
    handleClose: (diry: boolean) => void;
    type: "ADD" | "EDIT" | "VIEW" | "APPROVE_REJECT";
    data?: PurchaseRequestListItem | null;
    handleApprove: () => void;
    handleReject: () => void;
};

const formSchema = z.object({
    warehouseId: z.string().min(1, "Please select a warehouse"),
    notes: z.string().max(500, "Please keep it under 500 characters.").optional(),
    product: z
        .array(
            z.object({
                productId: z.string().min(1, "Please select a product"),
                productQty: z
                    .number({ invalid_type_error: "Quantity must be at least 1" })
                    .min(1, "Quantity must be at least 1"),
                productUnit: z.string().optional(),
            }),
        )
        .min(1, "Add at least one product."),
});

const DialogFormPurchaseRequest = ({
    open,
    handleSubmit,
    handleClose,
    type,
    data,
    handleApprove,
    handleReject,
}: DialogFormPurchaseRequestProps) => {
    const title =
        type === "ADD"
            ? "Add Purchase Request"
            : type === "EDIT"
                ? "Edit Purchase Request"
                : "Detail Purchase Request";

    const isReadOnly = useMemo(() => {
        if (["VIEW", "APPROVE_REJECT"].includes(type)) return true;
        else return false;
    }, [type]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            notes: "",
            warehouseId: "",
            product: [
                {
                    productId: "",
                    productQty: 0,
                    productUnit: "",
                },
            ],
        },
    });

    useEffect(() => {
        if (open) {
            if (data) {
                form.reset({
                    warehouseId: data.warehouseId?.toString(),
                    notes: data.notes?.toString(),
                    product: data.items?.map((item: PurchaseRequestItemDetail) => ({
                        productId: item.productId?.toString(),
                        productQty: item.quantity,
                        productUnit: item.unit,
                    })),
                });
            } else {
                form.reset({
                    notes: "",
                    warehouseId: "",
                    product: [
                        {
                            productId: "",
                            productQty: 0,
                            productUnit: "",
                        },
                    ],
                });
            }
        }
    }, [data, open]);

    function onSubmit(data: z.infer<typeof formSchema>, isDraft: boolean) {
        handleSubmit(data, isDraft);
    }

    const onClose = () => {
        if (form.formState.isDirty) {
            handleClose(true);
        } else {
            handleClose(false);
        }
    };

    const {
        fields: fieldsProduct,
        append: appendProduct,
        remove: removeProduct,
    } = useFieldArray({
        control: form.control,
        name: "product",
    });

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto max-h-[85vh] scrollbar-none px-1 py-1" >
                    {isReadOnly && data ? (
                        <PurchaseRequestDetail
                            data={data}
                            isApproveReject={type === 'APPROVE_REJECT'}
                            handleClose={onClose}
                            handleApprove={handleApprove}
                            handleReject={handleReject}
                        />
                    ) : (
                        <form id="form-dialog-purchase-request" className="space-y-2">
                            <FieldGroup>
                                <Controller
                                    name="warehouseId"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-select-warehouseId">
                                                Warehouse
                                            </FieldLabel>
                                            <BaseSelect
                                                {...field}
                                                id="form-select-warehouseId"
                                                invalid={fieldState.invalid}
                                                placeholder="Select Warehouse"
                                                items={
                                                    listWarehouses?.map((item) => ({
                                                        value: item.id.toString(),
                                                        label: item.name,
                                                    })) || []
                                                }
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                name={field.name}
                                                disabled={isReadOnly}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <FieldGroup>
                                <Controller
                                    name="notes"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="form-textarea-notes">Notes</FieldLabel>
                                            <Textarea
                                                {...field}
                                                id="form-textarea-notes"
                                                aria-invalid={fieldState.invalid}
                                                placeholder="Add request notes..."
                                                className="min-h-30"
                                                readOnly={isReadOnly}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <FieldSet className="gap-1">
                                <FieldLegend variant="label">Product</FieldLegend>
                                <FieldGroup className="gap-1">
                                    {fieldsProduct.map((field, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-1 gap-2 p-1.5 rounded-sm border bg-slate-50"
                                        >
                                            <Controller
                                                name={`product.${index}.productId`}
                                                control={form.control}
                                                render={({ field: controllerField, fieldState }) => (
                                                    <Field
                                                        orientation="horizontal"
                                                        data-invalid={fieldState.invalid}
                                                    >
                                                        <Field data-invalid={fieldState.invalid}>
                                                            <BaseSelect
                                                                {...controllerField}
                                                                id="form-select-productId"
                                                                invalid={fieldState.invalid}
                                                                placeholder="Select Product"
                                                                items={
                                                                    listProducts?.map((item) => ({
                                                                        value: item.id.toString(),
                                                                        label: item.name,
                                                                    })) || []
                                                                }
                                                                value={controllerField.value}
                                                                onValueChange={(value: any) => {
                                                                    const isAlready = fieldsProduct.some(
                                                                        (item) => item.productId === value,
                                                                    );
                                                                    if (isAlready) {
                                                                        form.setError(`product.${index}.productId`, {
                                                                            type: "custom",
                                                                            message: "Product already exists",
                                                                        });
                                                                        return;
                                                                    }
                                                                    controllerField.onChange(value);
                                                                    const unit =
                                                                        listProducts
                                                                            ?.find((f) => f.id === Number(value))
                                                                            ?.unit?.toString() || "";
                                                                    form.setValue(
                                                                        `product.${index}.productUnit`,
                                                                        unit,
                                                                    );
                                                                }}
                                                                name={controllerField.name}
                                                                className="bg-white"
                                                                disabled={isReadOnly}
                                                            />
                                                            {fieldState.invalid && (
                                                                <FieldError errors={[fieldState.error]} />
                                                            )}
                                                        </Field>
                                                    </Field>
                                                )}
                                            />
                                            <div className="flex gap-1">
                                                <Controller
                                                    name={`product.${index}.productQty`}
                                                    control={form.control}
                                                    render={({ field: controllerField, fieldState }) => (
                                                        <Field
                                                            orientation="horizontal"
                                                            data-invalid={fieldState.invalid}
                                                            className="items-baseline shrink"
                                                        >
                                                            <Field data-invalid={fieldState.invalid}>
                                                                <Input
                                                                    {...controllerField}
                                                                    id="form-select-productQty"
                                                                    aria-invalid={fieldState.invalid}
                                                                    placeholder="Qty"
                                                                    value={controllerField.value}
                                                                    name={controllerField.name}
                                                                    onChange={(e) =>
                                                                        controllerField.onChange(
                                                                            Number(e.target.value) || "",
                                                                        )
                                                                    }
                                                                    min={1}
                                                                    type="number"
                                                                    className="bg-white"
                                                                    readOnly={isReadOnly}
                                                                />
                                                                {fieldState.invalid && (
                                                                    <FieldError errors={[fieldState.error]} />
                                                                )}
                                                            </Field>
                                                        </Field>
                                                    )}
                                                />
                                                <Controller
                                                    name={`product.${index}.productUnit`}
                                                    control={form.control}
                                                    render={({ field: controllerField, fieldState }) => (
                                                        <Field
                                                            orientation="horizontal"
                                                            data-invalid={fieldState.invalid}
                                                            className="items-baseline shrink"
                                                        >
                                                            <Field data-invalid={fieldState.invalid}>
                                                                <Input
                                                                    {...controllerField}
                                                                    id="form-select-productUnit"
                                                                    aria-invalid={fieldState.invalid}
                                                                    placeholder="Unit"
                                                                    value={controllerField.value}
                                                                    name={controllerField.name}
                                                                    readOnly
                                                                    className="bg-white"
                                                                />
                                                                {fieldState.invalid && (
                                                                    <FieldError errors={[fieldState.error]} />
                                                                )}
                                                            </Field>
                                                        </Field>
                                                    )}
                                                />
                                                {!isReadOnly && (
                                                    <Button
                                                        variant="destructive"
                                                        size={"sm"}
                                                        onClick={() => removeProduct(index)}
                                                    >
                                                        <Trash2 />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {!isReadOnly && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                appendProduct({
                                                    productId: "",
                                                    productQty: 0,
                                                    productUnit: "",
                                                })
                                            }
                                            className="mt-2"
                                        >
                                            <IconPlus /> Add Product
                                        </Button>
                                    )}
                                </FieldGroup>
                                {form.formState.errors.product?.root && (
                                    <FieldError errors={[form.formState.errors.product.root]} />
                                )}
                            </FieldSet>
                        </form>
                    )}
                </div>

                {
                    !isReadOnly && (
                        <DialogFooter className="bg-white mt-4">
                            <Field orientation="horizontal" className="justify-end">
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Close
                                </Button>
                                {!isReadOnly && (
                                    <>
                                        <Button
                                            type="button"
                                            variant={"secondary"}
                                            form="form-dialog-purchase-request"
                                            onClick={form.handleSubmit((data) =>
                                                onSubmit(data, true),
                                            )}
                                        >
                                            Save as Draft
                                        </Button>
                                        <Button
                                            type="button"
                                            form="form-dialog-purchase-request"
                                            onClick={form.handleSubmit((data) =>
                                                onSubmit(data, false),
                                            )}
                                        >
                                            Submit for Approval
                                        </Button>
                                    </>
                                )}
                            </Field>
                        </DialogFooter>
                    )
                }
            </DialogContent>
        </Dialog>
    );
};

export default DialogFormPurchaseRequest