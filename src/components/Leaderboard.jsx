import { useEffect, useRef, useState } from 'react'

function CountUp({ value, duration = 600 }) {
  const [display, setDisplay] = useState(value)
  const prev = useRef(value)
  useEffect(() => {
    const from = prev.current
    const to = value
    if (from === to) { setDisplay(to); return }
    const start = performance.now()
    let raf
    const tick = (t) => {
      const k = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - k, 3)
      setDisplay(Math.round(from + (to - from) * eased))
      if (k < 1) raf = requestAnimationFrame(tick)
      else prev.current = to
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])
  return <>{display}</>
}

function statusLabel(r) {
  const toNext = r.pairs_to_next_wave
  if (toNext === 5) return { text: 'NUEVA WAVE EN JUEGO', level: 'hot' }
  if (toNext === 1) return { text: '1 PAREJA PARA DESBLOQUEAR', level: 'close' }
  if (toNext === 0) return { text: 'WAVE DESBLOQUEADA', level: 'done' }
  if (toNext > 0 && toNext < 5) return { text: `FALTAN ${toNext} PAREJAS`, level: 'normal' }
  return { text: '—', level: 'muted' }
}

export default function Leaderboard({ rows, loading, error, pulse }) {
  if (loading) {
    return <div className="lb-empty">Cargando leaderboard...</div>
  }
  if (error) {
    return (
      <div className="lb-empty error">
        <div>No se pudo conectar al sheet.</div>
        <div className="muted" style={{marginTop: 8}}>{error}</div>
      </div>
    )
  }
  if (!rows.length) {
    return <div className="lb-empty">Sin datos todavía. Vuelve pronto.</div>
  }

  return (
    <div className={`lb-wrap ${pulse ? 'lb-pulse' : ''}`}>
      <div className="lb-head">
        <div className="lb-col lb-rank">#</div>
        <div className="lb-col lb-gym">GYM</div>
        <div className="lb-col lb-num">PAREJAS</div>
        <div className="lb-col lb-num">ATLETAS</div>
        <div className="lb-col lb-num">WAVES</div>
        <div className="lb-col lb-progress">PROGRESO A SIGUIENTE WAVE</div>
        <div className="lb-col lb-status">ESTADO</div>
      </div>

      <div className="lb-body">
        {rows.map((r) => {
          const pairsInCycle = 5 - (r.pairs_to_next_wave % 5 || 5)
          const percent = Math.max(0, Math.min(100, Math.round((pairsInCycle / 5) * 100)))
          const st = statusLabel(r)
          const top = r.rank <= 3 ? `top-${r.rank}` : ''
          return (
            <div key={r.gym} className={`lb-row ${top}`}>
              <div className="lb-col lb-rank">
                <span className="rank-badge">{r.rank}</span>
              </div>
              <div className="lb-col lb-gym">
                <span className="gym-name">{r.gym}</span>
                {r.rank === 1 && <span className="crown">👑</span>}
              </div>
              <div className="lb-col lb-num"><CountUp value={r.pairs_confirmed} /></div>
              <div className="lb-col lb-num"><CountUp value={r.athletes} /></div>
              <div className="lb-col lb-num"><CountUp value={r.waves_unlocked} /></div>
              <div className="lb-col lb-progress">
                <div className="bar">
                  <div className="bar-fill" style={{ width: `${percent}%` }}>
                    <span className="bar-text">{percent}%</span>
                  </div>
                </div>
              </div>
              <div className="lb-col lb-status">
                <span className={`chip chip-${st.level}`}>{st.text}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
