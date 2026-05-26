# Migration Guide: From useEffect to React Query

## Overview

Migrating from manual `useEffect` with the Fetch API to React Query is a transformative process that dramatically simplifies your data-fetching code. This guide walks you through each step of the migration, highlighting the benefits gained at each stage.

## Step 1: Install and Setup React Query

### Before
```bash
# Only using React and Fetch API
```

### After
```bash
npm install @tanstack/react-query
```

Wrap your app with `QueryClientProvider`:

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  )
}
```

**Benefit**: Enables React Query features globally across your application.

## Step 2: Replace useEffect Data Fetching with useQuery

### Before: useEffect Pattern
```jsx
function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchUser = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('/api/user')
        const data = await response.json()
        if (isMounted) setUser(data)
      } catch (err) {
        if (isMounted) setError(err.message)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchUser()
    return () => { isMounted = false }
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return <div>User: {user.name}</div>
}
```

### After: useQuery Pattern
```jsx
import { useQuery } from '@tanstack/react-query'

function Dashboard() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetch('/api/user').then(r => r.json())
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>User: {user.name}</div>
}
```

**Benefits gained:**
- ✅ Automatic state management (loading, error, data)
- ✅ No manual cleanup needed
- ✅ Automatic caching
- ✅ ~70% less boilerplate code

## Step 3: Implement Dependent Queries

```jsx
function Dashboard() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetch('/api/user').then(r => r.json())
  })

  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(r => r.json()),
    enabled: !!user?.id
  })
}
```

## Step 4: Mutations with Cache Invalidation

```jsx
const createPost = useMutation({
  mutationFn: (title) =>
    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title })
    }).then(r => r.json()),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] })
  }
})
```

## Step 5: Optimistic Updates

```jsx
const createPost = useMutation({
  mutationFn: (title) => /* ... */,
  
  onMutate: async (newTitle) => {
    const previousPosts = queryClient.getQueryData(['posts'])
    queryClient.setQueryData(['posts'], (old) => [
      ...(old || []),
      { id: Math.random(), title: newTitle }
    ])
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
```

## Migration Checklist

- [ ] Install `@tanstack/react-query`
- [ ] Wrap app with `QueryClientProvider`
- [ ] Replace `useState` + `useEffect` with `useQuery`
- [ ] Implement dependent queries with `enabled`
- [ ] Replace fetch calls with `useMutation`
- [ ] Set up cache invalidation
- [ ] Implement optimistic updates
- [ ] Configure `staleTime` and `gcTime`
- [ ] Enable automatic retries
- [ ] Test all data-fetching flows

## Summary of Benefits

| Aspect | useEffect | React Query |
|--------|-----------|-------------|
| Boilerplate | High | Low |
| Caching | Manual | Automatic |
| Deduplication | None | Automatic |
| Error Handling | Manual | Built-in |
| Retries | Manual | Automatic |
| Optimistic Updates | Manual | Built-in |
| DevTools | None | Excellent |
| Performance | Poor | Excellent |

## Next Steps

1. **Start small**: Migrate one component at a time
2. **Test thoroughly**: Ensure all data flows work correctly
3. **Measure impact**: Use DevTools to verify improvements
4. **Share knowledge**: Teach your team the benefits
