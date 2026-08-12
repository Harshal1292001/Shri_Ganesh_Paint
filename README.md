# श्री गणेश पेंट्स — Website (React + Vite)

A fully responsive React (JSX) website for a painting contractor, styled
with Bootstrap + custom CSS. It includes a "Get Free Estimate" form and an
"Enquiries" dashboard, both wired to a free Google Sheet backend (via
Google Apps Script) using **axios** for all API calls.

## What's included

- **Hero** — bilingual (Marathi/English) intro with call + WhatsApp-style CTAs
- **Brands strip** — authorised paint brands
- **Services** — 6 core services
- **Paint Types** *(new)* — 8 paint categories (interior, exterior, distemper,
  enamel, texture, waterproofing, wood polish, primer & putty)
- **Gallery** *(new)* — sample "our work" photo grid (replace with your own photos)
- **Why Choose Us**
- **Testimonials** *(new)* — sample placeholder reviews (replace with real ones)
- **Get Free Estimate form** — writes a row to your Google Sheet
- **Recent Enquiries** — reads rows back from the Sheet, for shop-owner use
- **WhatsApp floating button** *(new)*
- **Responsive navbar with mobile hamburger menu** *(new)*

## 1. Install & run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`). Resize the
browser or use dev tools' device toolbar to check mobile/tablet/desktop —
the site is responsive down to small phones out of the box.

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

The `dist/` folder produced by `npm run build` is what you upload to any
static host (Netlify, Vercel, GitHub Pages, cPanel, etc.).

## 2. Project structure

```
src/
  components/
    Navbar.jsx            <- responsive nav + mobile hamburger menu
    Hero.jsx
    Brands.jsx
    Services.jsx
    PaintTypes.jsx         <- paint categories grid
    Gallery.jsx             <- "our work" photo grid
    WhyChooseUs.jsx
    Testimonials.jsx        <- sample reviews (replace with real ones)
    EstimateForm.jsx        <- writes to Google Sheet (axios POST)
    EnquiriesList.jsx       <- reads from Google Sheet (axios GET)
    Footer.jsx
    WhatsAppButton.jsx      <- floating WhatsApp chat button
  utils/
    googleSheets.js         <- axios helpers (saveEnquiry / getEnquiries)
    siteConfig.js           <- phone/WhatsApp number, image fallback helper
  App.jsx
  index.css                 <- theme (colors, layout, responsive rules)
  main.jsx
google-apps-script/
  Code.gs                   <- paste this into your Google Sheet's Apps Script
.env.example                <- copy to .env and fill in your Web App URL
```

## 3. Connect a Google Sheet (store + retrieve enquiries)

This uses **Google Apps Script** as a free, no-backend bridge between the
website and a Google Sheet — no paid API keys needed, and no server to
maintain.

