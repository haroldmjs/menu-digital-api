const productRouter = require('express').Router()
const Product = require('../models/Product')
const jwt = require('jsonwebtoken')

productRouter.get('/', async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

productRouter.put('/', async (req, res) => {
  // verify token
  const authorization = req.get('authorization')
  let token = null

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  let decodedToken = {}

  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
  } catch (e) { }

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  // get product
  const { body } = req

  // update product
  const filter = { _id: body.id }
  const update = body
  const product = await Product.findOneAndUpdate(filter, update, { new: true })

  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404).end()
  }
})

module.exports = productRouter
