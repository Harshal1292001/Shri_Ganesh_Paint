import { useState } from 'react'
import { getEnquiries } from '../utils/googleSheets'

export default function EnquiriesList() {
  const [rows, setRows] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loadEnquiries() {
    setLoading(true)
    setError(null)
    const result = await getEnquiries()
    setLoading(false)

    if (result.ok) {
      setRows(result.rows)
    } else {
      setError(result.error)
    }
  }

  return (
    <section className="estimate-section" id="enquiries">
      <div className="container-xl">
        <h2 className="section-title">Recent Enquiries</h2>

        <div className="estimate-card" style={{ maxWidth: 820 }}>
          <button className="btn-submit" onClick={loadEnquiries} disabled={loading} style={{ maxWidth: 260 }}>
            {loading ? 'Loading...' : 'Load Enquiries from Sheet'}
          </button>

          {error && <div className="form-status error">{error}</div>}

          {rows && rows.length === 0 && (
            <div className="form-status success">No enquiries yet.</div>
          )}

          {rows && rows.length > 0 && (
            <div className="table-responsive mt-section">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Area</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i}>
                      <td>{r.timestamp ? new Date(r.timestamp).toLocaleDateString() : '-'}</td>
                      <td>{r.name}</td>
                      <td>{r.phone}</td>
                      <td>{r.area}</td>
                      <td>{r.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
