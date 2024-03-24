import { legacy_createStore as createStore } from 'redux'

const initState = {
    count: 0,
}
const reducer = (state = initState, action: any) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                count: state.count + 1
            }
        case "DECREMENT":
            return {
                count: state.count - 1
            }
        default:
            return state
    }
}
const store = createStore(reducer)
export default store