import { useQuery } from "@tanstack/react-query";
import { getApi } from "../services/crud";
type props = {
    path: string,
    limitProductOnPage?: number,
    id?: number,
    mustHaveID?: boolean
    active?: boolean
    category?: number
}
const useHookQuery = ({ path, limitProductOnPage, id, mustHaveID, active, category }: props) => {
    const { data, ...rest } = useQuery({
        queryKey: [path, limitProductOnPage, id, active],
        queryFn: async () => {
            let fullpath = `${path}`
            if (id! > 0) {
                fullpath += `/${id}`
            }
            else if (mustHaveID && id == undefined) {
                return null
            }
            else {
                fullpath += `?_sort=id&_order=desc`
                if (limitProductOnPage! > 0) {
                    fullpath += `&_limit=${limitProductOnPage}`
                }
                if (category! > 0) {
                    fullpath += `&category=${category}`
                }
            }
            if (active != undefined) {
                fullpath += `${id! > 0 ? '?' : '&'}active=${active}`
            }
            return await getApi(fullpath)
        }
    });
    return { data, ...rest };
};

export const useCartQuery = (id?: number | undefined) => {
    const { data, ...rest } = useQuery({
        queryKey: ['cart', id],
        queryFn: async () => {
            if (id! > 0) {
                return await getApi(`cart?user=${id}`)
            }
            return null
        }
    });
    return { data, ...rest };
}
export default useHookQuery;