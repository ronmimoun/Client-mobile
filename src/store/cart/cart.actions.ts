import { cartSlice } from "./cart.reducer";
import { cartThunkActions } from "./cart.thunk-builder";

export const cartActions = {
  ...cartSlice.actions,
  ...cartThunkActions,
};
