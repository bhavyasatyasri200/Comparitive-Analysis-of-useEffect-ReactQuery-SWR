# Comparative Analysis of Frontend Data Fetching

## 📊 Project Overview

This comprehensive project compares three modern data-fetching approaches in React:

1. **useEffect + Fetch** - Manual approach using native browser APIs
2. **React Query (TanStack Query)** - Powerful declarative server state management library
3. **SWR** - Lightweight stale-while-revalidate library by Vercel

The project builds the same dashboard application three times, using each approach, enabling direct comparison of performance, developer experience, code complexity, and feature sets.

## 🎯 Key Features

✅ **Three Complete Implementations** - Identical UI, different data-fetching logic
✅ **Real API Mocking** - Mock Service Worker (MSW) with realistic 500ms latency
✅ **Comprehensive Benchmarking** - Metrics for caching, deduplication, retries, and more
✅ **Production-Ready Docker Setup** - Single command deployment
✅ **Detailed Documentation** - Migration guides and flow diagrams
✅ **Automated Testing Support** - Data-testid attributes for all interactive elements

## 🚀 Quick Start

### Option 1: Run with Docker (Recommended)

**Prerequisites:** Docker and Docker Compose installed

```bash
# Clone the repository
git clone https://github.com/bhavyasatyasri200/Comparative-Analysis-of-Frontend-Data-Fetching.git
cd Comparative-Analysis-of-Frontend-Data-Fetching

# Start the application
docker-compose up
```

**What happens:**
1. Docker builds the Node.js image
2. Dependencies are installed
3. Development server starts on port 3000
4. App becomes healthy within 2 minutes
5. Open browser to `http://localhost:3000`

**To stop:**
```bash
docker-compose down
```

**To rebuild after code changes:**
```bash
docker-compose up --build
```

### Option 2: Run Locally

**Prerequisites:** Node.js 18+ and npm installed

```bash
# Clone the repository
git clone https://github.com/bhavyasatyasri200/Comparative-Analysis-of-Frontend-Data-Fetching.git
cd Comparative-Analysis-of-Frontend-Data-Fetching

# Install dependencies
npm install

# Start development server
npm run dev
```

**Output:**
```
  VITE v5.0.8  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

Open `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
```

Creates optimized bundle in `dist/` directory.

## 📁 Project Structure

```
Comparative-Analysis-of-Frontend-Data-Fetching/
├── src/
│   ├── components/                    # Shared UI components
│   │   ├── UserProfile.jsx           # Display user info
│   │   ├── PostList.jsx              # List of posts
│   │   ├── CreatePostForm.jsx        # Form to create posts
│   │   └── Dashboard.jsx             # Layout & state indicators
│   │
│   ├── implementations/               # Three data-fetching approaches
│   │   ├── useEffect/
│   │   │   └── UseEffectDashboard.jsx    # Manual fetch implementation
│   │   ├── react-query/
│   │   │   └── ReactQueryDashboard.jsx   # React Query implementation
│   │   └── swr/
│   │       └── SWRDashboard.jsx          # SWR implementation
│   │
│   ├── mocks/                         # Mock Service Worker (MSW)
│   │   ├── handlers.js               # API endpoint definitions
│   │   └── browser.js                # MSW browser worker setup
│   │
│   ├── App.jsx                       # Main app with navigation
│   ├── main.jsx                      # React entry point
│   ├── index.css                     # Global styles
│   └── index.html                    # HTML template
│
├── reports/                           # Documentation
│   ├── migration_guide.md            # Step-by-step migration from useEffect
│   └── flow_diagram.md               # Mermaid diagrams showing data flow
│
├── screenshots/                       # Benchmarking screenshots
│   └── (network tab captures)
│
├── results.json                       # Benchmarking results
├── docker-compose.yml                # Docker Compose configuration
├── Dockerfile                        # Docker image definition
├── vite.config.js                    # Vite build configuration
├── package.json                      # Dependencies and scripts
├── .env.example                      # Environment variables template
└── README.md                         # This file
```

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|-----------|---------|----------|
| **React** | UI framework | 18.2.0+ |
| **Vite** | Build tool & dev server | 5.0.8+ |
| **React Query** | Server state management | 5.28.0+ |
| **SWR** | Data fetching library | 2.2.4+ |
| **MSW** | API mocking | 2.0.11+ |
| **Node.js** | JavaScript runtime | 18+ |
| **Docker** | Containerization | Latest |

## 🎮 Using the Application

### Dashboard Navigation

Once the app is running, you'll see three buttons at the top:

1. **useEffect** - Manual implementation tab
2. **React Query** - React Query implementation tab
3. **SWR** - SWR implementation tab

### Available Actions

**View User Profile:**
- Each implementation displays the current user's name and email
- Loaded on initial mount (all implementations)

**View Posts:**
- Lists all posts for the user
- Loaded after user profile is fetched (dependent query)

**Create Post:**
1. Type a post title in the input field
2. Click "Create Post" button
3. New post appears in the list

**Delete Post:**
1. Click the "Delete" button next to any post
2. Post is removed from the list

### Observing Differences

Switch between implementations to observe:

- **Loading States** - How each shows/hides loading indicators
- **Error Handling** - How errors are displayed and recovered
- **Performance** - Network tab shows request behavior
- **UI Responsiveness** - Optimistic updates in React Query

## 🔍 Monitoring Network Requests

### Using Browser DevTools

1. **Open DevTools** - Press `F12` or `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (Mac)
2. **Go to Network Tab** - Click the "Network" tab
3. **Reload Page** - `F5` or `Cmd+R`
4. **Watch Requests** - See API calls being made
5. **Compare Implementations** - Note differences in request patterns

