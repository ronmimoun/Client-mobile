import {
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { userUtilService } from "../../../utils/user.utils";
import { userApiService } from "../../../services/http/api/user.api.service";
import { ApiResponse } from "../../../models/base/api-base";
import {
  RemoveUserFavoriteContactRequest,
  RemoveUserFavoriteContactResponse,
} from "../../../types/api/user/removeUserFavoriteContact.type";

export const removeUserFavoriteContactThunk = createAsyncThunk(
  "user/removeUserFavoriteContactThunk",
  async (
    data: RemoveUserFavoriteContactRequest
  ): Promise<ApiResponse<RemoveUserFavoriteContactResponse>> => {
    const response = await userApiService.removeUserFavoriteContact(data);
    return response;
  }
);

export const removeUserFavoriteContactThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(
      removeUserFavoriteContactThunk.fulfilled,
      (
        state,
        action: PayloadAction<ApiResponse<RemoveUserFavoriteContactResponse>>
      ) => {
        if (!action.payload.isSucceeded || !action.payload.data?.content)
          return;
        const updatedUser = action.payload.data.content;

        state.currentUser = updatedUser;
        userUtilService.saveLocalUser(updatedUser);
      }
    )
    .addCase(removeUserFavoriteContactThunk.rejected, () => {});
};
