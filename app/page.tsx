"use client";

import ProcurementOverview from "@/features/dashboard/ProcurementOverview";
import PurechaseRequestReview from "@/features/dashboard/PurechaseRequestReview";
import RecentActivity from "@/features/dashboard/RecentActivity";
import Summary from "@/features/dashboard/Summary";
import PurchaseRequestTable from "@/features/purchase-requests/PurchaseRequestTable";
import {
  useDashboardRecentActivity,
  useDashboardSummary,
} from "@/services/dashboard/queries";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";

export default function Home() {
  useBreadcrumb(['Dashboard'])
  const {
    data: summaryData,
    isPending: isPendingSummary,
    isFetching: isFetchingSummary,
    isError: isErrorSummary,
    refetch: refetchSummary,
  } = useDashboardSummary();

  const {
    data: recentActivityData,
    isPending: isPendingRecentActivity,
    isFetching: isFetchingRecentActivity,
    isError: isErrorRecentActivity,
    refetch: refetchRecentActivity,
  } = useDashboardRecentActivity();

  return (
    <div>
      <ProcurementOverview />
      <PurechaseRequestReview
        count={
          summaryData?.find(
            (item) => item.label.toLowerCase() === "waiting for approval",
          )?.value || 0
        }
        isLoading={isPendingSummary || isFetchingSummary}
      />
      <Summary
        items={summaryData || []}
        isLoading={isPendingSummary || isFetchingSummary}
        isError={isErrorSummary}
        handleRetryFetch={refetchSummary}
      />
      <section className="grid grid-cols-1 lg:grid-cols-10 gap-2 mt-3">
        <PurchaseRequestTable
          showButtonAdd={false}
          className="lg:col-span-7 !-mt-3"
          showColumnAction={false}
          titleTable="Recent Purchase Requests"
        />
        <RecentActivity
          items={recentActivityData || []}
          isLoading={isPendingRecentActivity || isFetchingRecentActivity}
          isError={isErrorRecentActivity}
          handleRetryFetch={refetchRecentActivity}
        />
      </section>
    </div>
  );
}
