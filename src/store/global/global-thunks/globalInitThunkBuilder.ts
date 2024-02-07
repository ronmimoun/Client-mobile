import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { categoryManagerActions } from "../../categoryManager/categoryManager.actions";

export const globalInitThunk = createAsyncThunk(
  "global/globalInitThunk",
  async (_, thunkApi): Promise<void> => {
    await thunkApi.dispatch(
      categoryManagerActions.initializeCategoryManagerThunk()
    );
  }
);

export const globalInitThunkBuilder = (
  builder: ActionReducerMapBuilder<GlobalState>
) => {
  builder
    .addCase(globalInitThunk.pending, () => {})
    .addCase(globalInitThunk.fulfilled, () => {})
    .addCase(globalInitThunk.rejected, () => {});
};
