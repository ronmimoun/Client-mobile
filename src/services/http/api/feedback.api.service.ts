import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../../models/base/api-base";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { getBaseURl } from "../../../utils/api.utils";
import { QueryFeedbackRequest } from "../../../models/feedback/query/feedback.request";
import { QueryFeedbackResponse } from "../../../models/feedback/query/feedback.response";
import { CreateFeedbackResponse } from "../../../models/feedback/create/createFeedback.response";
import { CreateFeedbackRequest } from "../../../models/feedback/create/createFeedback.request";

const feedbackHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const query = async (
  requestPayload: QueryFeedbackRequest
): Promise<ApiResponse<QueryFeedbackResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/feedback",
    data: requestPayload,
  };

  const response =
    await feedbackHttpInstace.managedRequest<QueryFeedbackResponse>(options);
  return response;
};

const create = async (
  requestPayload: CreateFeedbackRequest
): Promise<ApiResponse<CreateFeedbackResponse>> => {
  const options = {
    method: "post",
    url: "/feedback/create",
    data: requestPayload,
  };

  const response =
    await feedbackHttpInstace.managedRequest<CreateFeedbackResponse>(options);
  return response;
};

export const feedbackApiService = {
  query,
  create,
};
