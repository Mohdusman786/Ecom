import { ADD_PRODUCT_RED, DELETE_PRODUCT_RED, GET_PRODUCT_RED, UPDATE_PRODUCT_QUANTITY_RED, UPDATE_PRODUCT_RED } from "../Constants"
export default function ProductReducers(state = [], action) {
    let newState, index
    switch (action.type) {
        case ADD_PRODUCT_RED:
            newState = [...state]
            newState.unshift(action.payload)
            return newState

        case GET_PRODUCT_RED:
            return action.payload

        case UPDATE_PRODUCT_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            if (index !== -1) {
                state[index].name = action.payload.name
                state[index].maincategory = action.payload.maincategory
                state[index].subcategory = action.payload.subcategory
                state[index].brand = action.payload.brand
                state[index].color = action.payload.color
                state[index].size = action.payload.size
                state[index].description = action.payload.description
                state[index].stock = action.payload.stock
                state[index].quantity = action.payload.quantity
                state[index].baseprice = action.payload.baseprice
                state[index].discount = action.payload.discount
                state[index].finalprice = action.payload.finalprice
                state[index].pic = action.payload.pic
            }
            return state

        case UPDATE_PRODUCT_QUANTITY_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            if (index !== -1) {
                state[index].quantity = action.payload.quantity
            }
            return state

        case DELETE_PRODUCT_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            newState = [...state]
            newState.splice(index, 1)
            return newState
        default:
            return state
    }
}