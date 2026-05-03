const { describe, test, beforeEach, after } = require('node:test')
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

describe('receiving blogs', () => {
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
})

describe('viewing a specific blog', () => {
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
})

describe('addition of a blog', () => {
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

  test('fails with status code 400 if title or url properties are missing', async () => {
    const newBlog = { author: 'Anna', likes: 12 }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogs = await Blog.find({})
    assert.strictEqual(blogs.length, initialBlogs.length)
  })

  test('when likes property is missing, it defaults to 0', async () => {
    const newBlog = { title: 'Cooking', author: 'Anna', url: 'http://bbc' }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const createdBlog = await Blog.findById(response.body.id)
    assert.strictEqual(createdBlog.likes, 0)
  })
})

describe('delition of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0].toJSON()

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await Blog.find({})
    const ids = blogsAtEnd.map((b) => b.id)

    assert(!ids.includes(blogToDelete.id))
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
  })
})

describe('updating of a blog', () => {
  test('succeeds with updating the likes property of an existing blog', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]
    const newLikes = blogToUpdate.likes + 1

    await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: newLikes }).expect(200)

    const updatedBlog = await Blog.findById(blogToUpdate.id)
    assert.strictEqual(updatedBlog.likes, newLikes)
  })
})

after(async () => await mongoose.connection.close())
