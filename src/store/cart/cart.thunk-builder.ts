import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  contactPurchaseThunkBuilder,
  contactPurchase,
} from "./cart-thunks/contactPurchaseThunkBuilder";
import {
  refundContactThunkBuilder,
  contactRefundThunk,
} from "./cart-thunks/contactRefundThunkBuilder";

export const cartThunkActionBuilder = (
  builder: ActionReducerMapBuilder<CartState>
) => {
  contactPurchaseThunkBuilder(builder);
  refundContactThunkBuilder(builder);
};

export const cartThunkActions = {
  contactPurchase,
  contactRefundThunk,
};
