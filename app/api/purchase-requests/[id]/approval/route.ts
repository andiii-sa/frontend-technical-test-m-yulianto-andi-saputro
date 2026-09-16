import { HttpError, updatePurchaseRequstApproveReject } from "@/mock/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  try {
    const po = updatePurchaseRequstApproveReject(Number(id), body);
    return NextResponse.json({ success: true, message: "Purchase requests action", data: po }, { status: 201 });
  } catch (e) {
    const status = e instanceof HttpError ? e.status : 500;
    const message = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ success: false, message }, { status });
  }
}