import { useQuery } from "@tanstack/react-query";
import { getApi } from "../config/axios";
import { IProduct } from "../../interfaces/IProduct";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ListProductPage = (props: { limit: number, btn: boolean }) => {
    const [page, setPage] = useState(1);
    const pages = new URLSearchParams(location.search).get("page") || 1
    useEffect(() => {
        setPage(Number(pages))
    }, [pages])
    const limitPages = 4;
    const { data, isLoading, isError, } = useQuery({
        queryKey: ["PRODUCT_LIST"],
        queryFn: async () => (await getApi(`products?_sort=id&_order=desc&_page=${pages}&_per_page=${limitPages}${props.limit == 0 ? "" : `&_limit=${props.limit}`}`)),
    });
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    return (
        <div>
            <div className="product-list mb-8">
                {data.map((item: IProduct, index: number) => (
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
                            <button className="btn product-action__quickview bg-white text-black"><a href="/detail">Quick View</a></button>
                            <button className="btn product-action__addtocart bg-white text-black">Add To Cart</button>
                            <div className="product-actions-more">
                                <span className="product-action__share">Share</span>
                                <span className="product-action__compare mx-3">Compare</span>
                                <span className="product-action__like">Like</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`btn-directional flex justify-center mb-12 mt-10 ${!props.btn && "hidden"}`}>
                {Array.from({ length: Math.ceil(data.length / limitPages) }, (_, index) => (
                    <Link to={`/shop?page=${index + 1}`} key={index}>
                        <button key={index} className={`bg-[#F9F1E7] rounded py-4 px-6 items-center mx-2 ${index === Number(page) - 1 && "bg-[#B88E2F] text-white"}`}>
                            {index + 1}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ListProductPage