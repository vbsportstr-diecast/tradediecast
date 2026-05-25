import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Car, CheckCircle, XCircle, Loader, Eye, EyeOff, Check, X } from 'lucide-react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY

// Password requirements
const REQUIREMENTS = [
  { id: 'length',    label: 'At least 8 characters',      test: p => p.length >= 8 },
  { id: 'upper',     label: 'One uppercase letter (A-Z)',  test: p => /[A-Z]/.test(p) },
  { id: 'lower',     label: 'One lowercase letter (a-z)',  test: p => /[a-z]/.test(p) },
  { id: 'number',    label: 'One number (0-9)',            test: p => /[0-9]/.test(p) },
  { id: 'special',   label: 'One special character (!@#$…)', test: p => /[^A-Za-z0-9]/.test(p) },
]

function passwordStrength(password) {
  const passed = REQUIREMENTS.filter(r => r.test(password)).length
  if (passed <= 1) return { label: 'Very weak', color: 'bg-red-500',    width: '20%' }
  if (passed === 2) return { label: 'Weak',      color: 'bg-orange-500', width: '40%' }
  if (passed === 3) return { label: 'Fair',       color: 'bg-yellow-500', width: '60%' }
  if (passed === 4) return { label: 'Strong',     color: 'bg-blue-500',  width: '80%' }
  return                    { label: 'Very strong', color: 'bg-green-500', width: '100%' }
}

