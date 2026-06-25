import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'
import API from '../api'

function Home() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products')
        setProducts(res.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const categories = [
    { name: "Watches", emoji: "⌚" },
    { name: "Perfumes", emoji: "🌸" },
    { name: "Makeup", emoji: "💄" },
    { name: "Clothes", emoji: "👗" },
    { name: "Bags", emoji: "👜" },
    { name: "Fashion", emoji: "✨" },
  ]

  const recommended = products.slice(0, 10)

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>
  }

  return (
    <div className="bg-gray-50">

      {/* ===== Top Hero Banner ===== */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="bg-pink-100 rounded-2xl p-10 flex items-center justify-between">
          <div>
            <p className="text-pink-600 font-bold mb-2">Latest trending</p>
            <h1 className="text-4xl font-bold mb-4">Beauty & Fashion<br />items</h1>
            <Link to="/products" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-700 inline-block">
              Shop Now
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80"
            alt="Banner"
            className="w-56 h-44 object-cover rounded-xl hidden sm:block"
          />
        </div>
      </div>

      {/* ===== Deals and Offers Row ===== */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Deals and offers</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              to="/products"
              key={cat.name}
              className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition"
            >
              <p className="text-3xl mb-2">{cat.emoji}</p>
              <p className="text-sm font-bold">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== Recommended Items ===== */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recommended items</h2>
          <Link to="/products" className="text-pink-600 text-sm font-bold hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {recommended.map(product => (
            <div key={product._id} className="bg-white border rounded-xl p-3 hover:shadow-md transition">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-28 object-cover rounded-lg mb-2"
                />
              </Link>
              <p className="text-sm font-bold truncate">{product.name}</p>
              <p className="text-green-600 font-bold text-sm">Rs. {product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 w-full bg-pink-600 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-pink-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Bottom Banner ===== */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-purple-100 rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Special discount this week</h2>
            <p className="text-gray-600">Get 20% off on Makeup and Perfumes</p>
          </div>
          <Link to="/products" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-700">
            Shop Now
          </Link>
        </div>
      </div>

      {/* ===== Newsletter ===== */}
      <div className="bg-gray-900 text-white py-10 px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Subscribe on our newsletter</h2>
        <p className="text-gray-400 mb-6">Get daily news on the latest offers</p>
        <div className="flex justify-center gap-2 flex-wrap">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg text-black w-72"
          />
          <button className="bg-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-700">
            Subscribe
          </button>
        </div>
      </div>

    </div>
  )
}

export default Home