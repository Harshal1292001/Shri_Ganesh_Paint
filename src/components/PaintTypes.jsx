// Paint categories offered. "swatch" is a CSS gradient (no external image
// dependency, so this section always renders correctly even offline).
const paintTypes = [
  {
    icon: '🛋️',
    title: 'Interior Emulsion',
    titleMr: 'इंटिरियर इमल्शन',
    desc: 'Smooth, washable matte & silk finish for bedrooms, halls and kitchens.',
    swatch: 'linear-gradient(135deg,#f6dfb8,#e0954a)'
  },
  {
    icon: '🏠',
    title: 'Exterior Emulsion',
    titleMr: 'एक्सटीरियर इमल्शन',
    desc: 'Weatherproof, UV & algae resistant coats built for monsoon and sun.',
    swatch: 'linear-gradient(135deg,#c9711f,#5c0f1a)'
  },
  {
    icon: '🎨',
    title: 'Distemper',
    titleMr: 'डिस्टेंपर',
    desc: 'Budget-friendly option for a quick, tidy repaint of any room.',
    swatch: 'linear-gradient(135deg,#fbf2e3,#d98a2b)'
  },
  {
    icon: '🚪',
    title: 'Enamel & Metal Paint',
    titleMr: 'एनॅमल पेंट',
    desc: 'Glossy, rust-resistant finish for doors, grills, gates and railings.',
    swatch: 'linear-gradient(135deg,#7a1420,#c9711f)'
  },
  {
    icon: '✨',
    title: 'Texture & Royale Play',
    titleMr: 'टेक्स्चर डिझाईन',
    desc: 'Designer textures, metallic and stone-finish feature walls.',
    swatch: 'linear-gradient(135deg,#d98a2b,#f6dfb8,#c9711f)'
  },
  {
    icon: '💧',
    title: 'Waterproofing Coat',
    titleMr: 'वॉटरप्रूफिंग',
    desc: 'Terrace, wall and bathroom leakage-proof protective coatings.',
    swatch: 'linear-gradient(135deg,#5c0f1a,#3a2417)'
  },
  {
    icon: '🪵',
    title: 'Wood & PU Polish',
    titleMr: 'वूड पॉलिश',
    desc: 'Melamine, PU and enamel polish for doors, furniture and windows.',
    swatch: 'linear-gradient(135deg,#6b5a4a,#d98a2b)'
  },
  {
    icon: '🧱',
    title: 'Primer & Putty',
    titleMr: 'प्रायमर व पुट्टी',
    desc: 'Crack filling and wall levelling for a flawless final coat.',
    swatch: 'linear-gradient(135deg,#e7dcc9,#c9711f)'
  }
]

export default function PaintTypes() {
  return (
    <section className="paint-types-section" id="paint-types">
      <div className="container-xl">
        <h2 className="section-title">Paint Types We Work With</h2>
        <p className="section-subtitle mr">सर्व प्रकारचे पेंट काम — एकाच विश्वासू ठिकाणी</p>

        <div className="paint-types-grid">
          {paintTypes.map((p) => (
            <div className="paint-type-card" key={p.title}>
              <div className="paint-type-swatch" style={{ background: p.swatch }}>
                <span>{p.icon}</span>
              </div>
              <h3>{p.title}</h3>
              <p className="paint-type-mr mr">{p.titleMr}</p>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
