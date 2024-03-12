import { useEffect, useState } from 'react'
import './App.css'
import { IProduct } from './interfaces/IProduct'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import HomePage from './component/Home'
import ProductList from './component/ProductList'
import ProductAdd from './component/ProductAdd'
import ProductEdit from './component/ProductEdit'

function App() {
  const [products, setProducts] = useState<IProduct[]>([])
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/products')
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
  const onHandleRemove = async (id: number) => {
    try {
      if (confirm("Are you sure?")) {
        // await axios.delete(`http://localhost:3000/products/${id}`)
        const newProducts = products.filter(product => product.id !== id)
        setProducts(newProducts)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const onHandleAdd = async (product: IProduct) => {
    try {
      const { data } = await axios.post('http://localhost:3000/products', product)
      setProducts([...products, data])
    } catch (error) {
      console.error(error)
    }
  }
  const onHandleEdit = async (product: IProduct) => {
    try {
      const { data } = await axios.put(`http://localhost:3000/products/${product.id}`, product)
      const newProducts = products.map(item => (item.id === product.id ? data : item))
      setProducts(newProducts)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage products={products} removeItem={onHandleRemove} />} />
        <Route path="/products" element={<ProductList products={products} removeItem={onHandleRemove} />} />
        <Route path="/products/add" element={<ProductAdd onAdd={onHandleAdd} />} />
        <Route path="/products/edit/:id" element={<ProductEdit onEdit={onHandleEdit} />} />
      </Routes>
    </>
  )
}

export default App
