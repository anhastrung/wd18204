import { Route, Routes } from 'react-router-dom'
import HomePage from './component/pages/Home'
import DetailPage from './component/pages/DetailPage'
import ShopPage from './component/pages/Shop'
import CartPage from './component/pages/Cart'
import Layout from './component/pages/Layout'
import LayoutAdmin from './component/admin/LayoutAdmin'
import ProductList from './component/admin/product/ProductList'
import CheckOut from './component/pages/CheckOut'
import ProductAdd from './component/admin/product/ProductAdd'
import ProductEdit from './component/admin/product/ProductEdit'
import CategoryEdit from './component/admin/category/CategoryEdit'
import CategoryAdd from './component/admin/category/CategoryAdd'
import CategoryList from './component/admin/category/CategoryList'
import UserList from './component/admin/user/UserList'
import UserAdd from './component/admin/user/UserAdd'
import UserEdit from './component/admin/user/UserEdit'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='' element={<HomePage />} />
          <Route path='shop' element={<ShopPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='detail/:id' element={<DetailPage />} />
          <Route path='checkout' element={<CheckOut />} />
        </Route>
        <Route path='admin' element={<LayoutAdmin />} >
          <Route path='products'>
            <Route path='' element={<ProductList />} />
            <Route path='add' element={<ProductAdd />} />
            <Route path=':id/edit' element={<ProductEdit />} />
          </Route>
          <Route path='category'>
            <Route path='' element={<CategoryList />} />
            <Route path='add' element={<CategoryAdd />} />
            <Route path=':id/edit' element={<CategoryEdit />} />
          </Route>
          <Route path='user'>
            <Route path='' element={<UserList />} />
            <Route path='add' element={<UserAdd />} />
            <Route path=':id/edit' element={<UserEdit />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
