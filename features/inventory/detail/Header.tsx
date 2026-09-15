import Badge from "@/components/base/Badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { InventoryStockDetail } from "@/types";
import { Warehouse } from "lucide-react";

interface HeaderProps {
    data: InventoryStockDetail;
}

// IMV-01
const Header = ({ data }: HeaderProps) => {
    const { product, warehouse, quantity } = data;
    return (
        <Card>
            <CardContent className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge color="blue" label={product.sku} className=""></Badge>
                        <span className="text-sm text-muted-foreground">
                            {product.category}
                        </span>
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {product.name}
                    </h1>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Warehouse className="size-4" aria-hidden />
                        {warehouse.name} ({warehouse.code}), {warehouse.city}
                    </p>
                </div>

                <div className="sm:text-right">
                    <p className="text-sm text-muted-foreground">Current stock</p>
                    <p className="text-4xl font-bold tabular-nums leading-none sm:text-5xl">
                        {formatNumber(quantity)}
                        <span className="ml-2 text-base font-medium text-muted-foreground">
                            {product.unit}
                        </span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default Header;
