import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "./user-state";
import { loginThunkBuilder, loginThunk } from "./user-thunks/loginThunkBuilder";
import {
  createCreditPayment,
  createCreditPaymentThunkBuilder,
} from "./user-thunks/createCreditPaymentThunkBuilder";
import {
  userUpdateThunkBuilder,
  userUpdateThunk,
} from "./user-thunks/userUpdateThunkBuilder";
import {
  logoutThunkBuilder,
  logoutThunk,
} from "./user-thunks/logoutThunkBuilder";
import {
  addAgentMessageThunkBuilder,
  addAgentMessageThunk,
} from "./user-thunks/addAgentMessageThunkBuilder";
import {
  singleContactPurchaseThunkBuilder,
  singleContactPurchase,
} from "./user-thunks/singleContactPurchaseThunkBuilder";
import {
  addUserFavoriteContactThunkBuilder,
  addUserFavoriteContactThunk,
} from "./user-thunks/addUserFavoriteContactThunkBuilder";
import {
  removeUserFavoriteContactThunkBuilder,
  removeUserFavoriteContactThunk,
} from "./user-thunks/removeUserFavoriteContactThunkBuilder";
import {
  otpVerificationThunkBuilder,
  otpVerificationThunk,
} from "./user-thunks/otpVerificationThunkBuilder";

export const userThunkActionBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  loginThunkBuilder(builder);
  logoutThunkBuilder(builder);
  createCreditPaymentThunkBuilder(builder);
  userUpdateThunkBuilder(builder);
  addAgentMessageThunkBuilder(builder);
  singleContactPurchaseThunkBuilder(builder);
  addUserFavoriteContactThunkBuilder(builder);
  removeUserFavoriteContactThunkBuilder(builder);
  otpVerificationThunkBuilder(builder);
};

export const userThunkActions = {
  loginThunk,
  logoutThunk,
  createCreditPayment,
  userUpdateThunk,
  addAgentMessageThunk,
  singleContactPurchase,
  addUserFavoriteContactThunk,
  removeUserFavoriteContactThunk,
  otpVerificationThunk,
};
