import { IParamsApiListGoodsReceipt } from "@/types";
import {
  keepPreviousData,
  queryOptions,
  useQuery
} from "@tanstack/react-query";
import { getGoodsReceiptList } from ".";

export const inventoryKeys = {
  all: ["goods-receipt"],
  lists: () => [...inventoryKeys.all, "list"],
  list: (params: IParamsApiListGoodsReceipt) =>
    [...inventoryKeys.lists(), params] as const,
};

export const useGoodsReceiptList = (params: IParamsApiListGoodsReceipt) => {
  return useQuery({
    ...queryOptions({
      queryKey: inventoryKeys.list(params),
      queryFn: ({ signal }) => getGoodsReceiptList(signal, params),
    }),
    placeholderData: keepPreviousData,
  });
}
