export function UserProfile({ user, loading, error }) {
  if (loading) return null
  if (error) return null
  if (!user) return null

  return (
    <div className="user-profile">
      <p>
        <strong>Name:</strong> <span data-testid="user-name">{user.name}</span>
      </p>
      <p>
        <strong>Email:</strong> <span data-testid="user-email">{user.email}</span>
      </p>
    </div>
  )
}
