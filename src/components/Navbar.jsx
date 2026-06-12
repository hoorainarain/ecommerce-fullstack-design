import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'

function Navbar() {
  const { cartCount } = useCart()

  return (
    <nav className="bg-pink-700 text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold">MyShop 🛍️</Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-pink-200">Home</Link>
        <Link to="/products" className="hover:text-pink-200">Products</Link>
        <Link to="/cart" className="relative hover:text-pink-200">
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-pink-700 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar