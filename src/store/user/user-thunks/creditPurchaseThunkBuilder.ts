import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { CreditModel } from "../../../types/credit/credit.type";
import { CreditPurchaseEnum } from "../../../enums/CreditTransaction/creditTransaction.enum";
import { paymentUtilService } from "../../../utils/payment.utils";
import { buildResponse } from "../../../utils/api.utils";
import { CreditPaymentResponse } from "../../../models/payment/credit/payment.response";
import { paymentApiService } from "../../../services/payment/payment.api.service";

type CreditPurcahseArgs = {
  credit: CreditModel;
  type: CreditPurchaseEnum;
};

export type CreditPurchaseThunkResponse = {
  isSucceeded: boolean;
  data?: CreditPaymentResponse;
};

export const creditPurchase = createAsyncThunk(
  "user/creditPurchase",
  async (
    requestPayload: CreditPurcahseArgs
  ): Promise<CreditPurchaseThunkResponse> => {
    const creditTransaction =
      paymentUtilService.createCreditPaymentRequest(requestPayload);
    const response = await paymentApiService.createCreditPayment(
      creditTransaction
    );
    if (!response.isSucceeded || !response.data?.content)
      return buildResponse(false, response.data?.content);
    return buildResponse(true, response.data.content);
  }
);

export const creditPurchaseThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(creditPurchase.rejected, () => {})
    .addCase(creditPurchase.fulfilled, (state, action) => {
      if (!action.payload.isSucceeded || !action.payload.data) return;
      state.currentUser = action.payload.data;
    });
};
