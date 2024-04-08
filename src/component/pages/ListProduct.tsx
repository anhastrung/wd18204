import { IProduct } from "../../interfaces/IProduct";
import { Link } from "react-router-dom";
import useHookQuery, { useCartQuery } from "../hooks/useHookQuery";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { ICart } from "../../interfaces/ICart";
import { useCartMutation } from "../hooks/useHookMutation";
import { ICategory } from "../../interfaces/ICategory";
import { errorMessage, warningMessage } from "../hooks/useMessage";

const ListProductPage = ({ data }: { data: IProduct[] }) => {
    // Get the user from the UserContext
    const { user } = useContext(UserContext)

    // Fetch the list of cart items for the user
    const { data: listCart, refetch } = useCartQuery(user && user.id)

    // Fetch the list of categories
    const { data: listCategory, isLoading: isLoadingCate } = useHookQuery({ path: 'category' })

    // Mutation function to add & update a product to the cart
    const { mutate: addToCart, isPending: isAddpPending } = useCartMutation('CREATE', 'Add to cart successfully')
    const { mutate: updateCart, isPending: isUpdatePending } = useCartMutation('UPDATE', 'Update cart successfully')

    // Timer state to prevent rapid clicking
    const [timer, setTimer] = useState(0)

    // Function to handle adding a product to the cart
    const handleAddToCart = (product: IProduct) => {
        if (timer > 0) {
            errorMessage('Too fast, try again later')
        }
        else {
            refetch()
            refetch()
            setTimer(1)
            const cart = listCart.find((item: ICart) => item.product === product.id)
            if (!cart) {
                addToCart({ user: user.id, product: product.id!, quantity: 1 })
            }
            else {
                if (cart.quantity >= 100) {
                    errorMessage('Max quantity is 100')
                }
                else {
                    updateCart({ ...cart, quantity: cart.quantity + 1 })
                }
            }
            setTimeout(() => {
                setTimer(0)
            }, 1000)
        }
    }
    if (isLoadingCate) return <div>Loading...</div>
    return (
        <div>
            <div className="product-list mb-8">
                {data?.length > 0 ? data.map((item: IProduct, index: number) => (
                    <div className="product-item" key={index}>
                        <div className="product-image">
                            <img src={item.thumbnail} alt={item.title} className="product__thumbnail h-[300px] object-cover" />
                            <span className={`product-sale ${item.discountPercentage == 0 && "hidden"} ${item.discountPercentage >= 50 && "bg-green-600"}`}>{item.discountPercentage}%</span>
                        </div>
                        <div className="product-info">
                            <h3 className="product__name">
                                <a href="" className="product__link">{item.title}</a>
                            </h3>
                            <div className="product__category">{listCategory.map((cate: ICategory) => { if (cate.id == item.category) return cate.name })}</div>
                            <div className="">
                                <span className={`text-xl text-[##3A3A3A] font-semibold`}>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(item.price - (item.price * item.discountPercentage / 100))}đ</span>
                                <span className={`text-[#B0B0B0] ml-4 line-through ${item.discountPercentage == 0 && "hidden"}`}>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(item.price)}đ</span>
                            </div>
                        </div>
                        <div className="product-actions">
                            <button className="bg-white text-black">
                                <Link to={`/detail/${item.id}`} className="block">
                                    Quick View
                                </Link>
                            </button>
                            <button onClick={() => user ? handleAddToCart(item) : warningMessage('login first')} className="bg-white text-black">{isAddpPending ? "Adding" : isUpdatePending ? "Updating" : "Add To Cart"}</button>
                            <div className="product-actions-more">
                                <span className="product-action__share">Share</span>
                                <span className="product-action__compare mx-3">Compare</span>
                                <span className="product-action__like">Like</span>
                            </div>
                        </div>
                    </div>
                )) : <div>No product</div>}
            </div>
        </div>
    )
}

export default ListProductPage
