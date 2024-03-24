import axios from "axios"
import { Dispatch } from "redux"

export const setProduct = () => async (dispatch: Dispatch) => {
    const res = await axios.get("http://localhost:3000/products")
    const data = await res.json()
    dispatch({
        type: "SET_PRODUCT",
        payload: data
    })
}