import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../../models/base/api-base";
import { CreditPaymentRequest } from "../../models/payment/credit/payment.request";
import { CreditPaymentResponse } from "../../models/payment/credit/payment.response";
import { getBaseURl } from "../../utils/api.utils";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../http/instances";
import { ContactPaymentRequest } from "../../models/payment/contact/contactPayment.request";
import { ContactPaymentResponse } from "../../models/payment/contact/contactPayment.response";
import { RefundContactRequest } from "../../models/payment/refund/refund.request";
import { RefundContactResponse } from "../../models/payment/refund/refund.response";

const paymentHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const createCreditPayment = async (
  request?: CreditPaymentRequest
): Promise<ApiResponse<CreditPaymentResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/payment/create",
    data: request,
  };

  const response =
    await paymentHttpInstance.managedRequest<CreditPaymentResponse>(options);
  return response;
};

const createContactPayment = async (
  request?: ContactPaymentRequest
): Promise<ApiResponse<ContactPaymentResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/payment/contact/purchase",
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
