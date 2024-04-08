import { Link, useParams } from "react-router-dom";
import useHookQuery from "../../../hooks/useHookQuery";
import { IProduct } from "../../../../interfaces/IProduct";
import PageButton from "../../PageButton";
import { useEffect, useState } from "react";
import { useProductMutation } from "../../../hooks/useHookMutation";
import { ICategory } from "../../../../interfaces/ICategory";

const ProductList = () => {
  const trash = useParams().trash
  const { data, isLoading, refetch } = useHookQuery({ path: 'products', active: trash ? false : true })
  const { mutate, isPending } = useProductMutation('DELETE', 'none', trash ? 'Healing Product Success!' : 'Delete Product Success!')
  const { data: listCategory, isLoading: isLoadingCate } = useHookQuery({ path: 'category' })
  const [confirm, setConfirm] = useState(0)
  // button change page
  const [page, setPage] = useState<number>(Number(new URLSearchParams(window.location.search).get('page') || 1))
  const limit = 6
  const indexOLastRecord = page * limit
  const indexOFirstRecord = indexOLastRecord - limit
  const currentData = data?.slice(indexOFirstRecord, indexOLastRecord)
  const nPage = Math.ceil(data?.length / limit)
  // end button change page
  useEffect(() => {
    refetch()
  }, [trash, refetch])
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Product List</h1>
        <div>
          <Link to={trash ? location.pathname.split('/trash')[0] : location.pathname + '/trash'}>
            <button className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-1.5 px-3 rounded mx-4">
              {trash ? "Trash Can't" : "Trash Can"}
            </button>
          </Link>
          <Link to={`${location.pathname}/add`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded">
              Add Product
            </button>
          </Link>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              #
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Title
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Image
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Price
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Discount
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Category
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Action
            </td>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData?.map((item: IProduct, index: number) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
              <td className="px-6 py-4 whitespace-nowrap"><img src={item.thumbnail} alt={item.title} className="h-20 w-40 object-cover" /></td>
              <td className="px-6 py-4 whitespace-nowrap">{Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(item.price)}đ</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.discountPercentage}</td>
              <td className="px-6 py-4 whitespace-nowrap">{isLoadingCate ? "Loading..." : listCategory.map((cate: ICategory) => { if (cate.id == item.category) return cate.name })}</td>
              <td>
                <button className={`mr-2 ${trash ? "text-green-500 hover:text-green-700" : "text-red-500 hover:text-red-700"}`} onClick={() => {
                  if (confirm == item.id) {
                    mutate(item)
                    setConfirm(0)
                  } else {
                    setConfirm(item.id!)
                  }
                }
                }>
                  {isPending ? "Loading..." : confirm == item.id ? "Confirm" : trash ? "Revive" : "Delete"}
                </button>
                {!trash && <button className="text-yellow-500 hover:text-yellow-700">
                  <Link to={`${location.pathname}/${item.id}/edit`}>Edit</Link>
                </button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {nPage > 1 && <PageButton nPage={nPage} page={page} setPage={setPage} />}
    </div >
  );
};

export default ProductList;