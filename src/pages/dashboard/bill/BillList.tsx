import { useState } from "react";
import { useBillMutation } from "../../../common/hooks/useHookMutation";
import useHookQuery from "../../../common/hooks/useHookQuery";
import { ICheckOut } from "../../../common/interfaces/ICheckOut";
import PageButton from "../../../component/PageButton";


const BillList = () => {
    const { data, isLoading, refetch } = useHookQuery({ path: 'bill' });
    // button change page
    const [page, setPage] = useState<number>(Number(new URLSearchParams(window.location.search).get('page') || 1))
    const limit = 6
    const indexOLastRecord = page * limit
    const indexOFirstRecord = indexOLastRecord - limit
    const currentData = data?.slice(indexOFirstRecord, indexOLastRecord)
    const nPage = Math.ceil(data?.length / limit)
    // end button change page
    const { mutate } = useBillMutation("UPDATE", 'none', 'Update success');
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
                                {item.status == 4 ?
                                    <p className="text-green-400">Đã giao hàng</p>
                                    : item.status == 0 ?
                                        <p className="text-red-500">Đơn hàng bị hủy</p>
                                        : <select
                                            onChange={(e) => {
                                                mutate({ ...item, status: Number(e.target.value) })
                                                refetch()
                                                refetch()
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                            {item.status == 1 && <option>Chờ xác nhận đơn hàng</option>}
                                            {item.status == 1 && <option value='2'>Xác nhận đơn hàng</option>}
                                            {item.status == 2 && <option>Xác nhận đơn hàng</option>}
                                            {item.status == 2 && <option value='3'>Xác nhận đang giao hàng</option>}
                                            {item.status == 3 && <option>Xác nhận đang giao hàng</option>}
                                            {item.status == 3 && <option value='4'>Xác nhận đã giao hàng</option>}
                                            {[1, 2].includes(item.status) && <option value='0' className="text-red-500">Hủy đơn hàng</option>}
                                        </select>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
            {nPage > 1 && <PageButton nPage={nPage} page={page} setPage={setPage} />}
        </div>
    );
};

export default BillList;