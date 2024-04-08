import { useState, useEffect } from "react"
import { useUserMutation } from "../../../common/hooks/useHookMutation"
import useHookQuery from "../../../common/hooks/useHookQuery"
import { IUser } from "../../../common/interfaces/IUser"
import { uploadFileCloudinary } from "../../../common/lib/utils"
import { warningMessage } from "../../../common/hooks/useMessage"

const PublicProfile = ({ user }: { user: IUser }) => {
    const { form, isPending, mutate } = useUserMutation('UPDATE', 'none', 'Update profile successfully!')
    const { data: listUser, isLoading } = useHookQuery({ path: 'users' })
    const [img, setImg] = useState<string>('')
    const [file, setFile] = useState<string>('')
    useEffect(() => {
        form.reset(user)
        setImg(user.image!)
    }, [user, form])
    useEffect(() => {
        form.setValue('image', file)
    }, [file, form])
    const onSubmit = async (data: IUser) => {
        if (file == 'uploading') {
            warningMessage('Please wait for image uploading')
        }
        else {
            mutate(data)
        }
    }
    if (isLoading) return <div>Loading...</div>
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-2 md:p-4 flex justify-center mr-56">
            <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
                <div className="grid max-w-2xl mx-auto mt-8">
                    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                        <img className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 object-top"
                            src={img || "https://st5.depositphotos.com/3720851/65091/i/450/depositphotos_650917858-stock-photo-hacker-wearing-black-hoodie-blue.jpg"} />
                        <div className="flex flex-col space-y-5 sm:ml-8">
                            <button type="button"
                                onClick={() => document.getElementById('file')?.click()}
                                className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                                Change picture
                            </button>
                            <input type="file" name="" id="file" accept="image/jpg, image/jpeg, image/png" onChange={async ({ target }) => {
                                if (target.files) {
                                    const file = target.files[0]
                                    setImg(URL.createObjectURL(file))
                                    setFile('uploading')
                                    const urls = await Promise.all(
                                        Array.from(target.files).map(
                                            uploadFileCloudinary,
                                        )
                                    )
                                    setFile(urls[0])
                                }
                            }}
                                className="hidden" />
                            <button type="button"
                                onClick={() => { setImg(''); form.setValue('image', '') }}
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
                                        const isExist = listUser?.find((item: IUser) => item.email === value)
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