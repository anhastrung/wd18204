import { useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import useHookQuery from "../hooks/useHookQuery";
import { Link, useLocation } from "react-router-dom";

const ListProductPage = ({ limit }: { limit: number }) => {
    const location = useLocation().pathname.split("/")[1]
    const [page, setPage] = useState(new URLSearchParams(window.location.search).get('page') || 1)
    const { data, isLoading } = useHookQuery({ path: 'products', page: +page, limit: limit })
    if (isLoading) return <div>Loading...</div>
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
                                <span className={`text-xl text-[##3A3A3A] font-semibold`}>{item.price - (item.price * item.discountPercentage / 100)}$</span>
                                <span className={`text-[#B0B0B0] ml-4 line-through ${item.discountPercentage == 0 && "hidden"}`}>{item.price}đ</span>
                            </div>
                        </div>
                        <div className="product-actions">
                            <button className="bg-white text-black"><Link to={`detail`}>Quick View</Link></button>
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
            <div className={`btn-directional flex justify-center mb-12 mt-12 ${location == "shop" ? "" : "hidden"}`}>
                <Link to={`/shop?page=${Number(page) - 1}`}>
                    <button onClick={() => setPage(Number(page) - 1)} className={`rounded py-4 px-6 items-center mx-2 bg-[#F9F1E7] ${page == 1 && "hidden"}`}>
                        Back
                    </button>
                </Link>
                <button className="rounded py-4 px-6 items-center mx-2 bg-[#F9F1E7]">{page}</button>
                <Link to={`/shop?page=${Number(page) + 1}`}>
                    <button onClick={() => setPage(Number(page) + 1)} className={`rounded py-4 px-6 items-center mx-2 bg-[#F9F1E7] ${data.length < limit && "hidden"}`}>
                        Next
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ListProductPage