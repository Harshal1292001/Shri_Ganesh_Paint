// TODO: These are sample/placeholder quotes to show the section's design.
// Replace them with real feedback from your own customers before publishing.
const testimonials = [
  {
    name: 'Sample customer — Amalner',
    text: 'Placeholder review: describe the quality of work, punctuality and cleanliness your customer experienced.'
  },
  {
    name: 'Sample customer — Jalgaon',
    text: 'Placeholder review: mention the finish quality, the brand of paint used, and whether they would recommend you.'
  },
  {
    name: 'Sample customer — Amalner',
    text: 'Placeholder review: highlight fair pricing, the free site visit, or how quickly the job was completed.'
  }
]

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="container-xl">
        <h2 className="section-title">What Customers Say</h2>
        <p className="section-subtitle mr">ग्राहकांचा अनुभव — replace with your real reviews</p>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <blockquote className="testimonial-card" key={i}>
              <p>&ldquo;{t.text}&rdquo;</p>
              <cite>— {t.name}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
