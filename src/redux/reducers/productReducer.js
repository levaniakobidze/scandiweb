import { ActionTypes } from "../constants/action-types";

const initState = {
  products: [],
  category: "all",
  currencyIndex: 0,
};

export const productReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return {
        products: (state.products = payload),
        ...state,
      };
    case ActionTypes.CHANGE_CATEGORY:
      return {
        category: (state.category = payload),
        ...state,
      };
    case ActionTypes.CHANGE_CURRENCY_INDEX:
      return {
        currencyIndex: (state.currencyIndex = payload),
        ...state,
      };

    default:
      return state;
  }
};
