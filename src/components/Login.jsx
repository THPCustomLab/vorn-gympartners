import { useState } from 'react'

export default function Login({ onLogin }) {
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      const ok = onLogin(pwd)
      if (!ok) {
        setError(true)
        setPwd('')
      }
      setLoading(false)
    }, 220)
  }

  return (
    <div className="login-wrap">
      <div className="login-card fade-in">
        <div className="brand">VORN</div>
        <div className="login-title">GYM PARTNERS ACCESS</div>
        <p className="login-sub">Private zone. Enter your partner password.</p>

        <form onSubmit={submit}>
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setError(false) }}
            autoFocus
            spellCheck={false}
          />
          {error && <div className="login-error">INCORRECT PASSWORD</div>}
          <button className="btn-primary w-full" type="submit" disabled={loading || !pwd}>
            {loading ? 'CHECKING...' : 'ENTER'}
          </button>
        </form>

        <div className="login-footer">vorn.global · gym partners portal</div>
      </div>
    </div>
  )
}
