import { recentActivityDashboard } from "@/mock/db";
import { NextResponse } from "next/server";

export async function GET() {
    const data = recentActivityDashboard();
    return NextResponse.json({ success: true, message: "OK", data: data || [] });
}