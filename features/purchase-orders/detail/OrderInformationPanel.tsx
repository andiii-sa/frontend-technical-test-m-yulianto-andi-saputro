import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertDate } from "@/lib/utils";
import { PurchaseOrderListItem } from "@/types";
import Link from "next/link";

const OrderInformationPanel = ({
    data,
    purchaseRequestHref,
}: {
    data: PurchaseOrderListItem;
    purchaseRequestHref: (id: number) => string;
}) => {
    const isOpen =
        data.status === "ORDERED" || data.status === "PARTIALLY_RECEIVED";
    const overdue =
        isOpen &&
        data.expectedDate !== null &&
        new Date(data.expectedDate) < new Date();

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-base">Order Information</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    <Field label="Supplier">
                        {data.supplier.name}
                        <span className="block text-xs font-normal text-muted-foreground">
                            {data.supplier.code}
                        </span>
                    </Field>
                    <Field label="Warehouse">
                        {data.warehouse.name}
                        <span className="block text-xs font-normal text-muted-foreground">
                            {data.warehouse.code}, {data.warehouse.city}
                        </span>
                    </Field>
                    <Field label="Created at">
                        {convertDate(data.createdAt, "DD MMM YYYY")}
                    </Field>
                    <Field label="Expected date">
                        <span className={overdue ? "text-destructive" : undefined}>
                            {convertDate(data.expectedDate || "", "DD MMM YYYY")}
                            {overdue && (
                                <span className="ml-1.5 text-xs font-normal">(overdue)</span>
                            )}
                        </span>
                    </Field>
                    <Field label="Linked PR">
                        {data.purchaseRequest ? (
                            <>
                                <Link
                                    href={purchaseRequestHref(data.purchaseRequest.id)}
                                    className="text-primary underline-offset-4 hover:underline"
                                >
                                    {data.purchaseRequest.requestNumber}
                                </Link>
                                <span className="block text-xs font-normal text-muted-foreground">
                                    Requested by {data.purchaseRequest.requestedBy.name}
                                </span>
                            </>
                        ) : (
                            <span className="text-muted-foreground">—</span>
                        )}
                    </Field>
                </dl>
            </CardContent>
        </Card>
    );
};
const Field = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => {
    return (
        <div className="space-y-1">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="text-sm font-medium">{children}</dd>
        </div>
    );
};

export default OrderInformationPanel