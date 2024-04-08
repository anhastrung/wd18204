import { useState } from "react";
import useHookQuery from "../../../common/hooks/useHookQuery";
import { ICheckOut } from "../../../common/interfaces/ICheckOut";
import { IUser } from "../../../common/interfaces/IUser";
import PageButton from "../../../component/PageButton";


const Bill = ({ user }: { user: IUser }) => {
    const { data, isLoading } = useHookQuery({ path: 'bill', user: user.id });
    // button change page
    const [page, setPage] = useState<number>(Number(new URLSearchParams(window.location.search).get('page') || 1))
    const limit = 6
    const indexOLastRecord = page * limit
    const indexOFirstRecord = indexOLastRecord - limit
    const currentData = data?.slice(indexOFirstRecord, indexOLastRecord)
    const nPage = Math.ceil(data?.length / limit)
    // end button change page
    if (isLoading) return <div>Loading...</div>
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Bill List</h1>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
                            #
                        </td>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
                            Name
                        </td>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
                            Phone
                        </td>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
                            Total
                        </td>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
                            Street Address
                        </td>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
                            Town City
                        </td>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
                            Province
                        </td>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
                            Additional Information
                        </td>
                        <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
                            Status
                        </td>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentData?.map((item: ICheckOut, index: number) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(item.total)}đ</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.streetAddress}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.townCity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.province}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.additionalInformation}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {item.status == 1 && <span className="text-yellow-400">Chờ xác nhận đơn hàng</span>}
                                {item.status == 2 && <span className="text-yellow-400">Đã xác nhận đơn hàng</span>}
                                {item.status == 3 && <span className="text-yellow-400">Đang giao hàng</span>}
                                {item.status == 4 && <span className="text-green-500">Đã giao hàng</span>}
                                {item.status == 0 && <span className="text-red-400">Đơn hàng bị hủy</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
            {nPage > 1 && <PageButton nPage={nPage} page={page} setPage={setPage} />}
        </div>
    )
}

export default Bill