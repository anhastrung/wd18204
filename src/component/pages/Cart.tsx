import { BannerPage, ServicePage } from "./Layout"
const CartPage = () => {
    return (
        <div className="font-['Poppins']">
            <BannerPage />
            <div className="container md:flex md:justify-between gap-8 py-12">
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
                        <tr>
                            <td className='text-black py-4'><img src="/src/assets/Asgaard sofa 5.png" alt="" /></td>
                            <td className='text-black py-4'>Asgaard sofa</td>
                            <td className='text-black py-4'>25.000.000đ</td>
                            <td className='text-black py-4'>1</td>
                            <td className='text-black py-4'>25.000.000đ</td>
                            <td className='text-black py-4'><img src="/src/assets/ant-design_delete-filled.png" alt="" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className='w-2/5'>
                    <div className='bg-[#F9F1E7] px-16 py-4 w-full'>
                        <h2 className='text-center text-[32px] font-semibold mb-12'>Cart Totals</h2>
                        <div className='flex justify-between mb-6'>
                            <h3 className='font-medium'>Subtotal</h3>
                            <span className='text-[#9F9F9F]'>25.000.000đ</span>
                        </div>
                        <div className='flex justify-between mb-8'>
                            <h3 className='font-medium'>Total</h3>
                            <span className='text-xl text-[#B88E2F]'>25.000.000đ</span>
                        </div>
                        <a className='flex justify-center mb-16' href="/checkout"><button className='text-xl py-3 px-12 border-black border-[1px] rounded-2xl block self-center'>Check Out</button></a>
                    </div>
                </div>
            </div>
            <ServicePage />
        </div>
    )
}

export default CartPage