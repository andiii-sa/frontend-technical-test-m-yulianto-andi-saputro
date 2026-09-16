import type { ID, ISODateString, Unit } from "./common";
import type { ProductRef, User, Warehouse } from "./master";
import type { PurchaseOrderSummary } from "./purchase-order";

export type PurchaseRequestStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED";

export interface PurchaseRequestItem {
  id: ID;
  productId: ID;
  quantity: number;
  unit: Unit;
}

export interface PurchaseRequest {
  id: ID;
  requestNumber: string;
  warehouseId: ID;
  requestedById: ID;
  status: PurchaseRequestStatus;
  items: PurchaseRequestItem[];
  notes: string | null;
  rejectionReason: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  submittedAt: ISODateString | null;
  decidedAt: ISODateString | null;
  decidedById: ID | null;
  purchaseOrderId: ID | null;
}

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
  totalItems: number;
  totalQuantity: number;
}

export type PurchaseRequestListItem = PurchaseRequestDetail;

export interface PurchaseRequestSummary {
  id: ID;
  requestNumber: string;
  status: PurchaseRequestStatus;
  requestedBy: User;
}

export interface PurchaseRequestItemPayload {
  productId: ID;
  productQty: number;
  productUnit?: string;
}

export interface CreatePurchaseRequestPayload {
  warehouseId: ID;
  notes?: string | null;
  product: PurchaseRequestItemPayload[];
  isDraft?: boolean
}

export type UpdatePurchaseRequestPayload = CreatePurchaseRequestPayload;

export interface RejectPurchaseRequestPayload {
  reason?: string;
}

export interface ApproveRejectPurchaseRequestPayload extends RejectPurchaseRequestPayload {
  action : string
}