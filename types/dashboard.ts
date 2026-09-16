/**
 * Dashboard: angka ringkasan dan daftar aktivitas terbaru.
 * Keduanya nilai turunan — dihitung di layer service/mock API, bukan di komponen.
 * Letakkan di: src/types/dashboard.ts
 */

import type { ID, ISODateString } from "./common";

export interface DashboardSummary {
  label: string;
  value: number;
  description: string;
}

export type ActivityType =
  | "PURCHASE_REQUEST_CREATED"
  | "PURCHASE_REQUEST_SUBMITTED"
  | "PURCHASE_REQUEST_APPROVED"
  | "PURCHASE_REQUEST_REJECTED"
  | "PURCHASE_ORDER_CREATED"
  | "GOODS_RECEIVED";

export type ActivityEntity =
  | "PURCHASE_REQUEST"
  | "PURCHASE_ORDER"
  | "GOODS_RECEIPT";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  /** Dipakai untuk menyusun tautan ke halaman detail yang tepat. */
  entity: ActivityEntity;
  entityId: ID;
  /** Nomor dokumen yang ditampilkan, contoh "PR-2026-000021". */
  documentNumber: string;
  warehouseName: string;
  actorName: string;
  createdAt: ISODateString;
}

export interface DashboardRecentActivity {
  status: string;
  label: string;
  description: string;
  date: string;
}
