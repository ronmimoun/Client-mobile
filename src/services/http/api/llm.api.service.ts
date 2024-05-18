import { ApiResponse } from "../../../models/base/api-base";
import { OpenAISendMessageResponse } from "../../../types/open-ai-chat/openAIChat.type";
import { getBaseURl } from "../../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { AxiosRequestConfig } from "axios";

const openAIChatHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const sendMessage = async (
  message: string
): Promise<ApiResponse<OpenAISendMessageResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/llm/send",
    data: { message },
    loaderOptions: { ignore: true },
  };
  const response =
    await openAIChatHttpInstance.managedRequest<OpenAISendMessageResponse>(
      options
    );
  return response;
};

export const llmApiService = {
  sendMessage,
};
