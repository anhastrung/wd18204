import { useQuery } from "@tanstack/react-query";
import { getApi } from "../../services/crud";
type props = {
    path: string,
    limitProductOnPage?: number,
    id?: number | string,
    active?: boolean
    category?: number | string
    user?: number | string
}
const useHookQuery = ({ path, limitProductOnPage, id, active, category, user }: props) => {
    const { data, ...rest } = useQuery({
        queryKey: [path, limitProductOnPage, id, active],
        queryFn: async () => {
            let fullpath = `${path}`
            if (id) {
                fullpath += `/${id}`
            }
            else if (id == 0) {
                return null
            }
            else {
                fullpath += `?_sort=id&_order=desc`
                if (limitProductOnPage && limitProductOnPage > 0) {
                    fullpath += `&_limit=${limitProductOnPage}`
                }
                if (category && category != 'none') {
                    fullpath += `&category=${category}`
                }
                if (category == 0) {
                    return null
                }
                if (user) {
                    fullpath += `&user=${user}`
                }
                if (user == 0) {
                    return null
                }
            }
            if (active != undefined) {
                fullpath += `${id ? '?' : '&'}active=${active}`
            }
            return await getApi(fullpath)
        }
    });
    return { data, ...rest };
};

export default useHookQuery;