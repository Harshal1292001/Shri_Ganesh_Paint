import { onImgError } from '../utils/siteConfig'

const points = [
  {
    icon: '🛡️',
    titleMr: 'ग्राहकांचा विश्वास',
    desc: 'Years of trusted work across Amalner and nearby villages.',
  },
  {
    icon: '⭐',
    titleMr: 'उत्तम दर्जा',
    desc: 'Only genuine, branded paints with proper surface preparation.',
  },
  {
    icon: '✨',
    titleEn: 'Clean Finish',
    desc: 'Covered furniture, tidy site and on-time completion.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="why-section" id="why">
      <div className="container-xl">
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="why-image">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
                alt="Freshly painted modern white bungalow at dusk"
                onError={onImgError}
              />
            </div>
          </div>

          <div className="col-lg-7">
            <h2 className="why-heading">Why choose us?</h2>

            {points.map((p, i) => (
              <div className="why-item" key={i}>
                <div className="why-icon">{p.icon}</div>
                <div>
                  <h4 className={p.titleMr ? 'mr' : ''}>{p.titleMr || p.titleEn}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
