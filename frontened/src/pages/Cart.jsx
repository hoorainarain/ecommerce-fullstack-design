import React from 'react'
// Step 1: Top par sahi se Link ko import kiya
import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'

function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = cartItems.length > 0 ? 200 : 0
  const total = subtotal + delivery

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold mb-8">My Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-8xl mb-6">🛒</p>
          <p className="text-2xl font-bold text-gray-500 mb-4">Your cart is empty!</p>
          <Link to="/products" className="bg-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-700">
            Start Shopping →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="flex gap-4 border rounded-xl p-4 shadow hover:shadow-md transition">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-green-600 font-bold">Rs. {item.price}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="w-8 h-8 rounded-full border-2 border-pink-400 text-pink-600 font-bold hover:bg-pink-50"
                    >-</button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="w-8 h-8 rounded-full border-2 border-pink-400 text-pink-600 font-bold hover:bg-pink-50"
                    >+</button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">Rs. {item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="mt-2 text-red-500 hover:text-red-700 text-sm font-bold"
                  >
                    ✕ Remove
                  </button>
                </div>

              </div>
            ))}

            <Link to="/products" className="inline-block mt-4 text-pink-600 hover:underline font-bold">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-2xl p-6 shadow h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                <span className="font-bold">Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Charges</span>
                <span className="font-bold">Rs. {delivery}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-green-600">Rs. {total}</span>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Promo code..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-pink-400"
              />
              <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 font-bold">
                Apply
              </button>
            </div>

            {/* Step 2: Button ko hata kar Link laga diya jo /checkout par le kar jaye */}
            <Link
              to="/checkout"
              className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-pink-700 transition block text-center"
            >
              Proceed to Checkout →
            </Link>

            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm mb-2">Secure Payment</p>
              <div className="flex justify-center gap-3 text-2xl">
                <span>💳</span>
                <span>🏦</span>
                <span>📱</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  )
}

export default Cart