### Step A — Create the Sheet
1. Go to [sheets.google.com](https://sheets.google.com) and create a new
   spreadsheet, e.g. **"Shree Ganesh Paints - Enquiries"**.
2. You don't need to add headers manually — the script creates an
   `Enquiries` tab with headers automatically the first time it runs.

### Step B — Add the Apps Script
1. In the sheet, go to **Extensions → Apps Script**.
2. Delete any starter code and paste the entire contents of
   `google-apps-script/Code.gs` (included in this project) into the editor.
3. Click **Save** (disk icon), name the project e.g. "Enquiries API".

### Step C — Deploy as a public Web App
1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - Description: `Enquiries API`
   - Execute as: **Me**
   - Who has access: **Anyone** ← this is what makes it a public endpoint
     that your website (or anyone) can POST/GET from without logging in.
4. Click **Deploy**, then **Authorize access** and approve the permissions.
   You'll see a Google warning screen because it's your own unverified
   script — click **Advanced → Go to project (unsafe)** to continue. This
   is expected and safe since it's your own code running on your own sheet.
5. Copy the **Web app URL** — it looks like:
   `https://script.google.com/macros/s/AKfycbx.../exec`

This single URL now serves **both** endpoints your site needs:
- `POST <url>` → saves one enquiry (used by the "Get Free Estimate" form)
- `GET <url>?action=list` → returns all enquiries as JSON (used by "Recent Enquiries")

### Step D — Connect it to the website
1. In the project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Paste your Web App URL:
   ```
   VITE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/AKfycbx.../exec
   ```
3. Restart `npm run dev` (Vite only reads `.env` on startup).

That's it — the **"Get Free Estimate"** form now appends a new row to your
Sheet's `Enquiries` tab on submit, and the **"Recent Enquiries"** section
can load and display those rows on demand.

### Step E — Redeploying after you edit Code.gs
Whenever you change `Code.gs`, the live URL does **not** auto-update.
Go to **Deploy → Manage deployments → (pencil / Edit) → Version: New
version → Deploy**. This keeps the same URL but picks up your changes.

### Why axios + `text/plain` and not `application/json`?
`src/utils/googleSheets.js` uses an axios instance whose `Content-Type` is
`text/plain;charset=utf-8`, even though the body is JSON text. This is
intentional: Google Apps Script Web Apps don't handle CORS **pre-flight**
(`OPTIONS`) requests, so the browser must be able to send the request as a
CORS "simple request". `application/json` would trigger a pre-flight and
the call would fail with a CORS error; `text/plain` avoids that while
`Code.gs`'s `doPost`/`doGet` still parse the body/query as JSON normally.
**Keep this header as-is** unless you also change how `Code.gs` parses
requests.

### Troubleshooting
- **"Google Sheet URL is not configured."** → `.env` is missing or you
  didn't restart `npm run dev` after creating it.
- **Network / CORS error in the browser console** → make sure "Who has
  access" is set to **Anyone**, and that you redeployed a **new version**
  after any edit (editing the script without a new deployment does not
  update the live `/exec` URL).
- **Form submits but nothing appears in the sheet** → open the Apps Script
  editor → **Executions** (left sidebar) to see the error log for that run.
- **Old data doesn't refresh** → the Web App can take a few seconds to
  reflect a fresh deployment; hard-refresh the page.

## 4. Customizing content

- **Colors / fonts / spacing**: `src/index.css` — all values are defined as
  CSS variables at the top (`--maroon`, `--orange`, `--cream`, etc.).
- **Phone / WhatsApp number**: `src/utils/siteConfig.js` — one place
  controls the number shown in the navbar, hero, footer and the WhatsApp
  floating button. **Update this before publishing** — the shipped value is
  a placeholder.
- **Paint types**: `src/components/PaintTypes.jsx` — edit the `paintTypes`
  array to add, remove or reword categories.
- **Gallery photos**: `src/components/Gallery.jsx` — replace the sample
  Unsplash URLs with your own photos (place files in `public/` and
  reference as `/your-photo.jpg`, or use your own hosted URLs).
- **Testimonials**: `src/components/Testimonials.jsx` — replace the sample
  placeholder quotes with real customer feedback before publishing.
- **Text content**: edit directly inside each component in
  `src/components/`.

## 5. Responsiveness

The layout uses Bootstrap's grid (`row` / `col-lg-*`) for structural
breakpoints plus custom CSS Grid (auto-adjusting columns) for the services,
paint-types and gallery sections, so it adapts automatically across mobile,
tablet, and desktop. The navbar collapses into a hamburger menu below
860px width, and every image has a graceful CSS-gradient fallback if a
photo URL fails to load, so the layout never breaks.

## 6. Deploying the site itself

Any static host works:

- **Netlify / Vercel**: connect the repo, set the build command to
  `npm run build`, output directory `dist`, and add the
  `VITE_SHEETS_WEBAPP_URL` environment variable in the host's dashboard
  (same value as your `.env`).
- **GitHub Pages / cPanel / any static host**: run `npm run build` locally
  (with `.env` in place) and upload the contents of `dist/`.

Remember: `VITE_*` env vars are baked into the JS bundle at **build time**,
so if you change the Web App URL later you must rebuild and redeploy the
site, not just edit `.env` on the server.
