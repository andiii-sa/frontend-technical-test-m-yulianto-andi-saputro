import { apiFetch, toQueryString } from "@/lib/api-client"
import { InventoryMovementDetail, InventoryStockListItem, IParamsApiListPurchaseOrder, IResApiDetail, IResApiList } from "@/types"


export const getInventoryMovement = async (signal: any, productId: number, warehouseId: number) => {
    return apiFetch<IResApiDetail<InventoryMovementDetail[]>>(`/inventory/${productId}/${warehouseId}/movement`, { signal }).then((r) => r.data)
}

export const getInventoryStockDetail = async (signal: any, productId: number, warehouseId: number) => {
    return apiFetch<IResApiDetail<InventoryStockListItem>>(`/inventory/${productId}/${warehouseId}`, { signal }).then((r) => r.data)
}

export const getInventoryList = async (signal: any, params?: IParamsApiListPurchaseOrder) => {
    return apiFetch<IResApiList<InventoryStockListItem[]>>(`/inventory${toQueryString(params)}`, { signal })
}