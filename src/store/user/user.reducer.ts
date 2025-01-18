import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { UserState } from "./user-state";
import { userUtilService } from "../../utils/user.utils";
import { userThunkActionBuilder } from "./user.thunk-builder";
import { CountryModel } from "../../types/entities/country/CountryModel";
import { UserModel } from "../../types/entities/user.type";

const initialState: UserState = {
  currentUser: userUtilService.getLoggedinUser() || null,
  countryPreference: userUtilService.getLocalUserCountryPreference() || null,
  jwtToken: userUtilService.getUserJwtToken() || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserModel>) => {
      userUtilService.saveLocalUser(action.payload);
      state.currentUser = action.payload;
    },

    setCountryPreference: (
      state,
      action: PayloadAction<CountryModel | null>
    ) => {
      state.countryPreference = action.payload;
    },
  },
  extraReducers: userThunkActionBuilder,
});

const userReducer: Reducer<UserState> = userSlice.reducer;
export const userInitialState = initialState;
export default userReducer;
