import { Button } from "@/components/ui/button";
import { ReceiveAction } from "@/types";
import { PackageCheck } from "lucide-react";

const ReceiveGoodsButton = ({
    action,
    onClick,
}: {
    action: ReceiveAction;
    onClick: () => void;
}) => {
    if (!action.visible) return null;

    if (!action.enabled) {
        return (
            <div className="flex flex-col items-start gap-1 sm:items-end">
                <Button
                    disabled
                    className="pointer-events-none"
                    aria-describedby="receive-disabled-reason"
                >
                    <PackageCheck className="size-4" />
                    Receive Goods
                </Button>
                <p
                    id="receive-disabled-reason"
                    className="text-xs text-muted-foreground"
                >
                    {action.reason}
                </p>
            </div>
        );
    }

    return (
        <Button onClick={onClick}>
            <PackageCheck className="size-4" />
            Receive Goods
        </Button>
    );
};

export default ReceiveGoodsButton