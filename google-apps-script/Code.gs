/**
 * Shree Ganesh Paints — Google Sheets backend (Apps Script Web App)
 * -------------------------------------------------------------------
 * Paste this file into Extensions > Apps Script of your Google Sheet,
 * then deploy it as a Web App (see README.md for full step-by-step
 * instructions with screenshots-level detail).
 *
 * Sheet requirements:
 *   - A sheet/tab named "Enquiries" (auto-created on first run if missing)
 *   - Header row (row 1): Timestamp | Name | Phone | Area | Message
 *
 * Endpoints (both live at the same /exec URL):
 *   POST  <url>                 -> saves one enquiry (JSON body)
 *   GET   <url>?action=list     -> returns all enquiries as JSON
 */

const SHEET_NAME = 'Enquiries'

// ---------- helpers ----------

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Area', 'Message'])
    sheet.setFrozenRows(1)
  }
  return sheet
}

function jsonOutput_(obj) {
  // ContentService JSON output is automatically allowed to be read
  // cross-origin by the browser for simple GET/POST requests, which is
  // why the frontend uses "text/plain" as its request Content-Type
  // (see src/utils/googleSheets.js) to avoid a CORS pre-flight.
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  )
}

function readJsonBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing request body')
  }
  return JSON.parse(e.postData.contents)
}

// ---------- entry points ----------

// Handles new enquiries submitted from the website's "Get Free Estimate" form.
function doPost(e) {
  // LockService prevents two simultaneous submissions from overwriting
  // each other / appending to the same row when many visitors submit
  // the form at the same time.
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)

  try {
    const data = readJsonBody_(e)
    const sheet = getSheet_()

    const name = (data.name || '').toString().trim()
    const phone = (data.phone || '').toString().trim()

    if (!name || !phone) {
      return jsonOutput_({ success: false, error: 'Name and phone are required.' })
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      name,
      phone,
      (data.area || '').toString().trim(),
      (data.message || '').toString().trim()
    ])

    return jsonOutput_({ success: true })
  } catch (err) {
    return jsonOutput_({ success: false, error: err.message })
  } finally {
    lock.releaseLock()
  }
}

// Handles reads: ?action=list returns all enquiries as JSON, newest first.
function doGet(e) {
  try {
    const action = (e.parameter && e.parameter.action) || 'list'
    if (action !== 'list') {
      return jsonOutput_({ success: false, error: 'Unknown action: ' + action })
    }

    const sheet = getSheet_()
    const values = sheet.getDataRange().getValues()
    const [, ...body] = values // drop header row

    const rows = body
      .filter((r) => r.join('').toString().trim() !== '')
      .map((r) => ({
        timestamp: r[0] instanceof Date ? r[0].toISOString() : r[0],
        name: r[1],
        phone: r[2],
        area: r[3],
        message: r[4]
      }))
      .reverse() // newest enquiry first

    return jsonOutput_({ success: true, rows })
  } catch (err) {
    return jsonOutput_({ success: false, error: err.message })
  }
}
