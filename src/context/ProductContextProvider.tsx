import { createContext, useEffect, useState } from "react"
import { IProduct } from "../interfaces/IProduct"
import axios from "axios"
export const ProductContext = createContext({} as any)
const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {

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
        <ProductContext.Provider value={{ products, setProducts, onHandleAdd, onHandleEdit, onHandleRemove }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider