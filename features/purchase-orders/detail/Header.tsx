
import Badge, { BadgeColor } from "@/components/base/Badge";
import { Button } from "@/components/ui/button";
import { typeBadgeStatusPurchase } from "@/lib/utils";
import { PurchaseOrderListItem, ReceiveAction } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ReceiveGoodsButton from "./ReceiveGoodsButton";

const Header = ({
    data,
    action,
    onReceive,
}: {
    data: PurchaseOrderListItem;
    action: ReceiveAction;
    onReceive: () => void;
}) => {
    const router = useRouter();

    return (
        <div className="space-y-4">
            <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground" onClick={() => router.back()} >
                <ArrowLeft className="size-4" />
                Purchase Orders
            </Button>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {data.orderNumber}
                    </h1>
                    <Badge
                        label={data.status?.toLowerCase()?.replaceAll("_", " ")}
                        color={typeBadgeStatusPurchase[data.status] as BadgeColor}
                        className="capitalize"
                    />
                </div>
                <ReceiveGoodsButton action={action} onClick={onReceive} />
            </div>
        </div>
    );
};

export default Header