'use server'

import type { Stripe } from 'stripe'

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

import { stripe } from '@/lib/stripe'
import { CURRENCY } from '@/config'
import { formatAmountForStripe } from '@/utils'

export async function createCheckoutSession(data: FormData): Promise<void> {
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: 'payment',
      submit_type: 'donate',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: 'Custom amount donation',
            },
            unit_amount: formatAmountForStripe(
              Number(data.get('price') as string),
              CURRENCY
            ),
          },
        },
      ],
      success_url: `${headers().get(
        'origin'
      )}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headers().get('origin')}/checkout`,
    })

  redirect(checkoutSession.url as string)
}

export async function createPaymentIntent(
  data: any
): Promise<{ client_secret: string }> {
    console.log(data);
    
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.amount as string),
        CURRENCY
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    })

  return { client_secret: paymentIntent.client_secret as string }
}