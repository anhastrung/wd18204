import { ICategory } from "../../../../interfaces/ICategory";
import { Link } from "react-router-dom";
import useHookQuery from "../../../hooks/useHookQuery";
import useHookMutation from "../../../hooks/useHookMutation";
import { useState } from "react";
import PageButton from "../../PageButton";

const CategoryList = () => {
  const { data, isLoading } = useHookQuery({ path: 'category' });
  const { mutate, isPending } = useHookMutation('category', 'DELETE');
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
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Category List</h1>
        <div>
          <Link to={`${location.pathname}/add`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded">
              Add Category
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
              Name
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Image
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Description
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Action
            </td>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData?.map((item: ICategory, index: number) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap"><img src={item.image} alt={item.name} className="h-20 w-40 object-cover" /></td>
              <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
              <td>
                <button className="text-red-500 hover:text-red-700 mr-2" onClick={() => mutate(item)}>
                  {isPending ? "Loading..." : "Delete"}
                </button>
                <button className="text-yellow-500 hover:text-yellow-700">
                  <Link to={`${location.pathname}/${item.id}/edit`}>Edit</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {<PageButton nPage={nPage} page={page} setPage={setPage} />}
    </div >
  );
};

export default CategoryList;