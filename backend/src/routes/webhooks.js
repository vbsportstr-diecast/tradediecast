import { Router } from 'express'
import Stripe      from 'stripe'
import { supabase } from '../lib/supabase.js'

const router = Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session    = event.data.object
    const listing_id = session.metadata.listing_id
    const buyer_id   = session.metadata.buyer_id
    const seller_id  = session.metadata.seller_id

    // Mark listing as sold
    await supabase.from('listings').update({ status: 'sold', sold_to: buyer_id }).eq('id', listing_id)

    // Create order record
    await supabase.from('orders').insert({
      listing_id,
      buyer_id,
      seller_id,
      stripe_session_id: session.id,
      amount_total:      session.amount_total / 100,
      status:            'paid',
    })

    // Increment seller's total_sales
    await supabase.rpc('increment_sales', { seller_uuid: seller_id })

    console.log(`✅ Order created for listing ${listing_id}`)
  }

  res.json({ received: true })
})

export default router
