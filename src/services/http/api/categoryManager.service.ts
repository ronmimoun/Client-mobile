import { ApiResponse } from "../../../models/base/api-base";
import { getCategoryManagerResponse } from "../../../models/categoryManager/categoryManager.response";
import { getBaseURl } from "../../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { AxiosRequestConfig } from "axios";

const categoryManagerHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const getCategoryManager = async (): Promise<
  ApiResponse<getCategoryManagerResponse>
> => {
  const options: AxiosRequestConfig = {
    method: "get",
    url: "/categories/all-categories",
  };
  const response =
    await categoryManagerHttpInstance.managedRequest<getCategoryManagerResponse>(
      options
    );
  return response;
};

export const categoriesApiService = {
  getCategoryManager,
};
