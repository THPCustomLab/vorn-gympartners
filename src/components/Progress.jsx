export default function Progress({ gym }) {
  if (!gym) {
    return <div className="lb-empty">Conectando con tu gym...</div>
  }

  const toNext = gym.pairs_to_next_wave
  const pairsInCycle = 5 - (toNext % 5 || 5)
  const percent = Math.max(0, Math.min(100, Math.round((pairsInCycle / 5) * 100)))

  let headline = ''
  if (toNext === 0) headline = 'WAVE DESBLOQUEADA. GO LOUDER.'
  else if (toNext === 1) headline = 'TE FALTA 1 PAREJA PARA ACTIVAR TU PRÓXIMA WAVE'
  else headline = `TE FALTAN ${toNext} PAREJAS PARA ACTIVAR TU PRÓXIMA WAVE`

  return (
    <div className="progress-card">
      <div className="progress-head">
        <div>
          <div className="muted">GYM DESTACADO</div>
          <div className="progress-gym">{gym.gym}</div>
        </div>
        <div className="progress-rank">
          RANK #{gym.rank}
        </div>
      </div>

      <div className="progress-head-2">
        <div className="progress-headline">{headline}</div>
      </div>

      <div className="bar bar-xl">
        <div className="bar-fill" style={{ width: `${percent}%` }}>
          <span className="bar-text">{percent}%</span>
        </div>
      </div>

      <div className="progress-stats">
        <div>
          <div className="muted">Parejas confirmadas</div>
          <div className="progress-num">{gym.pairs_confirmed}</div>
        </div>
        <div>
          <div className="muted">Atletas</div>
          <div className="progress-num">{gym.athletes}</div>
        </div>
        <div>
          <div className="muted">Waves activadas</div>
          <div className="progress-num">{gym.waves_unlocked}</div>
        </div>
        <div>
          <div className="muted">Parejas a próxima wave</div>
          <div className="progress-num">{toNext}</div>
        </div>
      </div>
    </div>
  )
}
