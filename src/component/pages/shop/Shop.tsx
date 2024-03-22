import BannerPage from '../layout/Banner'
import FooterPage from '../layout/Footer'
import HeaderPage from '../layout/Header'
import ListProductPage from '../layout/ListProduct'
import ServicePage from '../layout/Service'
import './style.css'
const ShopPage = () => {
    return (
        <div className="font-['Poppins']">
            <HeaderPage />
            <BannerPage />
            <div className="container pt-12">
                <ListProductPage />
                <ListProductPage />
                <ListProductPage />
                <ListProductPage />
                <ListProductPage />
                <div className="btn-directional">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>Next</button>
                </div>

            </div>
            <ServicePage />
            <FooterPage />
        </div>
    )
}

export default ShopPage