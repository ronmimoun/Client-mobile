import { AxiosRequestConfig } from "axios";
import { getBaseURl } from "../../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { ApiResponse } from "../../../models/base/api-base";
import { ContactQueryResponse } from "../../../models/contact/Query/Query.response";
import { ContactResponseBase } from "../../../models/contact/base/base.api";
import { store } from "../../../utils/non-circular-injections.utils";
import { getNotRequestedContactsResponse } from "../../../models/contact/getDemandedContacts/getDemandedContacts.response";
import { sendContactDetailsEmailRequest } from "../../../models/contact/sendContactDetailsEmail/sendContactDetailsEmail.request";
import { sendContactDetailsEmailResponse } from "../../../models/contact/sendContactDetailsEmail/sendContactDetailsEmail.response";
import { ContactQueryRequest } from "../../../models/contact/Query/Query.request";

const contactHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

type FilterBy = {
  countryPreference?: string;
  inStock?: boolean;
};

const query = async (
  request?: FilterBy
): Promise<ApiResponse<ContactQueryResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contacts/",
    data: request,
  };

  const response =
    await contactHttpInstance.managedRequest<ContactQueryResponse>(options);
  return response;
};

const controlledQuery = async () => {
  const countryPreference = store.getState().user.countryPreference;
  const request: FilterBy = {};

  if (countryPreference) request.countryPreference = countryPreference.name;
  const response = await query(request);
  return response;
};

const getById = async (
  request: string
): Promise<ApiResponse<ContactResponseBase>> => {
  const options: AxiosRequestConfig = {
    method: "get",
    url: `/contacts/find/${request}`,
  };

  const response =
    await contactHttpInstance.managedRequest<ContactResponseBase>(options);
  return response;
};

async function queryByCategory(request: string) {
  const options: AxiosRequestConfig = {
    method: "get",
    url: `/contacts/${request}`,
  };

  const response =
    await contactHttpInstance.managedRequest<ContactQueryResponse>(options);
  return response;
}

async function getUserSoldContacts(request: ContactQueryRequest) {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/contacts/getUserSoldContacts`,
    data: request,
  };

  const response =
    await contactHttpInstance.managedRequest<ContactQueryResponse>(options);
  return response;
}

async function getDemandedContacts(): Promise<
  ApiResponse<getNotRequestedContactsResponse>
> {
  const options: AxiosRequestConfig = {
    method: "get",
    url: "/contacts/getDemandedContacts",
  };

  const response =
    await contactHttpInstance.managedRequest<getNotRequestedContactsResponse>(
      options
    );
  return response;
}

async function sendContactDetailsEmail(
  request: sendContactDetailsEmailRequest
) {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/contacts/download",
    data: request,
  };

  const response =
    await contactHttpInstance.managedRequest<sendContactDetailsEmailResponse>(
      options
    );
  return response;
}

export const contactApiService = {
  query,
  getById,
  queryByCategory,
  getUserSoldContacts,
  controlledQuery,
  getDemandedContacts,
  sendContactDetailsEmail,
};
