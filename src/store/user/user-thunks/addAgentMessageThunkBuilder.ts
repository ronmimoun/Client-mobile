import { createAsyncThunk, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "../user-state";
import { agentMessageApiService } from "../../../services/http/api/agentMessage.api.service";
import { CreateAgentMessageRequest } from "../../../models/agentMessage/create/agentMessage.request";
import { GenericResponse, buildResponse } from "../../../utils/api.utils";
import { CreateAgentMessageResponse } from "../../../models/agentMessage/create/agentMessage.response";
import { toast } from "react-toastify";
import { POPUP_MESSAGE } from "../../../constants/popup.constants";
import { userUtilService } from "../../../utils/user.utils";

export const addAgentMessageThunk = createAsyncThunk(
  "user/addAgentMessageThunk",
  async (
    data: CreateAgentMessageRequest
  ): Promise<GenericResponse<CreateAgentMessageResponse | undefined>> => {
    const response = await agentMessageApiService.create(data);

    if (!response.isSucceeded || !response.data?.content) {
      return buildResponse(false, response.data?.content);
    }

    return buildResponse(true, response.data.content);
  }
);

export const addAgentMessageThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder
    .addCase(addAgentMessageThunk.fulfilled, (state, action) => {
      if (!action.payload.isSucceeded || !action.payload.data) return;

      userUtilService.saveLocalUser(action.payload.data.savedUser);
      state.currentUser = action.payload.data.savedUser;
      toast.success(POPUP_MESSAGE.AGENT_DETAILS.CREATE.SUCCESS);
    })
    .addCase(addAgentMessageThunk.rejected, () => {
      toast.error(POPUP_MESSAGE.AGENT_DETAILS.CREATE.ERROR);
    });
};
