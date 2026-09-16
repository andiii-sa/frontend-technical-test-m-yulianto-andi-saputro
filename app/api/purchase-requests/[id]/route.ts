import { destroyPurchaseRequst, findPurchaseRequst, HttpError, updatePurchaseRequst } from "@/mock/db";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const po = findPurchaseRequst(Number(id));
  if (!po) return NextResponse.json({ success: false, message: "Purchase requests not found" }, { status: 404 });
  return NextResponse.json({ success: true, message: "OK", data: po });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  try {
    const po = updatePurchaseRequst(Number(id), body);
    return NextResponse.json({ success: true, message: "Purchase requests updated", data: po }, { status: 201 });
  } catch (e) {
    const status = e instanceof HttpError ? e.status : 500;
    const message = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ success: false, message }, { status });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  try {
    destroyPurchaseRequst(Number(id));
    return NextResponse.json({ success: true, message: "Purchase requests deleted", data: null }, { status: 201 });
  } catch (e) {
    const status = e instanceof HttpError ? e.status : 500;
    const message = e instanceof Error ? e.message : "Internal error";
    return NextResponse.json({ success: false, message }, { status });
  }
}