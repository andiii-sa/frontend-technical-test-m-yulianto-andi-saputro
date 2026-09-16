import {
  ApproveRejectPurchaseRequestPayload,
  CreatePurchaseRequestPayload,
  DashboardRecentActivity,
  DashboardSummary,
  GoodsReceiptDetail,
  InventoryMovementDetail,
  InventoryStockListItem,
  PurchaseOrderListItem,
  PurchaseRequestListItem,
  ReceiveGoodsPayload,
  User,
} from "@/types";
import data from "../constants/data-detail.json";

export const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

// Purchase Order
export function findPurchaseOrder(id: number): PurchaseOrderListItem | null {
  return (
    (data.purchaseOrders.find(
      (po) => po.id === id,
    ) as unknown as PurchaseOrderListItem) ?? null
  );
}

export function listPurchaseOrders() {
  return data.purchaseOrders;
}

export function receiveGoods(
  payload: ReceiveGoodsPayload,
): PurchaseOrderListItem {
  const po = findPurchaseOrder(payload.purchaseOrderId);
  if (!po) throw new HttpError(404, "Purchase order not found");
  if (po.status === "RECEIVED" || po.status === "CANCELLED") {
    throw new HttpError(409, "This order can no longer receive goods");
  }

  let total = 0;
  for (const line of payload.items) {
    const item = po.items.find((i) => i.id === line.purchaseOrderItemId);
    if (!item) throw new HttpError(400, "Unknown item");

    const remaining = item.orderedQuantity - item.receivedQuantity;
    if (
      !Number.isInteger(line.quantity) ||
      line.quantity < 1 ||
      line.quantity > remaining
    ) {
      throw new HttpError(
        422,
        `Quantity for ${item.product.sku} must be between 1 and ${remaining}`,
      );
    }

    total += line.quantity;
  }

  if (total === 0) throw new HttpError(422, "Enter at least one quantity");

  for (const line of payload.items) {
    const item = po.items.find((i) => i.id === line.purchaseOrderItemId)!;
    item.receivedQuantity += line.quantity;
    item.remainingQuantity = item.orderedQuantity - item.receivedQuantity;
  }

  const now = new Date().toISOString();
  po.totalOrderedQuantity = po.items.reduce((s, i) => s + i.orderedQuantity, 0);
  po.totalReceivedQuantity = po.items.reduce(
    (s, i) => s + i.receivedQuantity,
    0,
  );
  po.totalRemainingQuantity =
    po.totalOrderedQuantity - po.totalReceivedQuantity;
  po.receivingProgress = Math.floor(
    (po.totalReceivedQuantity / po.totalOrderedQuantity) * 100,
  );
  po.status =
    po.totalRemainingQuantity === 0 ? "RECEIVED" : "PARTIALLY_RECEIVED";
  po.updatedAt = now;

  const nextId =
    Math.max(
      0,
      ...data.purchaseOrders.flatMap((p) => p.goodsReceipts.map((g) => g.id)),
    ) + 1;
  po.goodsReceipts.push({
    id: nextId,
    receiptNumber: `GR-2026-${String(nextId).padStart(6, "0")}`,
    receivedAt: now,
    receivedBy: data.users.find((f) => f.id === 1) as User,
    totalQuantity: total,
  });

  return po;
}

// Inventory
export function findListInventoryMovement(
  productId: number,
  warehouseId: number,
): InventoryMovementDetail[] | null {
  return (
    (data.inventoryMovements.filter(
      (po) => po.productId === productId && po.warehouseId === warehouseId,
    ) as unknown as InventoryMovementDetail[]) ?? []
  );
}

export function findInventoryStock(
  productId: number,
  warehouseId: number,
): InventoryStockListItem | null {
  return (
    (data.inventoryStocks.find(
      (po) => po.productId === productId && po.warehouseId === warehouseId,
    ) as InventoryStockListItem) ?? null
  );
}

export function listInventoryStock(): InventoryStockListItem[] {
  return data.inventoryStocks as InventoryStockListItem[];
}

// GS
export function listGoodsReceipt(): GoodsReceiptDetail[] {
  return data.goodsReceipts as GoodsReceiptDetail[];
}

// PR
export function listPurchaseRequest(): PurchaseRequestListItem[] {
  return data.purchaseRequests as PurchaseRequestListItem[];
}

export function findPurchaseRequst(id: number): PurchaseRequestListItem | null {
  return (
    (data.purchaseRequests as PurchaseRequestListItem[]).find(
      (f) => f.id === id,
    ) ?? null
  );
}

