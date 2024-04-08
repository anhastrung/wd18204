import { useContext, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import Bill from "./Bill"
import ChangePassword from "./ChangePassword"
import PublicProfile from "./PublicProfile"
import { UserContext } from "../../../common/contexts/UserContextProvider"


const ProfileLayout = () => {
    const navigate = useNavigate()
    const { user, removeCurrentID } = useContext(UserContext)
    const [confirm, setConfirm] = useState(false)
    const [status, setStatus] = useState('public' as 'public' | 'changepassword' | 'bill')
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
        <div className={`bg-white w-full flex flex-col px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] gap-24`}>
            <aside className="hidden py-4 md:w-1/5 lg:w-1/6 md:block">
                <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
                    <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

                    <button onClick={() => setStatus('public')} className={`flex items-center px-3 py-2.5 ${status == 'public' ? 'font-bold bg-white text-indigo-900 border rounded-full' : 'font-semibold hover:text-indigo-900 hover:border hover:rounded-full'}`}>
                        Pubic Profile
                    </button>
                    <button onClick={() => setStatus('bill')} className={`flex items-center px-3 py-2.5 ${status == 'bill' ? 'font-bold bg-white text-indigo-900 border rounded-full' : 'font-semibold hover:text-indigo-900 hover:border hover:rounded-full'}`}>
                        Bill
                    </button>
                    <button onClick={() => setStatus('changepassword')} className={`flex items-center px-3 py-2.5 ${status == 'changepassword' ? 'font-bold bg-white text-indigo-900 border rounded-full' : 'font-semibold hover:text-indigo-900 hover:border hover:rounded-full'}`}>
                        Change Password
                    </button>
                    {user?.role > 0 && <Link to='/admin' className="flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full">Admin Dashboard</Link>}
                    <button className="flex items-center px-3 py-2.5 font-semibold text-red-500 hover:text-red-600 hover:border hover:rounded-full" onClick={onLogOut}>{confirm ? "Xác Nhận Đăng Xuất" : "Đăng Xuất"}</button>
                </div>
            </aside>
            <main className={`min-h-screen py-1 w-full md:w-4/5 lg:w-5/6`}>
                {status === 'public' && <PublicProfile user={user!} />}
                {status === 'bill' && <Bill user={user!} />}
                {status === 'changepassword' && <ChangePassword user={user!} />}
            </main>
        </div>
    )
}

export default ProfileLayout