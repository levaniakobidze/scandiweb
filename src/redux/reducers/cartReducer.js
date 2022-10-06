import { ActionTypes } from "../constants/action-types";

const initState = {
  cart: [],
  showCartOverlay: false,
};

export const cartReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_TO_CART:
      const alreadyInCart = state.cart.find((item) => item.id === payload.id);

      if (alreadyInCart) {
        return {
          ...state,
        };
      }
      return {
        cart: (state.cart = [...state.cart, payload]),
        ...state,
      };
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
