import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { userUtilService } from "../../../utils/user.utils";
import { userApiService } from "../../../services/http/api/user.api.service";
import {
  AddUserFavoriteContactRequest,
  AddUserFavoriteContactResponse,
} from "../../../types/api/user/addUserFavoriteContact.type";
import { ApiResponse } from "../../../models/base/api-base";

export const addUserFavoriteContactThunk = createAsyncThunk(
  "user/addUserFavoriteContactThunk",
  async (
    data: AddUserFavoriteContactRequest
  ): Promise<ApiResponse<AddUserFavoriteContactResponse>> => {
    const response = await userApiService.addUserFavoriteContact(data);
    return response;
  }
);

export const addUserFavoriteContactThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(
      addUserFavoriteContactThunk.fulfilled,
      (
        state,
        action: PayloadAction<ApiResponse<AddUserFavoriteContactResponse>>
      ) => {
        if (!action.payload.isSucceeded || !action.payload.data?.content)
          return;
        const updatedUser = action.payload.data.content;

        state.currentUser = updatedUser;
        userUtilService.saveLocalUser(updatedUser);
      }
    )
    .addCase(addUserFavoriteContactThunk.rejected, () => {});
};
