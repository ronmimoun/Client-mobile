import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { ContactModel } from "../../../types/contact/contact.type";
import { RootState } from "../../root.reducers";
import { userUtilService } from "../../../utils/user.utils";
import { UserAuthResponse } from "../../../models/auth/Login/Login.response";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../constants/popup.constants";
import { paymentUtilService } from "../../../utils/payment.utils";
import { buildResponse } from "../../../utils/api.utils";
import { UserState } from "../user-state";

export const singleContactPurchase = createAsyncThunk(
  "user/singleContactPurchase",
  async (requestPayload: ContactModel, thunkApi) => {
    const user = (thunkApi.getState() as RootState).user
      .currentUser as UserAuthResponse;

    if (!userUtilService.calculateUserCredits([requestPayload], user)) {
      toast(POPUP_MESSAGE.CART.NOT_ENOUGH_CREDITS);
      return buildResponse(false, null);
    }

    const paymentResponse =
      await paymentUtilService.createContactPaymentRequest([requestPayload]);

    if (!paymentResponse?.isSucceeded || !paymentResponse?.data?.content)
      return buildResponse(false, paymentResponse?.data?.content);

    return buildResponse(true, paymentResponse.data.content);
  }
);

export const singleContactPurchaseThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(singleContactPurchase.rejected, () => {
      toast.error(
        POPUP_MESSAGE.CONTACT.CONTACT_DETAILS.PURCHASE_CONTACT
          .FAILED_TO_PURCHASE_CONTACT
      );
    })
    .addCase(singleContactPurchase.fulfilled, (state, action) => {
      if (!action.payload.isSucceeded || !action.payload.data) return;

      toast.success(
        POPUP_MESSAGE.CONTACT.CONTACT_DETAILS.PURCHASE_CONTACT
          .CONTACT_PURCHASED_SUCCESSFULLY
      );
      state.currentUser = action.payload.data;
      userUtilService.saveLocalUser(action.payload.data);
    });
};
