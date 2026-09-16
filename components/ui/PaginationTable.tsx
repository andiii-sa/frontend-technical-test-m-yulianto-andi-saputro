import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./pagination";

interface PaginationTableProps {
    perPage: number;
    total: number;
    pageNumber: number;
    length: number;
    onChange: (page: number) => void;
}

const PaginationTable = ({
    // perPage,
    total,
    pageNumber,
    length,
    onChange,
}: PaginationTableProps) => {
    if (total === 0 || length <= 0) {
        return null;
    }
    const handleFirstPage = () => {
        onChange(1);
    };

    const handlePrevPage = () => {
        onChange(Math.max(1, pageNumber - 1));
    };
    const handleChangePage = (page: number) => {
        onChange(page);
    };
    const handleNextPage = () => {
        onChange(Math.min(length, pageNumber + 1));
    };
    const handleLastPage = () => {
        onChange(length);
    };

    const getPaginationItems = () => {
        const items: (number | "ellipsis")[] = [];

        if (length <= 5) {
            for (let i = 1; i <= length; i++) {
                items.push(i);
            }
            return items;
        }

        items.push(1);

        if (pageNumber > 3) {
            items.push("ellipsis");
        }
        const start = Math.max(2, pageNumber - 1);
        const end = Math.min(length - 1, pageNumber + 1);
        for (let i = start; i <= end; i++) {
            items.push(i);
        }
        if (pageNumber < length - 2) {
            items.push("ellipsis");
        }
        items.push(length);
        return items;
    };

    const paginationItems = getPaginationItems();
    return (
        <Pagination className="mx-0 w-fit">
            <PaginationContent className="flex-wrap">
                <PaginationItem>
                    <PaginationLink
                        href="#"
                        aria-label="Halaman pertama"
                        className="border border-slate-200"
                        onClick={(event) => {
                            event.preventDefault();
                            handleFirstPage();
                        }}
                    >
                        <ChevronsLeft />
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        className="border border-slate-200"
                        onClick={(event) => {
                            event.preventDefault();
                            handlePrevPage();
                        }}
                    >
                        <ChevronLeft />
                    </PaginationPrevious>
                </PaginationItem>

                {paginationItems.map((item, index) => {
                    if (item === "ellipsis") {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={item}>
                            <PaginationLink
                                href="#"
                                isActive={item === pageNumber}
                                className="border border-slate-200"
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleChangePage(item);
                                }}
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                <PaginationItem>

                    <PaginationNext
                        href="#"
                        className="border border-slate-200"
                        onClick={(event) => {
                            event.preventDefault();
                            handleNextPage();
                        }}
                    >
                        <ChevronRight />
                    </PaginationNext>
                </PaginationItem>

                <PaginationItem>

                    <PaginationLink
                        href="#"
                        aria-label="Halaman terakhir"
                        className="border border-slate-200"
                        onClick={(event) => {
                            event.preventDefault();
                            handleLastPage();
                        }}
                    >
                        <ChevronsRight />
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationTable