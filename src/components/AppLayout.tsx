import { motion } from 'framer-motion'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Footer from './Footer'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/analyzer', label: 'Analyzer' },
  { to: '/dashboard', label: 'Dashboard' },
]

function AppLayout() {
  const { authMode, signOut, user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/55 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/65">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-white dark:bg-amber-400 dark:text-slate-950">
              AI
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-950 dark:text-slate-50">AI Job Board</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                React, TypeScript, Firebase, Claude-ready
              </p>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <nav className="flex flex-wrap items-center gap-2 rounded-full border border-white/70 bg-white/80 p-1.5 shadow-sm dark:border-slate-700/80 dark:bg-slate-900/80">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-950 text-white dark:bg-amber-400 dark:text-slate-950'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            </nav>

            <button
              type="button"
              onClick={toggleTheme}
              className="secondary-button rounded-full px-4 py-2 text-sm"
            >
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>

            {user ? (
              <div className="flex flex-wrap items-center justify-end gap-2">
                <div className="hidden rounded-full border border-white/70 bg-white/80 px-4 py-2 text-right shadow-sm dark:border-slate-700/80 dark:bg-slate-900/80 sm:block">
                  <p className="text-sm font-semibold text-slate-950 dark:text-slate-50">{user.name}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {authMode === 'firebase' ? 'Firebase session' : 'Demo session'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="primary-button rounded-full px-4 py-2 text-sm"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="primary-button rounded-full px-4 py-2 text-sm">
                Sign in
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <Footer authMode={authMode} />
    </div>
  )
}

export default AppLayout
