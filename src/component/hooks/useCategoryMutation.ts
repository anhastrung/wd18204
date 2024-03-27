import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ICategory } from "../../interfaces/ICategory"
import { postApi, patchApi, deleteApi } from "../services/crud"

const useHookMutation = (path: string, action: "CREATE" | "UPDATE" | "DELETE") => {
    const queryClient = useQueryClient()
    const form = useForm<ICategory>()
    const navigate = useNavigate()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (category: ICategory) => {
            if (action === "CREATE") {
                return await postApi(path, category)
            } else if (action === "UPDATE") {
                return await patchApi(`${path}/${category.id}`, category)
            } else if (action === "DELETE") {
                if (confirm('Are you sure to delete this category?')) {
                    return await deleteApi(`${path}/${category.id}`)
                }
            }
            return null
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [path],
            })
            navigate(`/admin/${path}`)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const onSubmit = (data: ICategory) => {
        mutate(data)
    }
    return { mutate, form, onSubmit, ...rest }
}

export default useHookMutation