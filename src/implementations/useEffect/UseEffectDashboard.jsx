import { useState, useEffect } from 'react'
import { UserProfile } from '../../components/UserProfile'
import { PostList } from '../../components/PostList'
import { CreatePostForm } from '../../components/CreatePostForm'
import { Dashboard, LoadingIndicator, ErrorMessage } from '../../components/Dashboard'

const API_BASE_URL = '/api'

export function UseEffectDashboard() {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [createLoading, setCreateLoading] = useState(false)

  // Fetch user data
  useEffect(() => {
    let isMounted = true

    const fetchUser = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(`${API_BASE_URL}/user`)
        if (!response.ok) throw new Error('Failed to fetch user')
        const userData = await response.json()
        if (isMounted) {
          setUser(userData)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    fetchUser()

    return () => {
      isMounted = false
    }
  }, [])

  // Fetch posts after user is loaded
  useEffect(() => {
    if (!user) return

    let isMounted = true

    const fetchPosts = async () => {
      try {
        setError(null)
        const response = await fetch(`${API_BASE_URL}/posts`)
        if (!response.ok) throw new Error('Failed to fetch posts')
        const postsData = await response.json()
        if (isMounted) {
          setPosts(postsData)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    fetchPosts()

    return () => {
      isMounted = false
    }
  }, [user])

  const handleCreatePost = async (title) => {
    try {
      setCreateLoading(true)
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      if (!response.ok) throw new Error('Failed to create post')
      // Refetch posts
      const postsResponse = await fetch(`${API_BASE_URL}/posts`)
      const postsData = await postsResponse.json()
      setPosts(postsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setCreateLoading(false)
    }
  }

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete post')
      setPosts(posts.filter(p => p.id !== postId))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Dashboard>
      <ErrorMessage error={error} />
      {loading && <LoadingIndicator />}
      {!loading && (
        <>
          <div className="section">
            <h2>User Profile</h2>
            <UserProfile user={user} loading={false} error={null} />
          </div>

          <div className="section">
            <h2>Create Post</h2>
            <CreatePostForm onSubmit={handleCreatePost} loading={createLoading} />
          </div>

          <div className="section">
            <h2>Posts</h2>
            <PostList posts={posts} onDelete={handleDeletePost} loading={false} error={null} />
          </div>
        </>
      )}
    </Dashboard>
  )
}
