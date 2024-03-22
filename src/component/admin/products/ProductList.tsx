import { Link } from "react-router-dom"
import { useContext, useEffect } from "react"
import axios from "axios"
import { ProductContext } from "../../../context/ProductContextProvider"
import { IProduct } from "../../../interfaces/IProduct"

const ProductList = () => {
    const [products, dispatch] = useContext(ProductContext)
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/products')
                dispatch({ type: 'SET_PRODUCTS', payload: data })
                console.log(dispatch.type);

            } catch (error) {
                console.error(error)
            }
        })()
    }, [dispatch])
    const onHandleRemove = async (id: number) => {
        try {
            if (confirm("Are you sure?")) {
                await axios.delete(`http://localhost:3000/products/${id}`)
                dispatch({ type: 'REMOVE_PRODUCT', payload: id })
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="container">
            <Link to={`/products/add`}><button className="bg-blue-400 hover:bg-green-500 py-1 px-2 text-white rounded mb-2">Add New Product!</button></Link>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="p-4 border-gray-300 border">ID</th>
                        <th className="p-4 border-gray-300 border">Title</th>
                        <th className="p-4 border-gray-300 border">Desc</th>
                        <th className="p-4 border-gray-300 border">Image</th>
                        <th className="p-4 border-gray-300 border">Date</th>
                        <th className="p-4 border-gray-300 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.value && products.value.map((item: IProduct, index: number) => (
                        <tr key={index}>
                            <td className="p-4 border-gray-300 border">{item.id}</td>
                            <td className="p-4 border-gray-300 border w-48">{item.title}</td>
                            <td className="p-4 border-gray-300 border">{item.description}</td>
                            <td className="p-4 border-gray-300 border"><img src={item.image} alt={item.title} className="w-40 h-auto" /></td>
                            <td className="p-4 border-gray-300 border w-40">{item.date}</td>
                            <td className="p-4 border-gray-300 border w-48">
                                <button className="bg-red-500 hover:bg-green-500 py-1 px-2 text-white rounded mx-1" onClick={() => onHandleRemove(item.id!)}>Remove</button>
                                <Link to={`/products/edit/${item.id}`}><button className="bg-yellow-400 hover:bg-green-500 py-1 px-2 text-white rounded mx-1">Edit</button></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ProductList