const SANDBOX_BASE = "https://cybqa.pesapal.com/pesapalv3";
const LIVE_BASE = "https://pay.pesapal.com/v3";

function getBaseUrl() {
  return process.env.PESAPAL_ENV === "production" ? LIVE_BASE : SANDBOX_BASE;
}

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getAuthToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const res = await fetch(`${getBaseUrl()}/api/Auth/RequestToken`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
  });

  if (!res.ok) {
    throw new Error(`Pesapal auth failed: ${res.status}`);
  }

  const data = await res.json();
  if (data.error) {
    throw new Error(`Pesapal auth error: ${data.error.message ?? data.error}`);
  }

  // Cache with 4-minute expiry (token lasts 5 min)
  cachedToken = {
    token: data.token,
    expiresAt: Date.now() + 4 * 60 * 1000,
  };

  return data.token;
}

let cachedIpnId: string | null = null;

export async function registerIpn(ipnUrl: string): Promise<string> {
  if (cachedIpnId) return cachedIpnId;

  const token = await getAuthToken();

  const res = await fetch(`${getBaseUrl()}/api/URLSetup/RegisterIPN`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: ipnUrl,
      ipn_notification_type: "GET",
    }),
  });

  if (!res.ok) {
    throw new Error(`Pesapal IPN registration failed: ${res.status}`);
  }

  const data = await res.json();
  if (data.error) {
    throw new Error(`Pesapal IPN error: ${data.error.message ?? data.error}`);
  }

  cachedIpnId = data.ipn_id;
  return data.ipn_id;
}

export interface OrderRequest {
  id: string;
  currency: "UGX" | "USD";
  amount: number;
  description: string;
  callbackUrl: string;
  cancellationUrl?: string;
  billing: {
    email?: string;
    phone: string;
    firstName: string;
    lastName: string;
  };
}

export interface OrderResponse {
  order_tracking_id: string;
  merchant_reference: string;
  redirect_url: string;
}

export async function submitOrder(
  order: OrderRequest,
  notificationId: string
): Promise<OrderResponse> {
  const token = await getAuthToken();

  const res = await fetch(
    `${getBaseUrl()}/api/Transactions/SubmitOrderRequest`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: order.id,
        currency: order.currency,
        amount: order.amount,
        description: order.description,
        callback_url: order.callbackUrl,
        cancellation_url: order.cancellationUrl,
        notification_id: notificationId,
        redirect_mode: "TOP_WINDOW",
        billing_address: {
          email_address: order.billing.email || undefined,
          phone_number: order.billing.phone,
          first_name: order.billing.firstName,
          last_name: order.billing.lastName,
          country_code: "UG",
        },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Pesapal submit order failed: ${res.status}`);
  }

  const data = await res.json();
  if (data.error) {
    throw new Error(
      `Pesapal order error: ${data.error.message ?? data.error}`
    );
  }

  return data;
}

export interface TransactionStatus {
  payment_method: string;
  amount: number;
  currency: string;
  status_code: number; // 0=INVALID, 1=COMPLETED, 2=FAILED, 3=REVERSED
  payment_status_description: string;
  merchant_reference: string;
  confirmation_code: string;
  payment_account: string;
}

export async function getTransactionStatus(
  orderTrackingId: string
): Promise<TransactionStatus> {
  const token = await getAuthToken();

  const res = await fetch(
    `${getBaseUrl()}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Pesapal status check failed: ${res.status}`);
  }

  return res.json();
}
