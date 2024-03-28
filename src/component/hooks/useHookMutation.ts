import { IUser } from './../../interfaces/IUser';
import { ICategory } from './../../interfaces/ICategory';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { postApi, patchApi, deleteApi } from "../services/crud"
import { IProduct } from "../../interfaces/IProduct"
type IForm = {
    title: string;
    price: number;
    discountPercentage: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
    thumbnail: string;
    images: string[];
    description: string;
    image: string;
    createdAt: string;
    name: string;
    email: string;
    password: string;
    role: number;
    active: boolean | true;
}
const useHookMutation = (path: string, action: "CREATE" | "UPDATE" | "DELETE", notReload?: boolean) => {
    const queryClient = useQueryClient()
    const form = useForm<IForm>()
    const navigate = useNavigate()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data: IUser | IProduct | ICategory) => {
            if (action === "CREATE") {
                return await postApi(path, data)
            } else if (action === "UPDATE") {
                return await patchApi(`${path}/${data.id}`, data)
            } else if (action === "DELETE") {
                if (confirm(`Are you sure to delete this ${path}?`)) {
                    return await deleteApi(`${path}/${data.id}`)
                }
            }
            return null
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [path],
            })
            if (!notReload) {
                navigate(`/admin/${path}`)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const onSubmit = (data: ICategory | IProduct | IUser) => {
        mutate(data)
    }
    return { mutate, form, onSubmit, ...rest }
}

export default useHookMutation