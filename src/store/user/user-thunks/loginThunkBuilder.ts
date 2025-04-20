import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { LoginResponse } from "../../../models/auth/Login/Login.response";
import { LoginRequest } from "../../../models/auth/Login/Login.request";
import { UserState } from "../user-state";
import { userUtilService } from "../../../utils/user.utils";
import { authApiService } from "../../../services/http/api/auth.api.service";

export type UserAuthThunkResponse = {
  isSucceeded: boolean;
  data: LoginResponse | null;
};

export const loginThunk = createAsyncThunk(
  "user/loginThunk",
  async (data: LoginRequest): Promise<UserAuthThunkResponse> => {
    const userResponse = await authApiService.login(data);
    const flowResponse: UserAuthThunkResponse = {
      isSucceeded: false,
      data: null,
    };

    if (!userResponse.isSucceeded || !userResponse.data?.content)
      return flowResponse;

    const payload = userResponse.data.content;

    userUtilService.saveLocalUser(payload.user);
    userUtilService.saveUserJwtToken(payload.jwtToken);

    return { isSucceeded: true, data: payload };
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

        const payload = action.payload.data;

        state.currentUser = payload.user;
        state.jwtToken = payload.jwtToken;

        if (!payload.user.countryPreferences.length) return;
        state.countryPreference = payload.user.countryPreferences[0];
      }
    )
    .addCase(loginThunk.rejected, () => {});
};
