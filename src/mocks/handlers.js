/* eslint-disable no-undef */
import { http, HttpResponse } from 'msw'

const API_LATENCY = 500 // milliseconds

let posts = [
  { id: 1, userId: 1, title: 'First Post' },
  { id: 2, userId: 1, title: 'Second Post' },
  { id: 3, userId: 1, title: 'Third Post' }
]

let nextPostId = 4

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
}

export const handlers = [
  // GET /api/user
  http.get('/api/user', async () => {
    await new Promise(resolve => setTimeout(resolve, API_LATENCY))
    return HttpResponse.json(mockUser, { status: 200 })
  }),

  // GET /api/posts
  http.get('/api/posts', async () => {
    await new Promise(resolve => setTimeout(resolve, API_LATENCY))
    return HttpResponse.json(posts, { status: 200 })
  }),

  // POST /api/posts
  http.post('/api/posts', async ({ request }) => {
    await new Promise(resolve => setTimeout(resolve, API_LATENCY))
    try {
      const body = await request.json()
      const newPost = {
        id: nextPostId++,
        userId: mockUser.id,
        title: body.title
      }
      posts.push(newPost)
      return HttpResponse.json(newPost, { status: 201 })
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid request' }, { status: 400 })
    }
  }),

  // DELETE /api/posts/:id
  http.delete('/api/posts/:id', async ({ params }) => {
    await new Promise(resolve => setTimeout(resolve, API_LATENCY))
    const { id } = params
    const index = posts.findIndex(p => p.id === parseInt(id))
    if (index > -1) {
      posts.splice(index, 1)
      return HttpResponse.json({ success: true }, { status: 200 })
    }
    return HttpResponse.json({ error: 'Post not found' }, { status: 404 })
  })
]
