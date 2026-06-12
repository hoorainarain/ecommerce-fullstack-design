import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const allProducts = [
    { id: 1, name: "Wireless Headphones", price: 2999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80", category: "Electronics", description: "High quality wireless headphones with noise cancellation and 20 hour battery life." },
    { id: 2, name: "Smart Watch", price: 4999, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&q=80", category: "Electronics", description: "Smart watch with heart rate monitor, GPS, and 7 day battery life." },
    { id: 3, name: "Bluetooth Speaker", price: 3299, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80", category: "Electronics", description: "Portable bluetooth speaker with 360 degree sound and waterproof design." },
    { id: 4, name: "Laptop Sleeve", price: 899, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&q=80", category: "Electronics", description: "Premium laptop sleeve with extra padding for maximum protection." },
    { id: 5, name: "Rose Gold Watch", price: 5999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80", category: "Watches", description: "Elegant rose gold watch with sapphire crystal glass and leather strap." },
    { id: 6, name: "Luxury Diamond Watch", price: 12999, image: "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=300&q=80", category: "Watches", description: "Luxury diamond studded watch perfect for special occasions." },
    { id: 7, name: "Elegant Silver Watch", price: 7499, image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=300&q=80", category: "Watches", description: "Classic silver watch with stainless steel strap and date display." },
    { id: 8, name: "Floral Rose Perfume", price: 3499, image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=300&q=80", category: "Perfumes", description: "Romantic floral rose perfume with hints of jasmine and musk. Long lasting fragrance." },
    { id: 9, name: "Luxury Oud Perfume", price: 5999, image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=300&q=80", category: "Perfumes", description: "Rich and luxurious oud perfume with oriental woody notes." },
    { id: 10, name: "Sweet Vanilla Mist", price: 2499, image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&q=80", category: "Perfumes", description: "Light and sweet vanilla body mist perfect for everyday use." },
    { id: 11, name: "Matte Lipstick Set", price: 1299, image: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?w=300&q=80", category: "Makeup", description: "Set of 6 matte lipsticks in beautiful shades from nude to bold red." },
    { id: 12, name: "Foundation Kit", price: 2199, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80", category: "Makeup", description: "Full coverage foundation kit with primer and setting powder." },
    { id: 13, name: "Eyeshadow Palette", price: 1799, image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&q=80", category: "Makeup", description: "24 shade eyeshadow palette with matte and shimmer finishes." },
    { id: 14, name: "Highlighter & Blush", price: 999, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80", category: "Makeup", description: "Duo highlighter and blush palette for a glowing natural look." },
    { id: 15, name: "Floral Maxi Dress", price: 3999, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&q=80", category: "Clothes", description: "Beautiful floral maxi dress perfect for summer outings and parties." },
    { id: 16, name: "Casual Kurti", price: 1499, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&q=80", category: "Clothes", description: "Comfortable casual kurti made from pure cotton fabric." },
    { id: 17, name: "Party Wear Dress", price: 5499, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&q=80", category: "Clothes", description: "Stunning party wear dress with embellishments and elegant cut." },
    { id: 18, name: "Cozy Sweater", price: 2299, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&q=80", category: "Clothes", description: "Super soft and cozy sweater perfect for winter evenings." },
    { id: 19, name: "Pink Tote Bag", price: 2999, image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=300&q=80", category: "Bags", description: "Spacious pink tote bag with inner pockets and strong handles." },
    { id: 20, name: "Leather Handbag", price: 4999, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&q=80", category: "Bags", description: "Premium leather handbag with gold hardware and multiple compartments." },
    { id: 21, name: "Mini Crossbody Bag", price: 1999, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=300&q=80", category: "Bags", description: "Cute mini crossbody bag perfect for going out with essentials only." },
    { id: 22, name: "Backpack", price: 2499, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80", category: "Bags", description: "Stylish backpack with laptop compartment and USB charging port." },
    { id: 23, name: "Running Shoes", price: 3499, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", category: "Fashion", description: "Lightweight running shoes with memory foam insole and breathable mesh." },
    { id: 24, name: "Sunglasses", price: 1499, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80", category: "Fashion", description: "UV400 protection sunglasses with polarized lenses and stylish frame." },
    { id: 25, name: "Water Bottle", price: 599, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80", category: "Accessories", description: "Stainless steel insulated water bottle keeps drinks cold for 24 hours." },
]

function ProductDetails() {
  const { id } = useParams()
  const product = allProducts.find(p => p.id === parseInt(id))
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

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

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Back Button */}
      <Link to="/products" className="text-pink-600 hover:underline mb-6 inline-block">
        ← Back to Products
      </Link>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Info */}
        <div>
          <span className="text-sm bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
            {product.category}
          </span>
          <h1 className="text-4xl font-bold mt-3 mb-2">{product.name}</h1>
          <p className="text-3xl text-green-600 font-bold mb-4">Rs. {product.price}</p>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-6">
            <span className="text-yellow-400 text-xl">★★★★☆</span>
            <span className="text-gray-500 text-sm">(128 reviews)</span>
          </div>

          {/* Quantity */}
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

          {/* Total */}
          <p className="text-gray-500 mb-4">
            Total: <span className="text-green-600 font-bold">Rs. {product.price * quantity}</span>
          </p>

          {/* Buttons */}
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

          {/* Features */}
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

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <div key={p.id} className="border rounded-xl shadow hover:shadow-lg transition p-4">
                <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-lg mb-3" />
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-green-600 font-bold">Rs. {p.price}</p>
                <Link
                  to={`/product/${p.id}`}
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