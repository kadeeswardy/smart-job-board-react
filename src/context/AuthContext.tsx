import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth'
import { auth, firebaseStatus, googleProvider } from '../lib/firebase'

type AuthMode = 'firebase' | 'demo'

interface AuthUser {
  id: string
  name: string
  email: string
  provider: AuthMode
  photoURL?: string | null
}

interface SignInPayload {
  email: string
  password: string
}

interface SignUpPayload extends SignInPayload {
  name: string
}

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
  authMode: AuthMode
  signIn: (payload: SignInPayload) => Promise<void>
  signUp: (payload: SignUpPayload) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const STORAGE_KEY = 'ai-job-board:demo-auth-user'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function mapFirebaseUser(user: FirebaseUser): AuthUser {
  return {
    id: user.uid,
    name: user.displayName ?? user.email?.split('@')[0] ?? 'Candidate',
    email: user.email ?? 'unknown@example.com',
    provider: 'firebase',
    photoURL: user.photoURL,
  }
}

function createDemoUser(name: string, email: string): AuthUser {
  return {
    id: `demo-${email.toLowerCase()}`,
    name: name.trim() || email.split('@')[0] || 'Demo Candidate',
    email,
    provider: 'demo',
    photoURL: null,
  }
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (firebaseStatus.configured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
        setUser(nextUser ? mapFirebaseUser(nextUser) : null)
        setLoading(false)
      })

      return unsubscribe
    }

    const storedUser = window.localStorage.getItem(STORAGE_KEY)
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as AuthUser)
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    }

    setLoading(false)

    return undefined
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    const authMode: AuthMode = firebaseStatus.configured && auth ? 'firebase' : 'demo'

    return {
      user,
      loading,
      authMode,
      signIn: async ({ email, password }) => {
        if (authMode === 'firebase' && auth) {
          await signInWithEmailAndPassword(auth, email, password)
          return
        }

        const demoUser = createDemoUser(email.split('@')[0], email)
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser))
        setUser(demoUser)
      },
      signUp: async ({ email, password, name }) => {
        if (authMode === 'firebase' && auth) {
          const credentials = await createUserWithEmailAndPassword(auth, email, password)
          if (name.trim().length > 0) {
            await updateProfile(credentials.user, { displayName: name.trim() })
          }
          return
        }

        const demoUser = createDemoUser(name, email)
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser))
        setUser(demoUser)
      },
      signInWithGoogle: async () => {
        if (authMode === 'firebase' && auth && googleProvider) {
          await signInWithPopup(auth, googleProvider)
          return
        }

        const demoUser = createDemoUser('Demo Candidate', 'demo@aijobboard.dev')
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser))
        setUser(demoUser)
      },
      signOut: async () => {
        if (authMode === 'firebase' && auth) {
          await firebaseSignOut(auth)
          return
        }

        window.localStorage.removeItem(STORAGE_KEY)
        setUser(null)
      },
    }
  }, [loading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
