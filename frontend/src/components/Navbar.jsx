import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Heart, User, Tag, Menu, X, Car } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const [query, setQuery]     = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) navigate(`/browse?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <nav className="bg-white border-b border-stone-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-serif text-xl text-brand-500 shrink-0">
          <Car size={20} />
          TradeDiecast
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex items-center bg-stone-100 border border-stone-200 rounded-xl overflow-hidden">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search Hot Wheels, Matchbox, Corgi…"
            className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none"
          />
          <button type="submit" className="px-4 py-2.5 bg-brand-500 text-white hover:bg-brand-600 transition-colors">
            <Search size={16} />
          </button>
        </form>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 ml-auto">
          {user ? (
            <>
              <Link to="/dashboard" className="btn-secondary text-sm flex items-center gap-1.5">
                <User size={15} /> Dashboard
              </Link>
              <button onClick={signOut} className="btn-secondary text-sm">Sign out</button>
            </>
          ) : (
            <Link to="/auth" className="btn-secondary text-sm flex items-center gap-1.5">
              <User size={15} /> Sign in
            </Link>
          )}
          <Link to="/sell" className="btn-primary text-sm flex items-center gap-1.5 ml-1">
            <Tag size={15} /> Sell
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden ml-auto p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile search + menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 px-4 py-3 flex flex-col gap-3">
          <form onSubmit={handleSearch} className="flex items-center bg-stone-100 border border-stone-200 rounded-xl overflow-hidden">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search…"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none"
            />
            <button type="submit" className="px-4 py-2.5 bg-brand-500 text-white">
              <Search size={16} />
            </button>
          </form>
          <div className="flex gap-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="btn-secondary text-sm flex-1 text-center">Dashboard</Link>
                <button onClick={() => { signOut(); setMenuOpen(false) }} className="btn-secondary text-sm flex-1">Sign out</button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setMenuOpen(false)} className="btn-secondary text-sm flex-1 text-center">Sign in</Link>
            )}
            <Link to="/sell" onClick={() => setMenuOpen(false)} className="btn-primary text-sm flex-1 text-center">Sell</Link>
          </div>
        </div>
      )}

      {/* Category bar */}
      <div className="border-t border-stone-100 bg-white overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-0">
          {['All', 'Hot Wheels', 'Matchbox', 'Tomica', 'Corgi', 'Maisto', '1:18', '1:24', '1:43', '1:64', 'Vintage', 'Treasure Hunts'].map(cat => (
            <Link
              key={cat}
              to={`/browse?brand=${encodeURIComponent(cat === 'All' ? '' : cat)}`}
              className="shrink-0 px-4 py-2.5 text-sm text-stone-500 hover:text-stone-900 border-b-2 border-transparent hover:border-brand-500 transition-all whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
