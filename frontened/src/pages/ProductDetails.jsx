import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../CartContext'
import API from '../api'

function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`)
        setProduct(res.data)

        const allRes = await API.get('/products')
        const related = allRes.data
          .filter(p => p.category === res.data.category && p._id !== res.data._id)
          .slice(0, 4)
        setRelatedProducts(related)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
    setQuantity(1)
  }, [id])

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">😔</p>
        <p className="text-xl text-gray-500">Product not found</p>
        <Link to="/products" className="mt-4 inline-block bg-pink-600 text-white px-6 py-2 rounded-lg">
          Go Back
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <Link to="/products" className="text-pink-600 hover:underline mb-6 inline-block">
        ← Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </div>

        <div>
          <span className="text-sm bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold mt-3 mb-2">{product.name}</h1>
          <p className="text-3xl text-green-600 font-bold mb-4">Rs. {product.price}</p>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-1 mb-6">
            <span className="text-yellow-400 text-xl">★★★★☆</span>
            <span className="text-gray-500 text-sm">(128 reviews)</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <p className="font-bold">Quantity:</p>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-4 py-2 text-xl hover:bg-gray-100"
              >-</button>
              <span className="px-4 py-2 font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-4 py-2 text-xl hover:bg-gray-100"
              >+</button>
            </div>
          </div>

          <p className="text-gray-500 mb-4">
            Total: <span className="text-green-600 font-bold">Rs. {product.price * quantity}</span>
          </p>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleAddToCart}
              className={`px-8 py-3 rounded-xl font-bold transition ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-pink-600 text-white hover:bg-pink-700"
              }`}
            >
              {added ? "Added! ✅" : "Add to Cart 🛒"}
            </button>
            <Link
              to="/cart"
              className="px-8 py-3 rounded-xl font-bold border-2 border-pink-600 text-pink-600 hover:bg-pink-50"
            >
              Buy Now →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-pink-50 rounded-xl">
              <p className="text-2xl">🚚</p>
              <p className="text-xs mt-1 font-bold">Free Delivery</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-xl">
              <p className="text-2xl">↩️</p>
              <p className="text-xs mt-1 font-bold">7 Day Return</p>
            </div>
            <div className="p-3 bg-pink-50 rounded-xl">
              <p className="text-2xl">✅</p>
              <p className="text-xs mt-1 font-bold">100% Original</p>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <div key={p._id} className="border rounded-xl shadow hover:shadow-lg transition p-4">
                <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-lg mb-3" />
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-green-600 font-bold">Rs. {p.price}</p>
                <Link
                  to={`/product/${p._id}`}
                  className="mt-2 block text-center bg-pink-600 text-white py-1 rounded-lg text-sm hover:bg-pink-700"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default ProductDetails