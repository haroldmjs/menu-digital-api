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

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Product = model('Product', productSchema)

module.exports = Product
