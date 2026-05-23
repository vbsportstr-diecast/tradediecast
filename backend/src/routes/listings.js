import { Router } from 'express'
import { supabase } from '../lib/supabase.js'

const router = Router()

// GET /api/listings?brand=&scale=&q=&sort=newest&limit=48
router.get('/', async (req, res) => {
  const { brand, scale, condition, q, sort = 'newest', limit = 48, min, max } = req.query
  let query = supabase.from('listings').select('*, profiles(username, rating)', { count: 'exact' }).eq('status', 'active')

  if (q)         query = query.ilike('title', `%${q}%`)
  if (brand)     query = query.eq('brand', brand)
  if (scale)     query = query.eq('scale', scale)
  if (condition) query = query.eq('condition', condition)
  if (min)       query = query.gte('price', min)
  if (max)       query = query.lte('price', max)

  const sortMap = { newest: ['created_at', false], price_asc: ['price', true], price_desc: ['price', false] }
  const [col, asc] = sortMap[sort] ?? sortMap.newest
  query = query.order(col, { ascending: asc }).limit(Number(limit))

  const { data, count, error } = await query
  if (error) return res.status(500).json({ error: error.message })
  res.json({ listings: data, count })
})

// GET /api/listings/:id
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('listings')
    .select('*, profiles(id, username, rating, total_sales, created_at)')
    .eq('id', req.params.id)
    .single()
  if (error) return res.status(404).json({ error: 'Not found' })
  res.json(data)
})

export default router
