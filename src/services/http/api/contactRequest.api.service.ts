import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../../models/base/api-base";
import {
  CreateContactApplyRequest,
  CreateControlledContactApplyRequest,
} from "../../../models/contactApplyRequest/create/createContactApplyRequest.request";
import { getBaseURl } from "../../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { CerateContactApplyRequestResponse } from "../../../models/contactApplyRequest/create/createContactApplyRequest.response";

const contactApplyRequestHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const createContactRequest = async (
  request: CreateContactApplyRequest
): Promise<ApiResponse<CerateContactApplyRequestResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contact/request/create",
    data: request,
  };
  const response =
    await contactApplyRequestHttpInstance.managedRequest<CerateContactApplyRequestResponse>(
      options
    );
  return response;
};

const controlledCreateContactRequest = async (
  contactRequest: CreateControlledContactApplyRequest
) => {
  const request: CreateContactApplyRequest = {
    contactInfo: contactRequest.request,
    isApproved: false,
    status: "pending",
    createdAt: new Date(),
    updatedAt: null,
    agent: contactRequest.agent,
  };

  const response = await createContactRequest(request);
  return response;
};

export const contactApplyRequestApiService = {
  createContactRequest,
  controlledCreateContactRequest,
};
