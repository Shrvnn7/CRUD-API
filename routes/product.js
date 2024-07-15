const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const {getProducts, getProduct, updateProduct, deleteProduct, createProduct} = require("../controller/products")


// GET(Data Retrieval), POST(New Data Create), PUT(Data Update + New Data Create by Particular ID), PATCH(Data Update), DELETE(Delete a Document)

// Create a new Product
router.post('/', createProduct)

// Get all Products
router.get('/', getProducts)

// Get a product by ID
router.get('/:id', getProduct)

// Update a product by ID
router.put('/:id', updateProduct)

// Delete a product by ID
router.delete('/:id', deleteProduct)


module.exports = router;