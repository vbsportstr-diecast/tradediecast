import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Car } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function Auth() {
  const [mode, setMode]           = useState('signin')
  const [email, setEmail]         = useState('')
  const [password, setPass]       = useState('')
  const [username, setUsername]   = useState('')
  const [loading, setLoading]     = useState(false)
  const [agreedToS, setAgreedToS]             = useState(false)
  const [agreedPrivacy, setAgreedPrivacy]     = useState(false)
  const [agreedMarketing, setAgreedMarketing] = useState(true)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const canSubmit = mode === 'signin' || (agreedToS && agreedPrivacy)

  async function handleSubmit(e) {
    e.preventDefault()
    if (mode === 'signup' && (!agreedToS || !agreedPrivacy)) {
      toast.error('Please accept the Terms of Service and Privacy Policy to continue.')
      return
    }
    setLoading(true)
    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) throw error
        toast.success('Welcome back!')
        navigate('/')
      } else {
        if (!username.trim()) {
          toast.error('Please choose a username')
          setLoading(false)
          return
        }
        const { data, error } = await signUp(email, password, username)
        if (error) throw error

        // Record legal acknowledgment + marketing preference
        if (data?.user) {
          await supabase.from('legal_acknowledgments').insert({
            user_id:            data.user.id,
            terms_version:      '2.1',
            privacy_version:    '2.1',
            agreed_at:          new Date().toISOString(),
            ip_recorded:        true,
            marketing_opt_in:   agreedMarketing,
          })
        }

        toast.success('Account created! Check your email to confirm.')
      }
    } catch (err) {
      toast.error(err.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-serif text-2xl text-brand-500 mb-4">
            <Car size={24} /> TradeDiecast
          </Link>
          <h1 className="font-serif text-3xl">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-stone-400 mt-2 text-sm">
            {mode === 'signin'
              ? 'Sign in to buy, sell and track your collection.'
              : 'Join collectors on TradeDiecast. Free to sign up.'}
          </p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username — signup only */}
            {mode === 'signup' && (
              <div>
                <label className="label">Username</label>
                <input
                  className="input"
                  value={username}
                  onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                  placeholder="hotwheelsdave"
                  required
                />
                <p className="text-xs text-stone-400 mt-1">Lowercase letters, numbers and underscores only.</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="label">Email address</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={e => setPass(e.target.value)}
                placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'}
                minLength={8}
                required
              />
            </div>

            {/* Legal acknowledgments — signup only */}
            {mode === 'signup' && (
              <div className="space-y-3 pt-3 border-t border-stone-100">

                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  Required agreements
                </p>

                {/* Terms + Seller Agreement */}
                <CheckboxRow
                  checked={agreedToS}
                  onChange={setAgreedToS}
                  required
                  label={
                    <>
                      I have read and agree to the{' '}
                      <Link to="/terms" target="_blank" className="text-brand-500 hover:underline font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/seller-agreement" target="_blank" className="text-brand-500 hover:underline font-medium">
                        Seller Agreement
                      </Link>
                    </>
                  }
                />

                {/* Privacy Policy */}
                <CheckboxRow
                  checked={agreedPrivacy}
                  onChange={setAgreedPrivacy}
                  required
                  label={
                    <>
                      I have read and agree to the{' '}
                      <Link to="/privacy" target="_blank" className="text-brand-500 hover:underline font-medium">
                        Privacy Policy
                      </Link>{' '}
                      and consent to the collection and use of my data as described therein
                    </>
                  }
                />

                {/* Warning if not both checked */}
                {(!agreedToS || !agreedPrivacy) && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    ⚠️ You must accept both agreements to create an account.
                  </p>
                )}

                {/* Divider */}
                <div className="pt-1 border-t border-stone-100">
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    Optional
                  </p>

                  {/* Marketing opt-in — pre-checked */}
                  <CheckboxRow
                    checked={agreedMarketing}
                    onChange={setAgreedMarketing}
                    required={false}
                    label="I'd like to receive news, promotions, and updates from TradeDiecast by email. You can unsubscribe at any time."
                  />
                </div>

              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !canSubmit}
              className="btn-primary w-full py-3 text-base disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>

          </form>

          {/* Mode toggle */}
          <div className="mt-6 text-center text-sm text-stone-400">
            {mode === 'signin' ? (
              <>Don't have an account?{' '}
                <button onClick={() => setMode('signup')} className="text-brand-500 font-medium hover:underline">
                  Sign up free
                </button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button onClick={() => setMode('signin')} className="text-brand-500 font-medium hover:underline">
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>

        {mode === 'signup' && (
          <p className="text-center text-xs text-stone-400 mt-6">
            Your agreements are recorded with a timestamp for legal compliance.
          </p>
        )}

      </div>
    </div>
  )
}

function CheckboxRow({ checked, onChange, label, required }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          checked
            ? 'bg-brand-500 border-brand-500'
            : 'border-stone-300 hover:border-brand-400'
        }`}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <span className="text-xs text-stone-600 leading-relaxed">
        {required && <span className="text-brand-500 mr-0.5">*</span>}
        {label}
      </span>
    </label>
  )
}