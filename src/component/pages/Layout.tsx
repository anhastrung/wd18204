import { Outlet } from "react-router-dom"
import "./style.css"
const Layout = () => {
    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="header-inner">
                        <a href="" className="header__logo">
                            <img src="/src/assets/logo.svg" alt="" />
                        </a>
                        <div className="button-mobile"><button>=</button></div>
                        <nav className="main-menu">
                            <ul className="main-menu__list">
                                <li className="main-menu__item"><a href="/" className="main-menu__link">Home</a></li>
                                <li className="main-menu__item"><a href="/shop" className="main-menu__link">Shop</a></li>
                                <li className="main-menu__item"><a href="/about" className="main-menu__link">About</a></li>
                                <li className="main-menu__item"><a href="/contact" className="main-menu__link">Contact</a></li>
                            </ul>
                        </nav>
                        <div className="header-items">
                            <div className="header-item-user">
                                <a href="/login"><span><img src="/src/assets/mdi_account-alert-outline.png" /></span></a>
                            </div>
                            <div className="header-item-user">
                                <span><img src="/src/assets/akar-icons_search.png" /></span>
                            </div>
                            <div className="header-item-user">
                                <span><img src="/src/assets/akar-icons_heart.png" /></span>
                            </div>
                            <div className="header-item-user">
                                <a href="/cart"><span><img src="/src/assets/ant-design_shopping-cart-outlined.png" /></span></a>
                            </div>
                        </div>
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

export const BannerPage = () => {
    return (
        <section className="banner">
            <img src="https://picsum.photos/id/10/1440/500" alt="" className="banner__img" />
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