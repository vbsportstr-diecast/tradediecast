import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-7xl mb-6">🚗</p>
      <h1 className="font-serif text-4xl mb-3">Page not found</h1>
      <p className="text-stone-400 mb-8">This page has left the track. Try heading back home.</p>
      <Link to="/" className="btn-primary px-8 py-3">Go home</Link>
    </div>
  )
}