### What to Look For

#### Request Deduplication
- **useEffect**: Multiple instances = multiple requests
- **React Query**: Multiple instances = single request (deduped)
- **SWR**: Multiple instances = single request (deduped)

#### On Window Focus (Switch tabs and back)
- **useEffect**: No automatic refetch
- **React Query**: Background refetch happens
- **SWR**: Automatic refetch on focus

#### On Mutation (Create/Delete Post)
- **useEffect**: Full refetch of posts list
- **React Query**: Optimistic update, then validation
- **SWR**: Manual revalidation after mutation

## 📊 Benchmarking Results

See `results.json` for comprehensive metrics:

```json
{
  "deduplication": {
    "useEffect": { "requests": 3 },
    "reactQuery": { "requests": 1 },
    "swr": { "requests": 1 }
  },
  "windowFocusRefetch": {
    "useEffect": { "builtIn": false },
    "reactQuery": { "builtIn": true },
    "swr": { "builtIn": true }
  },
  // ... more metrics
}
```

## 📚 Documentation

### Migration Guide
**File:** `reports/migration_guide.md`

Step-by-step guide to migrate from useEffect to React Query, including:
- Setup and installation
- Replacing useEffect with useQuery
- Implementing dependent queries
- Mutations and optimistic updates
- Caching strategies
- Error handling and retries
- Common pitfalls and solutions

### Flow Diagrams
**File:** `reports/flow_diagram.md`

Detailed Mermaid diagrams showing:
- Request lifecycle for each implementation
- Cache behavior and lifecycle
- Deduplication mechanisms
- Refetch scenarios
- Mutation and revalidation flows
- Performance comparisons

### Screenshots
**Directory:** `screenshots/`

Network tab captures demonstrating:
- Deduplication behavior
- Error retry sequences
- Window focus refetch
- Optimistic updates

## 🧪 Testing

The application includes data-testid attributes for automated testing:

```html
<!-- User Profile -->
<span data-testid="user-name">John Doe</span>
<span data-testid="user-email">john@example.com</span>

<!-- Posts List -->
<ul data-testid="posts-list">
  <li data-testid="post-item-1">
    <button data-testid="delete-post-btn-1">Delete</button>
  </li>
</ul>

<!-- Create Post Form -->
<input data-testid="create-post-input" />
<button data-testid="create-post-btn">Create Post</button>

<!-- States -->
<div data-testid="loading-indicator">Loading...</div>
<div data-testid="error-message">Error occurred</div>
```

### Example Test Query
```javascript
// Find user name
const userName = document.querySelector('[data-testid="user-name"]')

// Find all posts
const posts = document.querySelectorAll('[data-testid^="post-item-"]')

// Find delete button for post #1
const deleteBtn = document.querySelector('[data-testid="delete-post-btn-1"]')
```

## 🔐 Environment Variables

**File:** `.env.example`

```env
# API configuration
VITE_API_BASE_URL=http://localhost:3000

# Enable mock service worker
VITE_ENABLE_MSW=true
```

Copy to `.env` if customizing (not needed for defaults).

## 🐛 Troubleshooting

### Issue: Port 3000 Already in Use

**Docker Solution:**
```bash
# Use a different port
docker-compose down
# Edit docker-compose.yml and change "3000:3000" to "3001:3000"
docker-compose up
```

**Local Solution:**
```bash
# Edit vite.config.js
# Change port: 3000 to port: 3001
npm run dev
```

### Issue: Docker Build Fails

**Solution:**
```bash
# Clean build
docker-compose down
docker system prune
docker-compose up --build
```

### Issue: Dependencies Not Installing

