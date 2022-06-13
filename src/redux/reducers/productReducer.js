import { ActionTypes } from "../constants/action-types";

const initState = {
  products: [],
  changeCategoryIndex: 0,
};

export const productReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return {
        products: (state.products = payload),
        ...state,
      };
    case ActionTypes.CHANGE_CATEGORY_INDE:
      return {
        changeCategoryIndex: (state.changeCategoryIndex = payload),
        ...state,
      };

    default:
      return state;
  }
};
