import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'
import products from '../data'

function ProductListing() {
  const { addToCart } = useCart()
  const categories = ["All", "Electronics", "Watches", "Perfumes", "Makeup", "Clothes", "Bags", "Fashion", "Accessories"]
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("default")

  let filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory)

  filteredProducts = filteredProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (sortBy === "low") filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  if (sortBy === "high") filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-4xl font-bold text-center mb-8">All Products 🛍️</h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-lg border-2 border-pink-300 rounded-full px-6 py-2 focus:outline-none focus:border-pink-500"
        />
      </div>

      {/* Filter + Sort */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full text-sm font-bold border transition ${
                selectedCategory === cat
                  ? "bg-pink-600 text-white border-pink-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-pink-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border-2 border-pink-300 rounded-lg px-4 py-1 focus:outline-none"
        >
          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <p className="text-gray-500 mb-4">{filteredProducts.length} products found</p>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">😔</p>
          <p className="text-xl text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="border rounded-xl shadow hover:shadow-lg transition p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                {product.category}
              </span>
              <h3 className="font-bold text-lg mt-2">{product.name}</h3>
              <p className="text-green-600 font-bold">Rs. {product.price}</p>
              <Link
                to={`/product/${product.id}`}
                className="mt-2 block text-center border border-pink-400 text-pink-600 py-1 rounded-lg hover:bg-pink-50 text-sm"
              >
                View Details
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
              >
                Add to Cart 🛒
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductListing