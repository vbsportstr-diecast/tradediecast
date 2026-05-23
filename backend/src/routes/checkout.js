import { Router } from 'express'
import Stripe      from 'stripe'
import { supabase } from '../lib/supabase.js'

const router = Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// POST /api/checkout  — create a Stripe Checkout Session
router.post('/', async (req, res) => {
  const { listing_id, user_id } = req.body
  if (!listing_id || !user_id) return res.status(400).json({ error: 'Missing listing_id or user_id' })

  // Load listing
  const { data: listing, error } = await supabase
    .from('listings')
    .select('*, profiles(username)')
    .eq('id', listing_id)
    .single()

  if (error || !listing) return res.status(404).json({ error: 'Listing not found' })
  if (listing.status !== 'active') return res.status(400).json({ error: 'Listing is no longer available' })

  // TradeDiecast takes 5% fee
  const priceInCents  = Math.round(listing.price * 100)
  const shippingCents = Math.round((listing.shipping_cost ?? 0) * 100)

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: priceInCents,
          product_data: {
            name: listing.title,
            description: `${listing.brand} · ${listing.scale} · ${listing.condition}`,
            images: listing.images?.slice(0, 1) ?? [],
          },
        },
        quantity: 1,
      },
      ...(shippingCents > 0 ? [{
        price_data: {
          currency: 'usd',
          unit_amount: shippingCents,
          product_data: { name: 'Shipping' },
        },
        quantity: 1,
      }] : []),
    ],
    metadata: { listing_id, buyer_id: user_id, seller_id: listing.seller_id },
    success_url: `${process.env.FRONTEND_URL}/listing/${listing_id}?success=1`,
    cancel_url:  `${process.env.FRONTEND_URL}/listing/${listing_id}`,
  })

  res.json({ url: session.url })
})

export default router
