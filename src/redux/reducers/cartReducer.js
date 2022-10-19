import { ActionTypes } from "../constants/action-types";

const initState = {
  cart: [],
  showCartOverlay: false,
  amount: 0,
  total: 0,
};

export const cartReducer = (state = initState, { type, payload }) => {
  switch (type) {
    /////////////////////////////////////////////
    case ActionTypes.ADD_TO_CART:
      const item = payload;
      const alreadyInCart = state.cart.find(
        (cartItem) => cartItem.itemID === item.itemID
      );

      if (alreadyInCart) {
        return {
          ...state,
        };
      }
      return {
        cart: [
          ...state.cart,
          {
            ...item,
            qty: 1,
          },
        ],
      };

    ///////////////////////// EEEENDDD //////////////////////
    case ActionTypes.OPEN_CART_OVERLAY:
      return {
        openCartOverlay: (state.showCartOverlay = payload),
        ...state,
      };
    case ActionTypes.CLOSE_CART_OVERLAY:
      return {
        closeCartOverlay: (state.showCartOverlay = payload),
        ...state,
      };
    case ActionTypes.CALCULATE:
      let amount = 0;
      let total = 0;
      state.cart.forEach((item) => {
        amount = amount + item.qty;
        total = total + item.prices[0].amount * item.qty;
        state.amount = amount;
        state.total = total;
      });

      return {
        total: total,
        ...state,
      };
    case ActionTypes.INCREASE_QTY:
      let cartItem = state.cart.find((item) => item.itemID === payload);
      cartItem.qty = cartItem.qty + 1;
      console.log(state.cart);
      // state.cart =
      state.cart = [...state.cart];
      return {
        ...state,
      };

    case ActionTypes.DECREASE_QTY:
      let findItem = state.cart.find((item) => item.itemID === payload);
      findItem.qty = findItem.qty - 1;
      state.cart = [...state.cart];
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
      break;
  }
};
