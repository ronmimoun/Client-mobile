import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { ContactModel } from "../../../types/contact/contact.type";
import { RootState } from "../../root.reducers";
import { userUtilService } from "../../../utils/user.utils";
import { UserAuthResponse } from "../../../models/auth/Login/Login.response";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../constants/popup.constants";
import { paymentUtilService } from "../../../utils/payment.utils";
import { userActions } from "../../user/user.actions";
import { buildResponse } from "../../../utils/api.utils";

export const contactPurchase = createAsyncThunk(
  "cart/contactPurchase",
  async (requestPayload: ContactModel[], thunkApi) => {
    const user = (thunkApi.getState() as RootState).user
      .currentUser as UserAuthResponse;

    if (!userUtilService.calculateUserCredits(requestPayload, user)) {
      toast(POPUP_MESSAGE.CART.NOT_ENOUGH_CREDITS);
      return buildResponse(false, null);
    }

    const paymentResponse =
      await paymentUtilService.createContactPaymentRequest(requestPayload);

    if (!paymentResponse?.isSucceeded || !paymentResponse?.data?.content)
      return buildResponse(false, paymentResponse?.data?.content);

    thunkApi.dispatch(userActions.setCurrentUser(paymentResponse.data.content));
    return buildResponse(true, paymentResponse.data.content);
  }
);

export const contactPurchaseThunkBuilder = (
  builder: ActionReducerMapBuilder<CartState>
) => {
  builder
    .addCase(contactPurchase.rejected, () => {
      toast.error(POPUP_MESSAGE.CART.CANNOT_PURCHASE_CONTACTS);
    })
    .addCase(contactPurchase.fulfilled, (state, action) => {
      if (!action.payload.isSucceeded || !action.payload.data) return;

      toast(POPUP_MESSAGE.CART.CONTACT_PURCAHSED);
      state.cart = [];
    });
};
