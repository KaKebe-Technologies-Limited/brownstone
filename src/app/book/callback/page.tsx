"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface TransactionStatus {
  payment_method: string;
  amount: number;
  currency: string;
  status_code: number;
  payment_status_description: string;
  merchant_reference: string;
  confirmation_code: string;
}

function CallbackContent() {
  const params = useSearchParams();
  const orderTrackingId = params.get("OrderTrackingId");
  const merchantReference = params.get("OrderMerchantReference");

  const [status, setStatus] = useState<TransactionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderTrackingId) {
      setError("No order tracking ID found");
      setLoading(false);
      return;
    }

    let attempts = 0;
    const maxAttempts = 6;

    async function checkStatus() {
      try {
        const res = await fetch(
          `/api/pesapal/status?orderTrackingId=${orderTrackingId}`
        );
        if (!res.ok) throw new Error("Failed to check status");
        const data: TransactionStatus = await res.json();

        // status_code 0 = INVALID (still processing), retry
        if (data.status_code === 0 && attempts < maxAttempts) {
          attempts++;
          setTimeout(checkStatus, 3000);
          return;
        }

        setStatus(data);
      } catch {
        setError("Unable to verify payment status. Please contact us.");
      } finally {
        setLoading(false);
      }
    }

    checkStatus();
  }, [orderTrackingId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <Loader2 size={48} className="text-brand-500 animate-spin mb-6" />
        <h2 className="font-serif text-2xl font-bold text-earth-800 mb-2">
          Verifying Payment...
        </h2>
        <p className="text-earth-500 max-w-md">
          Please wait while we confirm your payment with Pesapal.
        </p>
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <XCircle size={56} className="text-red-500 mb-6" />
        <h2 className="font-serif text-3xl font-bold text-earth-800 mb-3">
          Something Went Wrong
        </h2>
        <p className="text-earth-500 max-w-md mb-6">
          {error || "We couldn't verify your payment."}
        </p>
        <p className="text-earth-400 text-sm max-w-md mb-8">
          Don&apos;t worry — if your payment went through, George will confirm
          via WhatsApp. You can also reach out directly.
        </p>
        <div className="flex gap-3">
          <a
            href="https://wa.me/256772480055"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-cream font-semibold rounded-xl transition-colors"
          >
            WhatsApp George
          </a>
          <Link
            href="/book"
            className="px-6 py-3 border border-earth-200 text-earth-600 hover:border-brand-300 font-semibold rounded-xl transition-colors"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  const isSuccess = status.status_code === 1;

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-4">
        <CheckCircle2 size={56} className="text-forest-500 mb-6" />
        <h2 className="font-serif text-3xl font-bold text-earth-800 mb-3">
          Booking Confirmed!
        </h2>
        <p className="text-earth-500 max-w-md mb-2">
          Your payment was received and your room is reserved.
        </p>
        <p className="text-earth-400 text-sm max-w-md mb-8">
          George will reach out on WhatsApp to confirm your arrival time.
        </p>
        <div className="bg-earth-50 rounded-xl p-6 text-left text-sm max-w-sm w-full border border-earth-200">
          <p className="font-semibold text-earth-800 mb-3">Payment Summary</p>
          <div className="space-y-1.5 text-earth-500">
            <p>
              <span className="text-earth-700 font-medium">Reference:</span>{" "}
              {merchantReference}
            </p>
            <p>
              <span className="text-earth-700 font-medium">Amount:</span>{" "}
              {status.currency} {status.amount?.toLocaleString()}
            </p>
            <p>
              <span className="text-earth-700 font-medium">Method:</span>{" "}
              {status.payment_method}
            </p>
            {status.confirmation_code && (
              <p>
                <span className="text-earth-700 font-medium">
                  Confirmation:
                </span>{" "}
                {status.confirmation_code}
              </p>
            )}
          </div>
        </div>
        <Link
          href="/"
          className="mt-8 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-cream font-semibold rounded-xl transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // FAILED or REVERSED
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <XCircle size={56} className="text-red-500 mb-6" />
      <h2 className="font-serif text-3xl font-bold text-earth-800 mb-3">
        Payment {status.payment_status_description}
      </h2>
      <p className="text-earth-500 max-w-md mb-8">
        Your payment could not be completed. No charges were made. Please try
        again or contact us for help.
      </p>
      <div className="flex gap-3">
        <Link
          href="/book"
          className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-cream font-semibold rounded-xl transition-colors"
        >
          Try Again
        </Link>
        <a
          href="https://wa.me/256772480055"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-earth-200 text-earth-600 hover:border-brand-300 font-semibold rounded-xl transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <div className="pt-16 min-h-screen bg-cream">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <Loader2 size={48} className="text-brand-500 animate-spin" />
          </div>
        }
      >
        <CallbackContent />
      </Suspense>
    </div>
  );
}
