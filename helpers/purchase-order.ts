
import { PurchaseOrderItemDetail, PurchaseOrderListItem, ReceiveAction, Role } from "@/types";

export const getRemaining = (item: PurchaseOrderItemDetail) => Math.max(item.orderedQuantity - item.receivedQuantity, 0);
export function getPercent(received: number, ordered: number) {
    if (ordered <= 0) return 0;
    if (received >= ordered) return 100;
    return Math.min(Math.round((received / ordered) * 100), 99);
}

export function getPoProgress(po: PurchaseOrderListItem) {
    const ordered = po.items.reduce((s, i) => s + i.orderedQuantity, 0);
    const received = po.items.reduce((s, i) => s + i.receivedQuantity, 0);
    return {
        ordered,
        received,
        remaining: Math.max(ordered - received, 0),
        percent: getPercent(received, ordered),
        completedLines: po.items.filter((i) => getRemaining(i) === 0).length,
        totalLines: po.items.length,
    };
}

export function getReceiveAction(role: Role, status: string): ReceiveAction {
    if (role !== "USER") return { visible: false };
    switch (status) {
        case "ORDERED":
        case "PARTIALLY_RECEIVED":
            return { visible: true, enabled: true };
        case "RECEIVED":
            return { visible: true, enabled: false, reason: "All items have been received" };
        case "CANCELLED":
            return { visible: true, enabled: false, reason: "This order was cancelled" };
        default:
            return { visible: false }
    }
}