import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"

import RootReducer from "./Reducers/RootReducer"
import RootSagas from "./Sagas/RootSagas"


const SagaMiddleWare = createSagaMiddleware()

const Store = configureStore({
    reducer: RootReducer,
    middleware: () => [SagaMiddleWare]
})
export default Store

SagaMiddleWare.run(RootSagas)