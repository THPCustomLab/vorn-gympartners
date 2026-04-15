import { useEffect, useMemo, useRef, useState } from 'react'
import Leaderboard from './Leaderboard.jsx'
import Progress from './Progress.jsx'
import ActivationKit from './ActivationKit.jsx'

// Public CSV export of the partners sheet.
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1i3E10cZ4XpMowcPXbR4yoR9-0OV_vwicPombNqwkULk/export?format=csv'

// Refresh cadence (ms). Spec said "cada 60 segundos" / "cada 60 minutos" — using 60s for real-time feel.
const REFRESH_MS = 60 * 1000

// Global wave cap.
const MAX_WAVES = 20

// Tiny CSV parser. Handles quoted fields, escaped quotes and trailing newlines.
function parseCSV(text) {
  const rows = []
  let row = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cur += '"'; i++ }
        else inQuotes = false
      } else {
        cur += ch
      }
    } else {
      if (ch === '"') inQuotes = true
      else if (ch === ',') { row.push(cur); cur = '' }
      else if (ch === '\n') { row.push(cur); rows.push(row); row = []; cur = '' }
      else if (ch === '\r') { /* skip */ }
      else cur += ch
    }
  }
  if (cur.length > 0 || row.length > 0) { row.push(cur); rows.push(row) }
  return rows.filter(r => r.length && r.some(c => c && c.trim() !== ''))
}

function toJson(rows) {
  if (!rows.length) return []
  const headers = rows[0].map(h => h.trim().toLowerCase())
  return rows.slice(1).map(r => {
    const obj = {}
    headers.forEach((h, i) => { obj[h] = (r[i] ?? '').trim() })
    return obj
  })
}

function num(v) {
  const n = parseFloat(String(v ?? '').replace(/[^\d.-]/g, ''))
  return Number.isFinite(n) ? n : 0
}

