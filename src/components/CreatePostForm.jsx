import { useState } from 'react'

export function CreatePostForm({ onSubmit, loading }) {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (title.trim()) {
      await onSubmit(title)
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          data-testid="create-post-input"
        />
        <button
          type="submit"
          className="btn"
          disabled={loading}
          data-testid="create-post-btn"
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </div>
    </form>
  )
}
