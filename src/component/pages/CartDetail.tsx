import { useState } from "react";
import { ICart } from "../../interfaces/ICart";
import { IProduct } from "../../interfaces/IProduct";
import { useCartMutation } from "../hooks/useHookMutation";
type props = {
    data: ICart[]
    refetch: () => void
    listProduct: IProduct[]
    setCheckout: (value: boolean) => void
}

const CartDetail = ({ data, refetch, listProduct, setCheckout }: props) => {
    let total: number = 0
    const [confirm, setConfirm] = useState<number>(0)
    const { mutate } = useCartMutation('DELETE', 'Delete cart successfully')
    return (
        <div className="container md:flex md:justify-between gap-8 py-12" >
            <table className='table-fixed w-full'>
                <thead>
                    <tr className='bg-[#F9F1E7]'>
                        <td className='font-medium text-black py-4'></td>
                        <td className='font-medium text-black py-4'>Product</td>
                        <td className='font-medium text-black py-4'>Price</td>
                        <td className='font-medium text-black py-4'>Quantity</td>
                        <td className='font-medium text-black py-4'>Subtotal</td>
                        <td className='font-medium text-black py-4'></td>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ?
                        data.map((item: ICart) => {
                            const product = listProduct.find((product: IProduct) => product.id === item.product);
                            return (
                                product && <tr key={item.id}>
                                    <td className='text-black py-4'><img className='w-16 h-16 object-cover' src={product.thumbnail} alt={product.title} /></td>
                                    <td className='text-black py-4'>{product.title}</td>
                                    <td className='text-black py-4'>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(product.price - product.price * product.discountPercentage / 100)}</td>
                                    <td className='text-black py-4'>{item.quantity}</td>
                                    <td className='text-black py-4'>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format((product.price - product.price * product.discountPercentage / 100) * item.quantity)}</td>
                                    <td className='text-black py-4'>
                                        <button onClick={() => {
                                            if (confirm == product.id) {
                                                mutate(item)
                                                refetch()
                                                refetch()
                                                setConfirm(0)
                                            } else {
                                                setConfirm(product.id!)
                                            }
                                        }}>
                                            {confirm == product.id ? "Confirm" : <img src="/src/assets/ant-design_delete-filled.png" alt="" />}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                        : <tr><td colSpan={6} className='text-center'>No product in cart</td></tr>}
                </tbody>
            </table>
            {data.length > 0 &&
                <div className='w-2/5'>
                    <div className='bg-[#F9F1E7] px-16 py-4 w-full'>
                        <h2 className='text-center text-[32px] font-semibold mb-12'>Cart Totals</h2>
                        {data.map((item: ICart) => {
                            const product = listProduct.find((product: IProduct) => product.id === item.product)
                            product && (total += (product.price - product.price * product.discountPercentage / 100) * item.quantity)
                            return (
                                product && <div key={item.id} className='flex justify-between mb-6'>
                                    <h3 className='font-medium'><div className="text-gray-500 inline-block">{product.title}</div> x {item.quantity}</h3>
                                    <div className="text-right">
                                        <span className='text-[#9F9F9F] block'>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format((product.price - product.price * product.discountPercentage / 100) * item.quantity)}đ</span>
                                    </div>
                                </div>
                            )
                        })}
                        <div className='flex justify-between mb-8'>
                            <h3 className='font-medium'>Total</h3>
                            <span className='text-xl text-[#B88E2F]'>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(total)}đ</span>
                        </div>
                        <div className='flex justify-center mb-16'><button onClick={() => setCheckout(true)} className='text-xl py-3 px-12 border-black border-[1px] rounded-2xl block self-center'>Check Out</button></div>
                    </div>
                </div>
            }
        </div>
    )
}

export default CartDetail