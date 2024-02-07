import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  globalInitThunkBuilder,
  globalInitThunk,
} from "./global-thunks/globalInitThunkBuilder";

export const globalThunkActionBuilder = (
  builder: ActionReducerMapBuilder<GlobalState>
) => {
  globalInitThunkBuilder(builder);
};

export const globalThunkActions = {
  globalInitThunk,
};
