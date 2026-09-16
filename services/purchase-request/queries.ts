import { ApiError } from "@/lib/api-client";
import { ApproveRejectPurchaseRequestPayload, CreatePurchaseRequestPayload, IParamsApiListPurchaseRequest, UpdatePurchaseRequestPayload } from "@/types";
import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePurchaseRequest, getPurchaseRequestDetail, getPurchaseRequestList, postPurchaseRequest, putPurchaseRequest, putPurchaseRequstApproveReject } from ".";

export const purchaseRequestKeys = {
  all: ["purchase-requests"],
  lists: () => [...purchaseRequestKeys.all, "list"],
  list: (params: IParamsApiListPurchaseRequest) => [...purchaseRequestKeys.lists(), params] as const,
  detail: (id: number) => [...purchaseRequestKeys.all, "detail", id],
};

export const usePurchaseRequestList = (params: IParamsApiListPurchaseRequest) => {
  return useQuery({
    ...queryOptions({
      queryKey: purchaseRequestKeys.list(params),
      queryFn: ({ signal }) => getPurchaseRequestList(signal, params),
    }),
    placeholderData: keepPreviousData,
  });
}

export const usePurchaseRequestDetail = (id: number) => {
  return useQuery(
    queryOptions({
      queryKey: purchaseRequestKeys.detail(id),
      queryFn: ({ signal }) => getPurchaseRequestDetail(signal, id),
      retry: (count, err) =>
        !(err instanceof ApiError && err.status === 404) && count < 2,
    }),
  );
}

export const usePurchaseRequestCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePurchaseRequestPayload) => postPurchaseRequest(payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(purchaseRequestKeys.detail(updated.id), updated);
      queryClient.invalidateQueries({ queryKey: purchaseRequestKeys.lists() });
    },
  });
}

export const usePurchaseRequestUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number, payload: UpdatePurchaseRequestPayload }) => putPurchaseRequest(id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(purchaseRequestKeys.detail(updated.id), updated);
      queryClient.invalidateQueries({ queryKey: purchaseRequestKeys.lists() });
    },
  });
}

export const usePurchaseRequestDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePurchaseRequest(id),
    onSuccess: (_,id) => {
      queryClient.removeQueries({queryKey: purchaseRequestKeys.detail(id)})
      queryClient.invalidateQueries({ queryKey: purchaseRequestKeys.lists() });
    },
  });
}

export const usePurchaseRequestApprove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number, payload: ApproveRejectPurchaseRequestPayload }) => putPurchaseRequstApproveReject(id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(purchaseRequestKeys.detail(updated.id), updated);
      queryClient.invalidateQueries({ queryKey: purchaseRequestKeys.lists() });
    },
  });
}
