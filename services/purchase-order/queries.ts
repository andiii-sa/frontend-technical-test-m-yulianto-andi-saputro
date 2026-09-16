import { ApiError } from "@/lib/api-client";
import { IParamsApiListPurchaseOrder, ReceiveGoodsPayload } from "@/types";
import {
    keepPreviousData,
    queryOptions,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    getPurchaseOrderDetail,
    getPurchaseOrderList,
    postReceiveGoods,
} from ".";

export const purchaseOrderKeys = {
  all: ["purchase-orders"],
  lists: () => [...purchaseOrderKeys.all, "list"],
  list: (params: IParamsApiListPurchaseOrder) =>
    [...purchaseOrderKeys.lists(), params] as const,
  detail: (id: number) => [...purchaseOrderKeys.all, "detail", id],
};

export const usePurchaseOrdersList = (params: IParamsApiListPurchaseOrder) => {
  return useQuery({
    ...queryOptions({
      queryKey: purchaseOrderKeys.list(params),
      queryFn: ({ signal }) => getPurchaseOrderList(signal, params),
    }),
    placeholderData: keepPreviousData,
  });
}

export const usePurchaseOrderDetail = (id: number) => {
  return useQuery(
    queryOptions({
      queryKey: purchaseOrderKeys.detail(id),
      queryFn: ({ signal }) => getPurchaseOrderDetail(signal, id),
      retry: (count, err) =>
        !(err instanceof ApiError && err.status === 404) && count < 2,
    }),
  );
}

export const useReceiveGoods = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReceiveGoodsPayload) => postReceiveGoods(payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(purchaseOrderKeys.detail(updated.id), updated);
      queryClient.invalidateQueries({ queryKey: purchaseOrderKeys.lists() });
    },
  });
}
