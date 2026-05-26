export function PostList({ posts, onDelete, loading, error }) {
  if (loading) return null
  if (error) return null

  return (
    <div className="posts-container">
      {posts && posts.length > 0 ? (
        <ul className="posts-list" data-testid="posts-list">
          {posts.map(post => (
            <li key={post.id} data-testid={`post-item-${post.id}`}>
              <strong>{post.title}</strong>
              <span className="post-id">ID: {post.id}</span>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(post.id)}
                data-testid={`delete-post-btn-${post.id}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-message">No posts available</p>
      )}
    </div>
  )
}
