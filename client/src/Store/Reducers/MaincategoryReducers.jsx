import { ADD_MAINCATEGORY_RED, DELETE_MAINCATEGORY_RED, GET_MAINCATEGORY_RED, UPDATE_MAINCATEGORY_RED } from "../Constants"
export default function MaincategoryReducers(state=[], action) {
    let newState, index
    switch (action.type) {
        case ADD_MAINCATEGORY_RED:
            newState = [...state]
            newState.unshift(action.payload)
            return newState

        case GET_MAINCATEGORY_RED:
            return action.payload

        case UPDATE_MAINCATEGORY_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            state[index].name = action.payload.name
            return state

        case DELETE_MAINCATEGORY_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            newState = [...state]
            newState.splice(index, 1)
            return newState
        default:
            return state
    }
}