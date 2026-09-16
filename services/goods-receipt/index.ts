import { apiFetch, toQueryString } from "@/lib/api-client"
import { GoodsReceiptDetail, IParamsApiListGoodsReceipt, IResApiList } from "@/types"

export const getGoodsReceiptList = async (signal: any, params?: IParamsApiListGoodsReceipt) => {
    return apiFetch<IResApiList<GoodsReceiptDetail[]>>(`/goods-receipts${toQueryString(params)}`, { signal })
}