import { PHONE_DISPLAY, PHONE_TEL, onImgError } from '../utils/siteConfig'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-swatches" aria-hidden="true">
        <span style={{ background: 'var(--gold)' }} />
        <span style={{ background: 'var(--orange)' }} />
        <span style={{ background: 'var(--peach)' }} />
        <span style={{ background: '#fff' }} />
      </div>
      <div className="container-xl">
        <div className="row g-4">
          <div className="col-lg-6">
            <p className="hero-eyebrow mr">॥ श्री गणेशाय नमः ॥</p>
            <h1 className="hero-title">श्री गणेश पेंट्स</h1>
            <p className="hero-subtitle">उत्तम दर्जा · विश्वासाची सेवा</p>
            <p className="hero-desc">
              घर, फ्लॅट, बंगला आणि कमर्शियल पेंटिंगसाठी अमळनेरमधील विश्वासू
              पेंटिंग कॉन्ट्रॅक्टर. Free site visit and estimate.
            </p>
            <div className="hero-actions">
              <a href="#estimate" className="btn-cream">
                📤 Get Free Estimate
              </a>
              <a href={`tel:${PHONE_TEL}`} className="btn-outline-cream">
                📞 {PHONE_DISPLAY}
              </a>
            </div>
            <div className="hero-badges">
              <span>✅ Free Site Visit</span>
              <span>✅ Genuine Branded Paints</span>
              <span>✅ On-time Completion</span>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1200&auto=format&fit=crop"
                alt="Painter applying orange paint on a house wall"
                onError={onImgError}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
