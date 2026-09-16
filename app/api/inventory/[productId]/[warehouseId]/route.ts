import { findInventoryStock } from "@/mock/db";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ productId: string, warehouseId: string }> }) {
  const { productId, warehouseId } = await params;
  const po = findInventoryStock(Number(productId), Number(warehouseId));
  if (!po) return NextResponse.json({ success: false, message: "Inventory not found" }, { status: 404 });
  return NextResponse.json({ success: true, message: "OK", data: po });
}