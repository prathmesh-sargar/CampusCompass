import { configureStore } from "@reduxjs/toolkit";
import appReducer from './storeSlices.js'


export const store = configureStore({

    reducer : {

        app: appReducer
    }
})
