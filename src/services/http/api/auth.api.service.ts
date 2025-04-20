import { AxiosRequestConfig } from "axios";
import { LoginRequest } from "../../../models/auth/Login/Login.request";
import { LoginResponse } from "../../../models/auth/Login/Login.response";
import { ApiResponse } from "../../../models/base/api-base";
import {
  buildGeneralApiInstanceConfig,
  createManagedAxiosInstance,
} from "../instances";
import { getBaseURl } from "../../../utils/api.utils";
import { RegisterResponse } from "../../../models/auth/register/register.response";
import { RegisterRequest } from "../../../models/auth/register/register.request";
import { VerifyOTPResponse } from "../../../types/api/auth/OTPVerification.type";
import { VerifyOTPRequest } from "../../../types/api/auth/OTPVerification.type";

const authHttpInstance = createManagedAxiosInstance(
  buildGeneralApiInstanceConfig(getBaseURl())
);

const login = async (
  request?: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/auth/login",
    data: request,
  };

  const response = await authHttpInstance.managedRequest<LoginResponse>(
    options
  );
  return response;
};
const logout = async (): Promise<ApiResponse<null>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/auth/logout",
  };

  const response = await authHttpInstance.managedRequest<null>(options);
  return response;
};

const register = async (
  requestPayload: RegisterRequest
): Promise<ApiResponse<RegisterResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/auth/register",
    data: requestPayload,
  };

  const response = await authHttpInstance.managedRequest<RegisterResponse>(
    options
  );
  return response;
};

const verifyOTP = async (
  requestPayload: VerifyOTPRequest
): Promise<ApiResponse<VerifyOTPResponse>> => {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "/auth/verify-otp",
    data: requestPayload,
  };

  const response = await authHttpInstance.managedRequest<VerifyOTPResponse>(
    options
  );
  return response;
};

export const authApiService = {
  login,
  logout,
  register,
  verifyOTP,
};
