import type { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }: PropsWithChildren) {
  const { loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="panel p-10 text-center">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">Checking session...</p>
        <p className="mt-3 muted-copy">We are making sure your account is ready.</p>
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
