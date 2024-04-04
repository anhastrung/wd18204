import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContextProvider"
import { useUserMutation } from "../hooks/useHookMutation"
import { Toaster } from "sonner"
import useHookQuery from "../hooks/useHookQuery"
import { IUser } from "../../interfaces/IUser"

const Profile = () => {
    const { user } = useContext(UserContext)
    const { form, isPending, mutate } = useUserMutation('UPDATE', 'none', 'Update profile successfully!')
    const { data, isLoading } = useHookQuery({ path: 'users' })
    const [img, setImg] = useState<string>('')
    const [file, setFile] = useState<File>()
    useEffect(() => {
        form.reset(user)
    }, [form, user])
    useEffect(() => {
        if (user.image) {
            setImg(user.image)
        }
    }, [user])
    const onSubmit = async (data: IUser) => {
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            const { data } = await fetch('/src/component/services/upload.php', {
                method: 'POST',
                body: formData
            }).then(res => res.json())
            form.setValue('image', data)
        }
        mutate(data)
    }
    if (isLoading) return <div>Loading...</div>
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white w-full flex flex-col gap-56 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">

                    <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

                    <a href="#" className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full">
                        Pubic Profile
                    </a>
                    <a href="#"
                        className="flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full">
                        Account Settings
                    </a>
                    <a href="#"
                        className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full  ">
                        Notifications
                    </a>
                </div>
            </aside>
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <Toaster richColors position='top-right' duration={2000} expand={true} />
                <div className="p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

                        <div className="grid max-w-2xl mx-auto mt-8">
                            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">

                                <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 object-top"
                                    src={img || "https://media.karousell.com/media/photos/products/2024/3/4/genshin_impact_keqing_opulent__1709518605_3f2fb0bc_progressive.jpg"} />
                                <div className="flex flex-col space-y-5 sm:ml-8">
                                    <button type="button"
                                        onClick={() => document.getElementById('file')?.click()}
                                        className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                        Change picture
                                    </button>
                                    <input type="file" name="" id="file" accept="image/jpg, image/jpeg, image/png" onChange={({ target }) => {
                                        if (target.files) {
                                            const file = target.files[0]
                                            setImg(URL.createObjectURL(file))
                                            setFile(file)
                                        }
                                    }}
                                        className="hidden" />
                                    <button type="button"
                                        onClick={() => { setImg('') }}
                                        className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                        Delete picture
                                    </button>
                                </div>
                            </div>

                            <div className="items-center mt-8 sm:mt-14 text-[#202142]">

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-indigo-900">Your
                                        name, kimi no nawa</label>
                                    <input type="text" id="name"
                                        {...form.register('name', { required: 'Name is required' })}
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                        placeholder="Your name" />
                                    {form.formState.errors.name && <span className="text-red-500 text-sm">{form.formState.errors.name.message}</span>}
                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-indigo-900">Your
                                        email</label>
                                    <input type="email" id="email"
                                        {...form.register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message: 'Invalid email address',
                                            },
                                            validate: async (value) => {
                                                const isExist = data?.find((item: IUser) => item.email === value)
                                                if (isExist && isExist.email !== user.email) {
                                                    return 'Email already exist'
                                                }
                                            }
                                        })}
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                                        placeholder="your.email@mail.com" />
                                    {form.formState.errors.email && <span className="text-red-500 text-sm">{form.formState.errors.email.message}</span>}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message"
                                        className="block mb-2 text-sm font-medium text-indigo-900">Bio</label>
                                    <textarea id="message" rows={4}
                                        {...form.register('bio')}
                                        className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                                        placeholder="Write your bio here..."></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <button type="submit"
                                        className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">{isPending ? "...Updating" : "Save"}</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </form>
    )
}

export default Profile