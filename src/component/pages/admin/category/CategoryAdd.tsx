import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ICategory } from "../../../../interfaces/ICategory"
import { postApi } from "../../../config/axios"

const CategoryAdd = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICategory>()
    const { mutate, isPending } = useMutation({
        mutationFn: async (category: ICategory) => await postApi("categories", category),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["CATEGORY_LIST"],
            })
            navigate("/admin/category")
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const onSubmit = (data: ICategory) => {
        mutate(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">Category name is required</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                        Category Image
                    </label>
                    <input
                        type="text"
                        id="image"
                        {...register("image", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.image ? 'border-red-500' : ''}`}
                    />
                    {errors.image && <p className="text-red-500 text-xs italic">Category image is required</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Category Description
                    </label>
                    <textarea
                        id="description"
                        {...register("description", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.description ? 'border-red-500' : ''}`}
                    />
                    {errors.description && <p className="text-red-500 text-xs italic">Category description is required</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isPending ? "Loading..." : "Add Category"}
                    </button>
                </div>
            </form>
        </div >
    )
}

export default CategoryAdd