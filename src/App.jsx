import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="noise-overlay" aria-hidden="true" />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
