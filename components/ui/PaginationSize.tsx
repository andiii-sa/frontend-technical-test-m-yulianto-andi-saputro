import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface PaginationSizeProps {
    perPage: number;
    total: number;
    length: number;
    pageNumber: number;
    onChange: (value: number) => void;
}

const listPage = [5, 10, 20, 50, 100];

const PaginationSize = ({
    perPage,
    total,
    pageNumber,
    onChange,
}: PaginationSizeProps) => {
    const start = total === 0 ? 0 : (pageNumber - 1) * perPage + 1;
    const end = Math.min(start + perPage - 1, total);
    const paginationMessage = `Menampilkan ${start} - ${end} dari ${total}`;

    const handleChange = (value: string | null) => {
        const numValue = Number(value);
        if (!Number.isNaN(numValue)) {
            onChange(numValue);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Select
                value={String(perPage)}
                onValueChange={handleChange}
                disabled={total === 0}
            >
                <SelectTrigger className="w-20">
                    <SelectValue placeholder="Pilih jumlah" />
                </SelectTrigger>
                <SelectContent>
                    {listPage.map((page) => (
                        <SelectItem key={page} value={String(page)}>
                            {page}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <span className="text-sm text-gray-500"> {paginationMessage} </span>
        </div>
    );
};

export default PaginationSize