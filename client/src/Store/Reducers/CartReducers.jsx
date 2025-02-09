import { ADD_CART_RED, DELETE_CART_RED, GET_CART_RED, UPDATE_CART_RED } from "../Constants"
export default function CartReducers(state=[], action) {
    let newState, index
    switch (action.type) {
        case ADD_CART_RED:
            newState = [...state]
            newState.unshift(action.payload)
            return newState

        case GET_CART_RED:
            return action.payload

        case UPDATE_CART_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            state[index].qty = action.payload.qty
            state[index].total = action.payload.total
            return state

        case DELETE_CART_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            newState = [...state]
            newState.splice(index, 1)
            return newState
        default:
            return state
    }
}