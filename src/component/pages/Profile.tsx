import { Link, useNavigate } from "react-router-dom"
import PublicProfile from "./PublicProfile"
import ChangePassword from "./ChangePassword"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../contexts/UserContextProvider"

const Profile = () => {
    const navigate = useNavigate()
    const { user, removeCurrentID } = useContext(UserContext)
    const [confirm, setConfirm] = useState(false)
    const [status, setStatus] = useState('public' as 'public' | 'changepassword')
    const onLogOut = () => {
        if (!confirm) {
            setConfirm(true)
            return
        }
        removeCurrentID()
        navigate('/')
    }
    useEffect(() => {
        if (confirm) {
            setTimeout(() => {
                setConfirm(false)
            }, 3000)
        }
    }, [confirm])
    useEffect(() => {        
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])
    return (
        <div className="bg-white w-full flex flex-col gap-56 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">

                    <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

                    <button onClick={() => setStatus('public')} className={`flex items-center px-3 py-2.5 ${status == 'public' ? 'font-bold bg-white text-indigo-900 border rounded-full' : 'font-semibold hover:text-indigo-900 hover:border hover:rounded-full'}`}>
                        Pubic Profile
                    </button>
                    <button onClick={() => setStatus('changepassword')} className={`flex items-center px-3 py-2.5 ${status == 'changepassword' ? 'font-bold bg-white text-indigo-900 border rounded-full' : 'font-semibold hover:text-indigo-900 hover:border hover:rounded-full'}`}>
                        Change Password
                    </button>
                    {user?.role > 0 && <Link to='/admin' className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">Admin Dashboard</Link>}
                    <button className="flex items-center px-3 py-2.5 font-semibold text-red-500 hover:text-red-600 hover:border hover:rounded-full" onClick={onLogOut}>{confirm ? "Xác Nhận Đăng Xuất" : "Đăng Xuất"}</button>
                </div>
            </aside>
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                {status === 'public' && <PublicProfile user={user!} />}
                {status === 'changepassword' && <ChangePassword user={user!} />}
            </main>
        </div>
    )
}

export default Profile