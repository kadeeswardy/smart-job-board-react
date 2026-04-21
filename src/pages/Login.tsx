import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { firebaseStatus } from '../lib/firebase'

function Login() {
  const { authMode, signIn, signInWithGoogle, signUp, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo =
    typeof location.state === 'object' &&
    location.state !== null &&
    'from' in location.state &&
    typeof location.state.from === 'string'
      ? location.state.from
      : '/dashboard'

  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) {
    return <Navigate to={redirectTo} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Email is required.')
      return
    }

    if (password.trim().length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (mode === 'signup' && name.trim().length < 2) {
      setError('Please enter your name.')
      return
    }

    setSubmitting(true)

    try {
      if (mode === 'signup') {
        await signUp({ name, email, password })
      } else {
        await signIn({ email, password })
      }

      navigate(redirectTo, { replace: true })
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Authentication failed.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogleSignIn() {
    setError('')
    setSubmitting(true)

    try {
      await signInWithGoogle()
      navigate(redirectTo, { replace: true })
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Google sign-in failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid gap-6 pb-10 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="panel p-8">
        <span className="pill">Authentication</span>
        <h1 className="section-title mt-5">Sign in for candidates and recruiters</h1>
        <p className="mt-4 muted-copy">
          This screen now works in two modes: real Firebase auth when your environment is ready, or
          a demo local session so the dashboard remains usable while you build.
        </p>

        <div className="mt-8 rounded-[28px] bg-slate-950 p-6 text-white dark:bg-[#10213a] dark:text-slate-100">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-300 dark:text-slate-400">Status</p>
          <p className="mt-3 text-2xl font-semibold">
            {firebaseStatus.configured ? 'Firebase configured' : 'Demo auth mode is active'}
          </p>
          <p className="mt-3 text-sm text-slate-300">
            {firebaseStatus.configured
              ? 'Email/password and Google sign-in can now use your Firebase project.'
              : `Missing keys: ${firebaseStatus.missing.join(', ')}`}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-200">
            {authMode === 'firebase'
              ? 'Production auth is enabled.'
              : 'You can sign in right now with any valid email and a password of 6+ characters.'}
          </div>
          <div className="rounded-3xl bg-sky-50 p-4 text-sm text-sky-900 dark:bg-sky-500/10 dark:text-sky-200">
            Google sign-in also works as a quick demo session when Firebase is not configured yet.
          </div>
        </div>
      </section>

      <section className="panel p-8">
        <div className="mx-auto max-w-md">
          <div className="flex gap-2 rounded-full border border-slate-200 bg-white/85 p-1 dark:border-slate-700 dark:bg-slate-950/70">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === 'signin'
                  ? 'bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === 'signup'
                  ? 'bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Create account
            </button>
          </div>

          <p className="mt-6 text-2xl font-semibold text-slate-950 dark:text-slate-50">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </p>
          <p className="mt-2 muted-copy">
            {mode === 'signin'
              ? 'Sign in to save jobs, manage your pipeline, and run AI analysis.'
              : 'Create an account to unlock the dashboard and track saved roles.'}
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            {mode === 'signup' ? (
              <label className="block space-y-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Full name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Mona Ahmed"
                  className="field"
                />
              </label>
            ) : null}

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                className="field"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                className="field"
              />
            </label>

            {error ? (
              <div className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-900 dark:bg-rose-500/10 dark:text-rose-200">
                {error}
              </div>
            ) : null}

            <button type="submit" disabled={submitting} className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-70">
              {submitting
                ? 'Please wait...'
                : mode === 'signin'
                  ? 'Sign in'
                  : 'Create account'}
            </button>

            <button
              type="button"
              onClick={() => void handleGoogleSignIn()}
              disabled={submitting}
              className="secondary-button w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {authMode === 'firebase' ? 'Continue with Google' : 'Continue with Google demo'}
            </button>
          </form>

          <div className="mt-8 rounded-3xl bg-orange-50 p-4 text-sm text-orange-900 dark:bg-amber-500/10 dark:text-amber-200">
            {authMode === 'firebase'
              ? 'Firebase is active here. If a sign-in fails, verify your Firebase Auth providers are enabled.'
              : 'Demo mode keeps the product usable while you finish your Firebase setup.'}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
