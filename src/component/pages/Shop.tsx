import { BannerPage, ServicePage } from "./Layout"
import ListProductPage from "./ListProduct"

const ShopPage = () => {
    return (
        <div className="font-['Poppins']">
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
        </div>
    )
}

export default ShopPage