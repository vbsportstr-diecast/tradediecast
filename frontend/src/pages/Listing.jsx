import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, Truck, Star, MessageCircle, Heart } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

export default function Listing() {
  const { id }     = useParams()
  const { user }   = useAuth()
  const navigate   = useNavigate()
  const [listing, setListing]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [imgIdx,  setImgIdx]    = useState(0)
  const [offerAmt, setOfferAmt] = useState('')
  const [showOffer, setShowOffer] = useState(false)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('listings')
        .select('*, profiles(id, username, rating, total_sales, created_at, avatar_url)')
        .eq('id', id)
        .single()
      setListing(data)
      setLoading(false)
      // Increment view count
      if (data) supabase.from('listings').update({ view_count: (data.view_count ?? 0) + 1 }).eq('id', id)
    }
    load()
  }, [id])

  async function handleBuy() {
    if (!user) { toast.error('Sign in to purchase'); navigate('/auth'); return }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listing_id: listing.id, user_id: user.id }),
      })
      const { url } = await res.json()
      window.location.href = url
    } catch {
      toast.error('Checkout failed. Please try again.')
    }
  }

  async function handleOffer() {
    if (!user) { toast.error('Sign in to make an offer'); navigate('/auth'); return }
    if (!offerAmt || isNaN(offerAmt)) { toast.error('Enter a valid offer amount'); return }
    const { error } = await supabase.from('offers').insert({
      listing_id: listing.id, buyer_id: user.id, amount: parseFloat(offerAmt)
    })
    if (error) toast.error('Failed to send offer')
    else { toast.success('Offer sent! The seller will respond within 24 hours.'); setShowOffer(false) }
  }

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-12 text-center text-stone-400">Loading…</div>
  if (!listing) return <div className="max-w-6xl mx-auto px-4 py-12 text-center"><p className="text-4xl mb-4">🔍</p><p>Listing not found.</p></div>

  const imgs = listing.images?.length ? listing.images : [null]
  const seller = listing.profiles
  const fee  = listing.price * 0.05

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-stone-400 mb-4">
        <Link to="/" className="hover:text-stone-600">Home</Link> ›{' '}
        <Link to="/browse" className="hover:text-stone-600">Browse</Link> ›{' '}
        <Link to={`/browse?brand=${listing.brand}`} className="hover:text-stone-600">{listing.brand}</Link> ›{' '}
        <span className="text-stone-600">{listing.title.slice(0, 40)}…</span>
      </nav>

      <div className="grid md:grid-cols-[1fr_380px] gap-8">
        {/* Left — images + description */}
        <div>
          <div className="card aspect-[4/3] flex items-center justify-center rounded-2xl overflow-hidden mb-3 bg-stone-100">
            {imgs[imgIdx] ? <img src={imgs[imgIdx]} alt={listing.title} className="w-full h-full object-contain" />
              : <span className="text-[120px]">🚗</span>}
          </div>
          {imgs.length > 1 && (
            <div className="flex gap-2 mb-6">
              {imgs.map((img, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${i === imgIdx ? 'border-brand-500' : 'border-stone-200'}`}>
                  {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : <span className="text-2xl flex items-center justify-center h-full">🚗</span>}
                </button>
              ))}
            </div>
          )}

          <h2 className="font-semibold text-lg mb-3">Description</h2>
          <p className="text-stone-600 text-sm leading-relaxed mb-6">{listing.description || 'No description provided.'}</p>

          <h2 className="font-semibold text-lg mb-3">Item specifics</h2>
          <div className="card divide-y divide-stone-50">
            {[
              ['Brand',     listing.brand],
              ['Scale',     listing.scale],
              ['Model',     listing.model],
              ['Year',      listing.year],
              ['Condition', listing.condition],
              ['Item no.',  listing.item_number],
            ].filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex justify-between px-4 py-2.5 text-sm">
                <span className="text-stone-400">{k}</span>
                <span className="font-medium">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — buy box */}
        <div className="space-y-4">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {listing.view_count > 50 && <span className="bg-brand-100 text-brand-700 text-xs font-bold px-3 py-1 rounded-full">🔥 {listing.view_count} watching</span>}
            <span className={`text-xs font-semibold px-3 py-1 rounded-full
              ${listing.condition === 'Mint in box' ? 'bg-blue-100 text-blue-700' :
                listing.condition === 'Mint loose'  ? 'bg-emerald-100 text-emerald-700' :
                                                      'bg-amber-100 text-amber-700'}`}>
              {listing.condition}
            </span>
          </div>

          <h1 className="font-serif text-2xl leading-snug">{listing.title}</h1>

          {/* Price box */}
          <div className="card p-5">
            <div className="text-3xl font-bold mb-1">${Number(listing.price).toFixed(2)}</div>
            <p className="text-sm text-stone-400 mb-4"><Truck size={13} className="inline mr-1" />{listing.shipping_cost > 0 ? `$${listing.shipping_cost} shipping` : 'Free shipping'} · Arrives in 3–7 days</p>
            <div className="space-y-2">
              <button onClick={handleBuy} className="btn-primary w-full py-3 text-base">Buy it now</button>
              <button className="btn-secondary w-full py-3" onClick={() => toast.success('Added to cart!')}>Add to cart</button>
              {listing.listing_type === 'offer' && (
                <button onClick={() => setShowOffer(!showOffer)} className="w-full py-3 border-2 border-blue-300 text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm">
                  Make an offer
                </button>
              )}
            </div>
            {showOffer && (
              <div className="mt-4 space-y-2">
                <div className="flex overflow-hidden rounded-lg border border-stone-200">
                  <span className="px-3 py-2.5 bg-stone-100 text-stone-500 text-sm">$</span>
                  <input type="number" value={offerAmt} onChange={e => setOfferAmt(e.target.value)}
                    placeholder={Math.round(listing.price * 0.9)} className="flex-1 px-3 py-2.5 text-sm outline-none text-lg font-bold" />
                </div>
                <p className="text-xs text-stone-400">Offers within 10% of asking price are most likely accepted.</p>
                <button onClick={handleOffer} className="btn-primary w-full">Send offer</button>
              </div>
            )}
          </div>

          {/* Seller */}
          <div className="card p-4">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Seller information</p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-brand-500 text-white flex items-center justify-center font-serif text-lg shrink-0">
                {seller?.username?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div>
                <Link to={`/seller/${seller?.username}`} className="font-semibold text-blue-700 hover:underline">{seller?.username}</Link>
                <p className="text-xs text-stone-400">
                  <Star size={11} className="inline text-amber-400 mr-0.5" />
                  {seller?.rating?.toFixed(1) ?? '—'} · {seller?.total_sales ?? 0} sales
                </p>
              </div>
            </div>
            <button onClick={() => toast('Messaging coming soon!')} className="btn-secondary w-full mt-3 text-sm flex items-center justify-center gap-1.5">
              <MessageCircle size={14} /> Message seller
            </button>
          </div>

          {/* Protection */}
          <div className="card p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck size={20} className="text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">TradeDiecast Buyer Protection</p>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">If your item doesn't arrive, arrives damaged, or isn't as described — we'll refund you in full. Every purchase is covered.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