export default function Auth() {
  const [mode, setMode]           = useState('signin')
  const [email, setEmail]         = useState('')
  const [password, setPass]       = useState('')
  const [username, setUsername]   = useState('')
  const [loading, setLoading]     = useState(false)
  const [showPass, setShowPass]   = useState(false)
  const [agreedToS, setAgreedToS]             = useState(false)
  const [agreedPrivacy, setAgreedPrivacy]     = useState(false)
  const [agreedMarketing, setAgreedMarketing] = useState(true)
  const [captchaToken, setCaptchaToken]       = useState(null)
  const [usernameStatus, setUsernameStatus]   = useState('idle')
  const [showForgot, setShowForgot]           = useState(false)
  const [forgotEmail, setForgotEmail]         = useState('')
  const [forgotLoading, setForgotLoading]     = useState(false)
  const captchaRef = useRef(null)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const allRequirementsMet = REQUIREMENTS.every(r => r.test(password))
  const strength = password.length > 0 ? passwordStrength(password) : null

  const canSubmit = mode === 'signin'
    ? true
    : agreedToS && agreedPrivacy && usernameStatus === 'available' && captchaToken && allRequirementsMet

  // Username availability check
  useEffect(() => {
    if (mode !== 'signup') return
    if (username.length < 3) { setUsernameStatus('idle'); return }
    setUsernameStatus('checking')
    const timer = setTimeout(async () => {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle()
      setUsernameStatus(data ? 'taken' : 'available')
    }, 500)
    return () => clearTimeout(timer)
  }, [username, mode])

  function resetCaptcha() {
    setCaptchaToken(null)
    captchaRef.current?.resetCaptcha()
  }

  function switchMode(newMode) {
    setMode(newMode)
    setPass('')
    setShowPass(false)
    setUsernameStatus('idle')
    resetCaptcha()
  }

  async function handleForgotPassword(e) {
    e.preventDefault()
    if (!forgotEmail) { toast.error('Enter your email address'); return }
    setForgotLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/auth?mode=reset`
    })
    setForgotLoading(false)
    if (error) toast.error(error.message)
    else {
      toast.success('Password reset email sent! Check your inbox.')
      setShowForgot(false)
      setForgotEmail('')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (mode === 'signup') {
      if (!agreedToS || !agreedPrivacy) {
        toast.error('Please accept the Terms of Service and Privacy Policy.')
        return
      }
      if (usernameStatus === 'taken') {
        toast.error('That username is already taken.')
        return
      }
      if (!allRequirementsMet) {
        toast.error('Password does not meet all requirements.')
        return
      }
      if (!captchaToken) {
        toast.error('Please complete the captcha.')
        return
      }
    }
    setLoading(true)
    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) {
          if (error.message.toLowerCase().includes('invalid login')) {
            toast.error('Incorrect email or password.')
          } else if (error.message.toLowerCase().includes('email not confirmed')) {
            toast.error('Please confirm your email first. Check your inbox.')
          } else {
            toast.error(error.message)
          }
          return
        }
        toast.success('Welcome back!')
        navigate('/')
      } else {
        if (!username.trim() || username.length < 3) {
          toast.error('Username must be at least 3 characters')
          setLoading(false)
          return
        }
        const { data, error } = await signUp(email, password, username)
        if (error) {
          if (error.message.toLowerCase().includes('already registered') ||
              error.message.toLowerCase().includes('already exists') ||
              error.message.toLowerCase().includes('user already')) {
            toast.error('An account with this email already exists. Try signing in.')
            switchMode('signin')
          } else {
            toast.error(error.message)
          }
          resetCaptcha()
          return
        }
        if (data?.user) {
          await supabase.from('legal_acknowledgments').insert({
            user_id:          data.user.id,
            terms_version:    '2.1',
            privacy_version:  '2.1',
            agreed_at:        new Date().toISOString(),
            ip_recorded:      true,
            marketing_opt_in: agreedMarketing,
          })
        }
        toast.success('Account created! Check your email to confirm.')
      }
    } catch (err) {
      toast.error(err.message ?? 'Something went wrong. Please try again.')
      resetCaptcha()
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

        {/* Forgot password modal */}
        {showForgot && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl p-6">
              <h2 className="font-serif text-xl mb-2">Reset your password</h2>
              <p className="text-stone-400 text-sm mb-4">
                Enter your email and we'll send you a reset link.
              </p>
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <input
                  className="input"
                  type="email"
                  placeholder="you@example.com"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={forgotLoading}
                  className="btn-primary w-full py-3 disabled:opacity-40">
                  {forgotLoading ? 'Sending…' : 'Send reset link'}
                </button>
                <button type="button" onClick={() => setShowForgot(false)}
                  className="btn-secondary w-full py-2.5 text-sm">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Username — signup only */}
            {mode === 'signup' && (
              <div>
                <label className="label">Username</label>
                <div className="relative">
                  <input
                    className={`input pr-9 ${
                      usernameStatus === 'taken'     ? 'border-red-400 focus:ring-red-400' :
                      usernameStatus === 'available' ? 'border-green-400 focus:ring-green-400' : ''
                    }`}
                    value={username}
                    onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="hotwheelsdave"
                    minLength={3}
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {usernameStatus === 'checking'  && <Loader size={15} className="text-stone-400 animate-spin" />}
                    {usernameStatus === 'available' && <CheckCircle size={15} className="text-green-500" />}
                    {usernameStatus === 'taken'     && <XCircle size={15} className="text-red-500" />}
                  </div>
                </div>
                {usernameStatus === 'taken'     && <p className="text-xs text-red-500 mt-1">That username is taken — try another.</p>}
                {usernameStatus === 'available' && <p className="text-xs text-green-600 mt-1">✓ Username is available!</p>}
                {usernameStatus === 'idle'      && <p className="text-xs text-stone-400 mt-1">Lowercase letters, numbers and underscores. Min 3 characters.</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="label">Email address</label>
              <input className="input" type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required />
            </div>

            {/* Password with toggle + strength */}
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  className="input pr-10"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPass(e.target.value)}
                  placeholder={mode === 'signup' ? 'Create a strong password' : '••••••••'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password strength bar — signup only */}
              {mode === 'signup' && password.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-stone-400">Password strength</span>
                    <span className={`text-xs font-semibold ${
                      strength?.label === 'Very strong' ? 'text-green-600' :
                      strength?.label === 'Strong'      ? 'text-blue-600'  :
                      strength?.label === 'Fair'        ? 'text-yellow-600':
                                                          'text-red-600'
                    }`}>{strength?.label}</span>
                  </div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength?.color}`}
                      style={{ width: strength?.width }}
                    />
                  </div>
                </div>
              )}

              {/* Requirements checklist — signup only */}
              {mode === 'signup' && (
                <div className="mt-3 space-y-1.5 bg-stone-50 rounded-xl p-3">
                  {REQUIREMENTS.map(req => {
                    const met = req.test(password)
                    return (
                      <div key={req.id} className="flex items-center gap-2">
                        {met
                          ? <Check size={13} className="text-green-500 shrink-0" />
                          : <X    size={13} className="text-stone-300 shrink-0" />
                        }
                        <span className={`text-xs ${met ? 'text-green-700' : 'text-stone-400'}`}>
                          {req.label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Forgot password link — signin only */}
            {mode === 'signin' && (
              <div className="text-right -mt-1">
                <button type="button" onClick={() => setShowForgot(true)}
                  className="text-xs text-brand-500 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            {/* Legal acknowledgments — signup only */}
            {mode === 'signup' && (
              <div className="space-y-3 pt-3 border-t border-stone-100">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Required agreements</p>

                <CheckboxRow checked={agreedToS} onChange={setAgreedToS} required
                  label={<>I have read and agree to the{' '}
                    <Link to="/terms" target="_blank" className="text-brand-500 hover:underline font-medium">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/seller-agreement" target="_blank" className="text-brand-500 hover:underline font-medium">Seller Agreement</Link>
                  </>} />

                <CheckboxRow checked={agreedPrivacy} onChange={setAgreedPrivacy} required
                  label={<>I have read and agree to the{' '}
                    <Link to="/privacy" target="_blank" className="text-brand-500 hover:underline font-medium">Privacy Policy</Link>
                    {' '}and consent to the collection and use of my data</>} />

                {(!agreedToS || !agreedPrivacy) && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    ⚠️ You must accept both agreements to create an account.
                  </p>
                )}

                <div className="pt-2 border-t border-stone-100">
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Optional</p>
                  <CheckboxRow checked={agreedMarketing} onChange={setAgreedMarketing} required={false}
                    label="I'd like to receive news, deals, and updates from TradeDiecast by email. Unsubscribe any time." />
                </div>
              </div>
            )}

            {/* hCaptcha — signup only */}
            {mode === 'signup' && (
              <div className="flex justify-center pt-2">
                <HCaptcha
                  sitekey={HCAPTCHA_SITE_KEY}
                  onVerify={token => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                  onError={() => { setCaptchaToken(null); toast.error('Captcha error — please try again.') }}
                  ref={captchaRef}
                />
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading || !canSubmit}
              className="btn-primary w-full py-3 text-base disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>

          </form>

          <div className="mt-6 text-center text-sm text-stone-400">
            {mode === 'signin' ? (
              <>Don't have an account?{' '}
                <button onClick={() => switchMode('signup')}
                  className="text-brand-500 font-medium hover:underline">Sign up free</button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button onClick={() => switchMode('signin')}
                  className="text-brand-500 font-medium hover:underline">Sign in</button>
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
    <div className="flex items-start gap-3">
      <button type="button" onClick={() => onChange(!checked)}
        className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
          checked ? 'bg-brand-500 border-brand-500' : 'border-stone-300 hover:border-brand-400'
        }`}>
        {checked && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      <div className="flex-1 text-xs text-stone-600 leading-relaxed">
        {required && <span className="text-brand-500 font-bold mr-1">*</span>}
        {label}
      </div>
    </div>
  )
}
