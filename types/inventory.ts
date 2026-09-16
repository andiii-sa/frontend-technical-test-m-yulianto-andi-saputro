import type { ID, ISODateString, Unit } from "./common";
import type { ProductRef, Warehouse } from "./master";

export type InventoryMovementType = "PURCHASE_RECEIPT" | "ADJUSTMENT" | "ISSUE";
export interface InventoryStock {
  id: ID;
  productId: ID;
  warehouseId: ID;
  quantity: number;
  unit: Unit;
  updatedAt: ISODateString;
}

export interface InventoryMovement {
  id: ID;
  productId: ID;
  warehouseId: ID;
  type: InventoryMovementType;
  quantity: number;
  referenceNumber: string;
  createdAt: ISODateString;
}

export interface InventoryStockDetail extends InventoryStock {
  product: ProductRef;
  warehouse: Warehouse;
}

export type InventoryStockListItem = InventoryStockDetail;

export interface InventoryMovementDetail extends InventoryMovement {
  product: ProductRef;
  warehouse: Warehouse;
  goodsReceiptId: ID | null;
  purchaseOrderId: ID | null;
  purchaseOrderNumber: string | null;
}