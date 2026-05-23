import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, DollarSign, Truck, Info, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

const STEPS = ['Details', 'Photos', 'Pricing', 'Shipping', 'Review']

const BRANDS     = ['Hot Wheels', 'Matchbox', 'Tomica', 'Corgi', 'Maisto', 'ERTL', 'Greenlight', 'Other']
const SCALES     = ['1:18', '1:24', '1:43', '1:64', '1:72', 'Other']
const CONDITIONS = [
  { value: 'Mint in box', desc: 'Sealed or perfect original box' },
  { value: 'Mint loose',  desc: 'No box but no flaws' },
  { value: 'Used',        desc: 'Play wear present' },
]

export default function Sell() {
  const { user } = useAuth()
  const navigate  = useNavigate()
  const [step,    setStep]    = useState(0)
  const [loading, setLoading] = useState(false)
  const [images,  setImages]  = useState([])

  const [form, setForm] = useState({
    title: '', brand: 'Hot Wheels', scale: '1:64', model: '', year: '',
    item_number: '', condition: 'Mint in box', description: '',
    price: '', listing_type: 'fixed', shipping_cost: '0', handling_days: '1',
  })

  function set(key, val) { setForm(f => ({ ...f, [key]: val })) }

  async function handleImageChange(e) {
    const files = Array.from(e.target.files).slice(0, 12)
    setImages(files)
  }

  async function submit() {
    if (!user) { toast.error('Please sign in to list an item'); navigate('/auth'); return }
    setLoading(true)
    try {
      // Upload images to Supabase Storage
      const imageUrls = []
      for (const file of images) {
        const ext  = file.name.split('.').pop()
        const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error } = await supabase.storage.from('listing-images').upload(path, file)
        if (!error) {
          const { data } = supabase.storage.from('listing-images').getPublicUrl(path)
          imageUrls.push(data.publicUrl)
        }
      }

      // Create listing
      const { data, error } = await supabase.from('listings').insert({
        seller_id:    user.id,
        title:        form.title,
        brand:        form.brand,
        scale:        form.scale,
        model:        form.model,
        year:         form.year || null,
        item_number:  form.item_number || null,
        condition:    form.condition,
        description:  form.description,
        price:        parseFloat(form.price),
        listing_type: form.listing_type,
        shipping_cost: parseFloat(form.shipping_cost),
        handling_days: parseInt(form.handling_days),
        images:       imageUrls,
        status:       'active',
      }).select().single()

      if (error) throw error
      toast.success('Listing published!')
      navigate(`/listing/${data.id}`)
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <p className="text-4xl mb-4">🔒</p>
      <h2 className="font-serif text-2xl mb-2">Sign in to sell</h2>
      <p className="text-stone-400 mb-6">You need an account to list items on TradeDiecast.</p>
      <button onClick={() => navigate('/auth')} className="btn-primary px-8 py-3">Sign in or create account</button>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl mb-2">List your diecast</h1>
      <p className="text-stone-400 mb-6">No listing fees. 5% final value fee on sale.</p>

      {/* Steps */}
      <div className="flex gap-0 mb-8 card overflow-hidden">
        {STEPS.map((s, i) => (
          <button key={s} onClick={() => i < step && setStep(i)}
            className={`flex-1 py-3 text-xs font-semibold border-r last:border-r-0 border-stone-100 transition-colors
              ${i === step   ? 'bg-brand-50 text-brand-600' :
                i < step     ? 'bg-stone-50 text-stone-400' :
                               'text-stone-300'}`}>
            {i < step ? <CheckCircle size={14} className="inline mr-1 text-green-500" /> : `${i + 1}. `}{s}
          </button>
        ))}
      </div>

      <div className="card p-6">
        {/* Step 0 — Details */}
        {step === 0 && (
          <div className="space-y-4">
            <SectionTitle icon={<Info size={16} />} title="Item details" />
            <div>
              <label className="label">Title <span className="text-stone-400 font-normal">(be specific — brand, model, year)</span></label>
              <input className="input" value={form.title} onChange={e => set('title', e.target.value)}
                placeholder="e.g. Corgi Aston Martin DB5 James Bond 1965 Mint In Box" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Brand</label>
                <select className="input" value={form.brand} onChange={e => set('brand', e.target.value)}>
                  {BRANDS.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div><label className="label">Scale</label>
                <select className="input" value={form.scale} onChange={e => set('scale', e.target.value)}>
                  {SCALES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Model name</label>
                <input className="input" value={form.model} onChange={e => set('model', e.target.value)} placeholder="Aston Martin DB5" />
              </div>
              <div><label className="label">Year released</label>
                <input className="input" value={form.year} onChange={e => set('year', e.target.value)} placeholder="1965" />
              </div>
            </div>
            <div><label className="label">Item / catalogue number</label>
              <input className="input" value={form.item_number} onChange={e => set('item_number', e.target.value)} placeholder="e.g. Corgi 261" />
            </div>
            <div><label className="label">Condition</label>
              <div className="grid grid-cols-3 gap-3 mt-1">
                {CONDITIONS.map(c => (
                  <button key={c.value} onClick={() => set('condition', c.value)}
                    className={`p-3 rounded-xl border-2 text-left transition-colors ${form.condition === c.value ? 'border-brand-500 bg-brand-50' : 'border-stone-200 hover:border-stone-300'}`}>
                    <p className="font-semibold text-sm">{c.value}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{c.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div><label className="label">Description</label>
              <textarea className="input h-24 resize-none" value={form.description} onChange={e => set('description', e.target.value)}
                placeholder="Describe condition, any defects, provenance, special features…" />
            </div>
          </div>
        )}

        {/* Step 1 — Photos */}
        {step === 1 && (
          <div className="space-y-4">
            <SectionTitle icon={<Camera size={16} />} title="Photos" />
            <p className="text-sm text-stone-400">Up to 12 photos. First photo is your main image. Good lighting = more sales.</p>
            <label className="block border-2 border-dashed border-stone-200 rounded-2xl p-12 text-center cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition-colors">
              <Camera size={36} className="mx-auto mb-3 text-stone-300" />
              <p className="font-medium text-stone-500">Click to upload photos</p>
              <p className="text-xs text-stone-400 mt-1">JPG or PNG, up to 10MB each</p>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((f, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-stone-100 relative">
                    <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
                    {i === 0 && <span className="absolute bottom-1 left-1 bg-brand-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">MAIN</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2 — Pricing */}
        {step === 2 && (
          <div className="space-y-4">
            <SectionTitle icon={<DollarSign size={16} />} title="Pricing" />
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Listing type</label>
                <select className="input" value={form.listing_type} onChange={e => set('listing_type', e.target.value)}>
                  <option value="fixed">Buy it now (fixed price)</option>
                  <option value="offer">Buy it now + Best offer</option>
                  <option value="auction">Auction</option>
                </select>
              </div>
              <div><label className="label">Price ($)</label>
                <input className="input" type="number" min="0.01" step="0.01" value={form.price}
                  onChange={e => set('price', e.target.value)} placeholder="0.00" />
              </div>
            </div>
            {form.price && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <p className="font-semibold mb-1">💡 Earnings estimate</p>
                <p>List price: <strong>${parseFloat(form.price || 0).toFixed(2)}</strong></p>
                <p>TradeDiecast fee (5%): <strong>-${(parseFloat(form.price || 0) * 0.05).toFixed(2)}</strong></p>
                <p>You receive: <strong className="text-green-700">${(parseFloat(form.price || 0) * 0.95).toFixed(2)}</strong></p>
              </div>
            )}
          </div>
        )}

        {/* Step 3 — Shipping */}
        {step === 3 && (
          <div className="space-y-4">
            <SectionTitle icon={<Truck size={16} />} title="Shipping" />
            <div className="grid grid-cols-2 gap-4">
              <div><label className="label">Shipping cost</label>
                <select className="input" value={form.shipping_cost} onChange={e => set('shipping_cost', e.target.value)}>
                  <option value="0">Free shipping (recommended)</option>
                  <option value="custom">Fixed amount</option>
                </select>
              </div>
              <div><label className="label">Handling time</label>
                <select className="input" value={form.handling_days} onChange={e => set('handling_days', e.target.value)}>
                  <option value="0">Same day</option>
                  <option value="1">1 business day</option>
                  <option value="3">2–3 business days</option>
                  <option value="5">Up to 5 business days</option>
                </select>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-semibold mb-1">📦 Shipping tips</p>
              <p>Listings with free shipping get 40% more views. Use bubble wrap and a rigid box — diecast cars can damage easily in transit.</p>
            </div>
          </div>
        )}

        {/* Step 4 — Review */}
        {step === 4 && (
          <div className="space-y-3">
            <SectionTitle icon={<CheckCircle size={16} />} title="Review your listing" />
            <ReviewRow label="Title"     value={form.title} />
            <ReviewRow label="Brand"     value={form.brand} />
            <ReviewRow label="Scale"     value={form.scale} />
            <ReviewRow label="Condition" value={form.condition} />
            <ReviewRow label="Price"     value={`$${parseFloat(form.price || 0).toFixed(2)}`} />
            <ReviewRow label="Shipping"  value={form.shipping_cost === '0' ? 'Free' : `$${form.shipping_cost}`} />
            <ReviewRow label="Photos"    value={`${images.length} photo${images.length !== 1 ? 's' : ''}`} />
            {images.length === 0 && <p className="text-amber-600 text-sm">⚠️ No photos added — listings with photos sell much faster.</p>}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && <button onClick={() => setStep(s => s - 1)} className="btn-secondary flex-1">← Back</button>}
          {step < 4 ? (
            <button onClick={() => setStep(s => s + 1)} disabled={step === 0 && !form.title}
              className="btn-primary flex-1 disabled:opacity-40">Continue →</button>
          ) : (
            <button onClick={submit} disabled={loading || !form.title || !form.price}
              className="btn-primary flex-2 flex-1 disabled:opacity-40">
              {loading ? 'Publishing…' : '🚀 Publish listing'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-2 font-semibold text-base mb-2 pb-2 border-b border-stone-100">
      <span className="text-brand-500">{icon}</span> {title}
    </div>
  )
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-stone-50 text-sm">
      <span className="text-stone-400">{label}</span>
      <span className="font-medium">{value || '—'}</span>
    </div>
  )
}
