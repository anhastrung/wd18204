import { useEffect } from "react"
import useHookMutation from "../../../hooks/useHookMutation"
import { useOutletContext, useParams } from "react-router-dom"
import useHookQuery from "../../../hooks/useHookQuery"
import { IUser } from "../../../../interfaces/IUser"

const UserEdit = () => {
    const { id } = useParams()
    const { data } = useHookQuery({ path: 'users', id: Number(id) })
    const { form, onSubmit, isPending } = useHookMutation('users', 'UPDATE')
    const { user }: { user: IUser } = useOutletContext()
    useEffect(() => {
        if (data) {
            form.reset(data)
        }
    }, [data, form, id])
    if (user.role <= data?.role) {
        return <div>Permission denied</div>
    }
    return (
        <div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...form.register("name", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.name ? 'border-red-500' : ''}`}
                    />
                    {form.formState.errors.name && <p className="text-red-500 text-xs italic">Name is required</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...form.register("email", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.email ? 'border-red-500' : ''}`}
                    />
                    {form.formState.errors.email && <p className="text-red-500 text-xs italic">Email is required</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="text"
                        id="password"
                        {...form.register("password", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.password ? 'border-red-500' : ''}`}
                    />
                    {form.formState.errors.password && <p className="text-red-500 text-xs italic">Password is required</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                        Image
                    </label>
                    <input
                        id="image"
                        {...form.register("image", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.image ? 'border-red-500' : ''}`}
                    />
                    {form.formState.errors.image && <p className="text-red-500 text-xs italic">Image is required</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
                        Role
                    </label>
                    <select
                        id="role"
                        {...form.register("role", { required: true })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.role ? 'border-red-500' : ''}`}
                    >
                        <option value="0">User</option>
                        <option value="1" hidden={user.role <= 1 && true}>Admin</option>
                        <option value="2" hidden={user.role <= 2 && true}>Admin but higher</option>
                    </select>
                    {form.formState.errors.role && <p className="text-red-500 text-xs italic">Role is required</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isPending ? "Loading..." : "Add User"}
                    </button>
                </div>
            </form>
        </div >
    )
}

export default UserEdit