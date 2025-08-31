import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allProducts: [],
    men: [],
    women: [],
    kid: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

        setProductsByCategory:(state,action)=>
            {
                const {category,products}=action.payload
                state[category]=products
            },
        setAllProducts: (state, action) => {
            state.allProducts = action.payload;
        },
        // setMenProducts: (state, action) => {
        //     state.menProducts = action.payload;
        // },
        // setWomenProducts: (state, action) => {
        //     state.womenProducts = action.payload;
        // },
        // setKidProducts: (state, action) => {
        //     state.kidProducts = action.payload;
        // }
    }
});

export const { setAllProducts, setProductsByCategory } = productsSlice.actions;
export default productsSlice.reducer;
