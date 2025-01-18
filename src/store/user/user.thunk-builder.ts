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
  registerThunkBuilder,
  registerThunk,
} from "./user-thunks/registerThunkBuilder";
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

export const userThunkActionBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  loginThunkBuilder(builder);
  logoutThunkBuilder(builder);
  createCreditPaymentThunkBuilder(builder);
  userUpdateThunkBuilder(builder);
  addAgentMessageThunkBuilder(builder);
  registerThunkBuilder(builder);
  singleContactPurchaseThunkBuilder(builder);
  addUserFavoriteContactThunkBuilder(builder);
  removeUserFavoriteContactThunkBuilder(builder);
};

export const userThunkActions = {
  loginThunk,
  logoutThunk,
  createCreditPayment,
  userUpdateThunk,
  addAgentMessageThunk,
  registerThunk,
  singleContactPurchase,
  addUserFavoriteContactThunk,
  removeUserFavoriteContactThunk,
};
