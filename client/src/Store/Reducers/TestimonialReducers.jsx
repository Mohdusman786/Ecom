import { ADD_TESTIMONIAL_RED, DELETE_TESTIMONIAL_RED, GET_TESTIMONIAL_RED, UPDATE_TESTIMONIAL_RED } from "../Constants"
export default function TestimonialReducers(state=[], action) {
    let newState, index
    switch (action.type) {
        case ADD_TESTIMONIAL_RED:
            newState = [...state]
            newState.unshift(action.payload)
            return newState

        case GET_TESTIMONIAL_RED:
            return action.payload

        case UPDATE_TESTIMONIAL_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            state[index].name = action.payload.name
            state[index].message = action.payload.message
            state[index].star = action.payload.star
            state[index].pic = action.payload.pic
            return state

        case DELETE_TESTIMONIAL_RED:
            index = state.findIndex((x) => x._id === action.payload._id)
            newState = [...state]
            newState.splice(index, 1)
            return newState
        default:
            return state
    }
}