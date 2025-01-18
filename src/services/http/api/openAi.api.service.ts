import { ApiResponse } from "../../../models/base/api-base";
import { OpenAISendMessageResponse } from "../../../types/entities/open-ai-chat/openAIChat.type";
import { getBaseURl } from "../../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { AxiosRequestConfig } from "axios";

const openAIHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const sendMessage = async (
  message: string
): Promise<ApiResponse<OpenAISendMessageResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/openAi/sendPrompt",
    data: { message },
    loaderOptions: { ignore: true },
  };
  const response =
    await openAIHttpInstance.managedRequest<OpenAISendMessageResponse>(options);
  return response;
};

export const openAiApiService = {
  sendMessage,
};
