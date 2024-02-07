import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../../models/base/api-base";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { getBaseURl } from "../../../utils/api.utils";
import { QuerySupportChatRequest } from "../../../models/supportChat/query/querySupportChat.request";
import { QuerySupportChatResponse } from "../../../models/supportChat/query/querySupportChat.response";
import { GetByIdSupportChatResponse } from "../../../models/supportChat/getById/getByIdSupportChat.response";
import { CreateSupportChatRequest } from "../../../models/supportChat/create/CreateSupportChat.request";
import { CreateSupportChatResponse } from "../../../models/supportChat/create/CreateSupportChat.response";

const supportChatHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const query = async (
  filterBy: QuerySupportChatRequest
): Promise<ApiResponse<QuerySupportChatResponse>> => {
  const options: AxiosRequestConfig = {
    method: "get",
    url: "/support_chat",
    params: filterBy,
  };

  const response =
    await supportChatHttpInstace.managedRequest<QuerySupportChatResponse>(
      options
    );
  return response;
};

const getById = async (
  id: string
): Promise<ApiResponse<GetByIdSupportChatResponse>> => {
  const options = {
    method: "get",
    url: "/support_chat/" + id,
  };

  const response =
    await supportChatHttpInstace.managedRequest<GetByIdSupportChatResponse>(
      options
    );
  return response;
};

const create = async (
  requestPayload: CreateSupportChatRequest
): Promise<ApiResponse<CreateSupportChatResponse>> => {
  const options = {
    method: "post",
    url: "/support_chat/create",
    data: requestPayload,
    loaderOptions: {
      ignore: true,
    },
  };

  const response =
    await supportChatHttpInstace.managedRequest<CreateSupportChatResponse>(
      options
    );
  return response;
};

export const supportChatApiService = {
  query,
  getById,
  create,
};
