import { RootState } from "../root.reducers";

const cart = () => {
  return (state: RootState) => {
    return state.cart.cart;
  };
};

export const cartSelectors = {
  cart,
};
