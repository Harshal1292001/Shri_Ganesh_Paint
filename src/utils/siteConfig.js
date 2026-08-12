// Central place for contact details used across the site.
// TODO: Replace with the shop's real phone / WhatsApp number before going live.
export const PHONE_DISPLAY = '91 72 73 11 04'
export const PHONE_TEL = '+919172731104'
export const WHATSAPP_NUMBER = '919172731104'
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  'Namaste, I would like a free painting estimate.'
)}`

// A safe, dependency-free fallback image (soft maroon-to-orange gradient
// with a paint-roller emoji) shown if a photo URL fails to load, so the
// layout never breaks even on a slow or blocked connection.
const FALLBACK_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#5c0f1a'/>
      <stop offset='100%' stop-color='#c9711f'/>
    </linearGradient>
  </defs>
  <rect width='600' height='450' fill='url(#g)'/>
  <text x='50%' y='52%' font-size='64' text-anchor='middle' dominant-baseline='middle'>🖌️</text>
</svg>`

export const IMG_FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(FALLBACK_SVG)

export function onImgError(e) {
  e.currentTarget.onerror = null
  e.currentTarget.src = IMG_FALLBACK
}
