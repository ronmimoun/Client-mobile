import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../root.reducers";
import { userUtilService } from "../../../utils/user.utils";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../constants/popup.constants";
import { UserState } from "../user-state";
import { ApiResponse } from "../../../models/base/api-base";
import { ContactPaymentResponse } from "../../../models/payment/contact/contactPayment.response";
import { UserModel } from "../../../types/entities/user.type";
import { ContactModel } from "../../../types/entities/contact/contact.type";
import { paymentApiService } from "../../../services/payment/payment.api.service";
import { CreateContactPaymentRequest } from "../../../types/api/payment/CreateContactPayment.type";
import { ContactTransactionType } from "../../../enums/Contact/ContactTransactionType";

export const singleContactPurchase = createAsyncThunk(
  "user/singleContactPurchase",
  async (
    contact: ContactModel,
    thunkApi
  ): Promise<ApiResponse<ContactPaymentResponse> | undefined> => {
    const user = (thunkApi.getState() as RootState).user
      .currentUser as UserModel;

    if (!userUtilService.calculateUserCredits([contact], user)) {
      toast(POPUP_MESSAGE.CART.NOT_ENOUGH_CREDITS);
      return;
    }

    const createContactPaymentRequest: CreateContactPaymentRequest = {
      contactId: contact._id,
      type: ContactTransactionType.ContactPurchase,
      priceInCredit: contact.price,
      purchasedByUserId: user._id,
      soldByUserId: contact.agent?._id,
    };

    const paymentResponse = await paymentApiService.createContactPayment(
      createContactPaymentRequest
    );

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
