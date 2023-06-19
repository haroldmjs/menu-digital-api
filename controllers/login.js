const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  // Get user from db
  const user = await User.findOne({ username })

  // compare password
  const passwrodCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  // if password is incorrect, return error
  if (!passwrodCorrect) {
    response.status(401).json({
      error: 'invalid username or password'
    })
  }

  // if password is correct, return user

  response.send({
    name: user.name,
    username: user.username
  })
})
