import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { authApiService } from "../../../services/http/api/auth.api.service";
import { RegisterRequest } from "../../../models/auth/register/register.request";
import { buildResponse } from "../../../utils/api.utils";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../constants/popup.constants";

export type RegisterThunkResponse = {
  isSucceeded: boolean;
  data: null;
};

export const registerThunk = createAsyncThunk(
  "user/registerThunk",
  async (requestPayload: RegisterRequest) => {
    const response = await authApiService.register(requestPayload);
    if (!response.isSucceeded) return buildResponse(false, null);

    return buildResponse(true, null);
  }
);

export const registerThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder.addCase(registerThunk.rejected, () => {
    toast.error(POPUP_MESSAGE.REGISTER.FAILED_TO_SIGN_UP);
  });
};