export default function Dashboard({ onLogout }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)
  const [pulse, setPulse] = useState(false)
  const timerRef = useRef(null)

  const load = async () => {
    try {
      setError(null)
      // Cache-buster so Sheets returns fresh content
      const url = `${SHEET_URL}&_=${Date.now()}`
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok) throw new Error('Fetch failed ' + res.status)
      const text = await res.text()
      const rows = parseCSV(text)
      const json = toJson(rows)
        .map(r => ({
          gym: r.gym || r.name || '—',
          pairs_confirmed: num(r.pairs_confirmed),
          waves_unlocked: num(r.waves_unlocked),
          pairs_to_next_wave: num(r.pairs_to_next_wave),
          athletes: num(r.athletes) || num(r.pairs_confirmed) * 2
        }))
        .filter(r => r.gym && r.gym !== '—')
        .sort((a, b) => b.pairs_confirmed - a.pairs_confirmed)
        .map((r, i) => ({ ...r, rank: i + 1 }))
      setData(json)
      setUpdatedAt(new Date())
      setPulse(true)
      setTimeout(() => setPulse(false), 700)
    } catch (e) {
      setError(e.message || 'Error loading data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    timerRef.current = setInterval(load, REFRESH_MS)
    return () => clearInterval(timerRef.current)
  }, [])

  // Reveal on scroll via IntersectionObserver
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      nodes.forEach(n => n.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          io.unobserve(e.target)
        }
      })
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })
    nodes.forEach(n => io.observe(n))
    return () => io.disconnect()
  }, [])

  const totals = useMemo(() => {
    const wavesUnlocked = data.reduce((s, r) => s + r.waves_unlocked, 0)
    const totalPairs = data.reduce((s, r) => s + r.pairs_confirmed, 0)
    const totalAthletes = data.reduce((s, r) => s + r.athletes, 0)
    const wavesRemaining = Math.max(0, MAX_WAVES - wavesUnlocked)
    return { wavesUnlocked, wavesRemaining, totalPairs, totalAthletes }
  }, [data])

  const timeLabel = updatedAt
    ? updatedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '--:--'

  // Featured gym for the individual progress section. Prefer CARPE if present.
  const featured = useMemo(() => {
    if (!data.length) return null
    return data.find(r => r.gym.toUpperCase().includes('CARPE')) || data[0]
  }, [data])

  return (
    <div className="app">
      <div className="bg-spotlight" aria-hidden="true" />

      <header className="topbar">
        <div className="brand">VORN</div>
        <div className="topbar-right">
          <span className="updated-pill">
            <span className={`pulse-dot ${pulse ? 'pulse-active' : ''}`} />
            Last updated: {timeLabel}
          </span>
          <button className="btn-ghost" onClick={onLogout}>LOGOUT</button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero reveal">
        <div className="tag">GYM PARTNERS · PRIVATE</div>
        <h1 className="hero-h1">
          COMMUNITY WAVES<br/>ARE MOVING.
        </h1>
        <p className="hero-sub">
          {totals.wavesUnlocked} WAVES ACTIVATED · {totals.wavesRemaining} LEFT · CUPOS LIMITADOS
        </p>
        <a href="#leaderboard" className="btn-primary">UNLOCK YOUR WAVE NOW</a>

        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">{totals.wavesUnlocked}/{MAX_WAVES}</div>
            <div className="stat-label">Community Waves</div>
          </div>
          <div className="stat">
            <div className="stat-num">{totals.totalPairs}</div>
            <div className="stat-label">Parejas confirmadas</div>
          </div>
          <div className="stat">
            <div className="stat-num">{totals.totalAthletes}</div>
            <div className="stat-label">Atletas en el piso</div>
          </div>
          <div className="stat">
            <div className="stat-num">{totals.wavesRemaining}</div>
            <div className="stat-label">Waves restantes</div>
          </div>
        </div>
      </section>

      {/* LEADERBOARD */}
      <section id="leaderboard" className="section reveal">
        <div className="section-head">
          <h2 className="section-title">LIVE LEADERBOARD</h2>
          <p className="section-sub">Ranking automático · ordenado por parejas confirmadas · refresh cada 60s</p>
        </div>
        <Leaderboard rows={data} loading={loading} error={error} pulse={pulse} />
      </section>

      {/* INDIVIDUAL PROGRESS */}
      <section className="section reveal">
        <div className="section-head">
          <h2 className="section-title">TU PROGRESO</h2>
          <p className="section-sub">Gym destacado · tu próxima wave está cerca</p>
        </div>
        <Progress gym={featured} />
      </section>

      {/* WHAT IS A WAVE */}
      <section className="section reveal">
        <div className="section-head">
          <h2 className="section-title">¿QUÉ ES UNA COMMUNITY WAVE?</h2>
          <p className="section-sub">Una wave = un bloque de competencia takeover para tu gym</p>
        </div>

        <div className="wave-grid">
          <div className="wave-card">
            <div className="wave-card-num">01</div>
            <div className="wave-card-title">Compiten juntos</div>
            <div className="wave-card-body">Tu comunidad entera en el mismo bloque de pista.</div>
          </div>
          <div className="wave-card">
            <div className="wave-card-num">02</div>
            <div className="wave-card-title">Salen en el mismo heat</div>
            <div className="wave-card-body">Heat dedicado, energía concentrada, momentum colectivo.</div>
          </div>
          <div className="wave-card">
            <div className="wave-card-num">03</div>
            <div className="wave-card-title">Eligen la playlist</div>
            <div className="wave-card-body">Tu sonido, tu identidad, tu ritual.</div>
          </div>
          <div className="wave-card">
            <div className="wave-card-num">04</div>
            <div className="wave-card-title">5+ pantallas takeover</div>
            <div className="wave-card-body">Branding dominante durante tu wave completa.</div>
          </div>
          <div className="wave-card">
            <div className="wave-card-num">05</div>
            <div className="wave-card-title">Visibilidad de marca</div>
            <div className="wave-card-body">Producción audiovisual, clips, activaciones de sponsors.</div>
          </div>
          <div className="wave-card prize">
            <div className="wave-card-num">🏆</div>
            <div className="wave-card-title">Premios</div>
            <div className="wave-card-body">
              <div>🥇 $6,000 en merch personalizada</div>
              <div>🥈 $3,000 merch 2do y 3er lugar</div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVATION KIT */}
      <section className="section reveal">
        <div className="section-head">
          <h2 className="section-title">KIT DE ACTIVACIÓN</h2>
          <p className="section-sub">Descarga los assets y activa a tu comunidad en horas</p>
        </div>
        <ActivationKit />
      </section>

      {/* ACTIVATION PLAN */}
      <section className="section reveal">
        <div className="section-head">
          <h2 className="section-title">HOW TO ACTIVATE 10+ PAIRS IN 7 DAYS</h2>
          <p className="section-sub">Playbook probado · 4 pasos · cero fricción</p>
        </div>
        <div className="plan-grid">
          <div className="plan-step">
            <div className="plan-num">DAY 1–2</div>
            <div className="plan-title">LANZA INTERNO</div>
            <div className="plan-body">Anuncia la wave a tu comunidad con un story IG + mensaje WhatsApp en tus grupos de clase. Objetivo: 5 parejas en 48h.</div>
          </div>
          <div className="plan-step">
            <div className="plan-num">DAY 3–4</div>
            <div className="plan-title">ACTIVA A TUS COACHES</div>
            <div className="plan-body">Cada coach recluta 2 parejas entre sus alumnos regulares. Entrega QR con cupón desde el kit.</div>
          </div>
          <div className="plan-step">
            <div className="plan-num">DAY 5–6</div>
            <div className="plan-title">PUSH VISUAL</div>
            <div className="plan-body">Imprime poster del kit y colócalo en la entrada. Manda email template a tu base completa.</div>
          </div>
          <div className="plan-step">
            <div className="plan-num">DAY 7</div>
            <div className="plan-title">CIERRE CON FOMO</div>
            <div className="plan-body">Publica story con el leaderboard real. "Faltan X parejas para desbloquear nuestra wave." Last call.</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section final-cta reveal">
        <h2 className="hero-h1">OWN YOUR WAVE.</h2>
        <p className="hero-sub">Cada wave desbloqueada es un bloque entero de competencia con tu nombre encima.</p>
        <a href="#leaderboard" className="btn-primary">ACTIVAR MI WAVE</a>
      </section>

      <footer className="footer">
        <div>VORN · GYM PARTNERS · PRIVATE</div>
        <div className="muted">© {new Date().getFullYear()} vorn.global</div>
      </footer>
    </div>
  )
}
