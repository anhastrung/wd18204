import { useContext, useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../common/contexts/UserContextProvider"
import { useCartMutation } from "../../../common/hooks/useHookMutation"
import useHookQuery from "../../../common/hooks/useHookQuery"
import { ICart } from "../../../common/interfaces/ICart"
import BannerPage from "../../../component/Banner"
import ServicePage from "../../../component/ServicePage"
import CartDetail from "./CartDetail"
import CheckOut from "./CheckOut"
import ThanksForBuying from "./ThanksForBuying"

const CartLayout = () => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const [status, setStatus] = useState('cart' as 'cart' | 'checkout' | 'thanks')
    const { mutate } = useCartMutation('DELETE')
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    const { data, isLoading, refetch } = useHookQuery({ path: 'cart', user: user ? user.id : 0 })
    const [total, setTotal] = useState<number>(0)
    useEffect(() => {
        if (data) {
            let total = 0
            data.forEach((item: ICart) => {
                total += item.product.price * item.quantity
            })
            setTotal(total)
        }
    }, [data])
    useEffect(() => {
        if (status === 'thanks') {
            data && data.length > 0 &&
                data.forEach((item: ICart) => {
                    mutate(item)
                })
        }
    }, [status, mutate, data])

    return (
        <div>
            <BannerPage />
            {isLoading ? <div>Loading...</div>
                : status === 'cart' ? <CartDetail data={data} refetch={refetch} total={total} setStatus={setStatus} />
                    : status === 'checkout' ? <CheckOut data={data} total={total} setStatus={setStatus} />
                        : status === 'thanks' ? <ThanksForBuying />
                            : null}
            <ServicePage />
        </div>
    )
}

export default CartLayout