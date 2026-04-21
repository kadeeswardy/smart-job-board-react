import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { store } from './store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