export function createPurchaseRequst(
  payload: CreatePurchaseRequestPayload,
): PurchaseRequestListItem[] {
  const item = {
    id: listPurchaseRequest.length + 1,
    requestNumber: "PR-"+ new Date().getFullYear() + "-" + String(listPurchaseRequest.length + 1).padStart(6, "0"),
    status: payload?.isDraft ? 'DRAFT' : "SUBMITTED",
    warehouseId: payload.warehouseId,
    warehouse: data.warehouses.find(f => f.id === payload.warehouseId),
    requestedById: 1,
    requestedBy: data.users.find(f => f.id === 1),
    items: payload.product.map((v, i) => ({
      id: i + 1,
      productId: v.productId,
      product: data.products.find(f => f.id === v.productId),
      quantity: v.productQty,
      unit: v.productUnit,
    })),
    totalItems: payload.product.length,
    totalQuantity: payload.product.reduce((a, b) => a + b.productQty, 0),
    notes: payload.notes,
    rejectionReason: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    submittedAt: new Date().toISOString(),
    decidedAt: null,
    decidedById: null,
    decidedBy: null,
    purchaseOrderId: null,
    purchaseOrder: null,
  };

  return item as any
}

export function updatePurchaseRequst(id:number, payload:CreatePurchaseRequestPayload): PurchaseRequestListItem {
  const findPo = data.purchaseRequests.find((f) => f.id === id)
  const item = {
    ...findPo,
    status: payload?.isDraft ? 'DRAFT' : "SUBMITTED",
    warehouseId: payload.warehouseId,
    warehouse: data.warehouses.find(f => f.id === payload.warehouseId),
    items: payload.product.map((v, i) => ({
      id: i + 1,
      productId: v.productId,
      product: data.products.find(f => f.id === v.productId),
      quantity: v.productQty,
      unit: v.productUnit,
    })),
    totalItems: payload.product.length,
    totalQuantity: payload.product.reduce((a, b) => a + b.productQty, 0),
    notes: payload.notes,
    updatedAt: new Date().toISOString(),
  };

  return item as any
}

export function destroyPurchaseRequst(id:number): PurchaseRequestListItem {
  const listPo = data.purchaseRequests.filter((f) => f.id !== id)
  return listPo as any
}

export function updatePurchaseRequstApproveReject(id:number, payload:ApproveRejectPurchaseRequestPayload): PurchaseRequestListItem {
  const findPo = data.purchaseRequests.find((f) => f.id === id)
  const item = {
    ...findPo,
    status: payload?.action === 'APPROVE' ? 'APPROVED' : "REJECTED",
    updatedAt: new Date().toISOString(),
    decidedAt: new Date().toISOString(),
    decidedById: 1,
    decidedBy: data.users.find(f => f.id === 1),
    purchaseOrderId: payload?.action === 'APPROVE' ? 1 : null,
    purchaseOrder: payload?.action === 'APPROVE' ? data.purchaseOrders.find(f => f.id === 1) : null,
    rejectionReason: payload.reason
  };

  return item as any
}

// Dashboard
export function summaryDashboard(): DashboardSummary[]{
  return ([
    {
    label: "Total Purchase Requests",
    value: data.purchaseRequests.length || 0,
    description: "+6 this month",
  },
  {
    label: "Waiting for Approval",
    value: data.purchaseRequests?.filter(f => f.status === 'SUBMITTED').length || 0,
    description: "Requires manager action",
  },
  {
    label: "Active Purchase Orders",
    value: data.purchaseOrders?.filter(f => f.status === 'ORDERED' || f.status === 'PARTIALLY_RECEIVED').length || 0,
    description: "12 expected this week",
  },
  {
    label: "Partially Received Orders",
    value: data.purchaseOrders?.filter(f => f.status === 'PARTIALLY_RECEIVED').length || 0,
    description: "Receiving still in progress",
  },
  ]);
}

export function recentActivityDashboard(): DashboardRecentActivity[]{
  return ([
    {
    status: "APPROVED",
    label: "PR-2026-0047 Approved",
    description: "Approved by Alex Morgan",
    date: "2026-09-01T09:00:00Z",
  },
  {
    status: "ORDERED",
    label: "PO-2026-0047 Ordered",
    description: "Sent to Pacific Industrial Supply.",
    date: "2026-09-01T09:00:00Z",
  },
  {
    status: "RECEIPT",
    label: "Partial Goods Receipt",
    description: "120 of 200 units received.",
    date: "2026-09-01T09:00:00Z",
  },
  ]);
}