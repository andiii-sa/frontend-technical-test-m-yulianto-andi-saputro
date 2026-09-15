/**
 * Inventory: saldo stok per kombinasi produk × warehouse, beserta riwayat pergerakannya.
 * Letakkan di: src/types/inventory.ts
 */

import type { ID, ISODateString, Unit } from "./common";
import type { ProductRef, Warehouse } from "./master";

export type InventoryMovementType = "PURCHASE_RECEIPT" | "ADJUSTMENT" | "ISSUE";

/* ---------------------------------------------------------------------------
 * Bentuk database
 * ------------------------------------------------------------------------- */

export interface InventoryStock {
  id: ID;
  productId: ID;
  warehouseId: ID;
  /**
   * Invarian: nilai ini selalu sama dengan jumlah seluruh InventoryMovement
   * untuk kombinasi productId + warehouseId yang sama.
   */
  quantity: number;
  unit: Unit;
  updatedAt: ISODateString;
}

export interface InventoryMovement {
  id: ID;
  productId: ID;
  warehouseId: ID;
  type: InventoryMovementType;
  /** Positif untuk barang masuk, negatif untuk barang keluar. */
  quantity: number;
  /** Nomor dokumen sumber: "GR-2026-000001" atau "OPENING-2026-09". */
  referenceNumber: string;
  createdAt: ISODateString;
}

/* ---------------------------------------------------------------------------
 * Bentuk response
 * ------------------------------------------------------------------------- */

export interface InventoryStockDetail extends InventoryStock {
  product: ProductRef;
  warehouse: Warehouse;
}

export type InventoryStockListItem = InventoryStockDetail;

export interface InventoryMovementDetail extends InventoryMovement {
  product: ProductRef;
  warehouse: Warehouse;
  /**
   * Hasil penelusuran dari referenceNumber. Terisi hanya untuk PURCHASE_RECEIPT,
   * dan bernilai null untuk ADJUSTMENT sehingga referensinya ditampilkan
   * sebagai teks biasa tanpa tautan.
   */
  goodsReceiptId: ID | null;
  purchaseOrderId: ID | null;
  purchaseOrderNumber: string | null;
}

/* ---------------------------------------------------------------------------
 * Filter
 * ------------------------------------------------------------------------- */

export interface InventoryFilters {
  /** Dicocokkan dengan nama produk dan SKU. */
  q?: string;
  warehouseId?: ID;
}

export interface InventoryMovementFilters {
  warehouseId?: ID;
}