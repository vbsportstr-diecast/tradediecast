import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Package, DollarSign, Star, Plus, Eye, Tag } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [listings, setListings] = useState([])
  const [stats,    setStats]    = useState({ total_earned: 0, total_sales: 0, active: 0, views: 0 })
  const [loading,  setLoading]  = useState(true)
  const [tab,      setTab]      = useState('active')

  useEffect(() => {
    if (!user) { navigate('/auth'); return }
    async function load() {
      const { data } = await supabase.from('listings').select('*').eq('seller_id', user.id).order('created_at', { ascending: false })
      const all = data ?? []
      setListings(all)
      setStats({
        active:        all.filter(l => l.status === 'active').length,
        total_sales:   all.filter(l => l.status === 'sold').length,
        total_earned:  all.filter(l => l.status === 'sold').reduce((s, l) => s + l.price * 0.95, 0),
        views:         all.reduce((s, l) => s + (l.view_count ?? 0), 0),
      })
      setLoading(false)
    }
    load()
  }, [user])

  const filtered = listings.filter(l =>
    tab === 'active'  ? l.status === 'active'  :
    tab === 'sold'    ? l.status === 'sold'     : true
  )

  if (loading) return <div className="max-w-5xl mx-auto px-4 py-12 text-center text-stone-400">Loading…</div>

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl">Dashboard</h1>
          <p className="text-stone-400 text-sm mt-1">Welcome back, {profile?.username ?? user.email}</p>
        </div>
        <Link to="/sell" className="btn-primary flex items-center gap-2"><Plus size={16} /> New listing</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Package size={18} />} label="Active listings" value={stats.active} />
        <StatCard icon={<Tag size={18} />}     label="Total sold"      value={stats.total_sales} />
        <StatCard icon={<DollarSign size={18} />} label="Total earned" value={`$${stats.total_earned.toFixed(2)}`} />
        <StatCard icon={<Eye size={18} />}     label="Total views"     value={stats.views} />
      </div>

      {/* Tabs */}
      <div className="flex gap-0 card overflow-hidden mb-4">
        {['active', 'sold', 'all'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold capitalize border-r last:border-r-0 border-stone-100 transition-colors
              ${tab === t ? 'bg-brand-50 text-brand-600' : 'text-stone-400 hover:text-stone-600'}`}>
            {t} ({listings.filter(l => t === 'all' ? true : l.status === t).length})
          </button>
        ))}
      </div>

      {/* Listings table */}
      <div className="card divide-y divide-stone-50">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-stone-400">
            <Package size={36} className="mx-auto mb-3 opacity-30" />
            <p>No {tab} listings yet.</p>
            <Link to="/sell" className="btn-primary mt-4 inline-block">List your first car</Link>
          </div>
        ) : filtered.map(l => (
          <div key={l.id} className="flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors">
            <div className="w-16 h-12 rounded-lg bg-stone-100 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
              {l.images?.[0] ? <img src={l.images[0]} alt="" className="w-full h-full object-cover" /> : '🚗'}
            </div>
            <div className="flex-1 min-w-0">
              <Link to={`/listing/${l.id}`} className="font-semibold text-sm hover:text-brand-600 line-clamp-1">{l.title}</Link>
              <p className="text-xs text-stone-400">{l.brand} · {l.scale} · {l.condition}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-base">${Number(l.price).toFixed(2)}</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                ${l.status === 'active' ? 'bg-green-100 text-green-700' :
                  l.status === 'sold'   ? 'bg-stone-100 text-stone-500' :
                                          'bg-amber-100 text-amber-700'}`}>
                {l.status}
              </span>
            </div>
            <div className="text-xs text-stone-400 shrink-0 hidden md:block">
              <Eye size={12} className="inline mr-1" />{l.view_count ?? 0} views
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 text-stone-400 text-xs mb-2">{icon} {label}</div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
