// ═══════════════════════════════════════════════════════════
// VORN · Gym Partners — Single config file
// Edit this file to change ANY text, link, or setting.
// Then rebuild: npm run build && npm run deploy
// ═══════════════════════════════════════════════════════════

const siteConfig = {

  // ── AUTH ─────────────────────────────────────────────────
  password: 'VORN2026',

  // ── DATA SOURCE ─────────────────────────────────────────
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1i3E10cZ4XpMowcPXbR4yoR9-0OV_vwicPombNqwkULk/export?format=csv',
  refreshSeconds: 86400, // 24 horas
  maxWaves: 20,

  // ── HERO SECTION ────────────────────────────────────────
  hero: {
    tag: 'GYM PARTNERS · PRIVATE',
    headline: 'COMMUNITY WAVES\nARE MOVING.',
    subTemplate: '{waves} WAVES ACTIVATED · {remaining} LEFT · CUPOS LIMITADOS',
    ctaText: 'UNLOCK YOUR WAVE NOW',
    ctaHref: '#leaderboard',
    stats: [
      { key: 'wavesUnlocked', label: 'Community Waves', format: '{value}/{max}' },
      { key: 'totalPairs', label: 'Parejas confirmadas' },
      { key: 'totalAthletes', label: 'Atletas en el piso' },
      { key: 'wavesRemaining', label: 'Waves restantes' }
    ]
  },

  // ── LEADERBOARD SECTION ─────────────────────────────────
  leaderboard: {
    title: 'LIVE LEADERBOARD',
    subtitle: 'Ranking actualizado diariamente · ordenado por parejas confirmadas',
    columns: {
      rank: '#',
      gym: 'GYM',
      pairs: 'PAREJAS',
      athletes: 'ATLETAS',
      waves: 'WAVES',
      progress: 'PROGRESO A SIGUIENTE WAVE',
      status: 'ESTADO'
    },
    emptyMessage: 'Sin datos todavía. Vuelve pronto.',
    statusLabels: {
      newWave: 'NUEVA WAVE EN JUEGO',
      oneLeft: '1 PAREJA PARA DESBLOQUEAR',
      done: 'WAVE DESBLOQUEADA',
      remaining: 'FALTAN {n} PAREJAS'
    }
  },

  // ── PROGRESS SECTION ────────────────────────────────────
  progress: {
    title: 'TU PROGRESO',
    subtitle: 'Gym destacado · tu próxima wave está cerca',
    featuredGymKeyword: 'CARPE',
    headlineOne: 'TE FALTA 1 PAREJA PARA ACTIVAR TU PRÓXIMA WAVE',
    headlineMany: 'TE FALTAN {n} PAREJAS PARA ACTIVAR TU PRÓXIMA WAVE',
    headlineDone: 'WAVE DESBLOQUEADA. GO LOUDER.',
    labels: {
      pairs: 'Parejas confirmadas',
      athletes: 'Atletas',
      waves: 'Waves activadas',
      toNext: 'Parejas a próxima wave'
    }
  },

  // ── WAVE INFO SECTION ───────────────────────────────────
  waveInfo: {
    title: '¿QUÉ ES UNA COMMUNITY WAVE?',
    subtitle: 'Una wave = un bloque de competencia takeover para tu gym',
    cards: [
      { num: '01', title: 'Compiten juntos', body: 'Tu comunidad entera en el mismo bloque de pista.' },
      { num: '02', title: 'Salen en el mismo heat', body: 'Heat dedicado, energía concentrada, momentum colectivo.' },
      { num: '03', title: 'Eligen la playlist', body: 'Tu sonido, tu identidad, tu ritual.' },
      { num: '04', title: '5+ pantallas takeover', body: 'Branding dominante durante tu wave completa.' },
      { num: '05', title: 'Visibilidad de marca', body: 'Producción audiovisual, clips, activaciones de sponsors.' }
    ],
    prize: {
      num: '🏆',
      title: 'Premios',
      lines: [
        '🥇 $6,000 en merch personalizada',
        '🥈 $3,000 merch 2do y 3er lugar'
      ]
    }
  },

  // ── ACTIVATION KIT ──────────────────────────────────────
  kit: {
    title: 'KIT DE ACTIVACIÓN',
    subtitle: 'Descarga los assets y activa a tu comunidad en horas',
    items: [
      { icon: '📱', title: 'STORIES IG', sub: '9 plantillas 1080x1920', href: 'https://drive.google.com/your-stories-pack' },
      { icon: '💬', title: 'COPY WHATSAPP', sub: 'Mensajes listos para grupos', href: 'https://drive.google.com/your-whatsapp-copy' },
      { icon: '✉️', title: 'EMAIL TEMPLATE', sub: 'HTML + texto plano', href: 'https://drive.google.com/your-email-template' },
      { icon: '🖨️', title: 'POSTER IMPRIMIBLE', sub: 'A3 · print-ready', href: 'https://drive.google.com/your-poster' },
      { icon: '🎟️', title: 'CUPONES QR', sub: 'Para entregar a socios', href: 'https://drive.google.com/your-coupons' },
      { icon: '🎨', title: 'LOGOS & BRAND', sub: 'VORN + co-branding pack', href: 'https://drive.google.com/your-brand-pack' }
    ]
  },

  // ── ACTIVATION PLAN ─────────────────────────────────────
  plan: {
    title: 'HOW TO ACTIVATE 10+ PAIRS IN 7 DAYS',
    subtitle: 'Playbook probado · 4 pasos · cero fricción',
    steps: [
      { num: 'DAY 1–2', title: 'LANZA INTERNO', body: 'Anuncia la wave a tu comunidad con un story IG + mensaje WhatsApp en tus grupos de clase. Objetivo: 5 parejas en 48h.' },
      { num: 'DAY 3–4', title: 'ACTIVA A TUS COACHES', body: 'Cada coach recluta 2 parejas entre sus alumnos regulares. Entrega QR con cupón desde el kit.' },
      { num: 'DAY 5–6', title: 'PUSH VISUAL', body: 'Imprime poster del kit y colócalo en la entrada. Manda email template a tu base completa.' },
      { num: 'DAY 7', title: 'CIERRE CON FOMO', body: 'Publica story con el leaderboard real. "Faltan X parejas para desbloquear nuestra wave." Last call.' }
    ]
  },

  // ── FINAL CTA ───────────────────────────────────────────
  finalCta: {
    headline: 'OWN YOUR WAVE.',
    sub: 'Cada wave desbloqueada es un bloque entero de competencia con tu nombre encima.',
    buttonText: 'ACTIVAR MI WAVE',
    buttonHref: '#leaderboard'
  },

  // ── LOGIN SCREEN ────────────────────────────────────────
  login: {
    title: 'GYM PARTNERS ACCESS',
    sub: 'Private zone. Enter your partner password.',
    buttonText: 'ENTER',
    loadingText: 'CHECKING...',
    errorText: 'INCORRECT PASSWORD',
    footer: 'vorn.global · gym partners portal'
  },

  // ── FOOTER ──────────────────────────────────────────────
  footer: {
    left: 'VORN · GYM PARTNERS · PRIVATE'
  }
}

export default siteConfig
