"use client";
import React, { FormEvent, useState } from "react";
import ReactDOM from "react-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { CustomButton } from "@/components";
import { createPaymentIntent } from "@/actions/stripe";

const CheckoutForm = () => {
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      // Show error to your customer
      setErrorMessage(submitError?.message || "");
      return;
    }

    // Create the PaymentIntent and obtain clientSecret from your server endpoint

    const { client_secret: clientSecret } = await createPaymentIntent({
      amount: price,
    });

    const { error } = await stripe!.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/result`,
        payment_method_data: {
          billing_details: {
            name: 'sdfdsf',
          },
        },
      },
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message || "error");
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <CustomButton
        title="Confirm Pay"
        textStyles="text-white"
        containerStyle="w-full py-[16px] rounded-full bg-primary-blue mt-5"
        btnType="submit"
        disabled={!stripe || !elements}
      />
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const options = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
  // Fully customizable with appearance API.
  appearance: {
    theme: "stripe",
    rules: {
      ".Tab": {
        border: "1px solid #E0E6EB",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)",
      },

      ".Tab:hover": {
        color: "var(--colorText)",
      },

      ".Tab--selected": {
        borderColor: "#E0E6EB",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)",
      },

      ".Input--invalid": {
        boxShadow:
          "0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)",
      },

      // See all supported class names and selector syntax below
    },
  },
};

const CheckOutPage = () => {
  return (
    <div className="max-w-md mx-auto md:max-w-2xl min-h-screen flex items-center justify-center">
      <div className="md:flex">
        <div className="md:shrink-0 bg-white rounded-xl shadow-md"></div>
        <div className="p-8 bg-white rounded-xl shadow-md">
          <Elements stripe={stripePromise} options={options as any}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};
export default CheckOutPage;
