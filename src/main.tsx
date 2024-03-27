import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '/public/3.4.1'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
)
