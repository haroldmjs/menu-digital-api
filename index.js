require('dotenv').config()

require('./mongo')

const express = require('express')
const cors = require('cors')
const Product = require('./models/Product')
const usersRouter = require('./controllers/users')
const productsRouter = require('./controllers/products')

const app = express()
const logger = require('./loggerMiddleware')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.use(logger)

app.use(cors())

app.get('/', (req, res) => {
  res.send('')
})

app.use('/api/products', productsRouter)

app.use('/api/users', usersRouter)

app.use('/api/login', loginRouter)

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})
app.listen(3000, '0.0.0.0', () => {
  console.log('Server ready')
})
