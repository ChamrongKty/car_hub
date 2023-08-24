import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
    apiVersion:'2023-08-16',
    appInfo:{
        url:process.env.NEXTAUTH_URL,
        name:"Car Hub"
    }
})