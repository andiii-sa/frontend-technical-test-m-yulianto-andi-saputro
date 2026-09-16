import { ApiError } from "@/lib/api-client";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getDashboardRecentActivity, getDashboardSummary } from ".";

export const dashboardKeys = {
  all: ["dashboard"],
  lists: () => [...dashboardKeys.all, "list"],
  summary: () => [...dashboardKeys.all, "summary"],
  recentActivity: () => [...dashboardKeys.all, "recent-activity"],
};

export const useDashboardSummary = () => {
  return useQuery(
    queryOptions({
      queryKey: dashboardKeys.summary(),
      queryFn: ({ signal }) => getDashboardSummary(signal),
      retry: (count, err) =>
        !(err instanceof ApiError && err.status === 404) && count < 2,
    }),
  );
};

export const useDashboardRecentActivity = () => {
  return useQuery(
    queryOptions({
      queryKey: dashboardKeys.recentActivity(),
      queryFn: ({ signal }) => getDashboardRecentActivity(signal),
      retry: (count, err) =>
        !(err instanceof ApiError && err.status === 404) && count < 2,
    }),
  );
};
