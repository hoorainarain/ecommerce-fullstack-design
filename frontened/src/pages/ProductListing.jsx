import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'
import API from '../api'

function ProductListing() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [addedId, setAddedId] = useState(null)

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

  const handleAddToCart = (product) => {
    addToCart(product)
    setAddedId(product._id)
    setTimeout(() => setAddedId(null), 2000)
  }

  const categories = ["Electronics", "Watches", "Perfumes", "Makeup", "Clothes", "Bags", "Fashion", "Accessories"]
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  let filteredProducts = products

  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category))
  }

  filteredProducts = filteredProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (minPrice) filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice))
  if (maxPrice) filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice))

  if (sortBy === "low") filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  if (sortBy === "high") filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading products...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Top Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border-2 border-pink-300 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* ===== LEFT SIDEBAR (Filters) ===== */}
        <div className="md:col-span-1">
          <div className="bg-white border rounded-xl p-4 space-y-6">

            <div>
              <h3 className="font-bold mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="accent-pink-600"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-bold mb-3">Price range</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-pink-400"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 border rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategories([])
                setMinPrice("")
                setMaxPrice("")
                setSearchQuery("")
              }}
              className="w-full border border-pink-400 text-pink-600 py-2 rounded-lg text-sm font-bold hover:bg-pink-50"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* ===== RIGHT SIDE (Products) ===== */}
        <div className="md:col-span-3">

          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-500">{filteredProducts.length} items found</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-2 border-pink-300 rounded-lg px-3 py-1 text-sm focus:outline-none"
            >
              <option value="default">Sort By</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border">
              <p className="text-5xl mb-4">😔</p>
              <p className="text-xl text-gray-500">No products found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <div
                  key={product._id}
                  className="bg-white border rounded-xl p-4 flex gap-4 hover:shadow-md transition"
                >
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </Link>

                  <div className="flex-1">
                    <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <Link to={`/product/${product._id}`}>
                      <h3 className="font-bold text-lg mt-1 hover:text-pink-600">{product.name}</h3>
                    </Link>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-yellow-400">★★★★☆</span>
                      <span className="text-gray-400 text-xs">(128 reviews)</span>
                    </div>
                  </div>

                  <div className="text-right flex flex-col justify-between">
                    <p className="text-green-600 font-bold text-lg">Rs. {product.price}</p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                        addedId === product._id
                          ? "bg-green-500 text-white"
                          : "bg-pink-600 text-white hover:bg-pink-700"
                      }`}
                    >
                      {addedId === product._id ? "Added! ✅" : "Add to Cart 🛒"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ProductListing