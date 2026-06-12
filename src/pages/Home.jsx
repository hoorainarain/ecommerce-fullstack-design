import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
const products = [
    // Electronics
    { id: 1, name: "Wireless Headphones", price: 2999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80", category: "Electronics" },
    { id: 2, name: "Smart Watch", price: 4999, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&q=80", category: "Electronics" },
    { id: 3, name: "Bluetooth Speaker", price: 3299, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80", category: "Electronics" },
    { id: 4, name: "Laptop Sleeve", price: 899, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&q=80", category: "Electronics" },

    // Watches
    { id: 5, name: "Rose Gold Watch", price: 5999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80", category: "Watches" },
    { id: 6, name: "Luxury Diamond Watch", price: 12999, image: "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=300&q=80", category: "Watches" },
    { id: 7, name: "Elegant Silver Watch", price: 7499, image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=300&q=80", category: "Watches" },

    // Perfumes
    { id: 8, name: "Floral Rose Perfume", price: 3499, image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=300&q=80", category: "Perfumes" },
    { id: 9, name: "Luxury Oud Perfume", price: 5999, image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=300&q=80", category: "Perfumes" },
    { id: 10, name: "Sweet Vanilla Mist", price: 2499, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80", category: "Perfumes" },

    // Makeup
    { id: 11, name: "Matte Lipstick Set", price: 1299, image: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?w=300&q=80", category: "Makeup" },
    { id: 12, name: "Foundation Kit", price: 2199, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80", category: "Makeup" },
    { id: 13, name: "Eyeshadow Palette", price: 1799, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&q=80", category: "Makeup" },
    { id: 14, name: "Highlighter & Blush", price: 999, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80", category: "Makeup" },

    // Clothes
    { id: 15, name: "Floral Maxi Dress", price: 3999, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&q=80", category: "Clothes" },
     { id: 16, name: "Casual Kurti", price: 1499, image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=300", category: "Clothes" },
    { id: 17, name: "Party Wear Dress", price: 5499, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&q=80", category: "Clothes" },
    { id: 18, name: "Cozy Sweater", price: 2299, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&q=80", category: "Clothes" },

    // Bags
    { id: 19, name: "Pink Tote Bag", price: 2999, image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=300&q=80", category: "Bags" },
    { id: 20, name: "Leather Handbag", price: 4999, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80", category: "Bags" },
    { id: 21, name: "Mini Crossbody Bag", price: 1999, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=300&q=80", category: "Bags" },
    { id: 22, name: "Backpack", price: 2499, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80", category: "Bags" },

    // Fashion
    { id: 23, name: "Running Shoes", price: 3499, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", category: "Fashion" },
    { id: 24, name: "Sunglasses", price: 1499, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80", category: "Fashion" },
    { id: 25, name: "Water Bottle", price: 599, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80", category: "Accessories" },
]

  const categories = [
    { name: "Electronics", emoji: "📱" },
    { name: "Watches", emoji: "⌚" },
    { name: "Perfumes", emoji: "🌸" },
    { name: "Makeup", emoji: "💄" },
    { name: "Clothes", emoji: "👗" },
    { name: "Bags", emoji: "👜" },
    { name: "Fashion", emoji: "✨" },
    { name: "Accessories", emoji: "💍" },
  ]

  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(p => p.category === selectedCategory)

  return (
    <div>

      {/* Hero Section */}
      <div className="bg-pink-900 text-white text-center py-24 px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to MyShop 🛍️</h1>
        <p className="text-xl mb-2 text-pink-200">Your one stop shop for everything beautiful</p>
        <p className="text-md mb-8 text-pink-300">Fast delivery across Pakistan 🇵🇰</p>
        <Link to="/products" className="bg-white text-pink-900 px-10 py-3 rounded-full font-bold hover:bg-pink-100 text-lg">
          Shop Now →
        </Link>
      </div>

      {/* Categories Section */}
      <div className="bg-pink-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            <div
              onClick={() => setSelectedCategory("All")}
              className={`rounded-xl shadow p-3 text-center cursor-pointer transition ${selectedCategory === "All" ? "bg-pink-600 text-white" : "bg-white hover:shadow-lg"}`}
            >
              <p className="text-2xl">🛍️</p>
              <p className="text-xs font-bold mt-1">All</p>
            </div>
            {categories.map(cat => (
              <div
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`rounded-xl shadow p-3 text-center cursor-pointer transition ${selectedCategory === cat.name ? "bg-pink-600 text-white" : "bg-white hover:shadow-lg"}`}
              >
                <p className="text-2xl">{cat.emoji}</p>
                <p className="text-xs font-bold mt-1">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2 text-center">
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </h2>
        <p className="text-center text-gray-400 mb-8">{filteredProducts.length} products found</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="border rounded-xl shadow hover:shadow-lg transition p-4">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">{product.category}</span>
              <h3 className="font-bold text-lg mt-2">{product.name}</h3>
              <p className="text-green-600 font-bold">Rs. {product.price}</p>
              <Link to={`/product/${product.id}`} className="mt-2 block text-center border border-pink-400 text-pink-600 py-1 rounded-lg hover:bg-pink-50 text-sm">
                View Details
              </Link>
              <button className="mt-2 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
                Add to Cart 🛒
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offer Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 py-12 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-2">Special Offer! 🎉</h2>
        <p className="text-lg mb-6">Get 20% off on all Makeup & Perfumes this week</p>
        <Link to="/products" className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-pink-50">
          Grab the Deal
        </Link>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us? 💖</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 border rounded-xl shadow">
            <p className="text-4xl mb-3">🚚</p>
            <h3 className="font-bold text-lg">Fast Delivery</h3>
            <p className="text-gray-500 mt-2">Delivery within 2-3 working days all over Pakistan</p>
          </div>
          <div className="p-6 border rounded-xl shadow">
            <p className="text-4xl mb-3">💳</p>
            <h3 className="font-bold text-lg">Secure Payment</h3>
            <p className="text-gray-500 mt-2">100% secure payments with multiple options</p>
          </div>
          <div className="p-6 border rounded-xl shadow">
            <p className="text-4xl mb-3">↩️</p>
            <h3 className="font-bold text-lg">Easy Returns</h3>
            <p className="text-gray-500 mt-2">7 day easy return policy on all products</p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-900 text-white py-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Stay Updated! 📧</h2>
        <p className="text-gray-300 mb-6">Subscribe to get latest deals and offers</p>
        <div className="flex justify-center gap-2 flex-wrap">
          <input
            type="email"
            placeholder="Enter your email..."
            className="px-4 py-2 rounded-lg text-black w-72"
          />
          <button className="bg-pink-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-400">
            Subscribe
          </button>
        </div>
      </div>

    </div>
  )
}

export default Home