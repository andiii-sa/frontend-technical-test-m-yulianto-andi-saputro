import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
    CheckCheckIcon,
    Languages,
    SquareText,
    Star,
    TriangleAlert,
    X
} from "lucide-react";

import { ReactNode } from "react";

type DialogType =
    | "confirm"
    | "cancel"
    | "check"
    | "star"
    | "language"
    | "warning";

interface DialogConfirmationProps {
    type?: DialogType;
    open?: boolean;
    title?: string;
    description?: string;

    textClose?: string;
    textSubmit?: string;

    showClose?: boolean;
    showSubmit?: boolean;

    loading?: boolean;
    showLoading?: boolean;

    classSubmit?: string;
    classClose?: string;

    persistent?: boolean;

    trigger?: ReactNode;
    heading?: ReactNode;
    footerLeft?: ReactNode;
    footerRight?: ReactNode;

    onCancel?: () => void;
    onSubmit?: () => void;
    children?: ReactNode
}

const iconState = {
    confirm: SquareText,
    cancel: X,
    check: CheckCheckIcon,
    star: Star,
    language: Languages,
    warning: TriangleAlert,
};

const DialogConfirmation = ({
    type = "confirm",
    open,
    title = "",
    description = "",

    textClose = "Back",
    textSubmit = "Publish",

    showClose = true,
    showSubmit = true,

    loading = false,
    showLoading = true,

    classSubmit = "",
    classClose = "",

    persistent = false,

    trigger,
    heading,
    footerLeft,
    footerRight,

    onCancel,
    onSubmit,
    children
}: DialogConfirmationProps) => {
    const IconState = iconState[type];

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value) {
                    if (persistent) {
                        return;
                    }

                    onCancel?.();
                }
            }}
        >
            {trigger && <DialogTrigger>{trigger}</DialogTrigger>}

            <DialogContent className="p-10 sm:max-w-lg">
                <DialogTitle className="sr-only">{title || "Dialog"}</DialogTitle>

                <div className="flex flex-col items-center">
                    <div className="p-4 mb-5 rounded-full border bg-slate-300">
                        <IconState className="text-primary" />
                    </div>

                    {heading}

                    {title && (
                        <p className="mt-5 text-center text-2xl font-bold text-gray-800">
                            {title}
                        </p>
                    )}

                    {description && (
                        <p className="mt-2.5 text-center text-base font-medium text-gray-500">
                            {description}
                        </p>
                    )}

                    {children}
                </div>

                <DialogFooter className="!justify-center border-t-0 bg-transparent">
                    {footerLeft}

                    {showClose && (
                        <Button
                            type="button"
                            variant="outline"
                            className={cn(type === "cancel" && "order-2", classClose)}
                            disabled={loading}
                            onClick={onCancel}
                        >
                            {textClose}
                        </Button>
                    )}

                    {showSubmit && (
                        <Button
                            type="button"
                            variant={type === "cancel" ? "destructive" : "default"}
                            className={cn(type === "cancel" && "order-1", classSubmit)}
                            disabled={loading}
                            onClick={onSubmit}
                            loading={loading && showLoading}
                        >
                            {textSubmit}
                        </Button>
                    )}

                    {footerRight}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default DialogConfirmation;
