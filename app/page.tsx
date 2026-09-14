"use client";

import ProcurementOverview from "@/features/dashboard/ProcurementOverview";
import PurechaseRequestReview from "@/features/dashboard/PurechaseRequestReview";
import RecentActivity from "@/features/dashboard/RecentActivity";
import RecentPurchaseRequests from "@/features/dashboard/RecentPurchaseRequests";
import Summary from "@/features/dashboard/Summary";

const summary = [
  {
    label: "Total Purchase Requests",
    value: 48,
    description: "+6 this month",
  },
  {
    label: "Waiting for Approval",
    value: 8,
    description: "Requires manager action",
  },
  {
    label: "Active Purchase Orders",
    value: 21,
    description: "12 expected this week",
  },
  {
    label: "Partially Received Orders",
    value: 5,
    description: "Receiving still in progress",
  },
];


const requestPurchaseData = [
  {
    requestId: "PR-2026-0048",
    requestBy: "Sarah Lim",
    warehouse: "Main Warehouse",
    itemsTotal: 4,
    date: new Date(),
    status: "SUBMITTED",
  },
  {
    requestId: "PR-2026-0049",
    requestBy: "Daniel Wong",
    warehouse: "Jakarta Hub",
    itemsTotal: 2,
    date: new Date(),
    status: "APPROVED",
  },
  {
    requestId: "PR-2026-0050",
    requestBy: "Aditya Putra",
    warehouse: "Main Warehouse",
    itemsTotal: 6,
    date: new Date(),
    status: "DRAFT",
  },
];


const recentActivityData = [
  {
    status: "APPROVED",
    label: "PR-2026-0047 Approved",
    description: "Approved by Alex Morgan",
    date: new Date(),
  },
  {
    status: "ORDERED",
    label: "PO-2026-0047 Ordered",
    description: "Sent to Pacific Industrial Supply.",
    date: new Date(),
  },
  {
    status: "RECEIPT",
    label: "Partial Goods Receipt",
    description: "120 of 200 units received.",
    date: new Date(),
  },
];



export default function Home() {
  return (
    <div>
      <ProcurementOverview />
      <PurechaseRequestReview />
      <Summary items={summary} />
      <section className="grid grid-cols-1 lg:grid-cols-10 gap-2 mt-3">
        <RecentPurchaseRequests items={requestPurchaseData} handleRetryFetch={() => { }} />
        <RecentActivity items={recentActivityData} handleRetryFetch={() => { }} />
      </section>
    </div>
  );
}