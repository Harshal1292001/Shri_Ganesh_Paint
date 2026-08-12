import { PHONE_DISPLAY, PHONE_TEL } from '../utils/siteConfig'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-xl">
        <div className="footer-top">
          <div className="footer-col" style={{ maxWidth: 280 }}>
            <p className="footer-brand mr">श्री गणेश पेंट्स</p>
            <p>Trusted painting contractor serving Amalner, Jalgaon and nearby villages with genuine branded paints.</p>
          </div>

          <div className="footer-col">
            <h5>Contact</h5>
            <a href={`tel:${PHONE_TEL}`}>📞 {PHONE_DISPLAY}</a>
            <p>📍 Amalner, Jalgaon, Maharashtra</p>
          </div>

          <div className="footer-col">
            <h5>Services</h5>
            <a href="#services">Interior Painting</a>
            <a href="#services">Exterior Painting</a>
            <a href="#services">Waterproofing</a>
          </div>

          <div className="footer-col">
            <h5>Quick Links</h5>
            <a href="#paint-types">Paint Types</a>
            <a href="#gallery">Gallery</a>
            <a href="#estimate">Get Free Estimate</a>
            <a href="#enquiries">Enquiries</a>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} श्री गणेश पेंट्स · Amalner, Jalgaon · All rights reserved.
        </div>
      </div>
    </footer>
  )
}
