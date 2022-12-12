import { createSlice,current } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    category: "all",
    currencyIndex: 0,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state,{payload}) => {
                state.products = payload;
        },
        changeCategory: (state,{payload}) => {
                state.category = payload;
        },
        changeCurrencyIndex: (state,{payload}) => {
                state.currencyIndex = payload;
        }
    },
});

export const {
    setProducts,
    changeCategory,
    changeCurrencyIndex,

} = productSlice.actions;

export default productSlice.reducer;
