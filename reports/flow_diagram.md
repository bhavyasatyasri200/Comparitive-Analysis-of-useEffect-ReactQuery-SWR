# Request Lifecycle Flow Diagrams

This document illustrates the request lifecycle for dependent queries (User → Posts) across three different implementations: `useEffect`, React Query, and SWR.

## 1. Manual Implementation (useEffect)

The manual implementation relies on state changes to trigger sequential effects.

```mermaid
sequenceDiagram
    participant C as Component
    participant E as useEffect (User)
    participant E2 as useEffect (Posts)
    participant A as API

    Note over C: Component Mounts
    C->>E: Trigger Effect
    E->>A: GET /api/user
    A-->>E: User Data Response
    E->>C: setUser(data)
    Note over C: Component Re-renders
    C->>E2: Trigger Effect (enabled by user.id)
    E2->>A: GET /api/posts?userId={id}
    A-->>E2: Posts Data Response
    E2->>C: setPosts(data)
    Note over C: Final Render
```

## 2. React Query Implementation

React Query uses the `enabled` flag to manage dependencies declaratively.

```mermaid
sequenceDiagram
    participant C as Component
    participant RQ as React Query (User)
    participant RQ2 as React Query (Posts)
    participant A as API

    Note over C: Component Mounts
    C->>RQ: useQuery(['user']) - Fetching
    C->>RQ2: useQuery(['posts']) - Idle (enabled: false)
    RQ->>A: GET /api/user
    A-->>RQ: User Data Response
    RQ->>C: Update state { data: user }
    Note over C: Component Re-renders
    C->>RQ2: useQuery(['posts']) - Fetching (enabled: true)
    RQ2->>A: GET /api/posts?userId={id}
    A-->>RQ2: Posts Data Response
    RQ2->>C: Update state { data: posts }
```

## 3. SWR Implementation

SWR uses conditional fetching (returning `null` for the key) to handle dependencies.

```mermaid
sequenceDiagram
    participant C as Component
    participant S as SWR (User)
    participant S2 as SWR (Posts)
    participant A as API

    Note over C: Component Mounts
    C->>S: useSWR('/api/user') - Fetching
    C->>S2: useSWR(null) - Idle (key is null)
    S->>A: GET /api/user
    A-->>S: User Data Response
    S->>C: Update state { data: user }
    Note over C: Component Re-renders
    C->>S2: useSWR('/api/posts?userId={id}') - Fetching
    S2->>A: GET /api/posts?userId={id}
    A-->>S2: Posts Data Response
    S2->>C: Update state { data: posts }
```

## Key Observations

- **useEffect**: Requires manual orchestration of state and cleanup. Errors in dependency arrays can lead to infinite loops or missed updates.
- **React Query**: Provides a robust `enabled` flag. Caching is handled automatically, and the lifecycle is transparent through DevTools.
- **SWR**: Uses a simple but effective "null key" pattern for dependencies. Lightweight and focuses on revalidation.
