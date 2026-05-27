import { NextRequest, NextResponse } from "next/server";
import { getTransactionStatus } from "@/lib/pesapal";

export async function GET(req: NextRequest) {
  const orderTrackingId = req.nextUrl.searchParams.get("orderTrackingId");

  if (!orderTrackingId) {
    return NextResponse.json(
      { error: "Missing orderTrackingId" },
      { status: 400 }
    );
  }

  try {
    const status = await getTransactionStatus(orderTrackingId);
    return NextResponse.json(status);
  } catch (err) {
    console.error("Pesapal status check error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Status check failed" },
      { status: 500 }
    );
  }
}
