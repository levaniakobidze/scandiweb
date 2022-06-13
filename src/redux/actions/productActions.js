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

export const changeCategoryIndex = (index) => {
  return {
    type: ActionTypes.CHANGE_CATEGORY_INDE,
    payload: index,
  };
};
