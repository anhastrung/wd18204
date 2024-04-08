import { Link } from "react-router-dom"
import { UserContext } from "../common/contexts/UserContextProvider"
import { useContext } from "react"

const Header = () => {
    const { user, } = useContext(UserContext)
    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <Link to="/" className="header__logo">
                        <img src="/src/assets/logo.svg" alt="" />
                    </Link>
                    <div className="button-mobile"><button>=</button></div>
                    <nav className="main-menu">
                        <ul className="main-menu__list">
                            <li className="main-menu__item"><Link to="/" className="main-menu__link">Home</Link></li>
                            <li className="main-menu__item"><Link to="/shop" className="main-menu__link">Shop</Link></li>
                            <li className="main-menu__item"><Link to="/about" className="main-menu__link">About</Link></li>
                            <li className="main-menu__item"><Link to="/contact" className="main-menu__link">Contact</Link></li>
                        </ul>
                    </nav>
                    {user && user.active ?
                        (<div className="header-items">
                            <div className="header-item-user mt-2">
                                <Link to={'profile'}><span><img src='/src/assets/mdi_account-alert-outline.png' /></span></Link>
                            </div>
                            <div className="header-item-user mt-2">
                                <button><span><img src="/src/assets/akar-icons_search.png" /></span></button>
                            </div>
                            <div className="header-item-user mt-2">
                                <Link to="/fav"><span><img src="/src/assets/akar-icons_heart.png" /></span></Link>
                            </div>
                            <div className="header-item-user mt-2">
                                <Link to="/cart"><span><img src="/src/assets/ant-design_shopping-cart-outlined.png" /></span></Link>
                            </div>
                        </div>)
                        :
                        (<div className="header-items">
                            <div className="header-item-user mt-2">
                                <button><span><img src="/src/assets/akar-icons_search.png" /></span></button>
                            </div>
                            <Link to='/login'><button type="button" className="header-item-user focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Login</button></Link>
                        </div>
                        )}
                </div>
            </div>
        </header>
    )
}

export default Header