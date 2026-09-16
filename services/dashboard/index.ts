import { apiFetch } from "@/lib/api-client"
import { DashboardRecentActivity, DashboardSummary, IResApiDetail } from "@/types"


export const getDashboardSummary = async (signal: any) => {
    return apiFetch<IResApiDetail<DashboardSummary[]>>(`/dashboard/summary`, { signal }).then((r) => r.data)
}

export const getDashboardRecentActivity = async (signal: any) => {
    return apiFetch<IResApiDetail<DashboardRecentActivity[]>>(`/dashboard/recent-activity`, { signal }).then((r) => r.data)
}