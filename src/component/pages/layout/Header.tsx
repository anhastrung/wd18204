const HeaderPage = () => {
    return (
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
    )
}

export default HeaderPage