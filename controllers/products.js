const productRouter = require('express').Router()
const Product = require('../models/Product')
const jwt = require('jsonwebtoken')
const Ftp = require('jsftp')
const multer = require('multer')
const { dirname, join } = require('path')

const CURRENT_DIR = dirname(require.main.filename)
const MIMETYPES = ['image/jpeg', 'image/png']

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, '/uploads'),
    filename: (req, file, cb) => {
      const fileExtension = file.mimetype.split('/')[1]
      const fileName = file.originalname.split('.')[0]

      cb(null, `${fileName}-${Date.now()}.${fileExtension}`)
    }
  }),
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error(`Only ${MIMETYPES.join(', ')} files are allowed`), false)
    }
  },
  limits: {
    fieldSize: 10000000

  }
})

const ftp = new Ftp({
  host: '191.101.79.174',
  user: 'u442603897.webmaster02',
  pass: '#!a57JcI4q'
})

productRouter.get('/', async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

productRouter.delete('/', async (req, res) => {
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

  // delete product
  const product = await Product.findByIdAndDelete(body.id)

  if (product) {
    res.status(200).json(product)
  } else {
    res.status(404).end()
  }
})

productRouter.put('/', multerUpload.single('image'), async (req, res) => {
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

  // get data from  DataForm
  console.log(req.file)

  res.sendStatus(200)

  // const boundary = req.headers['content-type'].split('boundary=')[1]
  // let body = ''
  // req.on('data', (chunk) => (body += chunk))
  // req.on('end', async () => {
  //   body.split(boundary).map((data, index) => console.log(index, data))
  //   res.status(200).end()
  // })

  // upload image
  // const file = req.file
  // console.log(file)
  // if (file) {
  //   const buffer = Buffer.from(file, 'base64')
  //   console.log('buffer', buffer)
  //   ftp.put(buffer, '/public_html/image.jpg', (error) => {
  //     if (error) {
  //       console.log('La imagen no se pudo subir')
  //     } else {
  //       console.log('La imagen se subio correctamente')
  //     }
  //   })
  // }

  // update product
  // const filter = { _id: body.id }
  // const update = body
  // const product = await Product.findOneAndUpdate(filter, update, { new: true })

  // if (product) {
  // res.status(200).json(product)
  // } else {
  //   res.status(404).end()
  // }
})

module.exports = productRouter
