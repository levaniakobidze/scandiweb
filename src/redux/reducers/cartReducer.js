import { ActionTypes } from "../constants/action-types";

const initState = {
  cart: [],
  showCartOverlay: false,
};

export const cartReducer = (state = initState, { type, payload }) => {
  switch (type) {
    /////////////////////////////////////////////
    case ActionTypes.ADD_TO_CART:
      const item = payload;
      const alreadyInCart = state.cart.find(
        (cartItem) => cartItem.id === item.id
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

    default:
      return {
        ...state,
      };
      break;
  }
};
