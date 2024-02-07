import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserAuthResponse } from "../../../models/auth/Login/Login.response";
import { UserState } from "../user-state";
import { authApiService } from "../../../services/http/api/auth.api.service";
import { ROUTES } from "../../../constants/routes.constants";
import { userUtilService } from "../../../utils/user.utils";

export type logoutThunkResponse = {
  isSucceeded: boolean;
  data: UserAuthResponse | null;
};

export const logoutThunk = createAsyncThunk("user/logoutThunk", async () => {
  await authApiService.logout();
});

export const logoutThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(logoutThunk.pending, () => {})
    .addCase(logoutThunk.fulfilled, () => {
      userUtilService.clearLocalUser();
      window.location.href = ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME;
    })
    .addCase(logoutThunk.rejected, () => {});
};
