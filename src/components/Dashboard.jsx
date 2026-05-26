export function Dashboard({ children }) {
  return <div className="dashboard">{children}</div>
}

export function LoadingIndicator() {
  return (
    <div className="loading-indicator" data-testid="loading-indicator">
      <div className="loading-spinner"></div>
      <p>Loading...</p>
    </div>
  )
}

export function ErrorMessage({ error }) {
  if (!error) return null
  return (
    <div className="error-message" data-testid="error-message">
      <strong>Error:</strong> {error}
    </div>
  )
}
