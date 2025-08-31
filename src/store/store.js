import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from './productSlice'
import cartSlice from './cartSlice'

const store=configureStore({
    reducer:{
        auth:authSlice,
        cart:cartSlice,
        products:productSlice,
    }
})



export default store