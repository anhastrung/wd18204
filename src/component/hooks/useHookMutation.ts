/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { postApi, patchApi, deleteApi } from "../services/crud"
type IForm = {
    id: number;
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
    active: true;
}

const useHookMutation = (path: string, action: "CREATE" | "UPDATE" | "DELETE", navigatePage: string) => {
    const queryClient = useQueryClient()
    const form = useForm<IForm>()
    const navigate = useNavigate()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data: IForm) => {
            if (action === "CREATE") {
                return await postApi(path, data)
            } else if (action === "UPDATE") {
                return await patchApi(`${path}/${data.id}`, data)
            } else if (action === "DELETE") {
                if (confirm(`Are you sure to delete this ${path}?`)) {
                    return await deleteApi(`${path}/${data.id}`)
                }
            } else if (action === "Login") {
                return await postApi(path, data)
            }
            return null
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [path],
            })
            if (navigatePage != 'none') {
                navigate(navigatePage)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const onSubmit = (data: IForm) => {
        mutate(data)
    }
    return { mutate, form, onSubmit, ...rest }
}

export default useHookMutation