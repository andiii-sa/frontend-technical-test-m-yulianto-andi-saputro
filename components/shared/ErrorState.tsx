import { IconAlert, IconDocument, IconSearch } from "@/assets/icons";
import { cn } from "cn";
import { Button } from "../ui/button";
import { ReactNode } from "react";

type ErrorStateProps = {
    isErrorFetch?: boolean;
    isHaveFilter?: boolean;
    titleEmpty?: string;
    subtitleEmpty?: string;
    handleRetryFetch?: () => void;
    handleResetFilter?: () => void;
    showAddButton?: boolean;
    handleAddData?: () => void;
    isLoading?: boolean;
    data?: any[] | any;
    className?: string
    isBordered?: boolean
    children?: ReactNode
};

const ErrorState = (props: ErrorStateProps) => {
    const {
        isErrorFetch,
        isHaveFilter,
        titleEmpty,
        subtitleEmpty,
        handleRetryFetch,
        handleResetFilter,
        showAddButton,
        handleAddData,
        isLoading,
        data,
        className,
        isBordered,
        children
    } = props;
    return (
        <div className={cn("flex flex-col gap-2 items-center py-6 px-4", isBordered && "border rounded-md", className)}>
            <div className="p-2 border rounded-md grid place-items-center mx-auto bg-surface">
                {isErrorFetch ? (
                    <IconAlert className="size-8" />
                ) : isHaveFilter ? (
                    <IconSearch className="size-8" />
                ) : (
                    <IconDocument className="size-8" />
                )}
            </div>
            <h4 className="font-medium text-sm">
                {isErrorFetch
                    ? "Gagal memuat data"
                    : isHaveFilter
                        ? "Data Tidak Ditemukan"
                        : titleEmpty || "Tidak Ada Terdapat data"}
            </h4>
            <p className="text-xs text-fg-muted whitespace-break-spaces">
                {isErrorFetch
                    ? "Terjadi kesalahan saat memuat data. Silakan coba lagi."
                    : isHaveFilter
                        ? "Mohon coba menggunakan kata kunci yang berbeda atau sesuaikan \npengaturan filter untuk mendapatkan hasil yang relevan"
                        : subtitleEmpty || "Anda Tidak Memiliki Data"}
            </p>

            {isErrorFetch && (
                <Button
                    variant="destructive"
                    className="mt-3"
                    onClick={handleRetryFetch}
                    loading={isLoading}
                >
                    Coba Lagi
                </Button>
            )}
            {isHaveFilter && !isErrorFetch && (!data?.length || !data) && (
                <Button
                    variant="default"
                    className="mt-3"
                    onClick={handleResetFilter}
                    loading={isLoading}
                >
                    Reset Filter
                </Button>
            )}
            {showAddButton && !isHaveFilter && (!data?.length || !data) && (
                <Button
                    variant="default"
                    className="mt-3"
                    onClick={handleAddData}
                    loading={isLoading}
                >
                    Tambah Data
                </Button>
            )}

            {children}
        </div>
    );
};

export default ErrorState;
