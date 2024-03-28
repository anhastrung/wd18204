import { Link, useOutletContext } from "react-router-dom";
import useHookQuery from "../../../hooks/useHookQuery";
import PageButton from "../../PageButton";
import { useState } from "react";
import { IUser } from "../../../../interfaces/IUser";
import useHookMutation from "../../../hooks/useHookMutation";

const UserList = () => {
  const { data, isLoading } = useHookQuery({ path: 'users' })
  const { mutate } = useHookMutation('users', 'UPDATE', true);
  const { user }: { user: IUser } = useOutletContext()

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
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">User List</h1>
        <div>
          <Link to={`${location.pathname}/add`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded">
              Add User
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
              Email
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Image
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Role
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Edit
            </td>
            <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">
              Active
            </td>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData?.map((item: IUser, index: number) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
              <td className="px-6 py-4 whitespace-nowrap"><img src={item.image} alt={item.name} className="h-20 w-40 object-cover" /></td>
              <td className="px-6 py-4 whitespace-nowrap">{item.role == 2 ? "China number 1" : item.role == 1 ? "Admin" : "User"}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user?.role <= item.role ? <div className="text-red-500">Not Allowed</div> :
                  <button className="text-yellow-500 hover:text-yellow-700">
                    <Link to={`${location.pathname}/${item.id}/edit`}>Edit</Link>
                  </button>}
              </td>
              <td>
                <label className={`items-center ${user?.role <= item.role ? "cursor-not-allowed" : "cursor-pointer"}`}>
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked={item.active && true} onClick={() => mutate({ ...item, active: !item.active })} disabled={user?.role <= item.role && true} />
                  <div className="relative ml-6 w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {<PageButton nPage={nPage} page={page} setPage={setPage} />}
    </div >
  );
};

export default UserList;