import { takeEvery, put } from "redux-saga/effects"
import { addRecord, deleteRecord, getRecord, updateRecord } from "./Services/SubcategoryServices"
import { ADD_SUBCATEGORY, ADD_SUBCATEGORY_RED, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY, UPDATE_SUBCATEGORY_RED } from "../Constants"

function* addSaga(action) {
    let response = yield addRecord(action.payload)
    yield put({ type: ADD_SUBCATEGORY_RED, payload: response.data })
}

function* getSaga() {
    let response = yield getRecord()
    yield put({ type: GET_SUBCATEGORY_RED, payload: response.data })
}

function* updateSaga(action) {
    yield updateRecord(action.payload)
    yield put({ type: UPDATE_SUBCATEGORY_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord(action.payload)
    yield put({ type: DELETE_SUBCATEGORY_RED, payload: action.payload })
}

export default function* subcategorySagas() {
    yield takeEvery(ADD_SUBCATEGORY, addSaga)
    yield takeEvery(GET_SUBCATEGORY, getSaga)
    yield takeEvery(UPDATE_SUBCATEGORY, updateSaga)
    yield takeEvery(DELETE_SUBCATEGORY, deleteSaga)
}