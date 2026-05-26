import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UseEffectDashboard } from './implementations/useEffect/UseEffectDashboard'
import { ReactQueryDashboard } from './implementations/react-query/ReactQueryDashboard'
import { SWRDashboard } from './implementations/swr/SWRDashboard'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true
    }
  }
})

function App() {
  const [implementation, setImplementation] = useState('useEffect')

  return (
    <div>
      <nav className="nav">
        <div className="nav-container">
          <h1>Comparative Analysis of Frontend Data Fetching</h1>
          <div className="nav-buttons">
            <button
              onClick={() => setImplementation('useEffect')}
              className={implementation === 'useEffect' ? 'active' : ''}
              style={{
                padding: '10px 20px',
                backgroundColor: implementation === 'useEffect' ? '#0066cc' : '#f0f0f0',
                color: implementation === 'useEffect' ? 'white' : '#333',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              useEffect
            </button>
            <button
              onClick={() => setImplementation('reactQuery')}
              className={implementation === 'reactQuery' ? 'active' : ''}
              style={{
                padding: '10px 20px',
                backgroundColor: implementation === 'reactQuery' ? '#0066cc' : '#f0f0f0',
                color: implementation === 'reactQuery' ? 'white' : '#333',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              React Query
            </button>
            <button
              onClick={() => setImplementation('swr')}
              className={implementation === 'swr' ? 'active' : ''}
              style={{
                padding: '10px 20px',
                backgroundColor: implementation === 'swr' ? '#0066cc' : '#f0f0f0',
                color: implementation === 'swr' ? 'white' : '#333',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              SWR
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        {implementation === 'useEffect' && <UseEffectDashboard />}
        {implementation === 'reactQuery' && (
          <QueryClientProvider client={queryClient}>
            <ReactQueryDashboard />
          </QueryClientProvider>
        )}
        {implementation === 'swr' && <SWRDashboard />}
      </div>
    </div>
  )
}

export default App
