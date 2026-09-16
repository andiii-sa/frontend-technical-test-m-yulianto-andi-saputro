import { IconChart, IconCheck, IconPackage } from '@/assets/icons';
import AppTable from '@/components/base/AppTable';
import { DashboardRecentActivity } from '@/types';

interface RecentActivityProps {
    items: DashboardRecentActivity[]
    handleRetryFetch: () => void
    isLoading: boolean
    isError: boolean
}

const RecentActivity = ({ items, handleRetryFetch, isLoading, isError }: RecentActivityProps) => {

    const recentActivityHeaders = [
        {
            label: "Activity",
            key: "label",
            renderItem: ((_v: string, row: any) => (
                <div className="flex items-center gap-2">
                    <div className="bg-surface text-fg-muted p-1 rounded-sm border border-fg-subtle">
                        {row?.status === "APPROVED" ? <IconCheck className="size-4" /> : row?.status === "ORDERED" ? <IconChart className="size-4" /> : <IconPackage className="size-4" />}
                    </div>
                    <div>
                        <div className="text-fg font-medium text-xs">{row?.label}</div>
                        <div className="text-fg-muted font-normal text-[10px]">{row?.description}</div>
                    </div>
                </div>
            ))
        },
    ];

    return (
        <AppTable
            className="lg:col-span-3 h-fit"
            headers={recentActivityHeaders}
            data={items || []}
            isLoading={isLoading}
            perPage={10}
            total={100}
            pageNumber={1}
            lengthPage={10}
            isHaveFilter={false}
            titleEmpty="Data Tidak Ditemukan"
            subtitleEmpty={`Anda belum memiliki data aktivitas.`}
            isErrorFetch={isError}
            handleChangePage={() => { }}
            handleChangePerPage={() => { }}
            title="Recent Activity"
            showHeader={false}
            showPaginationNumber={false}
            showPaginationMore={false}
            handleRetryFetch={handleRetryFetch}
        />
    )
}

export default RecentActivity