**Solution:**
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: App Not Accessible After docker-compose up

**Solution:**
```bash
# Check container logs
docker-compose logs app

# Verify health
docker-compose ps

# Wait for healthy status (up to 2 minutes)
```

### Issue: Mock API Not Working

**Solution:**
1. Open DevTools (F12)
2. Check Network tab - requests should show origin as "service-worker"
3. Check Console tab for MSW logs
4. Refresh page (Ctrl+R)

## 📊 Comparison Summary

### Code Complexity

**useEffect:**
- Manual state for loading, error, data
- Manual cleanup and race condition handling
- Verbose error handling
- No automatic features

**React Query:**
- Automatic state management
- Built-in caching and deduplication
- Automatic refetching
- Optimistic updates
- Excellent DevTools

**SWR:**
- Simple, minimal API
- Key-based caching
- Lightweight (~13KB)
- Good for simple cases
- Limited advanced features

### Performance Metrics

| Metric | useEffect | React Query | SWR |
|--------|-----------|-------------|-----|
| **Initial Load** | 1000ms | 1000ms | 1000ms |
| **Deduplication** | ❌ 3 requests | ✅ 1 request | ✅ 1 request |
| **Window Focus** | ❌ Manual | ✅ Auto | ✅ Auto |
| **Cache Hit** | ❌ None | ✅ 100% | ✅ 100% |
| **Auto Retry** | ❌ Manual | ✅ 3 attempts | ✅ Exponential |
| **Optimistic Updates** | ❌ Manual | ✅ Built-in | ⚠️ Limited |

## 🎓 Learning Outcomes

After exploring this project, you'll understand:

1. ✅ How manual data fetching works and its complexity
2. ✅ Why libraries like React Query are beneficial
3. ✅ Advantages and trade-offs of different approaches
4. ✅ Caching strategies and their impact
5. ✅ Request deduplication and why it matters
6. ✅ Optimistic updates and error rollback
7. ✅ Dependent query handling
8. ✅ API mocking with MSW
9. ✅ Docker containerization
10. ✅ Production-ready patterns

## 🔗 Useful Links

### Documentation
- [React Documentation](https://react.dev)
- [React Query Docs](https://tanstack.com/query/latest)
- [SWR Documentation](https://swr.vercel.app/)
- [Vite Guide](https://vitejs.dev/guide/)
- [MSW Documentation](https://mswjs.io/)

### Similar Projects
- [React Query Example](https://github.com/tannerlinsley/react-query/tree/main/examples)
- [SWR Examples](https://github.com/vercel/swr/tree/main/examples)

## 💡 Tips for Exploration

1. **Start with useEffect** - Understand the baseline
2. **Compare Network Requests** - Open DevTools Network tab
3. **Try Rapid Actions** - Create/delete multiple posts quickly
4. **Switch Tabs** - Watch window focus refetch in action
5. **Check Console** - Look for any errors or warnings
6. **Read Migration Guide** - Understand the progression
7. **Study Flow Diagrams** - Visualize data movement
8. **Experiment** - Try different scenarios

## 🚀 Advanced Features

### Enable React Query DevTools

**Step 1:** Install devtools
```bash
npm install @tanstack/react-query-devtools
```

**Step 2:** Add to App.jsx
```jsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* ... */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

**Step 3:** Click DevTools icon (lower right) in app

### Customize MSW Latency

**File:** `src/mocks/handlers.js`

```javascript
const API_LATENCY = 1000 // Change from 500ms to 1000ms
```

### Adjust React Query Caching

**File:** `src/implementations/react-query/ReactQueryDashboard.jsx`

```javascript
const { data: user } = useQuery({
  queryKey: ['user'],
  queryFn: fetcher,
  staleTime: 1000 * 60 * 5,  // Adjust as needed
  gcTime: 1000 * 60 * 10     // Adjust as needed
})
```

## 📝 License

MIT License - Feel free to use this project for learning and commercial purposes.

## 👤 Author

**Bhavya Satya Sri**
- GitHub: [@bhavyasatyasri200](https://github.com/bhavyasatyasri200)

## ✨ Acknowledgments

- React Query team for an amazing library
- Vercel for SWR
- Mock Service Worker for excellent API mocking
- The React community for best practices

## 📞 Support

If you encounter issues:

1. Check the Troubleshooting section
2. Review the Flow Diagrams for understanding
3. Check browser Console for errors
4. Check Docker logs: `docker-compose logs app`
5. Open an issue on GitHub with:
   - What you tried
   - What happened
   - Error messages
   - System info (OS, Node version, Docker version)

---

**Last Updated:** May 2026
**Version:** 1.0.0
