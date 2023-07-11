const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  // Get user from db
  const user = await User.findOne({ username: username.toLowerCase() })

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

  const userForToken = {
    id: user?._id,
    username: user?.username
  }

  const token = jwt.sign(userForToken, process.env.TOKEN_SECRET)

  // if password is correct, return user
  if (passwrodCorrect) {
    response.status(200).json({
      name: user.name,
      username: user.username,
      token
    })
  }
})

module.exports = loginRouter
