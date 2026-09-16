import type { ID, ISODateString, Unit } from "./common";
import type { ProductRef, Supplier, User, Warehouse } from "./master";
import type { PurchaseOrderSummary } from "./purchase-order";

export interface GoodsReceiptItem {
  id: ID;
  productId: ID;
  receivedQuantity: number;
  unit: Unit;
}

export interface GoodsReceipt {
  id: ID;
  receiptNumber: string; 
  purchaseOrderId: ID;
  warehouseId: ID;
  receivedById: ID;
  items: GoodsReceiptItem[];
  receivedAt: ISODateString;
  note: string | null;
}

export interface GoodsReceiptItemDetail extends GoodsReceiptItem {
  product: ProductRef;
}

export interface GoodsReceiptDetail extends Omit<GoodsReceipt, "items"> {
  purchaseOrder: PurchaseOrderSummary & { supplier: Supplier };
  warehouse: Warehouse;
  receivedBy: User;
  items: GoodsReceiptItemDetail[];
  totalQuantity: number;
}

export interface GoodsReceiptSummary {
  id: ID;
  receiptNumber: string;
  receivedAt: ISODateString;
  receivedBy: User;
  totalQuantity: number;
}

export interface GoodsReceiptItemPayload {
  productId: ID;
  receivedQuantity: number;
}