import { listPurchaseOrders } from "@/mock/db";
import { paginate, parseListParams } from "@/mock/paginate";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const params = parseListParams(req.url);
  console.log('params', params)

  let data = listPurchaseOrders()
  if(params?.warehouseId){
    data = data.filter((item) => item.warehouse.id === Number(params.warehouseId))
  }
  
  console.log('params?.status', params?.status)
  if(params?.status){
    data = data.filter((item) => item.status === params.status)
  }
  
  const res = paginate(data, params, {
    searchIn: (po) => [po.orderNumber, po.supplier.name],
    // sortable: {
    //   orderNumber: (po) => po.orderNumber,
    // },
  });

  return NextResponse.json(res);
}