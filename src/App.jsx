import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from './components/layout/Layout'
import IntroAnimation from './components/layout/IntroAnimation'
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
  const [showIntro, setShowIntro] = useState(true)
  const location = useLocation()

  // Only show intro on home page and first visit
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')
    if (hasSeenIntro || location.pathname !== '/') {
      setShowIntro(false)
    }
  }, [location.pathname])

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true')
    setShowIntro(false)
  }

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
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
