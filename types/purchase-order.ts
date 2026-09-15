/**
 * Purchase Order: bentuk database, bentuk response, dan filter.
 * Letakkan di: src/types/purchase-order.ts
 */

import type { ID, ISODateString, Unit } from "./common";
import type { ProductRef, Supplier, Warehouse } from "./master";
import type { PurchaseRequestSummary } from "./purchase-request";
import type { GoodsReceiptSummary } from "./goods-receipt";

export type PurchaseOrderStatus =
  | "DRAFT"
  | "ORDERED"
  | "PARTIALLY_RECEIVED"
  | "RECEIVED"
  | "CANCELLED";

export const PURCHASE_ORDER_STATUSES: readonly PurchaseOrderStatus[] = [
  "DRAFT",
  "ORDERED",
  "PARTIALLY_RECEIVED",
  "RECEIVED",
  "CANCELLED",
];

/** Status yang masih berjalan; dipakai kartu "Active Purchase Orders" di dashboard. */
export const ACTIVE_PURCHASE_ORDER_STATUSES: readonly PurchaseOrderStatus[] = [
  "ORDERED",
  "PARTIALLY_RECEIVED",
];

/* ---------------------------------------------------------------------------
 * Bentuk database
 * ------------------------------------------------------------------------- */

export interface PurchaseOrderItem {
  id: ID;
  productId: ID;
  orderedQuantity: number;
  /** Akumulasi dari seluruh Goods Receipt pada PO ini. */
  receivedQuantity: number;
  unit: Unit;
  // remainingQuantity TIDAK disimpan — lihat PurchaseOrderItemDetail.
}

export interface PurchaseOrder {
  id: ID;
  orderNumber: string; // PO-2026-000001
  /** PO selalu berasal dari satu Purchase Request yang disetujui. */
  purchaseRequestId: ID;
  supplierId: ID;
  warehouseId: ID;
  status: PurchaseOrderStatus;
  items: PurchaseOrderItem[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
  expectedDate: ISODateString | null;
}

/* ---------------------------------------------------------------------------
 * Bentuk response
 * ------------------------------------------------------------------------- */

export interface PurchaseOrderItemDetail extends PurchaseOrderItem {
  product: ProductRef;
  /** Turunan: orderedQuantity - receivedQuantity. Tidak pernah negatif. */
  remainingQuantity: number;
}

export interface PurchaseOrderDetail extends Omit<PurchaseOrder, "items"> {
  purchaseRequest: PurchaseRequestSummary;
  supplier: Supplier;
  warehouse: Warehouse;
  items: PurchaseOrderItemDetail[];
  goodsReceipts: GoodsReceiptSummary[];
  /** Turunan, seluruhnya dihitung server. */
  totalItems: number;
  totalOrderedQuantity: number;
  totalReceivedQuantity: number;
  totalRemainingQuantity: number;
  /** Persentase bulat 0–100, dipakai progress bar. */
  receivingProgress: number;
}

export type PurchaseOrderListItem = PurchaseOrderDetail;

/** Bentuk ringkas yang dilampirkan di dalam Purchase Request dan Goods Receipt. */
export interface PurchaseOrderSummary {
  id: ID;
  orderNumber: string;
  status: PurchaseOrderStatus;
}

/* ---------------------------------------------------------------------------
 * Filter
 * ------------------------------------------------------------------------- */

/** "ACTIVE" adalah opsi gabungan yang memetakan ke ORDERED + PARTIALLY_RECEIVED. */
export type PurchaseOrderStatusFilter = PurchaseOrderStatus | "ACTIVE";

export interface PurchaseOrderFilters {
  q?: string;
  status?: PurchaseOrderStatusFilter;
  warehouseId?: ID;
  page?: number;
  limit?: number;
}