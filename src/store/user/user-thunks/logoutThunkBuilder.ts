import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { authApiService } from "../../../services/http/api/auth.api.service";
import { ROUTES } from "../../../constants/routes.constants";
import { userUtilService } from "../../../utils/user.utils";
import { UserModel } from "../../../types/entities/user.type";

export type logoutThunkResponse = {
  isSucceeded: boolean;
  data: UserModel | null;
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
