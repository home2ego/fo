const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  { title: 'Hobby', author: 'John Doe', url: 'http://abcdef', likes: 5 },
  { title: 'Sport', author: 'Jane Doe', url: 'http://123456', likes: 123 },
]

beforeEach(async () => {
  await Blog.deleteMany()
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.deepStrictEqual(response.body.length, initialBlogs.length)
})

test('blog fields are named id instead of _id', async () => {
  const blogs = await Blog.find({})
  const blogsAtStart = blogs.map((b) => b.toJSON())
  const blogToView = blogsAtStart[0]

  const response = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(blogToView, response.body)
})

test('succeeds in creating a new blog post', async () => {
  const newBlog = { title: 'Cooking', author: 'Anna', url: 'http://bbc', likes: 12 }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await Blog.find({})

  const blogsAtEnd = blogs.map((b) => b.toJSON())
  assert.deepStrictEqual(blogsAtEnd.length, initialBlogs.length + 1)

  const titles = blogsAtEnd.map((b) => b.title)
  assert(titles.includes('Cooking'))
})

after(async () => await mongoose.connection.close())
