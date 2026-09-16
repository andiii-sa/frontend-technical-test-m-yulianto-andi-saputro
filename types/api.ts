export interface IResApi {
  success: boolean;
  message: string;
}

export interface IResApiDetail<T> extends IResApi {
  data: T;
}

export interface IResApiList<T> extends IResApi {
  data: T[];
  stats: {
    currentPage: number;
    perPage: number;
    totalData: number;
    totalPage: number;
  };
}

export interface IParamsApiList {
  page?: number;
  perPage?: number;
  q?: string;
  sortBy?: string;
  sortOrder?: number;
}

// PO
export interface IParamsApiListPurchaseOrder extends IParamsApiList {
  warehouse_id?: number;
  status?: string
}
// INV
export interface IParamsApiListInventory extends IParamsApiList {
  warehouse_id?: number;
}
// GR
export interface IParamsApiListGoodsReceipt extends IParamsApiList {
  warehouse_id?: number;
}

// PR
export interface IParamsApiListPurchaseRequest extends IParamsApiList {
  warehouse_id?: number;
  status?: string
}