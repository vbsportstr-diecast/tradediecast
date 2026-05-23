import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Listing from './pages/Listing'
import Sell from './pages/Sell'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"              element={<Home />} />
            <Route path="/browse"        element={<Browse />} />
            <Route path="/listing/:id"   element={<Listing />} />
            <Route path="/sell"          element={<Sell />} />
            <Route path="/seller/:username" element={<Profile />} />
            <Route path="/dashboard"     element={<Dashboard />} />
            <Route path="/auth"          element={<Auth />} />
            <Route path="*"              element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
