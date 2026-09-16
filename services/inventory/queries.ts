import { ApiError } from "@/lib/api-client";
import { IParamsApiListInventory } from "@/types";
import {
  keepPreviousData,
  queryOptions,
  useQuery
} from "@tanstack/react-query";
import { getInventoryList, getInventoryMovement, getInventoryStockDetail } from ".";

export const inventoryKeys = {
  all: ["inventory"],
  lists: () => [...inventoryKeys.all, "list"],
  list: (params: IParamsApiListInventory) =>
    [...inventoryKeys.lists(), params] as const,
  detail: (productId: number, warehouseId: number) => [...inventoryKeys.all, "detail", productId, warehouseId],
  detailMovement: (productId: number, warehouseId: number) => [...inventoryKeys.all, "detail", productId, "movement", warehouseId],
};

export const useInventoryStockList = (params: IParamsApiListInventory) => {
  return useQuery({
    ...queryOptions({
      queryKey: inventoryKeys.list(params),
      queryFn: ({ signal }) => getInventoryList(signal, params),
    }),
    placeholderData: keepPreviousData,
  });
}

export const useInventoryStockDetail = (productId: number, warehouseId: number) => {
  return useQuery(
    queryOptions({
      queryKey: inventoryKeys.detail(productId, warehouseId),
        queryFn: ({ signal }) => getInventoryStockDetail(signal, productId, warehouseId),
      retry: (count, err) =>
        !(err instanceof ApiError && err.status === 404) && count < 2,
    }),
  );
}

export const useInventoryMovementDetail = (productId: number, warehouseId: number) => {
  return useQuery(
    queryOptions({
      queryKey: inventoryKeys.detailMovement(productId, warehouseId),
      queryFn: ({ signal }) => getInventoryMovement(signal, productId, warehouseId),
      retry: (count, err) =>
        !(err instanceof ApiError && err.status === 404) && count < 2,
    }),
  );
}
