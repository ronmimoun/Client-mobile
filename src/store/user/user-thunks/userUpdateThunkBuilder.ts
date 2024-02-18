import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { buildResponse } from "../../../utils/api.utils";
import { userUtilService } from "../../../utils/user.utils";
import { userApiService } from "../../../services/http/api/user.api.service";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../constants/popup.constants";
import { UserModel } from "../../../types/user.type";

export const userUpdateThunk = createAsyncThunk(
  "user/userUpdateThunk",
  async (data: UserModel) => {
    const response = await userApiService.updateUser(data);

    if (!response.isSucceeded || !response.data?.content)
      return buildResponse(false, response.data?.content);
    return buildResponse(true, response.data.content);
  }
);

export const userUpdateThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(userUpdateThunk.fulfilled, (state, action) => {
      if (!action.payload.isSucceeded || !action.payload.data) return;

      state.currentUser = action.payload.data;
      userUtilService.saveLocalUser(action.payload.data);

      if (!action.payload.data.countryPreferences.length) return;
      state.countryPreference = action.payload.data.countryPreferences[0];
    })
    .addCase(userUpdateThunk.rejected, () => {
      toast.error(POPUP_MESSAGE.USER.USER_UPDATE.FAILURE);
    });
};
