import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { ContactModel } from "../../types/contact/contact.type";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../constants/popup.constants";
import { cartThunkActionBuilder } from "./cart.thunk-builder";

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ContactModel>) => {
      const contact = state.cart.find(
        (item) => item._id === action.payload._id
      );
      if (contact) {
        toast(POPUP_MESSAGE.CART.ALREADY_IN_CART);
        return state;
      }

      state.cart.unshift(action.payload);
      toast(POPUP_MESSAGE.CART.ADDED_TO_CART);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      toast(POPUP_MESSAGE.CART.ADDED_TO_CART);
    },
  },
  extraReducers: cartThunkActionBuilder,
});

const cartReducer: Reducer<CartState> = cartSlice.reducer;
export const cartInitialState = initialState;
export default cartReducer;
