import { ActionTypes } from "../constants/action-types";
export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const selectedProducts = (products) => {
  return {
    type: ActionTypes.SELECTED_PRODUCTS,
    payload: products,
  };
};

export const changeCategory = (name) => {
  return {
    type: ActionTypes.CHANGE_CATEGORY,
    payload: name,
  };
};

export const changeCurrencyIndex = (index) => {
  return {
    type: ActionTypes.CHANGE_CURRENCY_INDEX,
    payload: index,
  };
};
