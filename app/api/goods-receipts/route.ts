import { listGoodsReceipt } from "@/mock/db";
import { paginate, parseListParams } from "@/mock/paginate";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const params = parseListParams(req.url);

  let data = listGoodsReceipt()
  if(params?.warehouseId){
    data = data.filter((item) => item.warehouse.id === Number(params.warehouseId))
  }

  const res = paginate(data, params, {
    searchIn: (po) => [po.receiptNumber, po.purchaseOrder.orderNumber],
  });

  return NextResponse.json(res);
}