import { IUser } from "../../interfaces/IUser"
import { useChangePasswordMutation } from "../hooks/useHookMutation"

const ChangePassword = ({ user }: { user: IUser }) => {
    const { form, isPending, mutate } = useChangePasswordMutation('UPDATE', 'none', 'Change password successfully!')
    const onSubmit = (data: {
        oldpassword: string
        password: string
        cpassword: string
        terms: boolean
    }) => {
        mutate({ ...user, password: data.password })
    }
    return (
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
            <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Change password
            </h1>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div>
                    <div className="mb-4">
                        <label htmlFor="oldpassword" className="block mb-2 text-sm font-medium text-gray-900">Old password</label>
                        <input
                            {...form.register('oldpassword', { required: 'old password is required', validate: value => { if (value != user.password) return 'Old password does not match' } })}
                            type="password" name="oldpassword" id="oldpassword" className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg border-gray-300 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`} placeholder="••••••••" />
                        {form.formState.errors.oldpassword && <span className="text-red-500 text-sm">{form.formState.errors.oldpassword.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New password</label>
                        <input
                            {...form.register('password', { required: "Password is required", pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Minimum eight characters, at least one letter and one number' } })}
                            type="password" name="password" id="password" className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg border-gray-300 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`} placeholder="••••••••" />
                        {form.formState.errors.password && <span className="text-red-500 text-sm">{form.formState.errors.password.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                        <input
                            {...form.register('cpassword', { required: true, validate: value => value === form.getValues('password') })}
                            type="password" name="cpassword" id="cpassword" className={`bg-gray-50 border text-gray-900 sm:text-sm rounded-lg border-gray-300 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`} placeholder="••••••••" />
                        {form.formState.errors.cpassword && <span className="text-red-500 text-sm">Password not match</span>}
                    </div>
                </div>
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            {...form.register('terms', { required: true })}
                            id="terms" aria-describedby="terms" type="checkbox" className={`w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300`} />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline" href="https://genshin.hoyoverse.com/en/company/terms" target="_blank">Terms and Conditions</a></label>
                    </div>
                    {form.formState.errors.terms && <span className="text-red-500 text-sm">You must accept the terms and conditions</span>}
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600">{isPending ? "...Pending" : "Change password"}</button>
            </form>
        </div>
    )
}

export default ChangePassword