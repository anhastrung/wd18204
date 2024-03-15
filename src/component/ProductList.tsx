import { Link } from "react-router-dom"
import { IProduct } from "../interfaces/IProduct"
import "../../public/3.4.1"
import { useContext } from "react"
import { ProductContext } from "../context/ProductContextProvider"

const ProductList = () => {
    const {products, onHandleRemove} = useContext(ProductContext)
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
                    {products && products.map((item: IProduct, index: number) => (
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