import { takeEvery, put } from "redux-saga/effects"
import { addRecord, deleteRecord, getRecord, updateQuantity, updateRecord } from "./Services/ProductServices"
import { ADD_PRODUCT, ADD_PRODUCT_RED, DELETE_PRODUCT, DELETE_PRODUCT_RED, GET_PRODUCT, GET_PRODUCT_RED, UPDATE_PRODUCT, UPDATE_PRODUCT_QUANTITY, UPDATE_PRODUCT_QUANTITY_RED, UPDATE_PRODUCT_RED } from "../Constants"

function* addSaga(action) {
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_PRODUCT_RED, payload: response.data })
}

function* getSaga() {
    let response = yield getRecord()
    yield put({ type: GET_PRODUCT_RED, payload: response.data })
}

function* updateSaga(action) {
    let response = yield updateRecord(action.payload)
    yield put({ type: UPDATE_PRODUCT_RED, payload: response.data })
}

function* updateQuantitySaga(action) {
    yield updateQuantity(action.payload)
    yield put({ type: UPDATE_PRODUCT_QUANTITY_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_PRODUCT_RED, payload: action.payload })
}

export default function* productSagas() {
    yield takeEvery(ADD_PRODUCT, addSaga)
    yield takeEvery(GET_PRODUCT, getSaga)
    yield takeEvery(UPDATE_PRODUCT, updateSaga)
    yield takeEvery(UPDATE_PRODUCT_QUANTITY, updateQuantitySaga)
    yield takeEvery(DELETE_PRODUCT, deleteSaga)
}