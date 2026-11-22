import type { ReactNode } from 'react'

/* ---------- Line icons ---------- */
const IC: Record<string, ReactNode> = {
  factory: <><path d="M3 21V10l6 4v-4l6 4V5h6v16z" /><path d="M7 17h2M12 17h2" /></>,
  box: <><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5 12 12l9-4.5M12 12v9" /></>,
  truck: <><path d="M2 6h12v10H2zM14 9h4l3 3.5V16h-7" /><circle cx="6" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
  leaf: <><path d="M5 19C5 10 11 5 20 5c0 9-5 14-14 14z" /><path d="M5 19l8-8" /></>,
  thermo: <><path d="M10 13.5V5a2 2 0 1 1 4 0v8.5a4 4 0 1 1-4 0z" /><path d="M12 9v7" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3.2 3 3.2 15 0 18M12 3c-3.2 3-3.2 15 0 18" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  send: <><path d="M21 4 3 11l6.5 2.5L12 20l3-4.5 4.5 3.5z" /><path d="M9.5 13.5 21 4" /></>,
  insta: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".6" /></>,
  pin: <><path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  building: <path d="M4 21V5l8-2v18M12 21V9l8 2v10M2 21h20M7 8h2M7 12h2M7 16h2M15 14h2M15 17h2" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M5 12l5 5 9-10" />,
  home: <path d="M3 11 12 4l9 7v10H3z M9 21v-6h6v6" />,
  crane: <path d="M4 21V4h3v17 M7 6h13l-3 3 M17 6v6 M2 21h8" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
}

export function Icon({ name, size }: { name: string; size?: number }) {
  return (
    <svg className="ico" viewBox="0 0 24 24" aria-hidden="true" style={size ? { width: size, height: size } : undefined}>
      {IC[name] ?? IC.box}
    </svg>
  )
}

/** Renders text where *word* becomes a styled serif <em>. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g)
  return (
    <>
      {parts.map((p, i) => (p.startsWith('*') && p.endsWith('*') ? <em key={i}>{p.slice(1, -1)}</em> : <span key={i}>{p}</span>))}
    </>
  )
}

/** Paragraphs split by blank lines. */
export function Paras({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  )
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export function SecHead({ eb, title, p }: { eb: string; title: string; p?: string }) {
  return (
    <div className="sec-head rv">
      <div>
        <span className="eyebrow">{eb}</span>
        <h2><Rich text={title} /></h2>
      </div>
      {p && <p>{p}</p>}
    </div>
  )
}

/* ---------- Brand logo: the company's original artwork (transparent PNG) ---------- */
const LOGO_RATIO = 885 / 160

export function Logo({ height = 34 }: { height?: number }) {
  const width = Math.round(height * LOGO_RATIO)
  return (
    <span className="logo-img" style={{ height }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="IZOLYUKS" width={width} height={height} className="lg-l" decoding="async" />
      {/* lighter blue for the dark theme */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-dark.png" alt="" aria-hidden="true" width={width} height={height} className="lg-d" decoding="async" />
    </span>
  )
}
