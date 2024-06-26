import { useContext, useEffect } from "react"
import { UserContext } from "../../../common/contexts/UserContextProvider"
import { useBillMutation } from "../../../common/hooks/useHookMutation"
import { ICart } from "../../../common/interfaces/ICart"
import { ICheckOut } from "../../../common/interfaces/ICheckOut"



type props = {
    data: ICart[]
    total: number
    setStatus: (status: 'cart' | 'checkout' | 'thanks') => void
}

const CheckOut = ({ data, total, setStatus }: props) => {
    const { user } = useContext(UserContext)
    const { form, mutate } = useBillMutation("CREATE", "none", "Check out successfully!")
    useEffect(() => {
        form.setValue("user", user.id)
        form.setValue("name", user.name)
        form.setValue("email", user.email)
        form.setValue("total", total)
        form.setValue("listProduct", data.map((item: ICart) => {
            return {
                id: item.product.id,
                title: item.product.title,
                price: item.product.price,
                quantity: item.quantity
            }
        }))
        form.setValue("status", 1)
    }, [user, data, total, form])
    const onSubmit = (formdata: ICheckOut) => {
        mutate(formdata)
        setStatus('thanks')
    }
    return (
        <section className="container">
            <form onSubmit={form.handleSubmit(onSubmit)} className="Billing_Details">
                <div className="section-heading">
                    <h2 className="section-heading__title">Billing details</h2>
                    <div>
                        <div>
                            <label className="label_name">Full name</label>
                            <input
                                {...form.register("name", { required: true })}
                                type="text" className="input_company_name py-2 px-4" />
                            {form.formState.errors.name && <span className="text-red-500 ml-4">This field is required</span>}
                        </div>
                        <div>
                            <label className="label_name">Company Name (Optional)</label>
                            <input
                                {...form.register("companyName")}
                                type="text" className="input_company_name py-2 px-4" />
                        </div>
                        <div>
                            <label className="label_name">Country / Region</label>
                            <select
                                {...form.register("country", { required: true })}
                                id="country" name="country" className="select_country py-2 px-4">
                                <option value="">Choose Country</option>
                                <option value={'vietnam'}>Viet Nam</option>
                                <option value={'vietnam'}>Viet Nam</option>
                            </select>
                            {form.formState.errors.country && <span className="text-red-500 ml-4">This field is required</span>}
                        </div>
                        <div>
                            <label className="label_name">Street address</label>
                            <input
                                {...form.register("streetAddress", { required: true })}
                                type="text" className="input_address py-2 px-4" />
                            {form.formState.errors.streetAddress && <span className="text-red-500 ml-4">This field is required</span>}
                        </div>
                        <div>
                            <label className="label_name">Town / City</label>
                            <input
                                {...form.register("townCity", { required: true })}
                                type="text" className="input_city py-2 px-4" />
                            {form.formState.errors.townCity && <span className="text-red-500 ml-4">This field is required</span>}
                        </div>
                        <div>
                            <label className="label_name">Province</label>
                            <select
                                {...form.register("province", { required: true })}
                                name="province" className="input_province py-2 px-4">
                                <option value="">Choose Province</option>
                                <option value="vietnam">Viet Nam</option>
                                <option value="vietnam2">Viet Nam</option>
                            </select>
                            {form.formState.errors.province && <span className="text-red-500 ml-4">This field is required</span>}
                        </div>
                        <div>
                            <label className="label_name">ZIP code</label>
                            <input
                                {...form.register("zipCode", { required: true })}
                                type="text" className="input_code py-2 px-4" />
                            {form.formState.errors.zipCode && <span className="text-red-500 ml-4">This field is required</span>}
                        </div>
                        <div>
                            <label className="label_phone">Phone</label>
                            <input
                                {...form.register("phone", { required: true })}
                                type="text" className="input_phone py-2 px-4" />
                            {form.formState.errors.phone && <span className="text-red-500 ml-4">This field is required</span>}
                        </div>
                        <div>
                            <label className="label_name">Email address</label>
                            <input
                                {...form.register("email", { required: true })}
                                type="text" className="input_email py-2 px-4" />
                            {form.formState.errors.email && <span className="text-red-500 ml-4">This field is required</span>}
                        </div>
                        <div>
                            <input
                                {...form.register("additionalInformation")}
                                type="text" placeholder="Additional information" className="input_infor py-2 px-4" />
                        </div>
                    </div>
                </div>
                <div className="Billing-Submit">
                    <div className="Billing-Submit-infor">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="product_title"><h3>Product</h3></th>
                                    <th className="subtotal_title"><h3>Subtotal</h3></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 && data.map((item: ICart) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className="product_title_detail">
                                                <p className="product_title_detail_sofa">
                                                    {item.product.title}
                                                    <span className="quantity"> x {item.quantity}</span>
                                                </p>
                                            </td>
                                            <td className="subtotal_title_detail">
                                                <p>{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(item.product.price * item.quantity)}đ</p>
                                            </td>
                                        </tr>
                                    )
                                })}
                                <tr>
                                    <td className="product_title_detail text-2xl font-bold">Total</td>
                                    <td className="subtotal_title_detail">
                                        <p className="subtotal_title_detail_total">{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(total)}đ</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr />
                    <div className="select-item1 items-center">
                        *<span
                            className="service-item1-radio-first py-2"
                        >Direct Bank Transfer</span>
                    </div>
                    <div className="select-item1-box">
                        <span className="select-item1-text">
                            Make your payment directly into our bank account. Please use your
                            Order ID as the payment reference. Your order will not be shipped
                            until the funds have cleared in our account.
                        </span>
                    </div>
                    <div className="select-item1">
                        <input type="radio" name="Direct Bank Transfer" /><span
                            className="Direct_Bank_Transfer py-2 px-4"
                        >Direct Bank Transfer</span>
                    </div>
                    <div className="select-item1">
                        <input type="radio" name="Direct Bank Transfer" /><span
                            className="Direct_Bank_Transfer py-2 px-4"
                        >Cash On Delivery</span>
                    </div>
                    <div className="select-item1-box2">
                        <p>
                            Your personal data will be used to support your experience
                            throughout this website, to manage access to your account, and for
                            other purposes described in our <strong>privacy policy.</strong>
                        </p>
                    </div>
                    <div className="flex_button">
                        <button className="button rounded-xl border-[1px] border-black hover:shadow-red-500 hover:shadow-lg hover:bg-black hover:text-white"><p>Place order</p></button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default CheckOut