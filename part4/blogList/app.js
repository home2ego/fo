const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()

mongoose
  .connect(config.MONGODB_URL, { family: 4 })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB:', error.message))

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)

module.exports = app
