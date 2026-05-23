import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'
import clsx from 'clsx'

const CONDITION_BADGE = {
  'Mint in box':  'badge-box',
  'Mint loose':   'badge-mint',
  'Used':         'badge-used',
}

export default function ListingCard({ listing }) {
  const { user } = useAuth()
  const [saved, setSaved] = useState(listing.is_saved ?? false)

  async function toggleSave(e) {
    e.preventDefault()
    if (!user) { toast.error('Sign in to save listings'); return }
    setSaved(!saved)
    if (saved) {
      await supabase.from('saved_listings').delete().match({ user_id: user.id, listing_id: listing.id })
    } else {
      await supabase.from('saved_listings').insert({ user_id: user.id, listing_id: listing.id })
      toast.success('Saved to watchlist')
    }
  }

  const imageUrl = listing.images?.[0] ?? null

  return (
    <Link to={`/listing/${listing.id}`} className="card group block hover:-translate-y-0.5 transition-transform duration-150">
      {/* Image */}
      <div className="aspect-[4/3] bg-stone-100 rounded-t-2xl flex items-center justify-center relative overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={listing.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl select-none">🚗</span>
        )}
        <span className={clsx('absolute top-2 left-2', CONDITION_BADGE[listing.condition] ?? 'badge-used')}>
          {listing.condition}
        </span>
        <button
          onClick={toggleSave}
          className={clsx(
            'absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm transition-colors',
            saved ? 'text-brand-500' : 'text-stone-300 hover:text-stone-500'
          )}
        >
          <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-[10px] text-stone-400 uppercase tracking-wider mb-0.5">{listing.brand}</p>
        <h3 className="font-semibold text-sm leading-snug mb-1 line-clamp-2">{listing.title}</h3>
        <p className="text-xs text-stone-400 mb-2">{listing.scale}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${Number(listing.price).toFixed(2)}</span>
          <span className="text-xs text-stone-400">
            ⭐ {listing.profiles?.rating?.toFixed(1) ?? '—'} · {listing.profiles?.username ?? 'seller'}
          </span>
        </div>
      </div>
    </Link>
  )
}
