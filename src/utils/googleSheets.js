import axios from 'axios'

const WEBAPP_URL = import.meta.env.VITE_SHEETS_WEBAPP_URL

// Dedicated axios instance for the Google Apps Script Web App.
// NOTE: Content-Type is deliberately "text/plain" (not "application/json").
// Google Apps Script Web Apps don't respond to CORS pre-flight (OPTIONS)
// requests, so the browser must send a "simple request". Using
// application/json would trigger a pre-flight and the request would fail
// with a CORS error. text/plain keeps it a simple request while the body
// is still valid JSON text, which doGet/doPost on the Apps Script side
// parses normally.
const sheetsApi = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'text/plain;charset=utf-8'
  }
})

/**
 * Saves a new enquiry to the Google Sheet via the Apps Script Web App.
 * @param {{name: string, phone: string, area?: string, message?: string}} enquiry
 * @returns {Promise<{ok: boolean, error?: string}>}
 */
export async function saveEnquiry(enquiry) {
  if (!WEBAPP_URL) {
    return { ok: false, error: 'Google Sheet URL is not configured.' }
  }

  const payload = {
    timestamp: new Date().toISOString(),
    name: enquiry.name || '',
    phone: enquiry.phone || '',
    area: enquiry.area || '',
    message: enquiry.message || ''
  }

  try {
    const { data } = await sheetsApi.post(WEBAPP_URL, payload)

    if (!data || !data.success) {
      throw new Error((data && data.error) || 'Failed to save enquiry')
    }

    return { ok: true }
  } catch (error) {
    console.error('saveEnquiry failed:', error)
    return {
      ok: false,
      error: error.response?.data?.error || error.message || 'Something went wrong'
    }
  }
}

/**
 * Fetches all enquiries stored in the Google Sheet.
 * @returns {Promise<{ok: boolean, rows?: Array, error?: string}>}
 */
export async function getEnquiries() {
  if (!WEBAPP_URL) {
    return { ok: false, error: 'Google Sheet URL is not configured.' }
  }

  try {
    const { data } = await sheetsApi.get(WEBAPP_URL, {
      params: { action: 'list' }
    })

    if (!data || !data.success) {
      throw new Error((data && data.error) || 'Failed to fetch enquiries')
    }

    return { ok: true, rows: data.rows || [] }
  } catch (error) {
    console.error('getEnquiries failed:', error)
    return {
      ok: false,
      error: error.response?.data?.error || error.message || 'Something went wrong'
    }
  }
}
