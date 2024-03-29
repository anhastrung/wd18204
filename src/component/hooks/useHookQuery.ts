import { useQuery } from "@tanstack/react-query";
import { getApi } from "../services/crud";
type props = {
    path: string,
    limitProductOnPage?: number,
    id?: number,
    mustHaveID?: boolean
}
const useHookQuery = ({ path, limitProductOnPage, id, mustHaveID }: props) => {
    const { data, ...rest } = useQuery({
        queryKey: [path, limitProductOnPage, id],
        queryFn: async () => {
            if (limitProductOnPage! > 0) {
                return await getApi(`${path}?_sort=id&_order=desc&_limit=${limitProductOnPage}`)
            }
            if (id) {
                return await getApi(`${path}/${id}`)
            }
            if (mustHaveID && !id) {
                return null
            }
            return await getApi(`${path}?_sort=id&_order=desc`)
        }
    });
    return { data, ...rest };
};
export default useHookQuery;