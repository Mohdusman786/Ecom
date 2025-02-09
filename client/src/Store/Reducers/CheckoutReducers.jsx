import { ADD_CHECKOUT_RED, DELETE_CHECKOUT_RED, GET_CHECKOUT_RED, UPDATE_CHECKOUT_RED, UPDATE_CHECKOUT_RED_CURRENT } from "../Constants"
export default function CheckoutReducers(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_CHECKOUT_RED:
            newState = [...state]
            newState.unshift(action.payload)
            return newState

        case GET_CHECKOUT_RED:
            return action.payload

        case UPDATE_CHECKOUT_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            state[index].orderStatus = action.payload.orderStatus
            state[index].paymentStatus = action.payload.paymentStatus
            state[index].rppid = action.payload.rppid
            return state

        case UPDATE_CHECKOUT_RED_CURRENT:
            index = state.findIndex((x) => x._id === action.payload._id)
            state[index].paymentMode = action.payload.paymentMode
            state[index].paymentStatus = action.payload.paymentStatus
            return state

        case DELETE_CHECKOUT_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            newState = [...state]
            newState.splice(index, 1)
            return newState
        default:
            return state
    }
}