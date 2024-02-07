import { AxiosRequestConfig } from "axios";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { getBaseURl } from "../../../utils/api.utils";
import { CreateAgentMessageResponse } from "../../../models/agentMessage/create/agentMessage.response";
import { CreateAgentMessageRequest } from "../../../models/agentMessage/create/agentMessage.request";

const agentMessageHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

async function create(requestPayload: CreateAgentMessageRequest) {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/agentMessage/create`,
    data: requestPayload,
  };

  const response =
    await agentMessageHttpInstance.managedRequest<CreateAgentMessageResponse>(
      options
    );
  return response;
}

export const agentMessageApiService = {
  create,
};
