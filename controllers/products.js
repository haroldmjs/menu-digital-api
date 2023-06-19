const productRouter = require('express').Router()
const Product = require('../models/Product')

productRouter.get('/', async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

module.exports = productRouter
