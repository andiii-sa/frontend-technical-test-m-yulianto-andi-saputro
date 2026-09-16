import { apiFetch, toQueryString } from "@/lib/api-client"
import { IParamsApiListPurchaseOrder, IResApiDetail, IResApiList, PurchaseOrderListItem, ReceiveGoodsPayload } from "@/types"


export const getPurchaseOrderDetail = async (signal:any, id:number) => {
    return apiFetch<IResApiDetail<PurchaseOrderListItem>>(`/purchase-orders/${id}`, { signal }).then((r) => r.data)
}

export const postReceiveGoods = async (payload:ReceiveGoodsPayload) => {
    return apiFetch<IResApiDetail<PurchaseOrderListItem>>(
            `/purchase-orders/${payload.purchaseOrderId}/receive`,
            {
              method: "POST",
              body: JSON.stringify({ items: payload.items }),
            },
          ).then((r) => r.data)
}

export const getPurchaseOrderList = async (signal :any ,params?:IParamsApiListPurchaseOrder) => {
    return apiFetch<IResApiList<PurchaseOrderListItem[]>>(`/purchase-orders${toQueryString(params)}`, { signal })
}