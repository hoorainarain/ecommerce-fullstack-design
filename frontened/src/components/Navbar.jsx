import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../CartContext'
import { useAuth } from '../AuthContext'

function Navbar() {
  const { cartCount } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-pink-700 text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold">MyShop 🛍️</Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-pink-200">Home</Link>
        <Link to="/products" className="hover:text-pink-200">Products</Link>

        {user && user.isAdmin && (
          <Link to="/admin" className="hover:text-pink-200 font-bold">
            🛠️ Admin
          </Link>
        )}

        <Link to="/cart" className="relative hover:text-pink-200">
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-white text-pink-700 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm">Hi, {user.name.split(' ')[0]} 👋</span>
            <button
              onClick={handleLogout}
              className="bg-white text-pink-700 px-3 py-1 rounded-lg text-sm font-bold hover:bg-pink-100"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-white text-pink-700 px-3 py-1 rounded-lg text-sm font-bold hover:bg-pink-100"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar