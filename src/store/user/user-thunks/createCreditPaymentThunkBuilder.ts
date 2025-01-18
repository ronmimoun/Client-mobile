import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { paymentApiService } from "../../../services/payment/payment.api.service";
import {
  CreateCreditPaymentRequest,
  CreateCreditPaymentResponse,
} from "../../../types/api/payment/credit/createCreditPayment.type";
import { ApiResponse } from "../../../models/base/api-base";
import { userUtilService } from "../../../utils/user.utils";

export const createCreditPayment = createAsyncThunk(
  "user/createCreditPurchase",
  async (
    requestPayload: CreateCreditPaymentRequest
  ): Promise<ApiResponse<CreateCreditPaymentResponse>> => {
    const createCreditPaymentResponse =
      await paymentApiService.createCreditPayment(requestPayload);

    return createCreditPaymentResponse;
  }
);

export const createCreditPaymentThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(createCreditPayment.rejected, () => {})
    .addCase(createCreditPayment.fulfilled, (state, action) => {
      if (!action.payload.isSucceeded || !action.payload.data) return;

      const currentUser = action.payload.data.content;
      userUtilService.saveLocalUser(currentUser);
      state.currentUser = currentUser;
    });
};
