import { AxiosRequestConfig } from "axios";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { getBaseURl } from "../../../utils/api.utils";
import { CreditResponse } from "../../../models/credit/credit.response";

const creditHttpInstace = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

async function query(filterBy: any) {
  const options: AxiosRequestConfig = {
    method: "post",
    url: `/credit`,
    data: filterBy,
  };

  const response = await creditHttpInstace.managedRequest<CreditResponse>(
    options
  );
  return response;
}

export const creditApiService = {
  query,
};
