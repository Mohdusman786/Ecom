import { takeEvery, put } from "redux-saga/effects"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/CartServices"
import { ADD_CART, ADD_CART_RED, DELETE_CART, DELETE_CART_RED, GET_CART, GET_CART_RED, UPDATE_CART, UPDATE_CART_RED } from "../Constants"

function* addSaga(action) {
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_CART_RED, payload: response.data })
}

function* getSaga() {
    let response = yield getRecord()
    yield put({ type: GET_CART_RED, payload: response.data })
}

function* updateSaga(action) {
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_CART_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_CART_RED, payload: action.payload })
}

export default function* cartSagas() {
    yield takeEvery(ADD_CART, addSaga)
    yield takeEvery(GET_CART, getSaga)
    yield takeEvery(UPDATE_CART, updateSaga)
    yield takeEvery(DELETE_CART, deleteSaga)
}