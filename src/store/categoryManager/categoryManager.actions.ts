import { categoryManagerSlice } from "./categoryManager.reducer";
import { categoryManagerThunkActions } from "./categoryManager.thunk-builder";

export const categoryManagerActions = {
  ...categoryManagerSlice.actions,
  ...categoryManagerThunkActions,
};
