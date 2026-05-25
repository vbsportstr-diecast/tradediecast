import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, RotateCcw, Star, Lock } from 'lucide-react'
import { supabase } from '../lib/supabase'
import ListingCard from '../components/ListingCard'

const BRANDS = [
  { name: 'Hot Wheels', emoji: '🔥' },
  { name: 'Matchbox',   emoji: '🚙' },
  { name: 'Tomica',     emoji: '🇯🇵' },
  { name: 'Corgi',      emoji: '💎' },
  { name: 'Maisto',     emoji: '🏎️' },
  { name: 'Vintage',    emoji: '🕰️' },
]

export default function Home() {
  const [trending, setTrending] = useState([])
  const [recent,   setRecent]   = useState([])
  const [loading,  setLoading]  = useState(true)
  const [stats,    setStats]    = useState(null)

  useEffect(() => {
    async function load() {
      const [t, r, listingCount, userCount, soldCount] = await Promise.all([
        supabase.from('listings').select('*, profiles(username, rating)').eq('status', 'active').order('view_count', { ascending: false }).limit(6),
        supabase.from('listings').select('*, profiles(username, rating)').eq('status', 'active').order('created_at', { ascending: false }).limit(8),
        supabase.from('listings').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
      ])

      setTrending(t.data ?? [])
      setRecent(r.data ?? [])

      const listings   = listingCount.count ?? 0
      const collectors = userCount.count    ?? 0
      const sold       = soldCount.count    ?? 0

      // Only show stats if we have meaningful numbers
      const hasStats = listings > 0 || collectors > 0 || sold > 0
      setStats(hasStats ? { listings, collectors, sold } : null)

      setLoading(false)
    }
    load()
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="bg-stone-900 text-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-4">
            The marketplace for<br /><span className="text-brand-500">serious collectors</span>
          </h1>
          <p className="text-stone-400 text-lg mb-8">
            Buy and sell Hot Wheels, Matchbox, Corgi, Tomica and more — backed by our Purchase Assurance Program.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/browse" className="btn-primary px-8 py-3 text-base">Browse listings</Link>
            <Link to="/sell"   className="btn-secondary px-8 py-3 text-base bg-transparent border-stone-600 text-white hover:bg-stone-800">Start selling</Link>
          </div>

          {/* Dynamic stats — only show when non-zero */}
          {stats && (
            <div className="flex justify-center gap-8 mt-10 text-sm text-stone-400">
              {stats.listings > 0 && (
                <div>
                  <strong className="text-white text-xl block">
                    {stats.listings.toLocaleString()}
                  </strong>
                  listings
                </div>
              )}
              {stats.collectors > 0 && (
                <div>
                  <strong className="text-white text-xl block">
                    {stats.collectors.toLocaleString()}
                  </strong>
                  collectors
                </div>
              )}
              {stats.sold > 0 && (
                <div>
                  <strong className="text-white text-xl block">
                    {stats.sold.toLocaleString()}
                  </strong>
                  sold
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-brand-500 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 text-white text-sm">
          <span className="flex items-center gap-2"><ShieldCheck size={16} /> Purchase Assurance Program</span>
          <span className="flex items-center gap-2"><RotateCcw size={16} /> Dispute process available</span>
          <span className="flex items-center gap-2"><Star size={16} /> Verified seller ratings</span>
          <span className="flex items-center gap-2"><Lock size={16} /> Secure checkout</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Trending */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl">🔥 Trending now</h2>
          <Link to="/browse" className="text-sm text-brand-500 hover:underline">View all →</Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {[...Array(6)].map((_, i) => <div key={i} className="card aspect-[4/3] animate-pulse bg-stone-100 rounded-2xl" />)}
          </div>
        ) : trending.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {trending.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        ) : (
          <div className="text-center py-12 text-stone-400 mb-12">
            No listings yet —{' '}
            <Link to="/sell" className="text-brand-500">be the first to sell!</Link>
          </div>
        )}

        {/* Browse by brand */}
        <h2 className="font-serif text-2xl mb-4">Browse by brand</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-12">
          {BRANDS.map(b => (
            <Link key={b.name} to={`/browse?brand=${b.name}`}
              className="card p-4 text-center hover:border-brand-500 hover:bg-brand-50 transition-colors group">
              <span className="text-3xl block mb-2">{b.emoji}</span>
              <span className="text-sm font-medium text-stone-700 group-hover:text-brand-600">{b.name}</span>
            </Link>
          ))}
        </div>

        {/* Recent */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl">Recently listed</h2>
          <Link to="/browse?sort=newest" className="text-sm text-brand-500 hover:underline">See all →</Link>
        </div>
        {!loading && recent.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recent.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
        {!loading && recent.length === 0 && (
          <div className="text-center py-12 text-stone-400">
            No listings yet —{' '}
            <Link to="/sell" className="text-brand-500">list your first car!</Link>
          </div>
        )}
      </div>
    </div>
  )
}
