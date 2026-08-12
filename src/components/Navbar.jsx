import { useState } from 'react'
import { PHONE_DISPLAY, PHONE_TEL } from '../utils/siteConfig'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#paint-types', label: 'Paint Types' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#why', label: 'Why Us' },
  { href: '#enquiries', label: 'Enquiries' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container-xl inner">
        <div className="brand">
          <div className="brand-mark">🖌️</div>
          <div>
            <p className="brand-name mr">श्री गणेश पेंट्स</p>
            <p className="brand-loc">Amalner, Jalgaon</p>
          </div>
        </div>

        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#estimate" className="btn-cream nav-cta" onClick={() => setOpen(false)}>
            Get Free Estimate
          </a>
        </nav>

        <div className="header-actions">
          <a href={`tel:${PHONE_TEL}`} className="btn-call">
            📞 Call Now
          </a>
          <button
            type="button"
            className={`nav-toggle ${open ? 'is-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
