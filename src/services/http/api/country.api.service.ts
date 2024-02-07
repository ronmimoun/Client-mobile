import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../../models/base/api-base";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { getBaseURl } from "../../../utils/api.utils";
import { CountryResponse } from "../../../models/country/country.response";

const countryHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const query = async (): Promise<ApiResponse<CountryResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/country",
  };

  const response = await countryHttpInstace.managedRequest<CountryResponse>(
    options
  );
  return response;
};

export const countryApiService = {
  query,
};
