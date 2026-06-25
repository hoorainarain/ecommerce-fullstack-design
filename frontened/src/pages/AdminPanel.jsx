import React, { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'
import { Navigate } from 'react-router-dom'
import API from '../api'

function AdminPanel() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    stock: "",
  })

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products')
      setProducts(res.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // Agar admin nahi hai, toh Home par bhej do
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />
  }

  const resetForm = () => {
    setFormData({ name: "", price: "", image: "", description: "", category: "", stock: "" })
    setEditingProduct(null)
    setShowForm(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        // UPDATE
        await API.put(`/products/${editingProduct._id}`, formData)
      } else {
        // CREATE
        await API.post('/products', formData)
      }
      fetchProducts()
      resetForm()
    } catch (error) {
      alert('Error: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/products/${id}`)
        fetchProducts()
      } catch (error) {
        alert('Error deleting product')
      }
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-xl">Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel 🛠️</h1>
        <button
          onClick={() => {
            resetForm()
            setShowForm(true)
          }}
          className="bg-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-700"
        >
          + Add New Product
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white border rounded-xl p-6 mb-8 shadow">
          <h2 className="text-xl font-bold mb-4">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              required
              value={formData.price}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              required
              value={formData.image}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 sm:col-span-2"
            />
            <input
              type="text"
              name="category"
              placeholder="Category (e.g. Makeup)"
              required
              value={formData.category}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              required
              value={formData.stock}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
            />
            <textarea
              name="description"
              placeholder="Description"
              required
              value={formData.description}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 sm:col-span-2"
              rows="3"
            />

            <div className="sm:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-pink-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-pink-700"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="border border-gray-300 px-6 py-2 rounded-lg font-bold hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white border rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-pink-50">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="p-4">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                </td>
                <td className="p-4 font-bold">{product.name}</td>
                <td className="p-4">
                  <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </td>
                <td className="p-4 text-green-600 font-bold">Rs. {product.price}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-bold hover:bg-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-bold hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AdminPanel