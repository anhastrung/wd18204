import { useContext, useEffect, useState } from "react"
import { BannerPage, ServicePage } from "./Layout"
import { UserContext } from "../contexts/UserContextProvider"
import useHookQuery, { useCartQuery } from "../hooks/useHookQuery"
import { useNavigate } from "react-router-dom"
import CheckOut from "./CheckOut"
import CartDetail from "./CartDetail"
const CartPage = () => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const [checkout, setCheckout] = useState(false)
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])
    const { data, isLoading, refetch } = useCartQuery(user?.id)
    const { data: listProduct, isLoading: isLoadingProduct } = useHookQuery({ path: 'products' })
    return (
        <div>
            <BannerPage />
            {isLoading || isLoadingProduct ? <div>Loading...</div> : checkout ? <CheckOut
                data={data}
                listProduct={listProduct}
            /> :
                <CartDetail
                    data={data}
                    refetch={refetch}
                    listProduct={listProduct}
                    setCheckout={setCheckout}
                />
            }
            <ServicePage />
        </div>
    )
}

export default CartPage