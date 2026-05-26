import useSWR from 'swr'
import { UserProfile } from '../../components/UserProfile'
import { PostList } from '../../components/PostList'
import { CreatePostForm } from '../../components/CreatePostForm'
import { Dashboard, LoadingIndicator, ErrorMessage } from '../../components/Dashboard'
import { useState } from 'react'

const API_BASE_URL = '/api'

const fetcher = async (url) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch')
  return response.json()
}

export function SWRDashboard() {
  const [createLoading, setCreateLoading] = useState(false)

  // Fetch user
  const { data: user, error: userError, isLoading: userLoading } = useSWR(
    `${API_BASE_URL}/user`,
    fetcher,
    { revalidateOnFocus: true }
  )

  // Fetch posts (dependent on user)
  const { data: posts = [], error: postsError, mutate: mutatePosts } = useSWR(
    user ? `${API_BASE_URL}/posts` : null,
    fetcher,
    { revalidateOnFocus: true }
  )

  const handleCreatePost = async (title) => {
    try {
      setCreateLoading(true)
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      if (!response.ok) throw new Error('Failed to create post')
      // Revalidate posts
      await mutatePosts()
    } catch (err) {
      console.error('Error creating post:', err)
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
      // Update posts locally
      await mutatePosts(
        (current) => current.filter(p => p.id !== postId),
        false
      )
      // Revalidate
      await mutatePosts()
    } catch (err) {
      console.error('Error deleting post:', err)
    }
  }

  const isLoading = userLoading
  const error = userError?.message || postsError?.message

  return (
    <Dashboard>
      <ErrorMessage error={error} />
      {isLoading && <LoadingIndicator />}
      {!isLoading && user && (
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
            <PostList
              posts={posts}
              onDelete={handleDeletePost}
              loading={false}
              error={null}
            />
          </div>
        </>
      )}
    </Dashboard>
  )
}
