import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/user.reducer";
import categoryManagerReducer from "./categoryManager/categoryManager.reducer";
import cartReducer from "./cart/cart.reducer";
import globalReducer from "./global/global.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  categoryManager: categoryManagerReducer,
  cart: cartReducer,
  global: globalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
