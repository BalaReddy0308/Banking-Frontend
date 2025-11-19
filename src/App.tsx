import React, { Suspense, lazy } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

const Onboarding = lazy(() => import('./pages/Onboarding/OnboardingFlow'))
const Home: React.FC = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold">Banking Portal</h1>
    <nav className="mt-4 space-x-4">
      <Link to="/onboarding" className="text-brand">Start Onboarding</Link>
    </nav>
  </div>
)

const App: React.FC = () => {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding/*" element={<Onboarding />} />
      </Routes>
    </Suspense>
  )
}

export default App
