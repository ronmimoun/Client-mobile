import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserAuthResponse } from "../../../models/auth/Login/Login.response";
import { LoginRequest } from "../../../models/auth/Login/Login.request";
import { UserState } from "../user-state";
import { userUtilService } from "../../../utils/user.utils";
import { authApiService } from "../../../services/http/api/auth.api.service";

export type UserAuthThunkResponse = {
  isSucceeded: boolean;
  data: UserAuthResponse | null;
};

export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async (data: LoginRequest): Promise<UserAuthThunkResponse> => {
    const userResponse = await authApiService.login(data);
    const flowResponse: UserAuthThunkResponse = {
      isSucceeded: false,
      data: null,
    };

    if (!userResponse.isSucceeded || !userResponse.data) return flowResponse;

    const user = userResponse.data.content;
    userUtilService.saveLocalUser(user);
    return { isSucceeded: true, data: user };
  }
);

export const loginThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(loginThunk.pending, () => {})
    .addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<UserAuthThunkResponse>) => {
        if (!action.payload.data) return;
        const user = action.payload.data;
        state.currentUser = user;

        if (!user.countryPreferences.length) return;
        state.countryPreference = user.countryPreferences[0];
      }
    )
    .addCase(loginThunk.rejected, () => {});
};
