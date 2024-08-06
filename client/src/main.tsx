import React  from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AppContextProvider } from './context/AppContext.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AdminContextProvider } from './context/AdminContext.tsx'
import { LoadingProvider} from './context/LoadingContext.tsx'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
  },
},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingProvider>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <AdminContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AdminContextProvider>
        </AppContextProvider>,
    </QueryClientProvider>
    </LoadingProvider>
  </React.StrictMode>
)
