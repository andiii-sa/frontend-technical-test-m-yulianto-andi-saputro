import { PackageOpen } from "lucide-react";

const MovementEmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 border-t px-6 py-12 text-center">
            <PackageOpen className="size-10 text-muted-foreground" aria-hidden />
            <p className="text-sm text-muted-foreground">
                No movements recorded for this product.
            </p>
        </div>
    );
}

export default MovementEmptyState