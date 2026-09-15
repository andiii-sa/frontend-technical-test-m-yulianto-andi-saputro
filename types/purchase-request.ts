/**
 * Purchase Request: bentuk database, bentuk response, dan payload request.
 * Letakkan di: src/types/purchase-request.ts
 */

import type { ID, ISODateString, Unit } from "./common";
import type { ProductRef, User, Warehouse } from "./master";
import type { PurchaseOrderSummary } from "./purchase-order";

export type PurchaseRequestStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED";

export const PURCHASE_REQUEST_STATUSES: readonly PurchaseRequestStatus[] = [
  "DRAFT",
  "SUBMITTED",
  "APPROVED",
  "REJECTED",
];

/* ---------------------------------------------------------------------------
 * Bentuk database (ternormalisasi) — dipakai in-memory DB pada mock API
 * ------------------------------------------------------------------------- */

export interface PurchaseRequestItem {
  id: ID;
  productId: ID;
  quantity: number;
  /** Snapshot unit saat item dibuat, agar histori tidak berubah bila master product diedit. */
  unit: Unit;
}

export interface PurchaseRequest {
  id: ID;
  requestNumber: string; // PR-2026-000001
  warehouseId: ID;
  requestedById: ID;
  status: PurchaseRequestStatus;
  items: PurchaseRequestItem[];
  notes: string | null;
  /** Wajib terisi ketika status REJECTED, null pada status lain. */
  rejectionReason: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  submittedAt: ISODateString | null;
  decidedAt: ISODateString | null;
  decidedById: ID | null;
  /** Terisi setelah approval, menunjuk Purchase Order yang terbentuk. */
  purchaseOrderId: ID | null;
}

/* ---------------------------------------------------------------------------
 * Bentuk response (relasi terlampir) — dipakai komponen
 * ------------------------------------------------------------------------- */

export interface PurchaseRequestItemDetail extends PurchaseRequestItem {
  product: ProductRef;
}

export interface PurchaseRequestDetail
  extends Omit<PurchaseRequest, "items"> {
  warehouse: Warehouse;
  requestedBy: User;
  decidedBy: User | null;
  items: PurchaseRequestItemDetail[];
  purchaseOrder: PurchaseOrderSummary | null;
  /** Turunan: dihitung server, tidak disimpan di database. */
  totalItems: number;
  /** Turunan: jumlah seluruh quantity item. */
  totalQuantity: number;
}

/** Halaman daftar memakai bentuk yang sama; kolom tabel hanya memilih sebagiannya. */
export type PurchaseRequestListItem = PurchaseRequestDetail;

/** Bentuk ringkas yang dilampirkan di dalam Purchase Order, untuk menghindari relasi melingkar. */
export interface PurchaseRequestSummary {
  id: ID;
  requestNumber: string;
  status: PurchaseRequestStatus;
  requestedBy: User;
}

/* ---------------------------------------------------------------------------
 * Payload & filter
 * ------------------------------------------------------------------------- */

export interface PurchaseRequestItemPayload {
  productId: ID;
  quantity: number;
}

export interface CreatePurchaseRequestPayload {
  warehouseId: ID;
  notes?: string | null;
  items: PurchaseRequestItemPayload[];
}

export type UpdatePurchaseRequestPayload = CreatePurchaseRequestPayload;

export interface RejectPurchaseRequestPayload {
  reason: string;
}

export interface PurchaseRequestFilters {
  q?: string;
  /** Tidak diisi berarti seluruh status. */
  status?: PurchaseRequestStatus;
  warehouseId?: ID;
  page?: number;
  limit?: number;
}