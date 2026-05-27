import { NextRequest, NextResponse } from "next/server";
import { getTransactionStatus } from "@/lib/pesapal";

export async function GET(req: NextRequest) {
  const orderTrackingId = req.nextUrl.searchParams.get("OrderTrackingId");
  const merchantReference = req.nextUrl.searchParams.get("OrderMerchantReference");

  if (!orderTrackingId) {
    return NextResponse.json({ error: "Missing OrderTrackingId" }, { status: 400 });
  }

  try {
    const status = await getTransactionStatus(orderTrackingId);
    console.log(
      `[IPN] Order ${merchantReference}: ${status.payment_status_description} (${status.payment_method})`
    );

    // Pesapal expects a 200 response to acknowledge receipt
    return NextResponse.json({ status: "received" });
  } catch (err) {
    console.error("Pesapal IPN error:", err);
    return NextResponse.json({ error: "IPN processing failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const params = await req.json();
  const orderTrackingId = params.OrderTrackingId;
  const merchantReference = params.OrderMerchantReference;

  if (!orderTrackingId) {
    return NextResponse.json({ error: "Missing OrderTrackingId" }, { status: 400 });
  }

  try {
    const status = await getTransactionStatus(orderTrackingId);
    console.log(
      `[IPN] Order ${merchantReference}: ${status.payment_status_description} (${status.payment_method})`
    );

    return NextResponse.json({ status: "received" });
  } catch (err) {
    console.error("Pesapal IPN error:", err);
    return NextResponse.json({ error: "IPN processing failed" }, { status: 500 });
  }
}
