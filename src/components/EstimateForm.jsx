import { useState } from 'react'
import { saveEnquiry } from '../utils/googleSheets'

const initialForm = { name: '', phone: '', area: '', message: '' }

export default function EstimateForm() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState(null) // { type: 'success'|'error', text }
  const [submitting, setSubmitting] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus({ type: 'error', text: 'Please enter your name and phone number.' })
      return
    }

    setSubmitting(true)
    setStatus(null)
    const result = await saveEnquiry(form)
    setSubmitting(false)

    if (result.ok) {
      setStatus({ type: 'success', text: 'Thank you! We will call you shortly to schedule a free site visit.' })
      setForm(initialForm)
    } else {
      setStatus({ type: 'error', text: result.error || 'Something went wrong. Please call us directly.' })
    }
  }

  return (
    <section className="estimate-section" id="estimate">
      <div className="container-xl">
        <h2 className="section-title">Get Free Estimate</h2>
        <p className="section-subtitle mr">तुमचा तपशील पाठवा — आम्ही लवकरच संपर्क करू</p>

        <div className="estimate-card">
          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label-custom">Full Name</label>
                <input
                  className="form-control-custom"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Patil"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label-custom">Phone Number</label>
                <input
                  className="form-control-custom"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="98xxxxxxxx"
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label-custom">Area / Locality</label>
                <input
                  className="form-control-custom"
                  type="text"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  placeholder="e.g. Amalner, Jalgaon"
                />
              </div>

              <div className="col-12">
                <label className="form-label-custom">Message (optional)</label>
                <textarea
                  className="form-control-custom"
                  name="message"
                  rows="3"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your painting work..."
                />
              </div>

              <div className="col-12">
                <button className="btn-submit" type="submit" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Request Free Estimate'}
                </button>
              </div>
            </div>
          </form>

          {status && (
            <div className={`form-status ${status.type}`}>{status.text}</div>
          )}
        </div>
      </div>
    </section>
  )
}
