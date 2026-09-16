import { findPurchaseOrder } from "@/mock/db";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const po = findPurchaseOrder(Number(id));
  if (!po) return NextResponse.json({ success: false, message: "Purchase order not found" }, { status: 404 });
return NextResponse.json({ success: true, message: "OK", data: po });
}