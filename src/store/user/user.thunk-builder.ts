import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "./user-state";
import { loginThunkBuilder, loginThunk } from "./user-thunks/loginThunkBuilder";
import {
  creditPurchase,
  creditPurchaseThunkBuilder,
} from "./user-thunks/creditPurchaseThunkBuilder";
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

export const userThunkActionBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  loginThunkBuilder(builder);
  logoutThunkBuilder(builder);
  creditPurchaseThunkBuilder(builder);
  userUpdateThunkBuilder(builder);
  addAgentMessageThunkBuilder(builder);
  registerThunkBuilder(builder);
  singleContactPurchaseThunkBuilder(builder);
};

export const userThunkActions = {
  loginThunk,
  logoutThunk,
  creditPurchase,
  userUpdateThunk,
  addAgentMessageThunk,
  registerThunk,
  singleContactPurchase,
};
