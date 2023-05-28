const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  category: String,
  favorite: Boolean,
  available: Boolean
})

const Product = model('Product', productSchema)

module.exports = Product
