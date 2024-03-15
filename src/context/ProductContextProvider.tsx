import { createContext, useReducer } from "react"
import { IProduct } from "../interfaces/IProduct"
const initState = {
    value: [] as IProduct[],
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProductContext = createContext({} as { products: { value: IProduct[] }, dispatch: any})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: { value: IProduct[] }, action: any) => {
    switch (action.type) {
        case 'SET_PRODUCT':
            return {
                ...state,
                value: action.payload
            }
        case 'ADD_PRODUCT':
            return {
                ...state,
                value: [...state.value, action.payload]
            }
        case 'REMOVE_PRODUCT':
            return {
                ...state,
                value: state.value.filter(product => product.id !== action.payload)
            }
        case 'UPDATE_PRODUCT':
        return {
            ...state,
            value: state.value.map(product => product.id === action.payload.id ? action.payload : product)
        }
        default:
            return state
    }
}
const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, dispatch] = useReducer(reducer, initState)
    return (
        <ProductContext.Provider value={{ products, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider