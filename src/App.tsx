import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './component/NotFound';
import DashBoard from './pages/dashboard/DashBoard';
import LayoutAdmin from './pages/dashboard/LayoutAdmin';
import AttributeAdd from './pages/dashboard/attribute/AttributeAdd';
import AttributeFix from './pages/dashboard/attribute/AttributeFix';
import AttributeList from './pages/dashboard/attribute/AttributeList';
import BillList from './pages/dashboard/bill/BillList';
import CategoryAdd from './pages/dashboard/category/CategoryAdd';
import CategoryEdit from './pages/dashboard/category/CategoryEdit';
import CategoryList from './pages/dashboard/category/CategoryList';
import ProductAdd from './pages/dashboard/product/ProductAdd';
import ProductEdit from './pages/dashboard/product/ProductEdit';
import ProductList from './pages/dashboard/product/ProductList';
import UserAdd from './pages/dashboard/user/UserAdd';
import UserEdit from './pages/dashboard/user/UserEdit';
import UserList from './pages/dashboard/user/UserList';
import DetailPage from './pages/website/DetailPage';
import HomePage from './pages/website/Home';
import Layout from './pages/website/Layout';
import LoginPage from './pages/website/LoginPage/LoginPage';
import ShopPage from './pages/website/Shop';
import CartLayout from './pages/website/Cart/CartLayout';
import ForgotPassword from './pages/website/LoginPage/ForgotPassword';
import ProfileLayout from './pages/website/Profile/ProfileLayout';

function App() {
  return (
    <>
      <ToastContainer limit={3} newestOnTop={true} />
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='' element={<HomePage />} />
          <Route path='shop' element={<ShopPage />} />
          <Route path='cart' element={<CartLayout />} />
          <Route path='detail/:id' element={<DetailPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='profile' element={<ProfileLayout />} />
        </Route>
        <Route path='admin' element={<LayoutAdmin />} >
          <Route path='' element={<DashBoard />} />
          <Route path='attribute'>
            <Route path='' element={<AttributeList />} />
            <Route path='add' element={<AttributeAdd />} />
            <Route path=':id/edit' element={<AttributeFix />} />
          </Route>
          <Route path='products'>
            <Route path='' element={<ProductList />} />
            <Route path=':trash' element={<ProductList />} />
            <Route path='add' element={<ProductAdd />} />
            <Route path=':id/edit' element={<ProductEdit />} />
          </Route>
          <Route path='category'>
            <Route path='' element={<CategoryList />} />
            <Route path=':trash' element={<CategoryList />} />
            <Route path='add' element={<CategoryAdd />} />
            <Route path=':id/edit' element={<CategoryEdit />} />
          </Route>
          <Route path='users'>
            <Route path='' element={<UserList />} />
            <Route path='add' element={<UserAdd />} />
            <Route path=':id/edit' element={<UserEdit />} />
          </Route>
          <Route path='bill'>
            <Route path='' element={<BillList />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes >
    </>
  )
}

export default App
