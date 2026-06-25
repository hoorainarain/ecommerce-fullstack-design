import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../CartContext'
import { useAuth } from '../AuthContext'

function Checkout() {
  const { cartItems } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    address: "",
    city: "",
    phone: "",
    paymentMethod: "cod",
  })

  const [orderPlaced, setOrderPlaced] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const delivery = cartItems.length > 0 ? 200 : 0
  const total = subtotal + delivery

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setOrderPlaced(true)
    localStorage.removeItem('cartItems')
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="text-center py-20">
        <p className="text-8xl mb-6">🛒</p>
        <p className="text-2xl font-bold text-gray-500 mb-4">Your cart is empty!</p>
        <Link to="/products" className="bg-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-700">
          Start Shopping →
        </Link>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-7xl mb-6">✅</p>
        <h1 className="text-3xl font-bold mb-3">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-2">Thank you, {formData.fullName}!</p>
        <p className="text-gray-500 mb-8">
          Your order of <span className="font-bold text-green-600">Rs. {total}</span> will be delivered to{" "}
          <span className="font-bold">{formData.address}, {formData.city}</span>
        </p>
        <p className="text-gray-400 text-sm mb-8">
          Payment Method: {formData.paymentMethod === "cod" ? "Cash on Delivery" : "Card Payment"}
        </p>
        <Link to="/" className="bg-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-700">
          Continue Shopping →
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold mb-8">Checkout 📦</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder} className="bg-white border rounded-xl p-6 shadow space-y-4">

            <h2 className="text-xl font-bold mb-2">Delivery Details</h2>

            <div>
              <label className="block text-sm font-bold mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Address</label>
              <input
                type="text"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="House #, Street, Area"
                className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Karachi"
                  className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03XX-XXXXXXX"
                  className="w-full border-2 border-pink-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold mb-2 pt-4 border-t">Payment Method</h2>

            <div className="space-y-2">
              <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-pink-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                  className="accent-pink-600"
                />
                <span>💵 Cash on Delivery</span>
              </label>
              <label className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-pink-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === "card"}
                  onChange={handleChange}
                  className="accent-pink-600"
                />
                <span>💳 Credit / Debit Card</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-pink-700 transition mt-4"
            >
              Place Order →
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item._id} className="flex gap-3 items-center">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-bold text-green-600">Rs. {item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="font-bold">Rs. {delivery}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg text-green-600">Rs. {total}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout