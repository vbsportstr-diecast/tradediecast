import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import ListingCard from '../components/ListingCard'

const BRANDS     = ['Hot Wheels', 'Matchbox', 'Tomica', 'Corgi', 'Maisto', 'Other']
const SCALES     = ['1:18', '1:24', '1:43', '1:64']
const CONDITIONS = ['Mint in box', 'Mint loose', 'Used']
const SORTS      = [
  { value: 'newest',    label: 'Newest first' },
  { value: 'oldest',    label: 'Oldest first' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
]

export default function Browse() {
  const [params, setParams]   = useSearchParams()
  const [listings, setListings] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [count,    setCount]    = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  // Read filters from URL
  const q         = params.get('q')         ?? ''
  const brand     = params.get('brand')     ?? ''
  const scale     = params.get('scale')     ?? ''
  const condition = params.get('condition') ?? ''
  const sort      = params.get('sort')      ?? 'newest'
  const minPrice  = params.get('min')       ?? ''
  const maxPrice  = params.get('max')       ?? ''

  function setFilter(key, val) {
    const next = new URLSearchParams(params)
    if (val) next.set(key, val)
    else next.delete(key)
    setParams(next)
  }

  useEffect(() => {
    async function fetch() {
      setLoading(true)
      let query = supabase
        .from('listings')
        .select('*, profiles(username, rating)', { count: 'exact' })
        .eq('status', 'active')

      if (q)         query = query.ilike('title', `%${q}%`)
      if (brand && brand !== 'All') query = query.eq('brand', brand)
      if (scale)     query = query.eq('scale', scale)
      if (condition) query = query.eq('condition', condition)
      if (minPrice)  query = query.gte('price', minPrice)
      if (maxPrice)  query = query.lte('price', maxPrice)

      const orderMap = {
        newest:     ['created_at', { ascending: false }],
        oldest:     ['created_at', { ascending: true }],
        price_asc:  ['price',      { ascending: true }],
        price_desc: ['price',      { ascending: false }],
      }
      const [col, opts] = orderMap[sort] ?? orderMap.newest
      query = query.order(col, opts)

      const { data, count: total } = await query.limit(48)
      setListings(data ?? [])
      setCount(total ?? 0)
      setLoading(false)
    }
    fetch()
  }, [q, brand, scale, condition, sort, minPrice, maxPrice])

  const activeFilters = [brand, scale, condition, minPrice && `$${minPrice}+`, maxPrice && `up to $${maxPrice}`].filter(Boolean)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h1 className="font-serif text-2xl">{q ? `Results for "${q}"` : brand || 'All listings'}</h1>
          <p className="text-sm text-stone-400 mt-0.5">{loading ? '…' : `${count} listings`}</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="input w-auto text-sm" value={sort} onChange={e => setFilter('sort', e.target.value)}>
            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary text-sm flex items-center gap-1.5">
            <SlidersHorizontal size={15} /> Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>
        </div>
      </div>

      {/* Active filter pills */}
      {activeFilters.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-4">
          {activeFilters.map(f => (
            <span key={f} className="flex items-center gap-1 bg-brand-100 text-brand-700 text-xs font-medium px-3 py-1 rounded-full">
              {f}
              <button onClick={() => {
                // Clear the matching filter
                const next = new URLSearchParams(params)
                if (f === brand) next.delete('brand')
                if (f === scale) next.delete('scale')
                if (f === condition) next.delete('condition')
                if (f.includes('+')) next.delete('min')
                if (f.includes('up to')) next.delete('max')
                setParams(next)
              }}><X size={12} /></button>
            </span>
          ))}
          <button onClick={() => setParams({})} className="text-xs text-stone-400 hover:text-stone-600 underline">Clear all</button>
        </div>
      )}

      <div className="flex gap-6">
        {/* Filters sidebar */}
        {showFilters && (
          <aside className="w-56 shrink-0">
            <div className="card p-4 sticky top-40 space-y-5">
              <FilterGroup label="Brand" options={BRANDS} value={brand} onChange={v => setFilter('brand', v)} />
              <FilterGroup label="Scale" options={SCALES} value={scale} onChange={v => setFilter('scale', v)} />
              <FilterGroup label="Condition" options={CONDITIONS} value={condition} onChange={v => setFilter('condition', v)} />
              <div>
                <p className="label">Price range</p>
                <div className="flex gap-2 items-center">
                  <input className="input text-sm" type="number" placeholder="$0"   value={minPrice} onChange={e => setFilter('min', e.target.value)} />
                  <span className="text-stone-400 text-sm">–</span>
                  <input className="input text-sm" type="number" placeholder="$999" value={maxPrice} onChange={e => setFilter('max', e.target.value)} />
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Results grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(12)].map((_, i) => <div key={i} className="card aspect-[4/3] animate-pulse bg-stone-100 rounded-2xl" />)}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-20 text-stone-400">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-lg font-medium mb-2">No listings found</p>
              <p className="text-sm">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {listings.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div>
      <p className="label">{label}</p>
      <div className="space-y-1">
        {options.map(o => (
          <label key={o} className="flex items-center gap-2 text-sm cursor-pointer hover:text-stone-900 text-stone-600">
            <input type="radio" name={label} checked={value === o} onChange={() => onChange(value === o ? '' : o)}
              className="accent-brand-500" />
            {o}
          </label>
        ))}
      </div>
    </div>
  )
}
