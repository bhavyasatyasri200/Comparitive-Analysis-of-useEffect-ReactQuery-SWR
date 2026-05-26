import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UserProfile } from '../../components/UserProfile'
import { PostList } from '../../components/PostList'
import { CreatePostForm } from '../../components/CreatePostForm'
import { Dashboard, LoadingIndicator, ErrorMessage } from '../../components/Dashboard'

const API_BASE_URL = '/api'

const fetcher = async (url) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error('Failed to fetch')
  return response.json()
}

export function ReactQueryDashboard() {
  const queryClient = useQueryClient()

  // Fetch user
  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetcher(`${API_BASE_URL}/user`),
    staleTime: 1000 * 30 // 30 seconds
  })

  // Fetch posts (dependent on user)
  const { data: posts = [], isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetcher(`${API_BASE_URL}/posts`),
    enabled: !!user?.id,
    staleTime: 1000 * 30 // 30 seconds
  })

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (title) => {
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      if (!response.ok) throw new Error('Failed to create post')
      return response.json()
    },
    onMutate: async (title) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      const previousPosts = queryClient.getQueryData(['posts'])
      const newPost = {
        id: Math.random(),
        userId: user.id,
        title
      }
      queryClient.setQueryData(['posts'], (old) => [...(old || []), newPost])
      return { previousPosts }
    },
    onError: (err, newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: async (postId) => {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete post')
      return response.json()
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] })
      const previousPosts = queryClient.getQueryData(['posts'])
      queryClient.setQueryData(['posts'], (old) =>
        (old || []).filter(p => p.id !== postId)
      )
      return { previousPosts }
    },
    onError: (err, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  const isLoading = userLoading || postsLoading
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
            <CreatePostForm
              onSubmit={(title) => createPostMutation.mutate(title)}
              loading={createPostMutation.isPending}
            />
          </div>

          <div className="section">
            <h2>Posts</h2>
            <PostList
              posts={posts}
              onDelete={(postId) => deletePostMutation.mutate(postId)}
              loading={false}
              error={null}
            />
          </div>
        </>
      )}
    </Dashboard>
  )
}
