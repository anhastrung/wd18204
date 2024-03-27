import { useQuery } from "@tanstack/react-query";
import { getApi } from "../services/crud";

const useHookQuery = ({ path, page, limit, id }: { path: string, page?: number, limit?: number, id?: number }) => {
    const { data, ...rest } = useQuery({
        queryKey: [path, page, limit, id],
        queryFn: async () => {
            if (page && limit! > 0) {
                return await getApi(`${path}?_sort=id&_order=desc&_start=${(page - 1) * limit!}&_limit=${limit}`)
            }
            if (limit! > 0) {
                return await getApi(`${path}?_sort=id&_order=desc&_limit=${limit}`)
            }
            if (id) {
                return await getApi(`${path}/${id}?_sort=id&_order=desc`)
            }
            return await getApi(`${path}?_sort=id&_order=desc`)
        }
    });
    return { data, ...rest };
};
export default useHookQuery;
