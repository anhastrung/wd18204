import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ProductContextProvider from './context/ProductContextProvider.tsx'
import { Provider } from 'react-redux'
import store from './store/index.ts'
const root = document.getElementById('root')!
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProductContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductContextProvider>
    </Provider>
  </React.StrictMode>
)
