import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ContactModel } from "../../../types/contact/contact.type";
import { RootState } from "../../root.reducers";
import { userUtilService } from "../../../utils/user.utils";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../constants/popup.constants";
import { paymentUtilService } from "../../../utils/payment.utils";
import { UserState } from "../user-state";
import { ApiResponse } from "../../../models/base/api-base";
import { ContactPaymentResponse } from "../../../models/payment/contact/contactPayment.response";
import { UserModel } from "../../../types/user.type";

export const singleContactPurchase = createAsyncThunk(
  "user/singleContactPurchase",
  async (
    requestPayload: ContactModel,
    thunkApi
  ): Promise<ApiResponse<ContactPaymentResponse> | undefined> => {
    const user = (thunkApi.getState() as RootState).user
      .currentUser as UserModel;

    if (!userUtilService.calculateUserCredits([requestPayload], user)) {
      toast(POPUP_MESSAGE.CART.NOT_ENOUGH_CREDITS);
      return;
    }

    const paymentResponse =
      await paymentUtilService.createContactPaymentRequest([requestPayload]);

    return paymentResponse;
  }
);

export const singleContactPurchaseThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder.addCase(
    singleContactPurchase.fulfilled,
    (
      state,
      action: PayloadAction<ApiResponse<ContactPaymentResponse> | undefined>
    ) => {
      if (!action?.payload?.isSucceeded || !action.payload.data?.content)
        return;

      state.currentUser = action.payload.data.content;
      userUtilService.saveLocalUser(action.payload.data.content);

      toast.success(
        POPUP_MESSAGE.CONTACT.CONTACT_DETAILS.PURCHASE_CONTACT
          .CONTACT_PURCHASED_SUCCESSFULLY
      );
    }
  );
};
