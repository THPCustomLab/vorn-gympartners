import { useEffect, useState } from 'react'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'

// ⚠️ Cambia este password antes de hacer deploy.
// Está en frontend — cualquiera con las devtools puede verlo.
// Sirve como gate básico, no como seguridad real.
const ACCESS_PASSWORD = 'VORN2026'
const STORAGE_KEY = 'vorn_gp_auth_v1'

export default function App() {
  const [authed, setAuthed] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'ok') setAuthed(true)
    } catch (_) {}
    setChecked(true)
  }, [])

  const handleLogin = (pwd) => {
    if (pwd === ACCESS_PASSWORD) {
      try { localStorage.setItem(STORAGE_KEY, 'ok') } catch (_) {}
      setAuthed(true)
      return true
    }
    return false
  }

  const handleLogout = () => {
    try { localStorage.removeItem(STORAGE_KEY) } catch (_) {}
    setAuthed(false)
  }

  if (!checked) return null

  return authed
    ? <Dashboard onLogout={handleLogout} />
    : <Login onLogin={handleLogin} />
}
