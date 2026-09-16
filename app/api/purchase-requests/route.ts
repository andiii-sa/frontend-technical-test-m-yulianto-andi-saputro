import { createPurchaseRequst, HttpError, listPurchaseRequest } from "@/mock/db";
import { paginate, parseListParams } from "@/mock/paginate";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const params = parseListParams(req.url);

  let data = listPurchaseRequest()
  if(params?.warehouseId){
    data = data.filter((item) => item.warehouse.id === Number(params.warehouseId))
  }
  
  if(params?.status){
    data = data.filter((item) => item.status === params.status)
  }
  
  const res = paginate(data, params, {
    searchIn: (po) => [po.requestNumber],
    // sortable: {
    //   orderNumber: (po) => po.orderNumber,
    // },
  });

  return NextResponse.json(res);
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const po = createPurchaseRequst(body);
    return NextResponse.json({ success: true, message: "Purchase requests created", data: po }, { status: 201 });
  } catch (e) {
    const status = e instanceof HttpError ? e.status : 500;
    const message = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ success: false, message }, { status });
  }
}