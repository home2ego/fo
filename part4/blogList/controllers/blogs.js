const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
      }

      response.json(blog)
    })
    .catch((err) => next(err))
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)
  blog.likes = blog.likes || 0

  blog.save().then((result) => response.status(201).json(result))
})

module.exports = blogsRouter
