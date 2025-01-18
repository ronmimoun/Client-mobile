import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  loaderCount: 0,
  error: null,
  isConfigLoaded: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    incrementLoaderCount: (state) => {
      state.loaderCount++;
    },
    decrementLoaderCount: (state) => {
      state.loaderCount--;
    },
    resetLoaderCount: (state) => {
      state.loaderCount = 0;
    },
    setIsConfigLoaded: (state, action: PayloadAction<boolean>) => {
      state.isConfigLoaded = action.payload;
    },
    clearState: () => initialState,
  },
});

export const globalInitialState = initialState;
export const { incrementLoaderCount, decrementLoaderCount } =
  globalSlice.actions;

const globalReducer: Reducer<GlobalState> = globalSlice.reducer;
export default globalReducer;
