import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import productCardReducer from "./productCardReducer";
import modalReducer from "./modalReducer";

export const configureAppStore = (preloadedState) => {
    const store = configureStore({
        reducer: { 
            productCardReducer, 
            modalReducer,
        },
        middleware: getDefaultMiddleware =>(getDefaultMiddleware().concat(logger)),
        preloadedState: preloadedState
    })
    return store;
}
