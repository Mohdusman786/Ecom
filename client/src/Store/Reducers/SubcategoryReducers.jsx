import { ADD_SUBCATEGORY_RED, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY_RED } from "../Constants"
export default function SubcategoryReducers(state=[], action) {
    let newState, index
    switch (action.type) {
        case ADD_SUBCATEGORY_RED:
            newState = [...state]
            newState.unshift(action.payload)
            return newState

        case GET_SUBCATEGORY_RED:
            return action.payload

        case UPDATE_SUBCATEGORY_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            state[index].name = action.payload.name
            return state

        case DELETE_SUBCATEGORY_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            newState = [...state]
            newState.splice(index, 1)
            return newState
        default:
            return state
    }
}