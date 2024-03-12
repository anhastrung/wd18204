import { SubmitHandler, useForm } from "react-hook-form"
import "../../public/3.4.1"
import { IProduct } from "../interfaces/IProduct"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
type Props = {
    onEdit: (data: IProduct) => void
}
const ProductEdit = ({ onEdit }: Props) => {
    const { id } = useParams()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IProduct>()
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`http://localhost:3000/products/${id}`);
            reset(data);
        })();
    }, [id, reset]);
    const onSubmit: SubmitHandler<IProduct> = (data) => {
        onEdit(data)
        navigate('/products')
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <h1 className="text-center text-xl font-bold mb-4">Add New Product</h1>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" {...register("title", { required: true })} className="block py-2.5 px-0 w-full text-sm text-gray-900 text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                {errors?.title && <span className="text-red-500 text-sm">Title is required</span>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" {...register("description", { required: true })} className="block py-2.5 px-0 w-full text-sm text-gray-900 text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Desc</label>
                {errors?.title && <span className="text-red-500 text-sm">Desc is required</span>}
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input type="text" {...register("image", { required: true })} className="block py-2.5 px-0 w-full text-sm text-gray-900 text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image</label>
                {errors?.title && <span className="text-red-500 text-sm">Image is required</span>}
            </div>
            <input type="string" {...register("date")} className="hidden" value={new Date().toLocaleDateString('en-us', { year: "numeric", month: "long", day: "numeric" })} />
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    )
}

export default ProductEdit