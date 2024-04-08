import { Link, Outlet } from "react-router-dom"
import "./style.css"
import { ICategory } from "../../interfaces/ICategory"
import { useContext } from "react"
import { UserContext } from "../contexts/UserContextProvider"
const Layout = () => {
    const { user, } = useContext(UserContext)
    return (
        <div className="font-['Poppins']">
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
            <Outlet />
            <footer className="footer">
                <div className="container">
                    <div className="footer-list">
                        <div className="footer-item">
                            <img src="/src/assets/Funiro..png" className="mb-16" alt="" />
                            <p className="footer__address">
                                400 University Drive Suite 200 Coral Gables, FL 33134 USA
                            </p>
                        </div>
                        <div className="footer-nav">
                            <div className="footer-item">
                                <h2 className="footer__title">Links</h2>
                                <ul className="footer-menu-list">
                                    <li className="footer-menu-item">
                                        <a href="/home/index.html" className="footer-menu-link">Home</a>
                                    </li>
                                    <li className="footer-menu-item">
                                        <a href="/shop/index.html" className="footer-menu-link">Shop</a>
                                    </li>
                                    <li className="footer-menu-item">
                                        <a href="" className="footer-menu-link">Blog</a>
                                    </li>
                                    <li className="footer-menu-item">
                                        <a href="" className="footer-menu-link">Contact</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-item">
                                <h2 className="footer__title">Help</h2>
                                <ul className="footer-menu-list">
                                    <li className="footer-menu-item">
                                        <a href="" className="footer-menu-link font-medium">Payment Options</a>
                                    </li>
                                    <li className="footer-menu-item">
                                        <a href="" className="footer-menu-link font-medium">Returns</a>
                                    </li>
                                    <li className="footer-menu-item">
                                        <a href="" className="footer-menu-link font-medium">Privacy Policies</a>
                                    </li>
                                    <li className="footer-menu-item">
                                        <a href="" className="footer-menu-link font-medium">Contact</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-item">
                            <h2 className="footer__title">Newsletter</h2>
                            <form action="" className="newsletter">
                                <input type="text" className="newsletter__input" placeholder="Enter Your Email Address" />
                                <button className="newsletter__btn font-medium">Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <hr className="mb-8" />
                    <p className="copyright font-font-medium">2023 furino. All rights reverved</p>
                </div>
            </footer>
        </div>
    )
}

export const BannerPage = ({ show, limit, setLimit, listCategory, setCategory, isLoadingCate }: { show?: boolean, limit?: number, setLimit?: React.Dispatch<React.SetStateAction<number>>, listCategory?: ICategory[], setCategory?: React.Dispatch<React.SetStateAction<number>>, isLoadingCate?: boolean }) => {
    return (
        <section className="banner relative">
            <img src="https://picsum.photos/id/10/1440/500" alt="" className="banner__img" />
            {show == true &&
                <div className="absolute w-full bg-[#F9F1E7] bottom-0">
                    <div className="container flex justify-between py-6">
                        <div className="left">
                        </div>
                        <div className="right flex justify-end gap-8">
                            <div className="flex justify-end items-center gap-4">
                                <p className="text-lg ">Show</p>
                                <input className=" p-2.5 w-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" id="limit" value={limit} onChange={() => {
                                    const inputNumber = Number((document.getElementById('limit') as HTMLInputElement).value)
                                    inputNumber <= 1 ? setLimit?.(1) : inputNumber >= 100 ? setLimit?.(100) : setLimit?.(inputNumber)
                                }} />
                            </div>
                            <div className=" flex justify-end items-center gap-4">
                                <p className="text-lg ">Category</p>
                                <select className=" p-2.5" name="" id="category" onChange={() => {
                                    setCategory?.(Number((document.getElementById('category') as HTMLSelectElement).value))

                                }}>
                                    <option value="0">All category</option>
                                    {isLoadingCate ? <option>Loading...</option> : listCategory!.map((item: ICategory, index: number) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export const ServicePage = () => {
    return (
        <section className="services">
            <div className="container-fluid">
                <div className="service-list">
                    <div className="service-item">
                        <img src="/src/assets/trophy 1.png" className="service__image" />
                        <div className="service-info">
                            <h4 className="service__name font-bold">High Quality</h4>
                            <p className="service__description">crafted from top materials</p>
                        </div>
                    </div>
                    <div className="service-item">
                        <img src="/src/assets/guarantee.png" className="service__image" />
                        <div className="service-info">
                            <h4 className="service__name font-bold">High Quality</h4>
                            <p className="service__description">crafted from top materials</p>
                        </div>
                    </div>
                    <div className="service-item">
                        <img src="/src/assets/shipping.png" className="service__image" />
                        <div className="service-info">
                            <h4 className="service__name font-bold">High Quality</h4>
                            <p className="service__description">crafted from top materials</p>
                        </div>
                    </div>
                    <div className="service-item">
                        <img src="/src/assets/customer-support.png" className="service__image" />
                        <div className="service-info">
                            <h4 className="service__name font-bold">High Quality</h4>
                            <p className="service__description">crafted from top materials</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Layout