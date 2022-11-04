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
export const calculate = (index) => {
  return {
    type: ActionTypes.CALCULATE,
    payload: index,
  };
};

export const increaseQty = (id) => {
  return {
    type: ActionTypes.INCREASE_QTY,
    payload: id,
  };
};

export const decreaseQty = (id) => {
  return {
    type: ActionTypes.DECREASE_QTY,
    payload: id,
  };
};

export const addItemID = (id) => {
  return {
    type: ActionTypes.ADD_ITEM_ID,
    payload: id,
  };
};
