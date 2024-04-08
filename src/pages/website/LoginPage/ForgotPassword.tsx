import { useState, useContext, useEffect, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../common/contexts/UserContextProvider"
import { useUserMutation } from "../../../common/hooks/useHookMutation"
import useHookQuery from "../../../common/hooks/useHookQuery"
import { errorMessage } from "../../../common/hooks/useMessage"
import { IUser } from "../../../common/interfaces/IUser"


const ForgotPassword = () => {
    const [isCPassword, setIsCPassword] = useState(false) // State variable to track whether the user is in the "confirm password" mode
    const { data, isLoading } = useHookQuery({ path: 'users', active: true }) // Fetches user data using a custom hook
    const { mutate, isPending } = useUserMutation('UPDATE', 'none', 'Reset password successfully!') // Uses a custom mutation hook for updating user data
    const [user, setUser] = useState({} as IUser) // State variable to store user data
    const [acceptTemp, setAcceptTemp] = useState(false) // State variable to track whether the user has accepted the terms and conditions
    const navigate = useNavigate() // Function for navigating to different routes
    const { user: checkIsUser } = useContext(UserContext) // Retrieves the user context
    useEffect(() => {
        if (checkIsUser && checkIsUser.active) {
            navigate('/')
        }
    }), [user] // Navigates to the home page if the user is already logged in and active
    const [forgotPassword, setForgotPassword] = useState({
        email: '',
        password: '',
        cpassword: '',
    }) // State variable to store the form data for the forgot password functionality
    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForgotPassword({
            ...forgotPassword,
            [name]: value
        })
    } // Event handler for input changes in the form
    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isCPassword) {
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(forgotPassword.password)) {
                errorMessage('Password must contain at least 8 characters, one letter and one number!')
                document.getElementById('password')?.focus()
                return false
            }
            if (forgotPassword.password != forgotPassword.cpassword) {
                errorMessage('Password not match!')
                document.getElementById('cpassword')?.focus()
                return false
            }
            if (!acceptTemp) {
                errorMessage('Please accept the terms and conditions!')
                return false
            }
            mutate({ ...user, password: forgotPassword.password }) // Updates the user's password using the mutation hook
            navigate('/login') // Navigates to the login page after successful password reset
        } else {
            const checkUser = data?.find((item: IUser) => item.email === forgotPassword.email)
            if (!checkUser) {
                errorMessage('Email not found!')
                document.getElementById('email')?.focus()
                return false
            }
            setUser(checkUser) // Sets the user data based on the email entered
            setIsCPassword(true) // Switches to the "confirm password" mode
        }
    }
    if (isLoading) return <div>Loading...</div>
    return (
        <section className="bg-gray-50">
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