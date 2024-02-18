import { ApiResponse } from "../../../models/base/api-base";
import { UserModel } from "../../../types/user.type";
import { getBaseURl } from "../../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { AxiosRequestConfig } from "axios";

const userHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const updateUser = async (
  request: UserModel
): Promise<ApiResponse<UserModel>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/users/update",
    data: request,
  };

  const response = await userHttpInstance.managedRequest<UserModel>(options);
  return response;
};

export const userApiService = {
  updateUser,
};
