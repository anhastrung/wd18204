import { BannerPage, ServicePage } from "./Layout"
import ListProductPage from "./ListProduct"

const ShopPage = () => {
    return (
        <div className="font-['Poppins']">
            <BannerPage />
            <div className="container pt-12">
                <ListProductPage limit={12} />
            </div>
            <ServicePage />
        </div>
    )
}

export default ShopPage