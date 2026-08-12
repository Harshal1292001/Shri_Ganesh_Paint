import { onImgError } from '../utils/siteConfig'

// TODO: Replace these sample photos with real photos of your own
// completed work (drop image files into /public and point src to
// "/your-file.jpg", or use your own hosted image URLs).
const photos = [
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    alt: 'Freshly painted modern white bungalow'
  },
  {
    src: 'https://images.unsplash.com/photo-1615529162924-f8605388461d?q=80&w=800&auto=format&fit=crop',
    alt: 'Freshly painted bright interior living room'
  },
  {
    src: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop',
    alt: 'Painter applying orange exterior paint'
  },
  {
    src: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=800&auto=format&fit=crop',
    alt: 'Neatly painted interior bedroom wall'
  },
  {
    src: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=800&auto=format&fit=crop',
    alt: 'Paint brush and colour swatches'
  },
  {
    src: 'https://images.unsplash.com/photo-1580462611452-e13030c05af9?q=80&w=800&auto=format&fit=crop',
    alt: 'Colourful paint palette samples'
  }
]

export default function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="container-xl">
        <h2 className="section-title">Our Recent Work</h2>
        <p className="section-subtitle mr">आमचे मागील काम — a glimpse of finished projects</p>

        <div className="gallery-grid">
          {photos.map((p, i) => (
            <div className="gallery-item" key={i}>
              <img src={p.src} alt={p.alt} loading="lazy" onError={onImgError} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
