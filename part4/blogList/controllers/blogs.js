const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  return Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', (request, response) => {
  return Blog.findById(request.params.id).then((blog) => {
    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    return response.json(blog)
  })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'content missing' })
  }

  blog.likes = blog.likes || 0
  return blog.save().then((result) => response.status(201).json(result))
})

blogsRouter.delete('/:id', (request, response) => {
  return Blog.findByIdAndDelete(request.params.id).then((deleted) => {
    if (!deleted) return response.status(404).json({ error: 'Blog not found' })

    return response.sendStatus(204)
  })
})

module.exports = blogsRouter
