import { Link } from 'react-router-dom'
import { Car } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 font-serif text-xl text-white mb-3">
            <Car size={20} className="text-brand-500" />
            TradeDiecast
          </div>
          <p className="text-sm leading-relaxed">The marketplace for serious diecast collectors. Buy, sell, and trade with confidence.</p>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Marketplace</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/browse" className="hover:text-white transition-colors">Browse all</Link></li>
            <li><Link to="/sell"   className="hover:text-white transition-colors">Sell a car</Link></li>
            <li><Link to="/browse?brand=Hot+Wheels" className="hover:text-white transition-colors">Hot Wheels</Link></li>
            <li><Link to="/browse?brand=Matchbox"   className="hover:text-white transition-colors">Matchbox</Link></li>
            <li><Link to="/browse?brand=Corgi"      className="hover:text-white transition-colors">Corgi</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Buyer protection</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Seller guide</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping tips</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
            <li><a href="mailto:hello@tradediecast.com" className="hover:text-white transition-colors">hello@tradediecast.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-800 py-4 text-center text-xs text-stone-600">
        © {new Date().getFullYear()} TradeDiecast. All rights reserved. · tradediecast.com
      </div>
    </footer>
  )
}
