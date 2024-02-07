import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root.reducers";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: rootReducer
})

export default store
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()