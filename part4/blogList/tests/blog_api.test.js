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

beforeEach(() => {
  return Blog.deleteMany().then(() => Blog.insertMany(initialBlogs))
})

test('blogs are returned as json', () => {
  return api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', () => {
  return api.get('/api/blogs').then((response) => {
    assert.deepStrictEqual(response.body.length, initialBlogs.length)
  })
})

after(() => {
  return mongoose.connection.close()
})
