import { ChangeEvent, useContext, useEffect, useState } from "react"
import useHookQuery from "../hooks/useHookQuery"
import { IUser } from "../../interfaces/IUser"
import { useUserMutation } from "../hooks/useHookMutation"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "sonner"
import { UserContext } from "../contexts/UserContextProvider"

const ForgotPassword = () => {
    const [isCPassword, setIsCPassword] = useState(false)
    const { data, isLoading } = useHookQuery({ path: 'users', active: true })
    const { mutate, isPending } = useUserMutation('UPDATE', 'none', 'Reset password successfully!')
    const [user, setUser] = useState({} as IUser)
    const [acceptTemp, setAcceptTemp] = useState(false)
    const navigate = useNavigate()
    const { user: checkIsUser } = useContext(UserContext)
    useEffect(() => {
        if (checkIsUser && checkIsUser.active) {
            navigate('/')
        }
    }), [user]
    const [forgotPassword, setForgotPassword] = useState({
        email: '',
        password: '',
        cpassword: '',
    })
    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForgotPassword({
            ...forgotPassword,
            [name]: value
        })
    }
    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isCPassword) {
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(forgotPassword.password)) {
                toast.error('Password must contain at least 8 characters, one letter and one number!')
                document.getElementById('password')?.focus()
                return false
            }
            if (forgotPassword.password != forgotPassword.cpassword) {
                toast.error('Password not match!')
                document.getElementById('cpassword')?.focus()
                return false
            }
            if (!acceptTemp) {
                toast.error('Please accept the terms and conditions!')
                return false
            }
            mutate({ ...user, password: forgotPassword.password })
            navigate('/login')
        } else {
            const checkUser = data?.find((item: IUser) => item.email === forgotPassword.email)
            if (!checkUser) {
                toast.error('Email not found!')
                document.getElementById('email')?.focus()
                return false
            }
            setUser(checkUser)
            setIsCPassword(true)
        }
    }
    if (isLoading) return <div>Loading...</div>
    return (
        <section className="bg-gray-50">
            <Toaster richColors position='top-right' duration={2000} expand={true} />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
                    <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        {isCPassword ? 'Reset your password' : 'Forgot your password?'}
                    </h1>
                    {!isCPassword && <p className="font-light text-gray-500">Don't fret! Just type in your email and we will send you a code to reset your password!</p>}
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={onSubmit}>
                        {isCPassword ? (
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New password</label>
                                    <input onChange={onHandleChange} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="••••••••" />
                                </div>
                                <div>
                                    <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                                    <input onChange={onHandleChange} type="password" name="cpassword" id="cpassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="••••••••" />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                <input onChange={onHandleChange} type="" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" />
                            </div>
                        )}
                        {isCPassword &&
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" onClick={() => setAcceptTemp(!acceptTemp)} aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500">I accept the <a className="font-medium text-primary-600 hover:underline" href="https://genshin.hoyoverse.com/en/company/terms" target="_blank">Terms and Conditions</a></label>
                                </div>
                            </div>
                        }
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600">{isPending ? "...Pending" : "Reset password"}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword