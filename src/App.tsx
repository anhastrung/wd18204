import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './component/Home'
import ProductList from './component/ProductList'
import ProductAdd from './component/ProductAdd'
import ProductEdit from './component/ProductEdit'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/add" element={<ProductAdd />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />
      </Routes>
    </>
  )
}

export default App
