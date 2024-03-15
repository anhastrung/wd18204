import { createContext, useReducer } from "react"
export const CountContext = createContext({} as any)
const const initialState = {}

export const reducer = (state: { count: number }, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { cout: state.count + 1 }
        case "DECREESEMENT":
            return { cout: state.count - 1 }
        case "INCRESE":
            return { cout: state.count + action.payload }
        default:
            return state
    }
}

const CountContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [count, dispatch] = useReducer(reducer, { count: 0 })
    return (
        <div>
            <CountContext.Provider value={{ count, dispatch }}>
                {children}
            </CountContext.Provider>
        </div>
    )
}