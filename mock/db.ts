import { GoodsReceiptDetail, InventoryMovementDetail, InventoryStockListItem, PurchaseOrderListItem, ReceiveGoodsPayload, User } from "@/types";
import data from "../constants/data-detail.json";

export const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

// Purchase Order
export function findPurchaseOrder(id: number): PurchaseOrderListItem | null {
  return (data.purchaseOrders.find((po) => po.id === id ) as unknown as PurchaseOrderListItem) ?? null;
}

export function listPurchaseOrders() {
  return data.purchaseOrders;
}

export function receiveGoods(payload: ReceiveGoodsPayload): PurchaseOrderListItem {
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
    if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > remaining) {
      throw new HttpError(422, `Quantity for ${item.product.sku} must be between 1 and ${remaining}`);
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
  po.totalReceivedQuantity = po.items.reduce((s, i) => s + i.receivedQuantity, 0);
  po.totalRemainingQuantity = po.totalOrderedQuantity - po.totalReceivedQuantity;
  po.receivingProgress = Math.floor((po.totalReceivedQuantity / po.totalOrderedQuantity) * 100);
  po.status = po.totalRemainingQuantity === 0 ? "RECEIVED" : "PARTIALLY_RECEIVED";
  po.updatedAt = now;

  const nextId = Math.max(0, ...data.purchaseOrders.flatMap((p) => p.goodsReceipts.map((g) => g.id))) + 1;
  po.goodsReceipts.push({
    id: nextId,
    receiptNumber: `GR-2026-${String(nextId).padStart(6, "0")}`,
    receivedAt: now,
    receivedBy: data.users.find(f => f.id === 1) as User,
    totalQuantity: total,
  });

  return po;
}

// Inventory
export function findListInventoryMovement(productId: number, warehouseId: number): InventoryMovementDetail[] | null {
  return (data.inventoryMovements.filter((po) => po.productId === productId && po.warehouseId === warehouseId) as unknown as InventoryMovementDetail[]) ?? [];
}

export function findInventoryStock(productId: number, warehouseId: number): InventoryStockListItem | null {
  return (data.inventoryStocks.find((po) => po.productId === productId && po.warehouseId === warehouseId) as InventoryStockListItem) ?? null;
}

export function listInventoryStock(): InventoryStockListItem[] {
  return (data.inventoryStocks as InventoryStockListItem[]);
}

// GS
export function listGoodsReceipt(): GoodsReceiptDetail[] {
  return (data.goodsReceipts as GoodsReceiptDetail[]);
}