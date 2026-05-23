import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Star, Package, Calendar } from 'lucide-react'
import { supabase } from '../lib/supabase'
import ListingCard from '../components/ListingCard'

export default function Profile() {
  const { username } = useParams()
  const [profile,  setProfile]  = useState(null)
  const [listings, setListings] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    async function load() {
      const { data: p } = await supabase.from('profiles').select('*').eq('username', username).single()
      if (!p) { setLoading(false); return }
      setProfile(p)
      const { data: l } = await supabase.from('listings').select('*, profiles(username, rating)')
        .eq('seller_id', p.id).eq('status', 'active').order('created_at', { ascending: false })
      setListings(l ?? [])
      setLoading(false)
    }
    load()
  }, [username])

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-12 text-center text-stone-400">Loading…</div>
  if (!profile) return <div className="max-w-5xl mx-auto px-4 py-12 text-center"><p className="text-4xl mb-4">👤</p><p>Seller not found.</p></div>

  const memberSince = new Date(profile.created_at).getFullYear()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="card p-6 mb-6 flex gap-6 items-start flex-wrap">
        <div className="w-20 h-20 rounded-full bg-brand-500 text-white flex items-center justify-center font-serif text-4xl shrink-0">
          {profile.username[0].toUpperCase()}
        </div>
        <div className="flex-1">
          <h1 className="font-serif text-3xl mb-1">{profile.username}</h1>
          <p className="text-stone-400 text-sm mb-4">Member since {memberSince}</p>
          <div className="flex gap-6 flex-wrap">
            <div className="text-center"><strong className="block text-xl">{profile.total_sales ?? 0}</strong><span className="text-xs text-stone-400">Total sales</span></div>
            <div className="text-center"><strong className="block text-xl">{profile.rating?.toFixed(1) ?? '—'} <Star size={14} className="inline text-amber-400" /></strong><span className="text-xs text-stone-400">Rating</span></div>
            <div className="text-center"><strong className="block text-xl">{listings.length}</strong><span className="text-xs text-stone-400">Active listings</span></div>
            <div className="text-center"><strong className="block text-xl text-green-600">{profile.positive_feedback ?? 100}%</strong><span className="text-xs text-stone-400">Positive feedback</span></div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${profile.positive_feedback ?? 100}%` }} />
            </div>
            <span className="text-xs text-stone-400">Positive feedback</span>
          </div>
        </div>
      </div>

      {/* Listings */}
      <h2 className="font-serif text-2xl mb-4">Active listings ({listings.length})</h2>
      {listings.length === 0 ? (
        <div className="text-center py-12 text-stone-400"><Package size={36} className="mx-auto mb-3 opacity-30" /><p>No active listings.</p></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {listings.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  )
}
