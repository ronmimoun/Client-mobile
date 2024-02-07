import { UserAuthResponse } from "../../../models/auth/Login/Login.response";
import { ApiResponse } from "../../../models/base/api-base";
import { getBaseURl } from "../../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { AxiosRequestConfig } from "axios";

const userHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const updateUser = async (
  request: UserAuthResponse
): Promise<ApiResponse<UserAuthResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/users/update",
    data: request,
  };

  const response = await userHttpInstace.managedRequest<UserAuthResponse>(
    options
  );
  return response;
};

export const userApiService = {
  updateUser,
};
