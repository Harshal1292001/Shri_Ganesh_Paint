import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Brands from './components/Brands'
import Services from './components/Services'
import PaintTypes from './components/PaintTypes'
import Gallery from './components/Gallery'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import EstimateForm from './components/EstimateForm'
import EnquiriesList from './components/EnquiriesList'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
  <div className="App">
      <Navbar />
      <Hero />
      <Brands />
      <Services />
      <PaintTypes />
      <Gallery />
      <WhyChooseUs />
      <Testimonials />
      <EstimateForm />
      <EnquiriesList />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
