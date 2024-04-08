import { ICategory } from "../common/interfaces/ICategory"

const BannerPage = ({ show, limit, setLimit, listCategory, setCategory, isLoadingCate }: { show?: boolean, limit?: number, setLimit?: React.Dispatch<React.SetStateAction<number>>, listCategory?: ICategory[], setCategory?: React.Dispatch<React.SetStateAction<number>>, isLoadingCate?: boolean }) => {
    return (
        <section className="banner relative">
            <img src="https://picsum.photos/id/10/1440/500" alt="" className="banner__img" />
            {show == true &&
                <div className="absolute w-full bg-[#F9F1E7] bottom-0">
                    <div className="container flex justify-between py-6">
                        <div className="left">
                        </div>
                        <div className="right flex justify-end gap-8">
                            <div className="flex justify-end items-center gap-4">
                                <p className="text-lg ">Show</p>
                                <input className=" p-2.5 w-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" id="limit" value={limit} onChange={() => {
                                    const inputNumber = Number((document.getElementById('limit') as HTMLInputElement).value)
                                    inputNumber <= 1 ? setLimit?.(1) : inputNumber >= 100 ? setLimit?.(100) : setLimit?.(inputNumber)
                                }} />
                            </div>
                            <div className=" flex justify-end items-center gap-4">
                                <p className="text-lg ">Category</p>
                                <select className=" p-2.5" name="" id="category" onChange={() => {
                                    setCategory?.(Number((document.getElementById('category') as HTMLSelectElement).value))

                                }}>
                                    <option value="0">All category</option>
                                    {isLoadingCate ? <option>Loading...</option> : listCategory!.map((item: ICategory, index: number) => (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}

export default BannerPage