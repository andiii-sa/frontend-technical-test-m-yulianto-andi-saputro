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


export interface PurchaseOrderItem {
  id: ID;
  productId: ID;
  orderedQuantity: number;
  receivedQuantity: number;
  unit: Unit;
}

export interface PurchaseOrder {
  id: ID;
  orderNumber: string; 
  purchaseRequestId: ID;
  supplierId: ID;
  warehouseId: ID;
  status: PurchaseOrderStatus;
  items: PurchaseOrderItem[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
  expectedDate: ISODateString | null;
}

export interface PurchaseOrderItemDetail extends PurchaseOrderItem {
  product: ProductRef;
  remainingQuantity: number;
}

export interface PurchaseOrderDetail extends Omit<PurchaseOrder, "items"> {
  purchaseRequest: PurchaseRequestSummary;
  supplier: Supplier;
  warehouse: Warehouse;
  items: PurchaseOrderItemDetail[];
  goodsReceipts: GoodsReceiptSummary[];
  totalItems: number;
  totalOrderedQuantity: number;
  totalReceivedQuantity: number;
  totalRemainingQuantity: number;
  receivingProgress: number;
}

export type PurchaseOrderListItem = PurchaseOrderDetail;
export interface PurchaseOrderSummary {
  id: ID;
  orderNumber: string;
  status: PurchaseOrderStatus;
}

export interface ReceiveGoodsPayload {
    purchaseOrderId: number;
    items: { purchaseOrderItemId: number; quantity: number }[];
}

export type ReceiveAction =
    | { visible: false }
    | { visible: true; enabled: true }
    | { visible: true; enabled: false; reason: string };
