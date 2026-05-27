import { NextRequest, NextResponse } from "next/server";
import { registerIpn, submitOrder } from "@/lib/pesapal";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, currency, amount, description, billing, callbackUrl, cancellationUrl } = body;

    if (!id || !currency || !amount || !billing?.phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const origin = req.nextUrl.origin;
    const ipnUrl = `${origin}/api/pesapal/ipn`;
    const ipnId = await registerIpn(ipnUrl);

    const order = await submitOrder(
      {
        id,
        currency,
        amount,
        description,
        callbackUrl: callbackUrl || `${origin}/book/callback`,
        cancellationUrl: cancellationUrl || `${origin}/book`,
        billing,
      },
      ipnId
    );

    return NextResponse.json(order);
  } catch (err) {
    console.error("Pesapal create-order error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Payment initiation failed" },
      { status: 500 }
    );
  }
}
