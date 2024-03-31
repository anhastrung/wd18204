import { useQuery } from "@tanstack/react-query";
import { getApi } from "../services/crud";
type props = {
    path: string,
    limitProductOnPage?: number,
    id?: number,
    mustHaveID?: boolean
    active?: boolean
}
const useHookQuery = ({ path, limitProductOnPage, id, mustHaveID, active }: props) => {
    const { data, ...rest } = useQuery({
        queryKey: [path, limitProductOnPage, id],
        queryFn: async () => {
            if (limitProductOnPage! > 0) {
                return await getApi(`${path}?_sort=id&_order=desc&_limit=${limitProductOnPage}${active ? `?active=${active}` : ''}`)
            }
            if (id) {
                return await getApi(`${path}/${id}${active ? `?active=${active}` : ''}`)
            }
            if (mustHaveID && !id) {
                return null
            }
            return await getApi(`${path}?_sort=id&_order=desc${active ? `?active=${active}` : ''}`)
        }
    });
    return { data, ...rest };
};

export const useCartQuery = (id: number) => {
    const { data, ...rest } = useQuery({
        queryKey: ['cart', id],
        queryFn: async () => {
            return await getApi(`cart?user=${id}`)
        }
    });
    return { data, ...rest };
}
export default useHookQuery;