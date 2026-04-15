// Placeholder links — replace with real Drive/Dropbox/asset URLs before deploy.
const KIT = [
  {
    title: 'STORIES IG',
    sub: '9 plantillas 1080x1920',
    icon: '📱',
    href: 'https://drive.google.com/your-stories-pack'
  },
  {
    title: 'COPY WHATSAPP',
    sub: 'Mensajes listos para grupos',
    icon: '💬',
    href: 'https://drive.google.com/your-whatsapp-copy'
  },
  {
    title: 'EMAIL TEMPLATE',
    sub: 'HTML + texto plano',
    icon: '✉️',
    href: 'https://drive.google.com/your-email-template'
  },
  {
    title: 'POSTER IMPRIMIBLE',
    sub: 'A3 · print-ready',
    icon: '🖨️',
    href: 'https://drive.google.com/your-poster'
  },
  {
    title: 'CUPONES QR',
    sub: 'Para entregar a socios',
    icon: '🎟️',
    href: 'https://drive.google.com/your-coupons'
  },
  {
    title: 'LOGOS & BRAND',
    sub: 'VORN + co-branding pack',
    icon: '🎨',
    href: 'https://drive.google.com/your-brand-pack'
  }
]

export default function ActivationKit() {
  return (
    <div className="kit-grid">
      {KIT.map((k) => (
        <a
          key={k.title}
          className="kit-card"
          href={k.href}
          target="_blank"
          rel="noreferrer noopener"
        >
          <div className="kit-icon">{k.icon}</div>
          <div className="kit-title">{k.title}</div>
          <div className="kit-sub">{k.sub}</div>
          <div className="kit-dl">DESCARGAR →</div>
        </a>
      ))}
    </div>
  )
}
