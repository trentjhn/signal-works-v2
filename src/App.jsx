import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AiAutomations from './pages/AiAutomations'
import CustomAiSoftware from './pages/CustomAiSoftware'
import KnowledgeSystems from './pages/KnowledgeSystems'
import AiSecurityGovernance from './pages/AiSecurityGovernance'
import AiTraining from './pages/AiTraining'
import AiSearchVisibility from './pages/AiSearchVisibility'
import AiAgencyLosAngeles from './pages/AiAgencyLosAngeles'
import About from './pages/About'
import Approach from './pages/Approach'
import Work from './pages/Work'

// Multi-page router. Every route renders inside the shared <Layout> (background,
// navbar, footer) via nested routes, so the chrome persists across client navigation.
// Page components live in ./pages and are deliberately presentational; SEO/JSON-LD for
// each path lives in ./seo.js (consumed by prerender.js + the sitemap generator).
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services/ai-automations" element={<AiAutomations />} />
        <Route path="/services/custom-ai-software" element={<CustomAiSoftware />} />
        <Route path="/services/knowledge-systems" element={<KnowledgeSystems />} />
        <Route path="/services/ai-security-governance" element={<AiSecurityGovernance />} />
        <Route path="/services/ai-search-visibility" element={<AiSearchVisibility />} />
        <Route path="/services/ai-training" element={<AiTraining />} />
        <Route path="/ai-agency-los-angeles" element={<AiAgencyLosAngeles />} />
        <Route path="/approach" element={<Approach />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
