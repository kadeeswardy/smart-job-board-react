import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import ProtectedRoute from './components/ProtectedRoute'

const Home = lazy(() => import('./pages/Home'))
const Jobs = lazy(() => import('./pages/Jobs'))
const Analyzer = lazy(() => import('./pages/Analyzer'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Login = lazy(() => import('./pages/Login'))

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 text-slate-600 dark:text-slate-300">
            Loading app...
          </div>
        }
      >
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
