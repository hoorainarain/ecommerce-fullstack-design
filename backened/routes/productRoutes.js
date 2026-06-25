const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// GET all products  →  GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET single product  →  GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// CREATE new product  →  POST /api/products
router.post('/', async (req, res) => {
  try {
    const { name, price, image, description, category, stock } = req.body
    const product = new Product({ name, price, image, description, category, stock })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// UPDATE product  →  PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, price, image, description, category, stock } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
      product.name = name || product.name
      product.price = price || product.price
      product.image = image || product.image
      product.description = description || product.description
      product.category = category || product.category
      product.stock = stock !== undefined ? stock : product.stock

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE product  →  DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.deleteOne()
      res.json({ message: 'Product removed' })
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router