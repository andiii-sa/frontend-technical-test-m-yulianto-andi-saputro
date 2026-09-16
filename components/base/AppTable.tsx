import { cn } from "cn";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import ErrorState from "../shared/ErrorState";
import PaginationSize from "../ui/PaginationSize";
import PaginationTable from "../ui/PaginationTable";
import { Button } from "../ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface AppTableProps {
    caption?: ReactNode;
    title?: string;
    headContent?: ReactNode
    data?: any[];
    headers: {
        label: string;
        key: string;
        classCellHeader?: string;
        classCellItem?: string;
        renderItem?: (value: any, row: any, index: number) => void;
        renderHeader?: (index: number) => ReactNode;
    }[];
    isLoading?: boolean;
    perPage: number;
    total: number;
    pageNumber: number;
    lengthPage: number;
    isHaveFilter?: boolean;
    titleEmpty?: string;
    subtitleEmpty?: string;
    isErrorFetch?: boolean;
    className?: string;
    showHeader?: boolean
    showPaginationNumber?: boolean
    showPaginationMore?: boolean
    showAddButton?: boolean
    handleChangePage: (page: number) => void;
    handleChangePerPage: (page: number) => void;
    handleRetryFetch: () => void;
    handleAddData?: () => void;
    handleResetFilter?: () => void;
}

const AppTable = ({
    caption,
    title,
    data,
    headers,
    isLoading,
    perPage,
    total,
    pageNumber,
    lengthPage,
    isHaveFilter,
    titleEmpty,
    subtitleEmpty,
    isErrorFetch,
    className,
    headContent,
    showHeader = true,
    showPaginationMore,
    showPaginationNumber = true,
    handleChangePage,
    handleChangePerPage,
    handleRetryFetch,
    handleAddData,
    handleResetFilter,
    showAddButton = false
}: AppTableProps) => {
    return (
        <div className={cn("card !p-0", className)}>
            {
                title && (
                    <div className="px-3.5 py-1.5 border-b">
                        <h4 className="font-medium text-xs text-fg">{title}</h4>
                    </div>
                )
            }
            {
                headContent && headContent
            }
            <Table>
                {caption && <TableCaption>{caption}</TableCaption>}
                <TableHeader className={cn(!showHeader && 'hidden')}>
                    <TableRow className="bg-table-header">
                        {headers.map((header, idx) => (
                            <TableHead key={idx} className={cn('text-fg-muted', header.classCellHeader)}>
                                {header.renderHeader ? header.renderHeader(idx) : header.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="text-sm">
                    {isLoading ? (
                        Array.from({ length: perPage }).map((_, idx) => (
                            <TableRow key={idx}>
                                {headers.map((_, idy) => (
                                    <TableCell key={idy} className="text-center">
                                        <div className="skeleton-shimmer h-8 rounded-sm"></div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : !data?.length ? (
                        <TableRow>
                            <TableCell colSpan={headers.length} className="text-center">
                                <ErrorState
                                    isErrorFetch={isErrorFetch}
                                    isHaveFilter={isHaveFilter}
                                    titleEmpty={titleEmpty}
                                    subtitleEmpty={subtitleEmpty}
                                    handleRetryFetch={handleRetryFetch}
                                    handleResetFilter={handleResetFilter}
                                    showAddButton={showAddButton}
                                    handleAddData={handleAddData}
                                    isLoading={isLoading}
                                    data={data}
                                />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {data.map((row, idx) => (
                                <TableRow key={idx}>
                                    {headers.map((header, idy) => (
                                        <TableCell className={cn(header.classCellItem)} key={idy}>
                                            {header.renderItem
                                                ? header.renderItem(row?.[header.key], row, idx)
                                                : row?.[header.key] || ""}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </>
                    )}
                </TableBody>
            </Table>

            <div className={cn("mt-2 px-3 py-4 flex flex-col md:flex-row md:flex-wrap justify-between gap-2", !showPaginationNumber && 'hidden')}>
                <PaginationSize
                    length={lengthPage}
                    onChange={handleChangePerPage}
                    pageNumber={pageNumber}
                    perPage={perPage}
                    total={total}
                />

                <PaginationTable
                    perPage={perPage}
                    total={total}
                    pageNumber={pageNumber}
                    length={lengthPage}
                    onChange={handleChangePage}
                />
            </div>

            <div className={cn("my-2 flex flex-row justify-center", (!showPaginationMore || pageNumber >= lengthPage) && 'hidden')}>
                <Button variant="secondary" size="xs" onClick={() => handleChangePage(pageNumber + 1)} loading={isLoading}>
                    Load More <ChevronDown />
                </Button>
            </div>
        </div>
    );
};

export default AppTable