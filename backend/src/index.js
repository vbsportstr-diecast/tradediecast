import 'dotenv/config'
import express      from 'express'
import cors         from 'cors'
import helmet       from 'helmet'
import rateLimit    from 'express-rate-limit'
import listingsRouter  from './routes/listings.js'
import checkoutRouter  from './routes/checkout.js'
import uploadsRouter   from './routes/uploads.js'
import webhooksRouter  from './routes/webhooks.js'

const app  = express()
const PORT = process.env.PORT ?? 4000

// Security
app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:3000', credentials: true }))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200, message: 'Too many requests' }))

// Stripe webhooks need raw body — must come before express.json()
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }), webhooksRouter)

app.use(express.json({ limit: '10mb' }))

// Routes
app.use('/api/listings',  listingsRouter)
app.use('/api/checkout',  checkoutRouter)
app.use('/api/uploads',   uploadsRouter)

app.get('/api/health', (_, res) => res.json({ status: 'ok', service: 'TradeDiecast API' }))

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => console.log(`✅ TradeDiecast API running on port ${PORT}`))
