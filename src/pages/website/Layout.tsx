import { Outlet } from "react-router-dom"
import Footer from "../../component/Footer"
import Header from "../../component/Header"
import "/src/style/style.css"
const Layout = () => {
    return (
        <div className="font-['Poppins']">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout