import { useEffect, useState } from 'react'
import { useUserMutation } from '../hooks/useHookMutation'
import useHookQuery from '../hooks/useHookQuery'
import { IUser } from '../../interfaces/IUser'

const PublicProfile = ({ user }: { user: IUser }) => {
    const { form, isPending, mutate } = useUserMutation('UPDATE', 'none', 'Update profile successfully!') // Using the useUserMutation hook to get the form, isPending, and mutate functions
    const { data, isLoading } = useHookQuery({ path: 'users' }) // Using the useHookQuery hook to fetch data from the 'users' path
    const [img, setImg] = useState<string>('') // Creating a state variable 'img' and a function 'setImg' to update its value, initializing it with an empty string
    const [file, setFile] = useState<File>() // Creating a state variable 'file' and a function 'setFile' to update its value, initializing it as undefined
    useEffect(() => {
        form.reset(user) // Resetting the form with the user object whenever the form or user object changes
    }, [form, user])
    useEffect(() => {
        if (user?.image) {
            setImg(user?.image) // Setting the 'img' state variable to the value of the user's image if it exists
        }
    }, [user])
    const onSubmit = async (data: IUser) => {
        // if (file) {
            // const formData = new FormData()
            // formData.append('file', file)
            // const { data } = await fetch('/src/component/services/upload.php', {
                // method: 'POST',
                // body: formData
            // }).then(res => res.json())
            // form.setValue('image', data)
        // }
        console.log(file);
        mutate(data) // Calling the mutate function with the 'data' object
    }
    if(isLoading) return <div>Loading...</div> // Displaying 'Loading...' while the data is being fetched
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-2 md:p-4">
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
        </form>
    )
}

export default PublicProfile