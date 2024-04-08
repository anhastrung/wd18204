import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../../common/contexts/UserContextProvider"
import { useUserMutation } from "../../../common/hooks/useHookMutation"
import useHookQuery from "../../../common/hooks/useHookQuery"
import { IUser } from "../../../common/interfaces/IUser"


const UserEdit = () => {
    const { id } = useParams()
    const { data } = useHookQuery({ path: 'users', id: Number(id) })
    const { data: listUser, isLoading } = useHookQuery({ path: 'users' })
    const { form, onSubmit, isPending } = useUserMutation('UPDATE', '/admin/users', 'User updated successfully!')
    const { user } = useContext(UserContext)
    useEffect(() => {
        if (data) {
            form.reset(data)
        }
    }, [data, form, id])
    if (user.role <= data?.role) {
        return <div>Permission denied</div>
    }
    if (isLoading) return <div>Loading...</div>
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
                        {...form.register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid email address',
                            },
                            validate: async (value) => {
                                const isExist = listUser?.find((item: IUser) => item.email === value)
                                if (isExist && isExist.email !== data.email) {
                                    return 'Email already exist'
                                }
                            }
                        })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.email ? 'border-red-500' : ''}`}
                    />
                    {form.formState.errors.email && <p className="text-red-500 text-xs italic">{form.formState.errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input
                        type="text"
                        id="password"
                        {...form.register("password", { required: "Password is required", pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Minimum eight characters, at least one letter and one number' } })}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${form.formState.errors.password ? 'border-red-500' : ''}`}
                    />
                    {form.formState.errors.password && <p className="text-red-500 text-xs italic">{form.formState.errors.password.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
                        Image
                    </label>
                    <input
                        id="image"
                        {...form.register("image")}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    />
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
                <div className="mb-4">
                    <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        {...form.register("bio")}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    />
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