import type { Stripe } from "stripe";

import PrintObject from "@/components/PrintObject";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}): Promise<JSX.Element> {
  if (!searchParams.payment_intent)
    throw new Error("Please provide a valid payment_intent (`pi_...`)");

  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.retrieve(searchParams.payment_intent);

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full">
          <div className="text-green-600 text-5xl mb-4 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="100" viewBox="0 -960 960 960" width="100" fill="currentColor"><path d="M378-246 154-470l43-43 181 181 384-384 43 43-427 427Z"/></svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Payment {paymentIntent.status}
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your payment. Your transaction was successful.
          </p>
          <div className="text-center">
            <Link
              href="/car-hub"
              className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
