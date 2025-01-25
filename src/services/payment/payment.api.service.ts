import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../http/instances";
import { ContactPaymentResponse } from "../../models/payment/contact/contactPayment.response";
import { RefundContactRequest } from "../../models/payment/refund/refund.request";
import { RefundContactResponse } from "../../models/payment/refund/refund.response";
import {
  CreateCreditPaymentRequest,
  CreateCreditPaymentResponse,
} from "../../types/api/payment/credit/createCreditPayment.type";
import { CreateContactPaymentRequest } from "../../types/api/payment/CreateContactPayment.type";

const paymentHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const createCreditPayment = async (
  request?: CreateCreditPaymentRequest
): Promise<ApiResponse<CreateCreditPaymentResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/payment/createCreditPayment",
    data: request,
  };

  const response =
    await paymentHttpInstance.managedRequest<CreateCreditPaymentResponse>(
      options
    );
  return response;
};

const createContactPayment = async (
  request?: CreateContactPaymentRequest
): Promise<ApiResponse<ContactPaymentResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/payment/createContactPayment",
    data: request,
  };

  const response =
    await paymentHttpInstance.managedRequest<ContactPaymentResponse>(options);
  return response;
};

const refundContactPayment = async (
  request?: RefundContactRequest
): Promise<ApiResponse<ContactPaymentResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/payment/contact/remove",
    data: request,
  };

  const response =
    await paymentHttpInstance.managedRequest<RefundContactResponse>(options);
  return response;
};

export const paymentApiService = {
  createCreditPayment,
  createContactPayment,
  refundContactPayment,
};
