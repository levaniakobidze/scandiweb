import { ActionTypes } from "../constants/action-types";

export const addToCart = (item) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: item,
  };
};

export const openCartOverlay = () => {
  return {
    type: ActionTypes.OPEN_CART_OVERLAY,
    payload: true,
  };
};
export const closeCartOverlay = () => {
  return {
    type: ActionTypes.CLOSE_CART_OVERLAY,
    payload: false,
  };
};
