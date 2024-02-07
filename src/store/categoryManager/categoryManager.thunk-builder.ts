import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { CategoryManagerState } from "./categoryManager-state";
import {
  initializeCategoryManagerThunkBuilder,
  initializeCategoryManagerThunk,
} from "./categoryManager-thunks/categoryManagerThunkBuilder";

export const categoryManagerThunkActionsBuilder = (
  builder: ActionReducerMapBuilder<CategoryManagerState>
) => {
  initializeCategoryManagerThunkBuilder(builder);
};

export const categoryManagerThunkActions = {
  initializeCategoryManagerThunk,
};
