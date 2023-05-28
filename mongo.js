const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://haroldmejias:AMgTgHJzrERRFiYi@cluster0.hctqfcl.mongodb.net/menu-brioche?retryWrites=true&w=majority'

mongoose.connect(connectionString).then(() => {
  console.log('DB connectada papa')
}).catch(err => {
  console.log(err)
})

// Product.find({}).then(res => {
//   console.log(res)
//   mongoose.connection.close()
// })

// const product = new Product({
//   name: 'cangrejo',
//   price: 10,
//   image: 'pernil.jpg',
//   description: 'riquisimo',
//   category: 'brioches',
//   favorite: true,
//   available: true
// })

// product.save().then((res) => {
//   console.log(res)
//   mongoose.connection.close()
// }).catch(err => {
//   console.log(err)
// })
