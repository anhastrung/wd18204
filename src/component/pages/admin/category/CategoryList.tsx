import { ICategory } from "../../../../interfaces/ICategory";
import { Link } from "react-router-dom";
import useHookQuery from "../../../hooks/useHookQuery";
import useHookMutation from "../../../hooks/useCategoryMutation";

const CategoryList = () => {
  const { data, isLoading } = useHookQuery({ path: 'category' });
  const { mutate, isPending } = useHookMutation('category', 'DELETE');
  if (isLoading) return <div>Loading...</div>
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Category List</h1>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded">
            <Link to="/admin/category/add">
              Add Category
            </Link>
          </button>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              ID
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
          {data && data.map((item: ICategory, index: number) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap"><img src={item.image} alt={item.name} className="h-20" /></td>
              <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
              <td>
                <button className="text-red-500 hover:text-red-700 mr-2" onClick={() => mutate(item)}>
                  {isPending ? "Loading..." : "Delete"}
                </button>
                <button className="text-yellow-500 hover:text-yellow-700">
                  <Link to={`/admin/category/${item.id}/edit`}>Edit</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
};

export default CategoryList;