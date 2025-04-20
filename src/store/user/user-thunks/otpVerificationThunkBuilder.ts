import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { authApiService } from "../../../services/http/api/auth.api.service";
import { VerifyOTPRequest } from "../../../types/api/auth/OTPVerification.type";

export const otpVerificationThunk = createAsyncThunk(
  "user/otpVerificationThunk",
  async (requestPayload: VerifyOTPRequest) => {
    const response = await authApiService.verifyOTP(requestPayload);
    return response;
  }
);

export const otpVerificationThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(otpVerificationThunk.pending, () => {})
    .addCase(otpVerificationThunk.fulfilled, () => {
      //   userUtilService.clearLocalUser();
      //   window.location.href = ROUTES.LOGIN_PAGE.FULL_ROUTE_NAME;
    })
    .addCase(otpVerificationThunk.rejected, () => {});
};
