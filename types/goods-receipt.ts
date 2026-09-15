/**
 * Goods Receipt: pencatatan penerimaan barang atas sebuah Purchase Order.
 * Letakkan di: src/types/goods-receipt.ts
 */

import type { ID, ISODateString, Unit } from "./common";
import type { ProductRef, Supplier, User, Warehouse } from "./master";
import type { PurchaseOrderSummary } from "./purchase-order";

/* ---------------------------------------------------------------------------
 * Bentuk database
 * ------------------------------------------------------------------------- */

export interface GoodsReceiptItem {
  id: ID;
  productId: ID;
  receivedQuantity: number;
  unit: Unit;
}

export interface GoodsReceipt {
  id: ID;
  receiptNumber: string; // GR-2026-000001
  purchaseOrderId: ID;
  /** Selalu mengikuti warehouse pada Purchase Order. */
  warehouseId: ID;
  receivedById: ID;
  items: GoodsReceiptItem[];
  receivedAt: ISODateString;
  note: string | null;
}

/* ---------------------------------------------------------------------------
 * Bentuk response
 * ------------------------------------------------------------------------- */

export interface GoodsReceiptItemDetail extends GoodsReceiptItem {
  product: ProductRef;
}

export interface GoodsReceiptDetail extends Omit<GoodsReceipt, "items"> {
  purchaseOrder: PurchaseOrderSummary & { supplier: Supplier };
  warehouse: Warehouse;
  receivedBy: User;
  items: GoodsReceiptItemDetail[];
  /** Turunan: jumlah seluruh receivedQuantity pada receipt ini. */
  totalQuantity: number;
}

/** Bentuk ringkas yang dilampirkan pada riwayat penerimaan di Purchase Order detail. */
export interface GoodsReceiptSummary {
  id: ID;
  receiptNumber: string;
  receivedAt: ISODateString;
  receivedBy: User;
  totalQuantity: number;
}

/* ---------------------------------------------------------------------------
 * Payload
 * ------------------------------------------------------------------------- */

export interface GoodsReceiptItemPayload {
  productId: ID;
  /** Harus > 0 dan tidak melebihi remainingQuantity item terkait. */
  receivedQuantity: number;
}

export interface CreateGoodsReceiptPayload {
  purchaseOrderId: ID;
  receivedAt: ISODateString;
  note?: string | null;
  /** Hanya item dengan kuantitas > 0 yang dikirim. */
  items: GoodsReceiptItemPayload[];
}

/**
 * Bentuk nilai form pada dialog Receive Goods.
 * Input dibiarkan kosong (null) supaya tidak terlihat seperti sudah diisi 0.
 */
export interface GoodsReceiptFormValues {
  receivedAt: string;
  note: string;
  items: {
    productId: ID;
    orderedQuantity: number;
    receivedQuantity: number;
    remainingQuantity: number;
    receiveNow: number | null;
  }[];
}