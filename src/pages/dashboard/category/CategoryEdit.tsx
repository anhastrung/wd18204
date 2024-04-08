import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useCategoryMutation } from "../../../common/hooks/useHookMutation"
import useHookQuery from "../../../common/hooks/useHookQuery"


const CategoryEdit = () => {
    const { id } = useParams()
    const { data } = useHookQuery({ path: 'category', id: Number(id) })
    const { form, onSubmit, isPending } = useCategoryMutation('UPDATE', '/admin/category', 'Edit Category Success!')
    useEffect(() => {
        if (data) {
            form.reset(data)
        }
    }, [data, form, id])
    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...form.register("name", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.name ? 'border-red-500' : ''}`}
                    />
                    {form.formState.errors.name && <p className="text-red-500 text-xs italic">Category name is required</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                        Category Image
                    </label>
                    <input
                        type="text"
                        id="image"
                        {...form.register("image")}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Category Description
                    </label>
                    <textarea
                        id="description"
                        {...form.register("description")}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isPending ? "Loading..." : "Edit Category"}
                    </button>
                </div>
            </form>
        </div >
    )
}

export default CategoryEdit