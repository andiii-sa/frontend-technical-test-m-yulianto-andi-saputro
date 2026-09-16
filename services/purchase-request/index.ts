import { apiFetch, toQueryString } from "@/lib/api-client"
import { ApproveRejectPurchaseRequestPayload, CreatePurchaseRequestPayload, IParamsApiListPurchaseRequest, IResApiDetail, IResApiList, PurchaseRequestListItem } from "@/types"


export const getPurchaseRequestList = async (signal: any, params?: IParamsApiListPurchaseRequest) => {
  return apiFetch<IResApiList<PurchaseRequestListItem[]>>(`/purchase-requests${toQueryString(params)}`, { signal })
}

export const getPurchaseRequestDetail = async (signal: any, id: number) => {
  return apiFetch<IResApiDetail<PurchaseRequestListItem>>(`/purchase-requests/${id}`, { signal }).then((r) => r.data)
}

export const postPurchaseRequest = async (payload: CreatePurchaseRequestPayload) => {
  return apiFetch<IResApiDetail<PurchaseRequestListItem>>(
    `/purchase-requests`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  ).then((r) => r.data)
}

export const putPurchaseRequest = async (id:number, payload: CreatePurchaseRequestPayload) => {
  return apiFetch<IResApiDetail<PurchaseRequestListItem>>(
    `/purchase-requests/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  ).then((r) => r.data)
}

export const deletePurchaseRequest = async (id:number) => {
  return apiFetch<IResApiDetail<PurchaseRequestListItem>>(
    `/purchase-requests/${id}`,
    {
      method: "DELETE",
    },
  ).then((r) => r.data)
}

export const putPurchaseRequstApproveReject = async (id:number, payload: ApproveRejectPurchaseRequestPayload) => {
  return apiFetch<IResApiDetail<PurchaseRequestListItem>>(
    `/purchase-requests/${id}/approval`,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    },
  ).then((r) => r.data)
}