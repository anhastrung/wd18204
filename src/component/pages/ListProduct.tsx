import { IProduct } from "../../interfaces/IProduct";
import { Link } from "react-router-dom";

const ListProductPage = ({ data }: { data: IProduct[] }) => {
    return (
        <div>
            <div className="product-list mb-8">
                {data && data.map((item: IProduct, index: number) => (
                    <div className="product-item" key={index}>
                        <div className="product-image">
                            <img src={item.thumbnail} alt={item.title} className="product__thumbnail h-[300px] object-cover" />
                            <span className={`product-sale ${item.discountPercentage == 0 && "hidden"} ${item.discountPercentage >= 50 && "bg-green-600"}`}>{item.discountPercentage}%</span>
                        </div>
                        <div className="product-info">
                            <h3 className="product__name">
                                <a href="" className="product__link">{item.title}</a>
                            </h3>
                            <a href="" className="product__category">{item.category}</a>
                            <div className="">
                                <span className={`text-xl text-[##3A3A3A] font-semibold`}>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(item.price - (item.price * item.discountPercentage / 100))}</span>
                                <span className={`text-[#B0B0B0] ml-4 line-through ${item.discountPercentage == 0 && "hidden"}`}>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(item.price)}</span>
                            </div>
                        </div>
                        <div className="product-actions">
                            <button className="bg-white text-black"><Link to={`/detail/${item.id}`}>Quick View</Link></button>
                            <button className="bg-white text-black">Add To Cart</button>
                            <div className="product-actions-more">
                                <span className="product-action__share">Share</span>
                                <span className="product-action__compare mx-3">Compare</span>
                                <span className="product-action__like">Like</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ListProductPage