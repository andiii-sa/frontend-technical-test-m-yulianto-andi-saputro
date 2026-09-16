/**
 * Kontrak API dan bentuk dataset.
 * Letakkan di: src/types/api.ts
 */

import type { Supplier, User, Warehouse, Product, ProductDetail } from "./master";
import type { PurchaseRequest, PurchaseRequestDetail } from "./purchase-request";
import type { PurchaseOrder, PurchaseOrderDetail } from "./purchase-order";
import type { GoodsReceipt, GoodsReceiptDetail } from "./goods-receipt";
import type {
  InventoryMovement,
  InventoryMovementDetail,
  InventoryStock,
  InventoryStockDetail,
} from "./inventory";

/* ---------------------------------------------------------------------------
 * Envelope
 * ------------------------------------------------------------------------- */

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}

export interface Paginated<T> {
  data: T[];
  meta: PaginationMeta;
}

/**
 * Bentuk body error yang seragam untuk seluruh endpoint.
 * fieldErrors memakai path field seperti "items.0.quantity" agar bisa
 * langsung dipetakan ke React Hook Form lewat setError().
 */
export interface ApiErrorResponse {
  message: string;
  fieldErrors?: Record<string, string>;
}

export type FieldErrors = Record<string, string>;

/* ---------------------------------------------------------------------------
 * Bentuk dataset
 * ------------------------------------------------------------------------- */

/** Bentuk seed.json — ternormalisasi, dipakai sebagai in-memory database mock API. */
export interface Database {
  warehouses: Warehouse[];
  suppliers: Supplier[];
  users: User[];
  products: Product[];
  purchaseRequests: PurchaseRequest[];
  purchaseOrders: PurchaseOrder[];
  goodsReceipts: GoodsReceipt[];
  inventoryStocks: InventoryStock[];
  inventoryMovements: InventoryMovement[];
}

/** Bentuk seed.expanded.json — relasi sudah terlampir, sama dengan yang diterima UI. */
export interface ExpandedDataset {
  warehouses: Warehouse[];
  suppliers: Supplier[];
  users: User[];
  products: ProductDetail[];
  purchaseRequests: PurchaseRequestDetail[];
  purchaseOrders: PurchaseOrderDetail[];
  goodsReceipts: GoodsReceiptDetail[];
  inventoryStocks: InventoryStockDetail[];
  inventoryMovements: InventoryMovementDetail[];
}

/** Nama koleksi, berguna untuk helper generik seperti nextId(). */
export type CollectionName = keyof Database;


// ----

export interface IResApi {
  success: boolean;
  message: string;
}

export interface IResApiDetail<T> extends IResApi {
  data: T;
}

export interface IResApiList<T> extends IResApi {
  data: T[];
  stats: {
    currentPage: number;
    perPage: number;
    totalData: number;
    totalPage: number;
  };
}

export interface IParamsApiList {
  page?: number;
  perPage?: number;
  q?: string;
  sortBy?: string;
  sortOrder?: number;
}

// PO
export interface IParamsApiListPurchaseOrder extends IParamsApiList {
  warehouse_id?: number;
  status?: string
}
// INV
export interface IParamsApiListInventory extends IParamsApiList {
  warehouse_id?: number;
}
// GR
export interface IParamsApiListGoodsReceipt extends IParamsApiList {
  warehouse_id?: number;
}

// PR
export interface IParamsApiListPurchaseRequest extends IParamsApiList {
  warehouse_id?: number;
  status?: string
}