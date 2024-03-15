import { useContext } from "react"
import { CountContext } from "../context/CountContextProvider"

const Count = () => {
    const { count, setCount } = useContext(CountContext)

    return (
        <div onClick={() => setCount(count + 1)}>Count: {count}</div>
    )
}

export default Count