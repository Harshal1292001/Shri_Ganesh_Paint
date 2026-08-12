const brands = ['Asian Paints', 'Nerolac', 'Birla Opus', 'Berger', 'Dulux', 'JSW Paints']

export default function Brands() {
  return (
    <section className="brands-strip">
      <div className="container-xl inner">
        <span className="brands-label">Authorised brands we use:</span>
        {brands.map((b) => (
          <span key={b} className="brand-pill">
            {b}
          </span>
        ))}
      </div>
    </section>
  )
}
