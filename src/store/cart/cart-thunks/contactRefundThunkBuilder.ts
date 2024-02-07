import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { paymentApiService } from "../../../services/payment/payment.api.service";
import { buildResponse } from "../../../utils/api.utils";
import { userActions } from "../../user/user.actions";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../constants/popup.constants";

type ContactRefundThunkProps = {
  transactionId: string;
  userId: string;
};

export const contactRefundThunk = createAsyncThunk(
  "cart/contactRefundThunk",
  async (requestPayload: ContactRefundThunkProps, thunkApi) => {
    const response = await paymentApiService.refundContactPayment(
      requestPayload
    );
    if (!response.isSucceeded || !response.data?.content)
      return buildResponse(false, response.data?.content);

    thunkApi.dispatch(userActions.setCurrentUser(response.data.content));
    return buildResponse(true, response.data.content);
  }
);

export const refundContactThunkBuilder = (
  builder: ActionReducerMapBuilder<CartState>
) => {
  builder
    .addCase(contactRefundThunk.rejected, () => {
      toast.error(POPUP_MESSAGE.PAYMENT.REFUND.ERROR);
    })
    .addCase(contactRefundThunk.fulfilled, (_, action) => {
      if (!action.payload.isSucceeded || !action.payload.data) return;
      toast.success(POPUP_MESSAGE.PAYMENT.REFUND.SUCCESS);
    });
};
