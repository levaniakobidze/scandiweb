import { createSlice,current } from "@reduxjs/toolkit";


const initialState = {
    cart: [],
    showCartOverlay: false,
    amount: 0,
    total: 0,
    itemID: "",
    currencySymbol: "",
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state,{payload}) => {
            const item = payload;
            const alreadyInCart = current(state).cart.find(
                (cartItem) => cartItem.itemID === item.itemID
            );
            if (alreadyInCart) {
                state.cart = current(state).cart.filter(
                    (cartItem) => cartItem.itemID !== item.itemID
                );
                return;
            }
            state.cart = [...current(state).cart,{...item, qty: 1,}]
        },
        openCartOverlay: (state,{payload}) => {
                state.showCartOverlay = true;
            },
        closeCartOverlay: (state,{payload}) => {
                state.showCartOverlay = false;
        },
        calculate:(state,{payload}) => {
            let amount = 0;
            let total = 0;
            state.cart.forEach((item) => {
                amount = amount + item.qty;
                total = total + item.prices[payload].amount * item.qty;
                state.amount = amount;
                state.total = total;
                state.currencySymbol = item.prices[payload].currency.symbol;
            });
            if (state.cart.length === 0) {
                state.amount = 0;
                state.total = 0;
            }
            state.total = total
        },
        increaseQty: (state,{payload}) => {
            const cartItem = state.cart.find((item) => item.itemID === payload);
            cartItem.qty = cartItem.qty + 1;

        } ,
        decreaseQty: (state,{payload}) => {
            let findItem = state.cart.find((item) => item.itemID === payload);
            findItem.qty = findItem.qty - 1;
            if (findItem.qty === 0) {
                state.cart = state.cart.filter((item) => item.itemID !== payload);
            }
        },
        addItemId: (state,{payload}) => {
            state.itemID = payload;
        }
    },
});

export const {
    addToCart,
    openCartOverlay,
    closeCartOverlay,
    calculate,
    increaseQty,
    decreaseQty,
    addItemId,
} = cartSlice.actions;

export default cartSlice.reducer;
