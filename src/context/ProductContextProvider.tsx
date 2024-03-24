import { createContext, useReducer } from "react"
import { IProduct } from "../interfaces/IProduct"
import { produce } from "immer";
type State = {
    value: IProduct[];
};
// ENUM
type Action =
    | { type: "SET_PRODUCTS"; payload: IProduct[] }
    | { type: "REMOVE_PRODUCT"; payload: number }
    | { type: "ADD_PRODUCT"; payload: IProduct }
    | { type: "UPDATE_PRODUCT"; payload: IProduct };
const initialState = {
    value: [],
    isLoading: true,
    error: "",
} as State;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProductContext = createContext({} as [products: { value: IProduct[] }, dispatch: any])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            state.value = action.payload;
            break;
        case 'ADD_PRODUCT':
            state.value.push(action.payload);
            break;
        case 'REMOVE_PRODUCT':
            state.value = state.value.filter(product => product.id !== action.payload);
            break;
        case 'UPDATE_PRODUCT':
            state.value = state.value.map(product => product.id === action.payload.id ? action.payload : product);
            break;
        default:
            return state
    }
}
const ProductContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, dispatch] = useReducer(produce(reducer), initialState)
    return (
        <ProductContext.Provider value={[products, dispatch]}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider