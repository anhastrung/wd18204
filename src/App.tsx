import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './component/pages/homepage/Home'
import ProductList from './component/admin/products/ProductList'
import ProductAdd from './component/admin/products/ProductAdd'
import ProductEdit from './component/admin/products/ProductEdit'
import DetailPage from './component/pages/detailpage/DetailPage'
import ShopPage from './component/pages/shop/Shop'
import CartPage from './component/pages/cart/Cart'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/add" element={<ProductAdd />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />
      </Routes>
    </>
  )
}

export default App
