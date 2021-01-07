import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // Check to see if the item already in the cart
      const existItem = state.cartItems.find((x) => x.product === item.product);

      // If the item already in the cart
      if (existItem) {
        // Update the exist item
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
        // If the item is not in the cart, add new item to cart
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    default:
      return state;
  }
};
