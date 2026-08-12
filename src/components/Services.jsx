const services = [
  {
    icon: '🏠',
    title: 'Interior Painting',
    desc: 'Smooth putty, primer and premium emulsion finish for every room.',
  },
  {
    icon: '🏢',
    title: 'Exterior Painting',
    desc: 'Weather-proof exterior coats for bungalows and apartments.',
  },
  {
    icon: '✨',
    title: 'Texture & Designer Walls',
    desc: 'Royale Play, metallic and designer texture feature walls.',
  },
  {
    icon: '💧',
    title: 'Waterproofing',
    desc: 'Terrace, wall and bathroom leakage treatment that lasts.',
  },
  {
    icon: '✏️',
    title: 'POP & Putty Work',
    desc: 'Crack filling, POP moulding and perfect wall levelling.',
  },
  {
    icon: '🖌️',
    title: 'Wood & Metal Polish',
    desc: 'PU polish, melamine and enamel finishing for doors and grills.',
  },
]

export default function Services() {
  return (
    <section className="services-section" id="services">
      <div className="container-xl">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle mr">आमच्या सेवा — small repairs to complete projects</p>

        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
