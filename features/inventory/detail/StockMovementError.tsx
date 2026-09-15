import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCw } from "lucide-react";

const StockMovementError = ({
    message = "Stock movements couldn't be loaded. Check your connection and try again.",
    onRetry,
}: {
    message?: string;
    onRetry?: () => void;
}) => {
    return (
        <Alert variant="destructive">
            <AlertCircle className="size-4" />
            <AlertTitle>Failed to load stock movements</AlertTitle>
            <AlertDescription className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span>{message}</span>
                {onRetry && (
                    <Button variant="outline" size="sm" onClick={onRetry}>
                        <RotateCw className="mr-2 size-4" />
                        Try again
                    </Button>
                )}
            </AlertDescription>
        </Alert>
    );
}


export default StockMovementError