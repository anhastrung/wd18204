import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useProductMutation } from "../../../common/hooks/useHookMutation"
import useHookQuery from "../../../common/hooks/useHookQuery"
import { ICategory } from "../../../common/interfaces/ICategory"

const ProductEdit = () => {
  const { id } = useParams()
  const { data } = useHookQuery({ path: 'products', id: Number(id) })
  const { form, onSubmit, isPending } = useProductMutation('UPDATE', '/admin/products', 'Edit Product Success!')
  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data, form, id])
  const { data: category, isLoading } = useHookQuery({ path: 'category' })
  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            {...form.register("title", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.title ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.title && <p className="text-red-500 text-xs italic">Product title is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Product Price
          </label>
          <input
            type="number"
            id="price"
            {...form.register("price", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.price ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.price && <p className="text-red-500 text-xs italic">Product price is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="discountPercentage" className="block text-gray-700 text-sm font-bold mb-2">
            Product Discount Percentage
          </label>
          <select
            id="discountPercentage"
            {...form.register("discountPercentage", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.discountPercentage ? 'border-red-500' : ''}`}
          >
            {[...Array(101).keys()].map((item: number, index: number) => (
              <option key={index} value={item}>{item}%</option>
            ))}
          </select>
          {form.formState.errors.discountPercentage && <p className="text-red-500 text-xs italic">Product discount percentage is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">
            Product Thumbnail
          </label>
          <input
            type="text"
            id="thumbnail"
            {...form.register("thumbnail", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.thumbnail ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.thumbnail && <p className="text-red-500 text-xs italic">Product thumbnail is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
            Product Category
          </label>
          <select
            id="category"
            {...form.register("category", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.category ? 'border-red-500' : ''}`}
          >
            <option value="">--- Select Category ---</option>
            {isLoading ? <option>Loading...</option> : category!.map((item: ICategory, index: number) => (
              <option key={index} value={item.id}>{item.name}</option>
            ))}
          </select>
          {form.formState.errors.category && <p className="text-red-500 text-xs italic">Product category is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Product Description
          </label>
          <textarea
            id="description"
            {...form.register("description", { required: true })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.description ? 'border-red-500' : ''}`}
          />
          {form.formState.errors.description && <p className="text-red-500 text-xs italic">Product description is required</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isPending ? "Loading..." : "Edit Product"}
          </button>
        </div>
      </form>
    </div >
  )
}

export default ProductEdit